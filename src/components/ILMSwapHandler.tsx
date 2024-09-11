import { Route, Token } from '@lifi/sdk';
import * as React from 'react';
import { Button } from './ui/Button';
import { truncateWalletAddress } from '@src/lib/utils';
import ConnectionButton, { Account } from './ui/ConnectButton';
import { useILMsTokenSwap } from '@src/lib/mutations/useILMsTokenSwap';
import { ExtendedToken } from '@src/pages/swap';
import SwapHandler from '@components/molecule/SwapHandler';

export interface ISwapHandlerProps {
  route: Route;
  baseToken: Token | null;
  slippage: number | string;
  account?: Account;
  inTokenAmount: string;
  fromToken: ExtendedToken;
  toToken: ExtendedToken;
}

const LendingSwapHandler: React.FC<ISwapHandlerProps> = (props) => {
  const { beginSwap, isPending } = useILMsTokenSwap(
    props.fromToken,
    props.toToken,
    props.inTokenAmount,
    props.route,
    props.account?.address!,
  );
  return <SwapHandler beginSwap={beginSwap} isPending={isPending} {...props} />;
};
export default LendingSwapHandler;
