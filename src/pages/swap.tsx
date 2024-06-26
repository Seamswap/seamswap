import type { NextPage } from 'next';
import * as React from 'react';
import Input from '@src/components/ui/Input';

const Page: NextPage = () => {
  return (
    <div className="grid place-content-center min-h-[80vh]">
      <div className="w-3/4 mx-auto flex flex-col space-y-2">
        <h2 className="font-semibold text-4xl text-center">Swap Positions Seamlessly,
          Maximize reward.</h2>
        <div className="w-full bg-white pt-6 pb-14 px-8 rounded-xl border-primary space-y-2 flex flex-col">
          <div className="flex justify-between align-center w-full">
            <h3 className="text-xl font-medium">Swap</h3>
            <span>setting icon</span>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col rounded-xl bg-primary-100 border-primary px-4 py-5 w-full space-y-1.5">
              <span>Sell</span>
              <div className={'flex w-full gap-4'}>
                <Input
                />
                <div className="border-primary pl-4 text-2xl w-1/2 rounded-xl py-2 bg-white">
                  <select className="w-10/12 border-primary-900 px-4 border-[0.2px] rounded-full py-1">
                    <option>----</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-grey-900">$0</span>
                <span className="underline underline-offset-2 text-primary-900">Max</span>
              </div>
            </div>
            <div
              className="flex flex-col rounded-xl bg-primary-100 border-primary px-4 py-5 w-full space-y-1.5 relative">
              <div className="w-fit mx-auto p-1 border-primary absolute z-10 inset-x-0 mx-auto -top-5 bg-white">
                <span>swap icon</span>
              </div>
              <span>Sell</span>
              <div className={'flex w-full gap-4'}>
                <Input
                />
                <div className="border-primary pl-4 text-2xl w-1/2 rounded-xl py-2 bg-white">
                  <select className='w-10/12 border-primary-900 px-4 border-[0.2px] rounded-full py-1'>
                    <option>----</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-grey-900">$0</span>
                <span className="underline underline-offset-2 text-primary-900">Max</span>
              </div>
            </div>
            <span className="text-grey-900">$0</span>
            <button className='bg-primary-900 px-5 py-3.5 rounded-md text-white w-full rounded-xl'>Connect wallet</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
