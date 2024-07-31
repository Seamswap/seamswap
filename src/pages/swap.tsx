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
import { Popover, PopoverCloser, PopoverContent, PopoverTrigger } from '@src/components/ui/Popover';
import { Button } from '@src/components/ui/Button';
import { ChainId, getRoutes, getToken, Route, RoutesRequest, Token } from '@lifi/sdk';
import { useDebounceValue } from 'usehooks-ts';
import ConnectionButton from '@src/components/ui/ConnectButton';
import { ILM_TOKENS, LENDING_TOKENS } from '@src/lib/meta';
import LendingSwapHandler from '@components/LendingSwapHandler';
import { assetsConfig, strategiesConfig } from '@src/lib/config/config';
import { config } from '@src/lib/config/rainbow.config';
import Container from '@src/components/ui/Container';
import CircleX from '@src/components/icons/CircleX.icon';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/Tabs';
import { simulateWithdraw } from '@src/lib/utils/bundles';
import ILMSwapHandler from '@components/ILMSwapHandler';
import { loopStrategyAbi } from '@src/lib/config/contract';
import { readContract } from 'wagmi/actions';
import { Address } from 'viem';
import { Check } from 'lucide-react';

export interface ExtendedToken extends Token {
  balance?: {
    decimals: number;
    formatted: string;
    symbol: string;
    value: bigint;
  };
  subStrategy?: Address;
}

interface Strategy {
  asset: Address;
  strategy: Address;
}

interface ISwapContext {
  swapOngoing: boolean;
  setSwapOngoing: React.Dispatch<React.SetStateAction<boolean>>;
  steps: number[];
  setSteps: React.Dispatch<React.SetStateAction<number[]>>;
  swapIsSuccessfull: boolean;
  setSwapIsSuccessfull: React.Dispatch<React.SetStateAction<boolean>>;
}

const DEFAULT_STATE = {
  steps: [],
  setSteps: () => {
  },
  swapOngoing: false,
  setSwapOngoing: () => {
  },
  swapIsSuccessfull: false,
  setSwapIsSuccessfull: () => {
  },
};

