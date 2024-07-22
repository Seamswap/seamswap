import { Address, erc20Abi } from "viem";

import { useAccount } from "wagmi";
import { DecimalsOptions, Displayable, FetchBigInt, FetchData, formatFetchBigIntToViewBigInt, ViewAssetBalance } from "../types/helpers";
import { mergeQueryStates } from "../formatters/mergeQueryStates";
import { useToken } from "./useToken";
import { useSeamlessContractRead } from "../shared/useSeamlessContractRead";

export const useFetchAssetBalance = (asset?: Address): FetchData<FetchBigInt | undefined> => {
  const account = useAccount();

  const { data: tokenData, ...restToken } = useToken(asset);

  const { data: balance, ...restBalance } = useSeamlessContractRead({
    address: asset,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [account.address as Address],
    query: {
      enabled: !!account.address && !!asset,
    }
  });

  return {
    ...mergeQueryStates([restToken, restBalance]),
    data: {
      bigIntValue: balance,
      symbol: tokenData?.symbol,
      decimals: tokenData?.decimals,
    },
  };
};

export const useFetchViewAssetBalance = (
  asset?: Address,
  decimalsOptions?: Partial<DecimalsOptions>
): Displayable<ViewAssetBalance> => {
  const { data: balance, ...rest } = useFetchAssetBalance(asset);

  return {
    ...rest,
    data: {
      balance: formatFetchBigIntToViewBigInt(balance, decimalsOptions),
    },
  };
};
