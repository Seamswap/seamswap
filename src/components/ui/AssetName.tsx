import React, { FC } from 'react';
import { useFullTokenData } from '@src/lib/queries/useFullTokenData';
import { Address } from 'viem';

interface Props {
  address: Address;
}

const AssetName: FC<Props> = ({ address }) => {
  const {
    data: { logo, name, subTitle, isGauntletOptimized },
  } = useFullTokenData(address);
  return (
    <div className="px-1 flex">


    </div>
  );
};

export default AssetName;