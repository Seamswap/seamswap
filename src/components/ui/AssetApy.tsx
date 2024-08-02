import React from 'react';
import { Address } from 'viem';
import { useFetchViewSupplyApy } from '@src/lib/queries/useFetchViewSupplyApy';
import { useFetchViewMaxStrategyApy } from '@src/lib/queries/useFetchViewMaxStrategyApy';


interface AssetApyProps {
  address?: Address;
  isStrategy: boolean;
  showWarning?: boolean;
  multiplier?: string;
}

interface StrategyApyProps {
  strategy?: Address;
  showWarning?: boolean;
}

export const MaxStrategyApy: React.FC<StrategyApyProps> = ({ strategy, showWarning = true, ...rest }) => {
  const { data: apy, isLoading } = useFetchViewMaxStrategyApy(strategy);

  return (isLoading ? <div>Loading...</div> : <div className={'flex text-[#00B25D] min-w-[70px]'}>
    <p>
      {apy?.value === 0 ? '~' : apy?.viewValue}
    </p>
    <p>{apy?.symbol}</p>
  </div>)
    ;
};

interface LandingApyProps {
  asset?: Address;
}

export const LendingApy: React.FC<LandingApyProps> = ({ asset, ...rest }) => {
  const {
    data: { apy },
    isLoading,
  } = useFetchViewSupplyApy(asset);
  return (isLoading ? <div>Loading...</div> :
    <div className={`flex min-w-[70px] ${parseFloat(apy?.viewValue!) > 0 && 'text-[#00B25D]'}`}>
      <p>
        {apy?.value === 0 ? '~' : apy?.viewValue}
      </p>
      <p>{apy?.symbol}</p>
    </div>);
};

export const AssetApy: React.FC<AssetApyProps & { subStrategy?: Address }> = ({
                                                                                address,
                                                                                isStrategy,
                                                                                subStrategy,
                                                                                multiplier,
                                                                                ...rest
                                                                              }) => {
  if (multiplier && isStrategy) {
    return (<div className="text-[#00B25D] min-w-[70px]">

      <p>
        {multiplier}
      </p>
    </div>);
  }
  ;

  if (isStrategy) {
    return <MaxStrategyApy strategy={address} {...rest} />;
  }
  return <LendingApy asset={address} {...rest} />;
};
