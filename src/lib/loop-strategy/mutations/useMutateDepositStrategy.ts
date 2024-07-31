import { Address, parseUnits } from "viem";
import { useAccount } from "wagmi";
import { useFetchAssetBalance } from '@src/lib/queries/useFetchViewAssetBalance';
import { useFetchAssetAllowance } from '@src/lib/queries/useFetchAssetAllowance';
import { SeamlessWriteAsyncParams, useSeamlessContractWrite } from '@src/lib/shared/useSeamlessContractWrite';
import { loopStrategyAbi } from '@src/lib/config/contract';
import { StrategyState } from '@meta/StateTypes';

export const useMutateDepositStrategy = (underLyingAddress?: Address, subStrategyAddress?: Address) => {
  // meta data
  const { address } = useAccount();

  // cache data
  const { queryKey: accountAssetBalanceQK } = useFetchAssetBalance(underLyingAddress);
  const { queryKey: assetAllowanceQK } = useFetchAssetAllowance({
    asset: underLyingAddress,
    spender: subStrategyAddress,
  });

  // hook call
  const { writeContractAsync, ...rest } = useSeamlessContractWrite({
    queriesToInvalidate: [accountAssetBalanceQK, assetAllowanceQK], // array of query keys to invalidate, when mutation happens!
  });

  // mutation wrapper
  const depositAsync = async (
    // ui arguments
    args: {
      amount: string;
      sharesToReceive: bigint;
    },
    settings?: SeamlessWriteAsyncParams
  ) => {
    if (!subStrategyAddress) {
      // eslint-disable-next-line no-console
      console.warn("subStrategyAddress is undefined.");
      return;
    }

    await writeContractAsync(
      {
        // ui -> contract arguments
        address: subStrategyAddress,
        abi: loopStrategyAbi,
        functionName: "deposit",
        args: [parseUnits(args.amount, 18), address as Address, args.sharesToReceive],
      },
      { ...settings }
    );
  };

  return { ...rest, isDepositPending: rest.isPending, depositAsync };
};
