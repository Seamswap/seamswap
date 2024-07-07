import type { NextPage } from 'next';
import * as React from 'react';
import { useContext } from 'react';
import Input from '@src/components/ui/Input';
import SwapIcon from '@src/components/icons/SwapIcon.icon';
import Settings from '@src/components/icons/Settings.icon';
import { LoginProviderContext } from '@src/components/providers/LoginProvider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@src/components/ui/Select';
import { Popover, PopoverContent, PopoverTrigger } from '@src/components/ui/Popover';
import { CircleX } from 'lucide-react';
import { Button } from '@src/components/ui/Button';

const Page: NextPage = () => {
  const { openLoginModal, account } = useContext(LoginProviderContext);

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
                    <Input className="w-full pr-10" placeholder="0.1" />
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
                />
                <div className="border-primary pl-4 text-2xl w-1/2 rounded-xl py-2 bg-white">
                  <Select>
                    <SelectTrigger
                      className="w-10/12 border-primary-900 px-4 border-[0.2px] rounded-full py-1 font-bold text-xl">
                      <SelectValue placeholder="----" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-grey-900">$0</span>
                <span className="underline underline-offset-2 text-primary-900">Max</span>
              </div>
            </div>
            <div
              className="flex flex-col rounded-xl bg-primary-100 border-primary px-4 py-5 w-full space-y-1.5 relative">
              <div
                className="w-fit mx-auto p-1 border-primary absolute z-10 inset-x-0 mx-auto -top-5 bg-white rounded-sm">
                <SwapIcon className="w-6 h-6" />
              </div>
              <span>Sell</span>
              <div className={'flex w-full gap-4'}>
                <Input
                />
                <div className="border-primary pl-4 text-2xl w-1/2 rounded-xl py-2 bg-white">
                  <Select>
                    <SelectTrigger
                      className="w-10/12 border-primary-900 px-4 border-[0.2px] rounded-full py-1 font-bold text-xl">
                      <SelectValue placeholder="----" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-grey-900">$0</span>
                <span className="underline underline-offset-2 text-primary-900">Max</span>
              </div>
            </div>
            <span className="text-grey-900">$0</span>
            {account ?
              <button className="bg-primary-900 px-5 py-3.5 rounded-md text-white w-full rounded-xl">Swap</button> :
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
