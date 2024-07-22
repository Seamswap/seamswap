import { Address, erc20Abi } from "viem";
import { FetchData } from "../types/helpers";
import { mergeQueryStates } from "../formatters/mergeQueryStates";
import { metadataQueryConfig } from "../utils";
import { useSeamlessContractRead } from "../shared/useSeamlessContractRead";
export interface Token {
  symbol?: string;
  decimals?: number;
}

// todo reconsider optional param token ticket #218
export const useToken = (asset?: Address): FetchData<Token> => {
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

  return {
    ...mergeQueryStates([decimalRest, symbolRest]),
    data: {
      symbol,
      decimals,
    },
  };
};
