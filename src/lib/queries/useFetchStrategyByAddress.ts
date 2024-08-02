import { Address } from 'viem';
import { useFetchAllAssets } from './useFetchAllAssets';
import { StrategyState } from '@meta/StateTypes';
import { FetchData } from '@src/lib/types/fetch';

/**
 * Retrieves a strategy state by its address.
 * Similar to `useFetchAssetByAddress` but specifically filters for strategies.
 *
 * @param address The blockchain address of the strategy to find.
 * @returns FetchData object containing the found strategy state or undefined if no strategy matches the address.
 */
export const useFetchStrategyByAddress = (address?: Address): FetchData<StrategyState | undefined> => {
  const { data, ...state } = useFetchAllAssets();

  return {
    ...state,
    data: data.find((x) => x.address === address && x.isStrategy === true) as StrategyState,
  };
};
