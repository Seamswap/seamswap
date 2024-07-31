import { Address, formatUnits } from 'viem';
import { useMutateWithdrawLending } from './useMutateWithdrawLending';
import { useContext, useState } from 'react';
import { executeRoute, Route, RouteExtended } from '@lifi/sdk';
import { useToast } from '../hooks/use-toast';
import { useMutateSupplyLending } from './useMutateSupplyLending';
import { useERC20Approve } from '@src/lib/mutations/useERC20Approve';
import { lendingPoolAddress } from '@src/lib/config/contract';
import { SwapContext } from '@src/pages/swap';
import { waitForTransaction } from '@src/lib/shared/transactionWrapper';
import { config } from '@src/lib/config/rainbow.config';

export const useTokenSwap = (inToken: Address, outToken: Address, inAmount: string, route: Route, spenderAddress?: Address) => {
  const { withdrawAsync, isPending, isWithdrawPending } = useMutateWithdrawLending(inToken);
  const { supplyAsync } = useMutateSupplyLending(outToken);
  const { setSwapOngoing, setSteps, setSwapIsSuccessfull } = useContext(SwapContext);
  const {
    approveAsync,
    justApproved,
    isApproved,
  } = useERC20Approve(outToken, lendingPoolAddress, BigInt(route.toAmount));
  // const [toAmount, setToAmount] = useState<string>('0');
  const [withdrawalStarted, setWithdrawalStarted] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const toast = useToast();
  const beginSwap = async () => {
    try {
      setSwapOngoing(true);
      await withdrawAsync({ amount: inAmount }, {
        async onSuccess(txHash) {
          const ret = await waitForTransaction(config, () => txHash!);
          if (ret.isSuccess) {
            setSteps([0, 1]);
            await handleSwap();
          }
        },
      });
    } catch (e) {
      console.log(e);
      setSteps([0]);
      setSwapOngoing(false);
      toast.toast({
        title: 'Error',
        description: 'withdrawal failed',
        variant: 'destructive',
      });
    }
  };
  const handleSwap = async () => {
    try {
      setIsSwapping(true);
      const executedRoute = await executeRoute(route, {
        updateRouteHook: getTransactionLinks,
      });
      const isSuccessful = executedRoute.steps.every(step => step.execution?.status === 'DONE');
      setSteps([0, 1, 2, 3]);
      const tokenAmount = BigInt(executedRoute?.steps.at(-1)?.execution?.toAmount || '0');
      const toAmount = formatUnits(tokenAmount, executedRoute?.steps.at(-1)?.execution?.toToken?.decimals || 0);
      const isApproved = await approveAsync(tokenAmount);
      if (isApproved) {
        await supplyAsync({ amount: toAmount }, {
          onSuccess(txHash) {
            setSteps([0]);
            setSwapOngoing(false);
            setSwapIsSuccessfull(true)
          },
        });
      }
    } catch (e) {
      console.log(e);
      setSteps([0]);
      setSwapOngoing(false);

      toast.toast({
        title: 'Error',
        description: 'swap failed',
        variant: 'destructive',
      });
    }
  };
  const getTransactionLinks = (route: RouteExtended) => {
    route.steps.forEach((step, index) => {
      step.execution?.process.forEach((process, index, array) => {
        if (process.txHash) {
          setSteps([0, 1, 2]);
          console.log(
            `Transaction Hash for Step ${index + 1}, Process ${process.type}:`,
            process.txHash,
          );
        }
        if (
          array.length === (index + 1)
        ) {
          setIsSwapping(false);
        }
      });
    });
  };


  return { beginSwap, isPending: isSwapping || isWithdrawPending };
};