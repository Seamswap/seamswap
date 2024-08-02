import { Address } from 'viem';
import { useToken } from '@src/lib/queries/useToken';
import { useSeamlessContractRead } from '@src/lib/shared/useSeamlessContractRead';
import { protocolDataProviderAbi, protocolDataProviderAddress } from '@src/lib/config/contract';
import { mergeQueryStates } from '@src/lib/formatters/mergeQueryStates';
import { fFetchBigIntStructured } from '@src/lib/formatters/getFetchBigIntFormatted';

export const useFetchReserveData = (asset?: Address) => {
  const {
    data: { decimals },
    ...tokenRest
  } = useToken(asset);

  const { data, ...rest } = useSeamlessContractRead({
    address: protocolDataProviderAddress,
    abi: protocolDataProviderAbi,
    functionName: 'getReserveData',
    args: [asset!],
    query: {
      enabled: !!asset,
    },
  });
  const [
    ,
    ,
    totalSupplied,
    ,
    totalBorrowed,
    liquidityRate,
    variableBorrowRate,
    ,
    ,
    liquidityIndex,
    variableBorrowIndex,
  ] = data || [];

  return {
    ...mergeQueryStates([tokenRest, rest]),
    data: {
      totalSupplied: fFetchBigIntStructured(totalSupplied, decimals, ''),
      totalBorrowed: fFetchBigIntStructured(totalBorrowed, decimals, ''),
      liquidityRate: fFetchBigIntStructured(liquidityRate, 27, ''),
      variableBorrowRate: fFetchBigIntStructured(variableBorrowRate, 27, ''),
      liquidityIndex: fFetchBigIntStructured(liquidityIndex, 27, ''),
      variableBorrowIndex: fFetchBigIntStructured(variableBorrowIndex, 27, ''),
    },
  };
};
