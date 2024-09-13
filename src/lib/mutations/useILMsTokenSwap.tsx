import { Address, formatUnits, parseUnits } from 'viem';
import { executeRoute, Route, RouteExtended } from '@lifi/sdk';
import { useToast } from '../hooks/use-toast';
import { useERC20Approve } from '@src/lib/mutations/useERC20Approve';
import { useMutateDepositStrategy } from '@src/lib/loop-strategy/mutations/useMutateDepositStrategy';
import { useWriteStrategyWithdraw } from '@src/lib/loop-strategy/mutations/useWriteStrategyWithdraw';
import { waitForTransaction } from '@src/lib/shared/transactionWrapper';
import { config } from '@src/lib/config/rainbow.config';
import { useContext, useState } from 'react';
import { simulateDeposit, simulateWithdraw } from '@src/lib/utils/bundles';
import { ExtendedToken, SwapContext } from '@src/pages/swap';

export const useILMsTokenSwap = (fromToken: ExtendedToken, toToken: ExtendedToken, inAmount: string, route: Route, spenderAddress: Address) => {
  const toAddress = fromToken.address as Address;
  const subStrategyAddress = fromToken.subStrategy as Address;
  const outAddress = toToken.address as Address;
  const toSubStrategyAddress = toToken.subStrategy;
  const { depositAsync } = useMutateDepositStrategy(toAddress, toSubStrategyAddress);
  const { withdrawAsync } = useWriteStrategyWithdraw(subStrategyAddress);
  // const [toAmount, setToAmount] = useState<string>('0');
  const [isSwapping, setIsSwapping] = useState(false);
  const toast = useToast();
  const { setSwapOngoing, setSteps, setSwapIsSuccessfull } = useContext(SwapContext);

  const { approveAsync } = useERC20Approve(
    outAddress,
    toSubStrategyAddress,
    BigInt(route.toAmount),
  );
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
      // wait for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const isApproved = await approveAsync(tokenAmount);
      if (isApproved) {
        const value = await simulateDeposit(spenderAddress, toSubStrategyAddress!, outAddress!, toAmount);
        if (!value.sharesToReceive) {
          setSteps([0]);
          setSwapOngoing(false);
          toast.toast({
            title: 'Error',
            description: 'swap failed',
            variant: 'destructive',
          });
        }
        await depositAsync(
          {
            amount: toAmount,
            sharesToReceive: value.sharesToReceive,
          }, {
            onSuccess() {
              setSteps([0]);
              setSwapOngoing(false);
              setSwapIsSuccessfull(true);

            },
          });
      }
    } catch (e) {
      setSteps([0]);
      setSwapOngoing(false);
      console.log(e);
      toast.toast({
        title: 'Error',
        description: 'swap failed',
        variant: 'destructive',
      });
    }
  };
  const getTransactionLinks = (route: RouteExtended) => {
    route.steps.forEach((step) => {
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
  const beginSwap = async () => {
    try {
      setSwapOngoing(true);
      const value = await simulateWithdraw(spenderAddress!, subStrategyAddress!, inAmount);
      if (!value?.data.assetsToReceive) {
        setSteps([0]);
        setSwapOngoing(false);
        toast.toast({
          title: 'Error',
          description: 'withdrawal simulation failed',
          variant: 'destructive',
        });
      }
      const { txHash } = await withdrawAsync(
        parseUnits(inAmount, 18),
        spenderAddress,
        spenderAddress,
        value.data.assetsToReceive,
      );
      const ret = await waitForTransaction(config, () => txHash!);
      if (ret.isSuccess) {
        setSteps([0, 1]);
        await handleSwap();
      }
    } catch (e) {
      setSteps([0]);
      setSwapOngoing(false);
      console.error(e);
      toast.toast({
        title: 'Error',
        description: 'withdrawal failed',
        variant: 'destructive',
      });
    }
  };

  return {
    beginSwap,
    isPending: isSwapping,
  };
};