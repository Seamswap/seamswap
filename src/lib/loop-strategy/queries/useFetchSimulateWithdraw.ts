import { Address } from "viem";

import { useFetchStrategyAsset } from "../metadataQueries/useFetchStrategyAsset";
import { useQuery } from "@tanstack/react-query";

import { DebouncedDelayConfig } from "../config/DebouncedDelayConfig";
import { useToken } from '@src/lib/queries/useToken';
import { mergeQueryStates } from '@src/lib/formatters/mergeQueryStates';
import { fFetchBigIntStructured } from '@src/lib/formatters/getFetchBigIntFormatted';
import { simulateWithdraw } from '@src/lib/utils/bundles';

export const useFetchSimulateWithdraw = (account: Address, amount: string, strategy?: Address) => {
  const { data: underlyingAsset, ...strategyAssetRest } = useFetchStrategyAsset(strategy);
  const {
    data: { decimals, symbol },
    ...tokenDataRest
  } = useToken(underlyingAsset);

  const { data, ...rest } = useQuery({
    queryKey: ["simulateWithdraw", strategy, amount],
    queryFn: () => simulateWithdraw(account, strategy!, amount),
    ...DebouncedDelayConfig,
    enabled: !!strategy,
  });

  return {
    ...mergeQueryStates([strategyAssetRest, tokenDataRest, rest]),
    data: fFetchBigIntStructured(data?.data?.assetsToReceive, decimals, symbol),
  };
};
