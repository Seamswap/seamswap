import React from "react";
import { Address } from "viem";
import { useFetchViewDetailEquity } from '@src/lib/queries/useFetchViewEquity';
import { useFetchViewDetailTotalSupplied } from '@src/lib/queries/useFetchViewDetailTotalSupplied';

interface AssetTvlProps {
  address?: Address;
  subStrategy?: Address;
  isStrategy?: boolean;
}

const StrategyTvl: React.FC<{ subStrategy?: Address }> = ({ subStrategy, ...rest }) => {
  const {
    data: { dollarAmount },
    isLoading
  } = useFetchViewDetailEquity(subStrategy);

  return (isLoading ? <div>Loading...</div> : <div className={'flex min-w-[70px]'}>
    <p>$</p>
    <p>
      {dollarAmount?.viewValue}
    </p>
  </div>);
};

const LendingTvl: React.FC<{ asset?: Address }> = ({ asset, ...rest }) => {
  const {
    data: {
      totalSupplied: { dollarAmount },
    },
    isLoading
  } = useFetchViewDetailTotalSupplied(asset);

  return (isLoading ? <div>Loading...</div> : <div className={'flex min-w-[70px]'}>
    <p>$</p>
    <p>
      {dollarAmount.viewValue}
    </p>
  </div>);
};

export const AssetTvl: React.FC<AssetTvlProps> = ({ address, subStrategy, isStrategy, ...rest }) => {
  console.log({ address, subStrategy, isStrategy });

  return isStrategy ? <StrategyTvl subStrategy={subStrategy} {...rest} /> : <LendingTvl asset={address} {...rest} />;
};
