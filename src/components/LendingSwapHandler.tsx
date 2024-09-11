import { Route, Token } from '@lifi/sdk';
import * as React from 'react';
import { Account } from './ui/ConnectButton';
import { useTokenSwap } from '@src/lib/mutations/useTokenSwap';
import { Address } from 'viem';
import SwapHandler from '@components/molecule/SwapHandler';

export interface ISwapHandlerProps {
  route: Route;
  baseToken: Token | null;
  slippage: number | string;
  account?: Account;
  inTokenAmount: string;
}

const LendingSwapHandler: React.FC<ISwapHandlerProps> = (props) => {
  const { beginSwap, isPending } = useTokenSwap(
    props.route.fromToken.address as Address,
    props.route.toToken.address as Address,
    props.inTokenAmount,
    props.route,
    props.account?.address,
  );
  return <SwapHandler beginSwap={beginSwap} isPending={isPending} {...props} />;

};
export default LendingSwapHandler;
