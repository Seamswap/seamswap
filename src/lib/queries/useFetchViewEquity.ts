import { Address } from "viem";
import { FetchBigInt, FetchData } from '@src/lib/types/fetch';
import { useToken } from '@src/lib/queries/useToken';
import { useSeamlessContractRead } from '@src/lib/shared/useSeamlessContractRead';
import { loopStrategyAbi } from '@src/lib/config/contract';
import { mergeQueryStates } from '@src/lib/formatters/mergeQueryStates';
import { fFetchBigIntStructured, fUsdValueStructured } from '@src/lib/formatters/getFetchBigIntFormatted';
import { Displayable, formatFetchBigIntToViewBigIntTemp } from '@src/lib/types/helpers';
import { useFetchStrategyAsset } from '@src/lib/queries/useFetchStrategyAsset';
import { ViewBigInt } from '@meta/Displayable';


interface StrategyEquity {
  equity: FetchBigInt | undefined;
  equityUsd: FetchBigInt | undefined;
}

export interface ViewDetailEquity {
  tokenAmount: ViewBigInt | undefined;
  dollarAmount: ViewBigInt | undefined;
}


export const useFetchDetailEquity = (strategy?: Address): FetchData<StrategyEquity> => {
  const { data: underlyingAsset, ...underlyingAssetRest } = useFetchStrategyAsset(strategy);
  const { data: tokenData, ...tokenDataRest } = useToken(underlyingAsset);

  const { data: equity, ...equityRest } = useSeamlessContractRead({
    address: strategy,
    abi: loopStrategyAbi,
    functionName: "equity",
    query: {
      enabled: !!strategy,
    },
  });

  const { data: equityUsd, ...equityUsdRest } = useSeamlessContractRead({
    address: strategy,
    abi: loopStrategyAbi,
    functionName: "equityUSD",
    query: {
      enabled: !!strategy,
    },
  });

  return {
    ...mergeQueryStates([underlyingAssetRest, tokenDataRest, equityRest, equityUsdRest]),
    data: {
      equity: fFetchBigIntStructured(equity, tokenData.decimals, tokenData.symbol),
      equityUsd: fUsdValueStructured(equityUsd),
    },
  };
};

export const useFetchViewDetailEquity = (strategy?: Address): Displayable<ViewDetailEquity> => {
  const {
    data: { equity, equityUsd },
    ...rest
  } = useFetchDetailEquity(strategy);

  return {
    ...rest,
    data: {
      tokenAmount: formatFetchBigIntToViewBigIntTemp(equity),
      dollarAmount: formatFetchBigIntToViewBigIntTemp(equityUsd),
    },
  };
};
