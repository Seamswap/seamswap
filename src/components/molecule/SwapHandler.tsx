import React from 'react';
import { truncateWalletAddress } from '@src/lib/utils';
import { Button } from '@components/ui/Button';
import ConnectionButton, { Account } from '@components/ui/ConnectButton';
import { Route, Token } from '@lifi/sdk';
import { ExtendedToken } from '@src/pages/swap';

export interface ISwapHandlerProps {
  route: Route;
  baseToken: Token | null;
  slippage: number | string;
  account?: Account;
  inTokenAmount: string;
  fromToken?: ExtendedToken;
  toToken?: ExtendedToken;
}

export interface IHandlerProps extends ISwapHandlerProps {
  isPending: boolean;
  beginSwap: () => void;
}

const SwapHandler: React.FC<IHandlerProps> = ({
                                                route,
                                                baseToken,
                                                slippage,
                                                account,
                                                fromToken,
                                                toToken,
                                                inTokenAmount,
                                                beginSwap,
                                                isPending,
                                              }) => {
  return (
    <div className="space-y-4 flex flex-col">
      <div className="bg-primary-150 border-primary p-3 rounded-xl space-y-2">
        <div className="flex justify-between">
          <span>Est. asset received</span>
          <span>
            {parseFloat(route.toAmount) / 10 ** route.toToken.decimals}{' '}
            {route.toToken.coinKey}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Min. asset received</span>
          <span>
            {parseFloat(route.toAmountMin) / 10 ** route.toToken.decimals}{' '}
            {route.toToken.coinKey}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Network fee</span>
          <span>
            {(
              parseFloat(route.gasCostUSD ?? '0') /
              parseFloat(baseToken?.priceUSD ?? '0')
            ).toFixed(16)}{' '}
            {baseToken?.coinKey}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Routing path</span>
          <div className="flex space-x-1.5 items-center">
            <img
              src={route.steps[0]?.toolDetails.logoURI}
              alt={route.steps[0]?.toolDetails.name}
              width={200}
              height={200}
              className="w-6 h-auto rounded-full"
            />
            <span>{route.steps[0]?.toolDetails.name}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span>Slippage tolerance</span>
          <span>{slippage}%</span>
        </div>
        <div className="border-t border-t-primary-900 flex justify-between items-center pt-1.5">
          <span>Recipient</span>
          <div className="flex gap-2 items-center justify-between text-sm">
            <span className="text-primary-200">
              {truncateWalletAddress(account?.address || '')}
            </span>
            <Button variant="link" className="px-0">
              Add another wallet
            </Button>
          </div>
        </div>
      </div>
      {account ?
        isPending ? (<span className="text-center my-3">Loading....</span>) : <button
          onClick={beginSwap}
          className="bg-primary-900 px-5 py-3.5 text-white w-full rounded-xl"
        >
          Swap
        </button>
        : (
          <ConnectionButton isExternal />
        )}
    </div>
  );
};

export default SwapHandler;