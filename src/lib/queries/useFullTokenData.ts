import { Address, erc20Abi } from "viem";
import { assetsConfig, strategiesConfig } from '@src/lib/config/config';
import { AssetBaseConfig } from '@meta/configTypes';
import { getStrategyBySubStrategyAddress } from '@src/lib/utils/configUtils';
import { FetchData } from '@src/lib/types/fetch';
import { useSeamlessContractRead } from '@src/lib/shared/useSeamlessContractRead';
import { metadataQueryConfig } from '@src/lib/utils';
import { mergeQueryStates } from '@src/lib/formatters/mergeQueryStates';

export interface FullAssetData extends Omit<AssetBaseConfig, "address"> {
  decimals?: number;
}

// todo rename hook
export const useFullTokenData = (asset?: Address | undefined): FetchData<FullAssetData> => {
  const config = asset
    ? assetsConfig[asset] || strategiesConfig[asset] || getStrategyBySubStrategyAddress(asset)
    : undefined;
  const { data: decimals, ...decimalRest } = useSeamlessContractRead({
    address: asset,
    abi: erc20Abi,
    functionName: "decimals",
    query: { ...metadataQueryConfig, enabled: !!asset },
  });

  const { data: symbol, ...symbolRest } = useSeamlessContractRead({
    address: asset,
    abi: erc20Abi,
    functionName: "symbol",
    query: { ...metadataQueryConfig, enabled: !!asset },
  });

  const { data: name, ...nameRest } = useSeamlessContractRead({
    address: asset,
    abi: erc20Abi,
    functionName: "name",
    query: { ...metadataQueryConfig, enabled: !!asset },
  });

  return {
    ...mergeQueryStates([decimalRest, symbolRest, nameRest]),
    data: {
      symbol,
      name,
      decimals,
      ...config,
    },
  };
};
