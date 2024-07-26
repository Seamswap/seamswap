import { useAccount } from "wagmi";
import { Address } from "viem";
import { useSeamlessContractRead } from '@src/lib/shared/useSeamlessContractRead';
import { AAVE_ADDRESS_PROVIDER } from '@src/lib/meta';
import { poolDataProviderAbi, poolDataProviderAddress } from '@src/lib/config/contract';

export const useFetchRawUserReservesData = () => {
  const account = useAccount();

  return useSeamlessContractRead({
    address: poolDataProviderAddress,
    abi: poolDataProviderAbi,
    functionName: "getUserReservesData",
    args: [AAVE_ADDRESS_PROVIDER, account.address as Address],
    query: {
      enabled: !!account.address,
    }
  });
};
