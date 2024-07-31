import { Address } from 'viem';
import { useFetchSimulateDeposit } from '../queries/useFetchSimulateDeposit';
import { useAccount } from 'wagmi';

import { useFetchStrategyAsset } from '../metadataQueries/useFetchStrategyAsset';
import { FetchBigInt, FetchData, formatFetchBigIntToViewBigInt } from '@src/lib/types/helpers';
import { walletBalanceDecimalsOptions } from '@src/lib/meta';
import { Displayable, ViewBigInt } from '@meta/Displayable';
import { mergeQueryStates } from '@src/lib/formatters/mergeQueryStates';
import { fFetchBigIntStructured, fUsdValueStructured } from '@src/lib/formatters/getFetchBigIntFormatted';
import { useToken } from '@src/lib/queries/useToken';
import { cValueInUsd } from '@src/lib/utils/cValueInUsd';
import { useFetchAssetPrice } from '@src/lib/queries/useFetchViewAssetPrice';


interface SharesToReceiveData {
  sharesToReceive?: FetchBigInt;
  sharesToReceiveInUsd?: FetchBigInt;
}

export const useFetchDepositSharesToReceive = (
  amount: string,
  subStrategy?: Address,
): FetchData<SharesToReceiveData> => {
  const account = useAccount();

  const { data: underlyingAsset, ...configRest } = useFetchStrategyAsset(subStrategy);
  const {
    data: { symbol: underlyingAssetSymbol, decimals: strategyDecimals },
    ...underlyingAssetRest
  } = useToken(underlyingAsset);
  const { data: shares, ...sharesRest } = useFetchSimulateDeposit(account.address as Address, amount, subStrategy);
  const { data: sharePrice, ...sharePriceRest } = useFetchAssetPrice({
    asset: subStrategy,
  });

  const sharesToReceive = shares?.bigIntValue === undefined ? undefined : (shares.bigIntValue * 999n) / 1000n;
  const sharesToReceiveInUsd =
    cValueInUsd(sharesToReceive, sharePrice?.bigIntValue, shares.decimals);

  return {
    ...mergeQueryStates([sharesRest, sharePriceRest, configRest, underlyingAssetRest]),
    data: {
      sharesToReceive: fFetchBigIntStructured(sharesToReceive, strategyDecimals, underlyingAssetSymbol),
      sharesToReceiveInUsd: fUsdValueStructured(sharesToReceiveInUsd),
    },
  };
};

export interface ViewSharesToReceive {
  sharesToReceive?: ViewBigInt;
  sharesToReceiveInUsd?: ViewBigInt;
}

export const useFetchViewDepositSharesToReceive = (
  amount: string,
  subStrategy?: Address,
): Displayable<ViewSharesToReceive> => {
  const {
    data: { sharesToReceive, sharesToReceiveInUsd },
    ...rest
  } = useFetchDepositSharesToReceive(amount, subStrategy);

  return {
    ...rest,
    data: {
      sharesToReceive: formatFetchBigIntToViewBigInt(sharesToReceive, walletBalanceDecimalsOptions),
      sharesToReceiveInUsd: formatFetchBigIntToViewBigInt(sharesToReceiveInUsd, walletBalanceDecimalsOptions),
    },
  };
};
