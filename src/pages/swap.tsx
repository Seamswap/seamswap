/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import * as React from 'react';
import { useContext, useEffect } from 'react';
import Input from '@src/components/ui/Input';
import { getBalance } from '@wagmi/core';
import SwapIcon from '@src/components/icons/SwapIcon.icon';
import Settings from '@src/components/icons/Settings.icon';
import { LoginProviderContext } from '@src/components/providers/LoginProvider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@src/components/ui/Select';
import { Popover, PopoverContent, PopoverTrigger } from '@src/components/ui/Popover';
import { CircleX } from 'lucide-react';
import { Button } from '@src/components/ui/Button';
import { ChainId, getRoutes, getToken, Route, RoutesRequest, Token } from '@lifi/sdk';
import { useDebounceValue } from 'usehooks-ts';
import ConnectionButton from '@src/components/ui/ConnectButton';
import { TOKENS } from '@src/lib/meta';
import SwapHandler from '@src/components/SwapHandler';
import { assetsConfig } from '@src/lib/config/config';
import { config } from '@src/lib/config/rainbow.config';
import Container from '@src/components/ui/Container';

interface ExtendedToken extends Token {
  balance?: {
    decimals: number;
    formatted: string;
    symbol: string;
    value: bigint;
  };
}

const Page: NextPage = () => {
  const { openLoginModal, account } = useContext(LoginProviderContext);
  const [slippage, setSlippage] = React.useState<string>('0.1');
  const [route, setRoute] = React.useState<Route | null>(null);
  const [baseToken, setBaseToken] = React.useState<Token | null>(null);
  const [fromAmount, setFromAmount] = React.useState<string>('');
  const [fromToken, setFromToken] = React.useState<ExtendedToken | null>(null);
  const [toAmount, setToAmount] = React.useState<string>('');
  const [toToken, setToToken] = React.useState<ExtendedToken | null>(null);
  const [debouncedValue] = useDebounceValue(fromAmount, 500);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // const { handleSwap: swapToken } = useTokenSwap('0x4200000000000000000000000000000000000006', '0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452', 0, 0, undefined)

  async function handleSwap() {
    if (!fromToken || !toToken || parseFloat(debouncedValue) <= 0) return;
    setIsLoading(true);
    try {
      const routesRequest: RoutesRequest = {
        fromChainId: ChainId.BAS, // Arbitrum
        toChainId: ChainId.BAS, // Optimism
        fromTokenAddress: fromToken?.address, // USDC on Arbitrum
        toTokenAddress: toToken?.address, // DAI on Optimism
        fromAmount: (parseFloat(debouncedValue) * 10 ** fromToken.decimals).toString(), // 10 USDC,
        options: { slippage: parseFloat(slippage) },
        fromAddress: account?.address,
      };

      const result = await getRoutes(routesRequest);
      const routes = result.routes;
      const token = await getToken(
        ChainId.BAS,
        '0x0000000000000000000000000000000000000000',
      );
      setBaseToken(token);
      setRoute(routes[0]);
      setToAmount(parseFloat(routes[0].toAmount) / 10 ** routes[0].toToken.decimals + '');
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (!Number.isNaN(debouncedValue)) {
      handleSwap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, fromToken, toToken]);
  const handlePositionSwap = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };
  const handleFromTokenChange = async (address: `0x${string}`) => {
    try {
      const token = await getToken(8453, address);
      let balance;
      if (account?.address) {
        balance = await getBalance(config, {
          address: account?.address,
          token: assetsConfig[address].sTokenAddress,
        });
      }
      let logoURI = token.symbol === 'WETH' ? '/weth.svg' : token.logoURI;
      setFromToken({ ...token, balance, logoURI });
    } catch (e) {
    }
  };
  const handleToTokenChange = async (address: `0x${string}`) => {
    const token = await getToken(8453, address);
    let balance;
    if (account?.address) {
      balance = await getBalance(config, {
        address: account?.address,
        token: assetsConfig[address].sTokenAddress,
      });
    }
    setToToken({ ...token, balance });
  };
  return (
    <Container>
      <div className="grid place-content-center min-h-[80vh]">
        <div className="mx-auto flex flex-col space-y-2">
          <h2 className="max-w-[540px] mx-auto font-semibold text-2xl md:text-4xl text-center mb-3">
            Swap Positions Seamlessly, Maximize reward.
          </h2>

          <div className="w-full bg-white pt-6 pb-14 px-8 rounded-xl border-primary space-y-4 flex flex-col">
            <div className="flex justify-between items-center w-full">
              <h3 className="text-xl font-medium">Swap</h3>
              <Popover>
                <PopoverTrigger>
                  <Settings />
                </PopoverTrigger>

                <PopoverContent
                  align="start"
                  className="ml-24 p-6 w-80 rounded-xl"
                  sideOffset={-48}
                >
                  <div className="flex flex-col space-y-6">
                    <div className="flex flex-col space-y-3.5">
                      <div className="flex justify-between">
                        <span className="text-xl font-bold">Max slippage</span>
                        <CircleX className="w-6 h-6 text-[#878787]" />
                      </div>
                      <div className="space-x-4">
                        <Button variant="default">Auto</Button>
                        <Button variant="outline" className="">
                          Custom
                        </Button>
                      </div>
                    </div>
                    <div className="relative">
                      <Input
                        className="w-full pr-10"
                        placeholder="0.1"
                        value={slippage}
                        onChange={(e) => setSlippage(e.target.value)}
                      />
                      <span className="absolute right-4 inset-y-0 flex items-center grid-cols-2">
                        %
                      </span>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button className="py-4 rounded-xl">Update Tolerance</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex flex-col rounded-xl bg-primary-100 border-primary px-4 py-5 w-full space-y-1.5">
                <div className={'flex w-full gap-4 justify-between'}>
                  <span>Sell</span>

                  {fromToken?.balance && (
                    <span>
                      balance: {fromToken.balance.formatted} {fromToken.balance.symbol}
                    </span>
                  )}
                </div>
                <div className={'flex w-full gap-4'}>
                  <Input
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    className="w-1/2"
                  />
                  <div
                    className="overflow-hidden border-primary px-2 md:px-4 text-2xl w-1/2 rounded-xl py-2 bg-white flex items-center gap-x-2 md:gap-x-4">
                    {fromToken && (
                      <img
                        alt={fromToken.name}
                        src={fromToken.logoURI}
                        width={200}
                        height={200}
                        className="w-6 md:w-10 h-auto rounded-full"
                      />
                    )}
                    <Select
                      value={fromToken?.address}
                      onValueChange={handleFromTokenChange}
                    >
                      <SelectTrigger
                        className="w-10/12 !border-transparent px-0 md:border-primary-900 md:px-2 !ring-transparent text-left border-[0.2px] rounded-full py-1 placeholder:font-bold text-sm placeholder:text-xl mr-4">
                        <SelectValue placeholder="----" />
                      </SelectTrigger>
                      <SelectContent>
                        {TOKENS.filter((val) => val.address !== toToken?.address).map(
                          (token) => (
                            <SelectItem key={token.address} value={token.address}>
                              {token.name}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-grey-900">${fromToken?.priceUSD}</span>
                  <span className="underline underline-offset-2 text-primary-900">
                    Max
                  </span>
                </div>
              </div>

              <div
                className="flex flex-col rounded-xl bg-primary-100 border-primary px-4 py-5 w-full space-y-1.5 relative">
                <div
                  className="w-fit p-1 border-primary absolute z-10 inset-x-0 mx-auto -top-5 bg-white rounded-sm cursor-pointer"
                  onClick={handlePositionSwap}
                >
                  <SwapIcon className="w-6 h-6" />
                </div>
                <span>Buy</span>
                <div className={'flex w-full gap-4'}>
                  {isLoading ? (
                    <span className="w-1/2">Loading</span>
                  ) : (
                    <Input
                      value={toAmount}
                      onChange={(e) => setToAmount(e.target.value)}
                      className="w-1/2"
                      disabled
                    />
                  )}

                  <div
                    className="overflow-hidden border-primary px-2 md:px-4 text-2xl w-1/2 rounded-xl py-2 bg-white flex items-center gap-x-2 md:gap-x-4">
                    {toToken && (
                      <img
                        src={toToken.logoURI}
                        alt={toToken.name}
                        width={200}
                        height={200}
                        className="w-6 md:w-10 h-auto rounded-full"
                      />
                    )}
                    <Select value={toToken?.address} onValueChange={handleToTokenChange}>
                      <SelectTrigger
                        className="w-10/12 !border-transparent px-0 md:border-primary-900 md:px-2 !ring-transparent text-left border-[0.2px] rounded-full py-1 placeholder:font-bold text-sm placeholder:text-xl">
                        <SelectValue placeholder="----" />
                      </SelectTrigger>
                      <SelectContent>
                        {TOKENS.filter((val) => val.address !== fromToken?.address).map(
                          (token) => (
                            <SelectItem key={token.address} value={token.address}>
                              {token.name}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-grey-900">${toToken?.priceUSD}</span>
                  <span className="underline underline-offset-2 text-primary-900">
                    Max
                  </span>
                </div>
              </div>

              {isLoading ? (
                <span>Loading...</span>
              ) : (
                route && (
                  <span className="text-grey-900">
                    1 {route.fromToken?.coinKey} ={' '}
                    {(
                      parseFloat(route.fromToken?.priceUSD) /
                      parseFloat(route.toToken?.priceUSD)
                    ).toFixed(3)}{' '}
                    {route.toToken.coinKey}
                  </span>
                )
              )}

              <div className="pt-2">
                {isLoading ? (
                  <span>Loading...</span>
                ) : route ? (
                  <SwapHandler
                    inTokenAmount={fromAmount}
                    account={account}
                    baseToken={baseToken}
                    route={route}
                    slippage={slippage}
                  />
                ) : account ? (
                  <button
                    onClick={handleSwap}
                    className="bg-primary-900 px-5 py-3.5 text-white w-full rounded-xl"
                  >
                    Swap
                  </button>
                ) : (
                  <ConnectionButton isExternal />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Page;
