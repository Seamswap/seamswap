import { useConfig, useWriteContract } from 'wagmi';
import { Address } from 'viem';
import { useState } from 'react';
import { loopStrategyAbi } from '@src/lib/config/contract';
import { waitForTransaction } from '@src/lib/shared/transactionWrapper';

// todo: replace id with address?
export const useWriteStrategyWithdraw = (subStrategy?: Address) => {
  const config = useConfig();

  const [isPending, setIsPending] = useState(false);
  const { writeContractAsync } = useWriteContract();

  return {
    isPending,
    withdrawAsync: async (shares: bigint, from: Address, receiver: Address, minToReceive: bigint) => {
      setIsPending(true);

      const ret = await waitForTransaction(config, async () => {
        if (!subStrategy) {
          // eslint-disable-next-line no-console
          console.warn('useWriteStrategyWithdraw: subStrategy is undefined.');
          return undefined;
        }
        console.log({ shares, from, receiver, minToReceive });
        return writeContractAsync({
          address: subStrategy,
          abi: loopStrategyAbi,
          functionName: 'redeem',
          args: [shares, from, receiver, minToReceive],
        });
      });

      setIsPending(false);

      return ret;
    },
  };
};
