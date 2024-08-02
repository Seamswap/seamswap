import { useBlock } from 'wagmi';
import { Address } from 'viem';
import { queryOptions, useQueries } from '@tanstack/react-query';
import { APY_BLOCK_FRAME, COMPOUNDING_PERIODS_APY, SECONDS_PER_YEAR } from '@src/lib/meta';
import { mergeQueryStates } from '@src/lib/formatters/mergeQueryStates';
import { formatFetchNumberToViewNumber, formatUnitsToNumber } from '@src/lib/types/helpers';
import { Displayable, ViewNumber } from '@meta/Displayable';
import { useFetchStrategyByAddress } from '@src/lib/queries/useFetchStrategyByAddress';
import { StrategyAsset, useFetchStrategiesAssets } from '@src/lib/queries/useFetchStrategiesAssets';
import { fetchAssetPriceInBlock } from '@src/lib/queries/useFetchViewAssetPrice';
import { config } from '@src/lib/config/rainbow.config';
export function calculateApy(endValue: bigint, startValue: bigint, timeWindow: bigint): number {
  if (startValue === 0n || endValue === 0n || timeWindow === 0n) {
    return 0;
  }

  const endValueNumber = formatUnitsToNumber(endValue, 18);
  const startValueNumber = formatUnitsToNumber(startValue, 18);
  const timeWindowNumber = Number(timeWindow);

  const apr = (endValueNumber / startValueNumber) ** (SECONDS_PER_YEAR / timeWindowNumber) - 1;

  return ((1 + apr / COMPOUNDING_PERIODS_APY) ** COMPOUNDING_PERIODS_APY - 1) * 100;
}
interface StrategyApy {
  strategy: Address | undefined;
  apy: number | undefined;
}
export async function fetchStrategyApy(
  strategy: Address,
  latestBlockData?: any,
  prevBlockData?: any,
  strategyAssets?: StrategyAsset
): Promise<StrategyApy | undefined> {
  if (latestBlockData == null || prevBlockData == null || strategyAssets == null) return undefined;

  const shareValueInLatestBlock = await fetchAssetPriceInBlock(
    config,
    strategy,
    latestBlockData?.number,
    strategyAssets?.debt
  );
  const shareValueInPrevBlock = await fetchAssetPriceInBlock(
    config,
    strategy,
    prevBlockData.number,
    strategyAssets?.debt
  );

  if (shareValueInLatestBlock == null || shareValueInPrevBlock == null) return undefined;

  const apy = calculateApy(
    shareValueInLatestBlock,
    shareValueInPrevBlock,
    BigInt(latestBlockData.timestamp - prevBlockData.timestamp)
  );

  return {
    strategy,
    apy,
  };
}

const fetchStrategyApyQueryOptions = ({
                                        strategy,
                                        latestBlockData,
                                        prevBlockData,
                                        assetsData,
                                      }: {
  strategy?: Address;
  latestBlockData?: any;
  prevBlockData?: any;
  assetsData?: StrategyAsset;
}) => {
  return queryOptions({
    queryKey: ['strategyApy', strategy],
    queryFn: () => fetchStrategyApy(strategy!, latestBlockData, prevBlockData, assetsData),
    enabled: !!latestBlockData && !!prevBlockData && !!assetsData && !!strategy,
  });
};
export const useFetchMaxStrategyApy = (strategy?: Address) => {
  const { data: latestBlockData } = useBlock();
  const { data: prevBlockData } = useBlock({
    blockNumber: latestBlockData ? latestBlockData.number - APY_BLOCK_FRAME : undefined,
  });
  const { data: strategyState, ...strategyRest } = useFetchStrategyByAddress(strategy);
  const { data: assetsData, ...assetsRest } = useFetchStrategiesAssets(
    strategyState?.subStrategyData.map((s) => s.address) || [],
  );

  const queryResults = useQueries({
    queries: strategyState
      ? strategyState.subStrategyData.map((strategy) =>
        fetchStrategyApyQueryOptions({
          strategy: strategy?.address,
          latestBlockData,
          prevBlockData,
          assetsData: assetsData[strategy?.address],
        }),
      )
      : [],
  });

  const maxApyData = queryResults.reduce(
    (currMaxApyData, result) => {
      if (
        result.status === 'success' &&
        result.data !== undefined &&
        result.data.apy !== undefined &&
        result.data.apy > currMaxApyData.apy
      ) {
        return { strategy: result.data.strategy, apy: result.data.apy };
      }
      return {
        strategy: currMaxApyData.strategy,
        apy: currMaxApyData.apy,
      };
    },
    { strategy: undefined as Address | undefined, apy: 0 },
  );

  return {
    ...mergeQueryStates([...queryResults, assetsRest, strategyRest]),
    data: {
      strategy: maxApyData.strategy,
      apy: {
        value: maxApyData.apy,
        symbol: '%',
      },
    },
  };
};

export const useFetchViewMaxStrategyApy = (strategy?: Address): Displayable<ViewNumber> => {
  const { data, ...rest } = useFetchMaxStrategyApy(strategy);

  return { ...rest, data: formatFetchNumberToViewNumber(data.apy) };
};
