/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import ilmwstETHLogo from '@assets/tokens/ilmEthUsdc.svg';
import { useFullTokenData } from '@src/lib/queries/useFullTokenData';
import { Address } from 'viem';
import { FC } from 'react';
import Image from 'next/image';

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

interface Props {
  address: Address;
}


export const IlmNameRow: FC<Props> = ({ address }) => {
  const {
    data: { logo, name, subTitle, isGauntletOptimized },
  } = useFullTokenData(address);
  return (
    <div className="flex items-center gap-x-2 min-w-[140px]">
      <Image src={logo!} className="w-[26px]" alt="ilmwstETHLogo" />
      <span className="text-black font-normal">{name}</span>
    </div>
  );
};