export const SwapContext = React.createContext<ISwapContext>(DEFAULT_STATE);
const SWAP_STEPS = ['Withdrawing token', 'Initiating swap', 'Processing swap', 'Depositing Token'];
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
  const [currentTab, setCurrentTab] = React.useState<string>('ILMS');
  const [swapOngoing, setSwapOngoing] = React.useState<boolean>(false);
  const [steps, setSteps] = React.useState<number[]>([0]);
  const [swapIsSuccessfull, setSwapIsSuccessfull] = React.useState<boolean>(false);
  const context = {
    swapOngoing,
    setSwapOngoing,
    steps,
    setSteps,
    swapIsSuccessfull,
    setSwapIsSuccessfull,
  };

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
      if (currentTab === 'ILMS') {
        const value = await simulateWithdraw(account?.address!, fromToken.subStrategy!, debouncedValue);
        if (!value?.data.assetsToReceive) {
          // TODO: toast error
        }
        routesRequest.fromAmount = value.data.assetsToReceive.toString();
      }

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
  }, [debouncedValue, fromToken, toToken, currentTab]);
  const handlePositionSwap = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };
  const handleFromTokenChange = async (address: `0x${string}`) => {
    try {
      const token = await getToken(8453, address);
      let strategyMeta = await handleStrategyBalance(address);
      let logoURI = token.symbol === 'WETH' ? '/weth.svg' : token.logoURI;
      setFromToken({ ...token, ...strategyMeta, logoURI });
    } catch (e) {
    }
  };
  const handleStrategyBalance = async (address: Address) => {
    if (!account?.address) return;
    if (currentTab === 'ILMS') {
      const strategiesArray = Object.values(strategiesConfig);
      const promises: Promise<Strategy | undefined>[] = strategiesArray.flatMap((strategy) =>
        strategy.subStrategyData.map(async (subStrategy) => {
          const balance = await readContract(config, {
            address: subStrategy.address,
            abi: loopStrategyAbi,
            functionName: 'balanceOf',
            args: [account?.address],
          });

          if (balance && balance > 0n) {
            return {
              asset: strategy.underlyingAsset.address,
              strategy: subStrategy.address,
            };
          }
          return undefined;
        }),
      );
      const strategyResults = await Promise.all(promises);
      const filteredResult = strategyResults.filter((strategy): strategy is Strategy => strategy !== undefined);
      const subStrategy = filteredResult.find(val => val.asset === address)?.strategy || Object.values(strategiesConfig).find(val => val.underlyingAsset.address === address)?.subStrategyData?.[0]?.address;
      const balance = await getBalance(config, {
        address: account?.address,
        token: subStrategy,
      });
      return {
        balance,
        subStrategy,
      };
    } else {
      const balance = await getBalance(config, {
        address: account?.address,
        token: assetsConfig[address].sTokenAddress,
      });
      return { balance };
    }

  };
  const handleToTokenChange = async (address: `0x${string}`) => {
    const token = await getToken(8453, address);
    let strategyMeta = await handleStrategyBalance(address);
    let logoURI = token.symbol === 'WETH' ? '/weth.svg' : token.logoURI;
    setToToken({ ...token, ...strategyMeta, logoURI });
  };
  const TOKENS = currentTab === 'ILMS' ? ILM_TOKENS : LENDING_TOKENS;
  useEffect(() => {
    if (account) {
      if (!fromToken?.balance && fromToken?.address) {
        handleFromTokenChange(fromToken?.address as Address);
      }
      if (!toToken?.balance && toToken?.address) {
        handleToTokenChange(toToken?.address as Address);
      }
    }
  }, [account]);
  useEffect(() => {
    setRoute(null);
    setFromToken(null);
    setToToken(null);
    setFromAmount('');
    setToAmount('');
  }, [currentTab]);
  return (
    <SwapContext.Provider value={context}>
      <Container>
        <Tabs defaultValue="ILMS" onValueChange={(val) => setCurrentTab(val)}>
          <div className="flex flex-col items-start justify-start min-h-[80vh]">

            {swapIsSuccessfull ? (
                <div className="mx-auto w-5/12 flex flex-col space-y-2 mt-16">
                  <div
                    className="w-full bg-white pt-6 pb-14 px-8 rounded-xl border-primary space-y-4 flex flex-col relative">
                    <h3 className="text-xl font-medium">Swap Successful</h3>
                    <div
                      className={`w-40 h-40 mx-auto rounded-full border-4 border-primary-900 grid place-content-center bg-primary-900`}>
                      <Check className="text-white w-20 h-auto" />
                    </div>
                    <p className={'mx-auto'}>Swap was executed successfully</p>
                    <button
                      className="bg-primary-900 px-5 py-3.5 text-white w-full rounded-xl"
                      onClick={() => setSwapIsSuccessfull(true)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )

              : (
                <div className="mx-auto flex flex-col space-y-2 mt-16">
                  <h2 className="max-w-[540px] mx-auto font-semibold text-2xl md:text-4xl text-center mb-3">
                    Swap Positions Seamlessly, Maximize reward.
                  </h2>
                  <TabsList className="w-fit mr-auto mb-2">
                    <TabsTrigger value="ILMS">ILMS</TabsTrigger>
                    <TabsTrigger value="Lending">Lending</TabsTrigger>
                  </TabsList>
                  <div
                    className="w-full bg-white pt-6 pb-14 px-8 rounded-xl border-primary space-y-4 flex flex-col relative">
                    {
                      swapOngoing && (
                        <div className="absolute inset-0 bg-white z-50 rounded-xl pt-6 pb-14 px-8">
                          <h3 className="text-xl font-medium">Swap Processing</h3>
                          <p>Your swap request is being completed.</p>
                          {
                            SWAP_STEPS.map((step, index, arr) => (
                              <div key={step} className="relative">
                                <div className="flex items-center space-x-2 my-8">
                                  <div
                                    className={`w-10 h-10 rounded-full border-4 border-primary-900 grid place-content-center ${steps.includes(index) && 'bg-primary-900'}`}>{
                                    (steps.includes(index) && <Check className="text-white" />)}</div>
                                  <span>{step}</span>
                                </div>
                                {index !== (arr.length - 1) && <div
                                  className={`left-5 absolute -bottom-8 z-10 ${!steps.includes(index) && 'border-dashed'} border border-primary-900 h-8`} />}
                              </div>
                            ))
                          }
                          <button
                            className="mx-auto px-16 rounded-xl py-4 bg-primary-300 text-primary-900 w-10/12 block">Cancel
                          </button>
                        </div>
                      )}
                    <div className="flex justify-between items-center w-full">
                      <h3 className="text-xl font-medium">Swap</h3>
                      <Popover>
                        <PopoverTrigger>
                          <Settings />
                        </PopoverTrigger>

                        <PopoverContent
                          align="start"
                          className="relative top-[-20px] xl:top-[-3px] mx-[22px] md:ml-20 p-6 w-80 border-primary rounded-[10px] shadow-xl xl:shadow-none"
                          sideOffset={-48}
                        >
                          <div className="flex flex-col space-y-6">
                            <div className="flex flex-col space-y-3.5">
                              <div className="flex justify-between">
                                <span className="text-xl font-bold">Max slippage</span>
                                <PopoverCloser>
                                  <CircleX className="w-7 md:w-6" />
                                </PopoverCloser>
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
                      <div
                        className="flex flex-col rounded-xl bg-primary-100 border-primary px-4 py-5 w-full space-y-1.5">
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
                            className="w-1/2 rounded-[10px]"
                          />
                          <div
                            className="overflow-hidden border-primary px-2 md:px-4 text-2xl w-1/2 rounded-[10px] py-2 bg-white flex items-center gap-x-2 md:gap-x-4">
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
                                className="w-10/12 px-1 border-primary-900 md:px-2 ring-primary-240 text-left border-[0.2px] rounded-full py-1 placeholder:font-bold text-sm placeholder:text-xl mr-4">
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
                          <span className="underline cursor-pointer underline-offset-2 text-primary-900"
                                onClick={() => setFromAmount(fromToken?.balance?.formatted!)}>
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
                          {(isLoading) ? (
                            <span className="w-1/2">Loading</span>
                          ) : (
                            <Input
                              value={toAmount}
                              onChange={(e) => setToAmount(e.target.value)}
                              className="w-1/2 rounded-[10px]"
                              disabled
                            />
                          )}

                          <div
                            className="overflow-hidden border-primary px-2 md:px-4 text-2xl w-1/2 rounded-[10px] py-2 bg-white flex items-center gap-x-2 md:gap-x-4">
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
                                className="w-10/12 px-1 border-primary-900 md:px-2 ring-primary-240 text-left border-[0.2px] rounded-full py-1 placeholder:font-bold text-sm placeholder:text-xl">
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
                        </div>
                      </div>

                      {(isLoading) ? (
                        <span>Loading...</span>
                      ) : (
                        route && (
                          <span className="text-grey-900">
                    1 {route?.fromToken?.coinKey} ={' '}
                            {(
                              parseFloat(route?.fromToken?.priceUSD) /
                              parseFloat(route?.toToken?.priceUSD)
                            ).toFixed(3)}{' '}
                            {route?.toToken.coinKey}
                  </span>
                        )
                      )}

                      <div className="pt-2">
                        {(isLoading) ? (
                          <span>Loading...</span>
                        ) : route ? currentTab === 'ILMS' ? (
                          <ILMSwapHandler
                            inTokenAmount={fromAmount}
                            account={account}
                            baseToken={baseToken}
                            route={route}
                            slippage={slippage}
                            fromToken={fromToken!}
                            toToken={toToken!}
                          />
                        ) : (
                          <LendingSwapHandler
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
              )}
          </div>
        </Tabs>
      </Container>
    </SwapContext.Provider>
  )
    ;
};

export default Page;
