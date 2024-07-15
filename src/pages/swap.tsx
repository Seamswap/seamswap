import type { NextPage } from 'next';
import * as React from 'react';
import { useContext, useEffect } from 'react';
import Input from '@src/components/ui/Input';
import SwapIcon from '@src/components/icons/SwapIcon.icon';
import Settings from '@src/components/icons/Settings.icon';
import { LoginProviderContext } from '@src/components/providers/LoginProvider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@src/components/ui/Select';
import { Popover, PopoverContent, PopoverTrigger } from '@src/components/ui/Popover';
import { CircleX } from 'lucide-react';
import { Button } from '@src/components/ui/Button';
import { getRoutes, getToken, Route, RoutesRequest, Token } from '@lifi/sdk';
import { truncateWalletAddress } from '@src/lib/utils';
import { useDebounceValue } from 'usehooks-ts';

const Page: NextPage = () => {
  const { openLoginModal, account } = useContext(LoginProviderContext);
  const [slippage, setSlippage] = React.useState<string>('0.1');
  const [route, setRoute] = React.useState<Route | null>(null);
  const [baseToken, setBaseToken] = React.useState<Token | null>(null);
  const [fromAmount, setFromAmount] = React.useState<string>('');
  const [fromToken, setFromToken] = React.useState<Token | null>(null);
  const [toAmount, setToAmount] = React.useState<string>('');
  const [toToken, setToToken] = React.useState<Token | null>(null);
  const [debouncedValue, setValue] = useDebounceValue(fromAmount, 500);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const TOKENS = [{
    label: 'WETH/ETH',
    value: '0x4200000000000000000000000000000000000006',
  }, {
    label: 'wstETH/ETH',
    value: '0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452',
  }];

  async function handleSwap() {
    if ((!fromToken || !toToken) || (parseFloat(debouncedValue) <= 0)) return;
    setIsLoading(true);
    try {
      const routesRequest: RoutesRequest = {
        fromChainId: 8453, // Arbitrum
        toChainId: 8453, // Optimism
        fromTokenAddress: fromToken?.address, // USDC on Arbitrum
        toTokenAddress: toToken?.address, // DAI on Optimism
        fromAmount: (parseFloat(debouncedValue) * Math.pow(10, fromToken.decimals)).toString(), // 10 USDC,
        options: { slippage: parseFloat(slippage) },
      };

      const result = await getRoutes(routesRequest);
      const routes = result.routes;
      const token = await getToken(8453, '0x0000000000000000000000000000000000000000');
      setBaseToken(token);
      setRoute(routes[0]);
      setToAmount(parseFloat(routes[0].toAmount) / Math.pow(10, routes[0].toToken.decimals) + '');
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (!Number.isNaN(debouncedValue)) {
      handleSwap();
    }
  }, [debouncedValue]);
  const handlePositionSwap = () => {
    const from = fromToken;
    const to = toToken;
    const fromAm = fromAmount;
    const toAm = toAmount;
    setFromToken(to);
    setToToken(from);
    setFromAmount(toAm);
    setToAmount(fromAm);
  };
  const handleFromTokenChange = async (address: string) => {
    const token = await getToken(8453, address);
    setFromToken(token);
  };
  const handleToTokenChange = async (address: string) => {
    const token = await getToken(8453, address);
    setToToken(token);
  };
  return (
    <div className="grid place-content-center min-h-[80vh]">
      <div className="w-3/4 mx-auto flex flex-col space-y-2">
        <h2 className="font-semibold text-4xl text-center">Swap Positions Seamlessly,
          Maximize reward.</h2>
        <div className="w-full bg-white pt-6 pb-14 px-8 rounded-xl border-primary space-y-4 flex flex-col">
          <div className="flex justify-between items-center w-full">
            <h3 className="text-xl font-medium">Swap</h3>
            <Popover>
              <PopoverTrigger><Settings /></PopoverTrigger>
              <PopoverContent align="start" className="ml-24 p-6 w-80 rounded-xl" sideOffset={-48}>
                <div className="flex flex-col space-y-6">
                  <div className="flex flex-col space-y-3.5">
                    <div className="flex justify-between">
                      <span className="text-xl font-bold">Max slippage</span>
                      <CircleX className="w-6 h-6 text-[#878787]" />
                    </div>
                    <div className="space-x-4">
                      <Button variant="default">Auto</Button>
                      <Button variant="outline" className="">Custom</Button>
                    </div>
                  </div>
                  <div className="relative">
                    <Input className="w-full pr-10" placeholder="0.1" value={slippage}
                           onChange={(e) => setSlippage(e.target.value)} />
                    <span className="absolute right-4 inset-y-0 flex items-center">%</span>
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
              <span>Sell</span>
              <div className={'flex w-full gap-4'}>
                <Input
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="w-1/2"
                />
                <div className="border-primary px-4 text-2xl w-1/2 rounded-xl py-2 bg-white flex space-x-4">
                  {fromToken && <img
                    src={fromToken.logoURI}
                    width={200}
                    height={200}
                    className="w-10 h-auto rounded-full" />}
                  <Select value={fromToken?.address} onValueChange={handleFromTokenChange}>
                    <SelectTrigger
                      className="w-10/12 border-primary-900 px-4 border-[0.2px] rounded-full py-1 placeholder:font-bold text-base placeholder:text-xl mr-4">
                      <SelectValue placeholder="----" />
                    </SelectTrigger>
                    <SelectContent>
                      {TOKENS.filter(val => val.value !== toToken?.address).map(token => (
                        <SelectItem key={token.value} value={token.value}>{token.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-grey-900">${fromToken?.priceUSD}</span>
                <span className="underline underline-offset-2 text-primary-900">Max</span>
              </div>
            </div>
            <div
              className="flex flex-col rounded-xl bg-primary-100 border-primary px-4 py-5 w-full space-y-1.5 relative">
              <div
                className="w-fit mx-auto p-1 border-primary absolute z-10 inset-x-0 mx-auto -top-5 bg-white rounded-sm cursor-pointer"
                onClick={handlePositionSwap}
              >
                <SwapIcon className="w-6 h-6" />
              </div>
              <span>Buy</span>
              <div className={'flex w-full gap-4'}>
                {isLoading ? <span className="w-1/2">Loading</span> : <Input
                  value={toAmount}
                  onChange={(e) => setToAmount(e.target.value)}
                  className="w-1/2"
                  disabled
                />}
                <div className="border-primary px-4 text-2xl w-1/2 rounded-xl py-2 bg-white flex space-x-4">
                  {toToken && <img
                    src={toToken.logoURI}
                    width={200}
                    height={200}
                    className="w-10 h-auto rounded-full"
                  />
                  }
                  <Select value={toToken?.address} onValueChange={handleToTokenChange}>
                    <SelectTrigger
                      className="w-10/12 border-primary-900 px-4 border-[0.2px] rounded-full py-1 placeholder:font-bold text-base placeholder:text-xl">
                      <SelectValue placeholder="----" />
                    </SelectTrigger>
                    <SelectContent>
                      {TOKENS.filter(val => val.value !== fromToken?.address).map(token => (
                        <SelectItem key={token.value} value={token.value}>{token.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-grey-900">${toToken?.priceUSD}</span>
                <span className="underline underline-offset-2 text-primary-900">Max</span>
              </div>
            </div>
            {isLoading ? <span>Loading...</span> : (route) && (
              <span
                className="text-grey-900">1 {route.fromToken?.coinKey} = {(parseFloat(route.fromToken?.priceUSD) / parseFloat(route.toToken?.priceUSD)).toFixed(3)} {route.toToken.coinKey}</span>)}
            {isLoading ? <span>Loading...</span> : route && (
              <div className="bg-primary-150 border-primary p-3 rounded-xl space-y-2">
                <div className="flex justify-between">
                  <span>Est. asset received</span>
                  <span>{parseFloat(route.toAmount) / Math.pow(10, route.toToken.decimals)} {route.toToken.coinKey}</span>
                </div>
                <div className="flex justify-between">
                  <span>Min. asset received</span>
                  <span>{parseFloat(route.toAmountMin) / Math.pow(10, route.toToken.decimals)} {route.toToken.coinKey}</span>
                </div>
                <div className="flex justify-between">
                  <span>Network fee</span>
                  <span>{(parseFloat(route.gasCostUSD ?? '0') / parseFloat(baseToken?.priceUSD ?? '0')).toFixed(16)} {baseToken?.coinKey}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Routing path</span>
                  <div className="flex space-x-1.5 items-center">
                    <img
                      src={route.steps[0]?.toolDetails.logoURI}
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
                    <span className="text-primary-200">{truncateWalletAddress(account?.address || '')}</span>
                    <Button variant="link" className="px-0">Add another wallet</Button>
                  </div>
                </div>
              </div>)}
            {account ?
              <button onClick={handleSwap}
                      className="bg-primary-900 px-5 py-3.5 rounded-md text-white w-full rounded-xl">Swap</button> :
              <button className="bg-primary-900 px-5 py-3.5 rounded-md text-white w-full rounded-xl"
                      onClick={openLoginModal}>Connect
                wallet</button>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
