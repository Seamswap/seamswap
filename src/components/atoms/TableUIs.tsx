/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import ilmwstETHLogo from '@assets/tokens/ilmEthUsdc.svg';

export const TableButton = ({
  text,
  ...props
}: { text: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className="py-2 px-3 bg-[#ccfff8] rounded-[10px] inline-flex text-[#00b7a1] text-xs font-medium"
    {...props}
  >
    {text}
  </button>
);

export const IlmNameRow = ({ value }: { value: string }) => {
  return (
    <div className="flex items-center gap-x-2 min-w-[140px]">
      <img src={ilmwstETHLogo.src} className="w-[26px]" alt="ilmwstETHLogo" />
      <span className="text-black font-normal">{value}</span>
    </div>
  );
};