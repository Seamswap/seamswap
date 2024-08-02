import { Address, parseUnits } from "viem";
import { FetchBigInt, FetchData } from '@src/lib/types/fetch';
import { useToken } from '@src/lib/queries/useToken';
import { useSeamlessContractRead } from '@src/lib/shared/useSeamlessContractRead';
import { protocolDataProviderAbi, protocolDataProviderAddress } from '@src/lib/config/contract';
import { mergeQueryStates } from '@src/lib/formatters/mergeQueryStates';
import { formatFetchBigIntToViewBigInt } from '@src/lib/types/helpers';
import { Displayable, ViewBigInt } from '@meta/Displayable';
interface AssetCaps {
  supplyCap: FetchBigInt;
  borrowCap: FetchBigInt;
}
export interface ViewReserveCaps {
  supplyCap: ViewBigInt;
  borrowCap: ViewBigInt;
}

export const useFetchReserveCaps = (asset?: Address): FetchData<AssetCaps> => {
  const {
    data: { decimals },
    ...tokenRest
  } = useToken(asset);

  const { data, ...rest } = useSeamlessContractRead({
    address: protocolDataProviderAddress,
    abi: protocolDataProviderAbi,
    functionName: "getReserveCaps",
    args: [asset!],
    query: {
      enabled: !!asset
    }
  });

  return {
    ...mergeQueryStates([tokenRest, rest]),
    data: {
      supplyCap: {
        bigIntValue: parseUnits(data?.[1].toString() || "0", decimals || 0),
        decimals,
        symbol: "",
      },
      borrowCap: {
        bigIntValue: parseUnits(data?.[0].toString() || "0", decimals || 0),
        decimals,
        symbol: "",
      },
    },
  };
};

export const useFetchViewReserveCaps = (asset: Address): Displayable<ViewReserveCaps> => {
  const {
    data: { supplyCap, borrowCap },
    ...rest
  } = useFetchReserveCaps(asset);

  return {
    ...rest,
    data: {
      supplyCap: formatFetchBigIntToViewBigInt(supplyCap),
      borrowCap: formatFetchBigIntToViewBigInt(borrowCap),
    },
  };
};
