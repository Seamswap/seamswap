import { Address } from "viem";
import { useFetchStrategyAsset } from "../metadataQueries/useFetchStrategyAsset";
import { useQuery } from "@tanstack/react-query";
import { simulateDeposit } from '@src/lib/utils/bundles';
import { FIVE_SECONDS_IN_MS } from '@src/lib/utils/queryConfig';
import { mergeQueryStates } from '@src/lib/formatters/mergeQueryStates';
import { useToken } from '@src/lib/queries/useToken';

export const useFetchSimulateDeposit = (account: Address, amount: string, subStrategy?: Address) => {
  const {
    data: { symbol, decimals },
    ...tokenRest
  } = useToken(subStrategy);

  const { data: underlyingAsset, ...underlyingRest } = useFetchStrategyAsset(subStrategy);

  const enabled = !!subStrategy && !!account && !!underlyingAsset && Number(amount) > 0;
  const { data, ...rest } = useQuery({
    queryKey: ["simulateDeposit", account, subStrategy, underlyingAsset, amount],
    queryFn: () => simulateDeposit(account, subStrategy!, underlyingAsset!, amount),
    staleTime: FIVE_SECONDS_IN_MS,
    retry: true,
    enabled,
  });

  return {
    ...mergeQueryStates([tokenRest, underlyingRest, enabled ? rest : {
      ...rest,
      // todo: solve this differently, review displayvalue component, and render loading state in different way.
      isFetched: true,
    }]),
    data: {
      bigIntValue: data?.sharesToReceive,
      decimals,
      symbol,
    },
  };
};
