import { Address } from 'viem';
import { useAccount } from 'wagmi';
import { useFetchSimulateWithdraw } from '../queries/useFetchSimulateWithdraw';
import { useFetchStrategyAsset } from '../metadataQueries/useFetchStrategyAsset';
import { ONE_ETHER, walletBalanceDecimalsOptions } from '@src/lib/meta';
import { Displayable, FetchBigInt, FetchData, formatFetchBigIntToViewBigInt } from '@src/lib/types/helpers';
import { useToken } from '@src/lib/queries/useToken';
import { mergeQueryStates } from '@src/lib/formatters/mergeQueryStates';
import { fFetchBigIntStructured, fUsdValueStructured } from '@src/lib/formatters/getFetchBigIntFormatted';
import { useFetchAssetPrice } from '@src/lib/queries/useFetchViewAssetPrice';
import { ViewBigInt } from '@meta/Displayable';

const cAssetsToReceive = (assetsValue?: bigint) => {
  if (assetsValue == null) return undefined;

  return (assetsValue * 999n) / 1000n;
};

const cAssetsToReceiveUsd = (assetsToReceiveValue?: bigint, underlyingAssetPriceValue?: bigint) => {
  if (assetsToReceiveValue == null || underlyingAssetPriceValue == null) return undefined;

  return (assetsToReceiveValue * underlyingAssetPriceValue) / ONE_ETHER;
};

interface PreviewWithdraw {
  assetsToReceive?: FetchBigInt;
  assetsToReceiveInUsd?: FetchBigInt;
}

export const useFetchWithdrawSharesToReceive = (amount: string, subStrategy?: Address): FetchData<PreviewWithdraw> => {
  const account = useAccount();

  const { data: underlyingAsset, ...strategyRest } = useFetchStrategyAsset(subStrategy);

  const {
    data: { symbol: underlyingAssetSymbol, decimals: underlyingAssetDecimals },
    ...underlyingSymbolRest
  } = useToken(underlyingAsset);

  const { data: assets, ...simulateRest } = useFetchSimulateWithdraw(account.address as Address, amount, subStrategy);

  const { data: underlyingAssetPrice, ...underlyingAssetRest } = useFetchAssetPrice({
    asset: underlyingAsset,
  });

  const assetsToReceive = cAssetsToReceive(assets?.bigIntValue);
  const assetsToReceiveInUsd = cAssetsToReceiveUsd(assetsToReceive, underlyingAssetPrice.bigIntValue);

  return {
    ...mergeQueryStates([underlyingSymbolRest, simulateRest, strategyRest, underlyingAssetRest]),
    data: {
      assetsToReceive: fFetchBigIntStructured(assetsToReceive, underlyingAssetDecimals, underlyingAssetSymbol),
      assetsToReceiveInUsd: fUsdValueStructured(assetsToReceiveInUsd),
    },
  };
};

export interface ViewPreviewWithdraw {
  assetsToReceive: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
}

export const useFetchViewWithdrawSharesToReceive = (
  amount: string,
  subStrategy?: Address,
): Displayable<ViewPreviewWithdraw> => {
  const {
    data: { assetsToReceive, assetsToReceiveInUsd },
    ...rest
  } = useFetchWithdrawSharesToReceive(amount, subStrategy);

  return {
    ...rest,
    data: {
      assetsToReceive: {
        tokenAmount: formatFetchBigIntToViewBigInt(assetsToReceive, walletBalanceDecimalsOptions),
        dollarAmount: formatFetchBigIntToViewBigInt(assetsToReceiveInUsd, walletBalanceDecimalsOptions),
      },
    },
  };
};
