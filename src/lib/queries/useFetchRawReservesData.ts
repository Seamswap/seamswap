import { useSeamlessContractRead } from '@src/lib/shared/useSeamlessContractRead';
import { poolDataProviderAbi, poolDataProviderAddress } from '@src/lib/config/contract';
import { AAVE_ADDRESS_PROVIDER } from '@src/lib/meta';


export const useFetchRawReservesData = () => {
  return useSeamlessContractRead({
    address: poolDataProviderAddress,
    abi: poolDataProviderAbi,
    functionName: "getReservesData",
    args: [AAVE_ADDRESS_PROVIDER],
  });
};
