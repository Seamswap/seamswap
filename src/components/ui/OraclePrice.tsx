import { useFetchViewAssetPrice } from '@src/lib/queries/useFetchViewAssetPrice';
import { getIsStrategy } from '@src/lib/utils/configUtils';
import { StrategyState } from '@meta/StateTypes';
import React, { FC } from 'react';
import { Explorer } from '@src/pages/explorer';

const OraclePrice: FC<Explorer> = ({ address, ...assetState }) => {
  const { data: oraclePrice, isLoading } = useFetchViewAssetPrice({
    asset: getIsStrategy(address) ? assetState?.underlyingAsset?.address : address,
  });

  return (isLoading ? <div>Loading...</div> : <div className={'flex min-w-[70px]'}>
    <p>$</p>
    <p>
      {oraclePrice?.viewValue}
    </p>
  </div>);
};
export default OraclePrice;