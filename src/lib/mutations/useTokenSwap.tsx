import { Address, formatUnits } from 'viem';
import { useMutateWithdrawLending } from './useMutateWithdrawLending';
import { useEffect, useState } from 'react';
import { executeRoute, Route, RouteExtended } from '@lifi/sdk';
import { useToast } from '../hooks/use-toast';
import { useMutateSupplyLending } from './useMutateSupplyLending';

export const useTokenSwap = (inToken: Address, outToken: Address, inAmount: string, route: Route) => {
  const { withdrawAsync, isPending, isWithdrawPending } = useMutateWithdrawLending(inToken);
  const { supplyAsync } = useMutateSupplyLending(outToken);
  const [withdrawalStarted, setWithdrawalStarted] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const toast = useToast();
  const beginSwap = async () => {
    try {
      await withdrawAsync({ amount: inAmount }, {
        onSuccess(txHash) {
          toast.toast({
            title: 'Withdrawal Successful',
            description: txHash,
          });
          handleSwap();
        },
        onSettled: () => {
          console.log('here...');

        },
      });
    } catch (e) {
      console.log(e);
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
      console.log({ executedRoute });
      const isSuccessful = executedRoute.steps.every(step => step.execution?.status === 'DONE');
      const toAmount = parseInt(formatUnits(BigInt(executedRoute?.steps.at(-1)?.execution?.toAmount || '0'), executedRoute?.steps.at(-1)?.execution?.toToken?.decimals || 0)).toFixed(1);
      console.log({ toAmount, isSuccessful });
      supplyAsync({ amount: toAmount.toString() }, {
        onSuccess(txHash) {
          toast.toast({
            title: 'Deposit Successful',
            description: txHash,
          });
        },
        onSettled: () => {
          console.log('here...');
        },
      });
    } catch(e){
      console.log(e);
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
          toast.toast({
            title: `Transaction Hash for Step ${index + 1}, Process ${process.type}:`,
            description: process.txHash,
          });
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

  useEffect(() => {
    if (!isWithdrawPending && withdrawalStarted) {
      handleSwap();
    }
  }, [isWithdrawPending, withdrawalStarted]);

  return { beginSwap, isPending: isSwapping || isWithdrawPending };
};