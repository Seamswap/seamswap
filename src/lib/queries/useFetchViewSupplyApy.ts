import { Address } from 'viem';
import { FetchData, FetchNumber } from '@src/lib/types/fetch';
import { convertAprToApy, formatFetchNumberToViewNumber, formatUnitsToNumber } from '@src/lib/types/helpers';
import { Displayable, ViewNumber } from '@meta/Displayable';
import { useFetchReserveData } from '@src/lib/queries/useFetchReserveData';

export interface ViewApy {
  apy: ViewNumber | undefined;
}

export const useFetchSupplyApy = (asset?: Address): FetchData<FetchNumber> => {
  const {
    data: { liquidityRate },
    ...liquidityRest
  } = useFetchReserveData(asset);
  let supplyApy;
  if (liquidityRate) {
    const supplyApr = liquidityRate?.decimals
      ? formatUnitsToNumber(liquidityRate.bigIntValue, liquidityRate?.decimals)
      : undefined;
    supplyApy = supplyApr ? convertAprToApy(supplyApr) : undefined;
  }

  return {
    ...liquidityRest,
    data: {
      value: supplyApy,
      symbol: supplyApy !== undefined ? '%' : '',
    },
  };
};

export const useFetchViewSupplyApy = (asset?: Address): Displayable<ViewApy> => {
  const { data: apy, ...rest } = useFetchSupplyApy(asset);

  return {
    ...rest,
    data: {
      apy: formatFetchNumberToViewNumber(apy),
    },
  };
};
