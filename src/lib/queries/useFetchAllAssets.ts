import { Address } from 'viem';
import { FetchData } from '@src/lib/types/fetch';
import { LendMarketState, StrategyState } from '@meta/StateTypes';
import { useSeamlessContractRead } from '@src/lib/shared/useSeamlessContractRead';
import { lendingPoolAbi, lendingPoolAddress } from '@src/lib/config/contract';
import { metadataQueryConfig } from '@src/lib/utils';
import { lendingAssetToHide } from '@src/lib/meta';
import { strategiesConfig } from '@src/lib/config/config';

/**
 * This hook combines data from multiple sources: the lending pool and configured strategies.
 * It filters out assets that are specified to be hidden and categorizes assets as lending or ILM (Investment Lending Market).
 *
 * @returns An object containing a `state` with a combined list of `LendMarketState` and `StrategyState` along with additional properties for managing the fetch state.
 */
export const useFetchAllAssets = (): FetchData<(LendMarketState | StrategyState)[]> => {
    // todo: use existing raw query?
    const { data: lendingAssets, ...rest } = useSeamlessContractRead({
      address: lendingPoolAddress,
      abi: lendingPoolAbi,
      functionName: 'getReservesList',
      query: {
        ...metadataQueryConfig,
        refetchOnMount: false,

      },
    });
    const lendingMarkets: LendMarketState[] | undefined = lendingAssets
      ?.filter((asset) => {
        return lendingAssetToHide.indexOf(asset?.toLowerCase()) === -1;
      })
      .map((asset) => ({
        address: asset,
        isStrategy: false,
        tags: ['LEND'],
      }));

    // todo: fetch rest of the things for strategies?
    const ilmMarkets: StrategyState[] = [];
    Object.keys(strategiesConfig).forEach((key) => {
      const { subStrategyData } = strategiesConfig[key as Address];
      const index = subStrategyData.length - 1;
      const subStrategy = subStrategyData[index] ? subStrategyData[index].address : undefined;
      ilmMarkets.push({
        isStrategy: true,
        tags: ['ILM'],
        subStrategy,
        ...strategiesConfig[key as Address],
      });
    });
    const data = lendingAssets ? [...ilmMarkets, ...(lendingMarkets || [])] : [];

    return {
      data,
      ...rest,
    };
  }
;
