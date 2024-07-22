import { QueryKey, UseQueryResult } from "@tanstack/react-query";
import { formatUnits } from "viem";

export interface AssetBalance {
  viewValue?: string;
  symbol?: string;
  value?: string;
  bigIntValue?: bigint;
}

export interface ViewAssetBalance {
  balance: AssetBalance;
}

export interface DecimalsOptions {
  singleDigitNumberDecimals: number;
  doubleDigitNumberDecimals: number;
  threeDigitNumberDecimals: number;
  fourDigitNumberDecimals: number;
}
const defaultDecimalsOptions: DecimalsOptions = {
  singleDigitNumberDecimals: 2,
  doubleDigitNumberDecimals: 2,
  threeDigitNumberDecimals: 2,
  fourDigitNumberDecimals: 2,
};
export interface FetchBigInt {
  bigIntValue?: bigint;
  decimals?: number;
  symbol?: string;
}
export type ExtendedQueryState<TData> = Pick<UseQueryResult<TData>, "isLoading" | "isFetched"> & {
  queryKeys?: QueryKey[];
  queryKey?: QueryKey;
  isError?: boolean;
  isSuccess?: boolean;
};
export interface Displayable<T> extends ExtendedQueryState<T> {
  data: T;
}

export interface FetchData<T> extends ExtendedQueryState<T> {
  data: T;
}
export const UNDEFINED_VIEW_VALUE = "/";
export const UNDEFINED_VIEW_SYMBOL = "/";
export function formatUnitsToNumber(value: string | bigint | undefined, decimals: number) {
  return Number(formatUnits((value || 0) as bigint, decimals));
}
export interface ViewUserAccountData {
  balance: AssetBalance;
  totalCollateral: AssetBalance;
  totalDebt: AssetBalance;
  availableBorrow: AssetBalance;
  borrowPowerUsed: AssetBalance;
  ViewAssetBalance: AssetBalance;
  currentLiquidationThreshold: AssetBalance;
  ltv: AssetBalance;
  healthFactor: AssetBalance;
}

function format(value: number, decimals: number) {
  const formatter = Intl.NumberFormat("en", {
    notation: "compact",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return formatter.format(value);
}

export function formatToDisplayable(value: number | undefined, decimalsOptions: Partial<DecimalsOptions>) {
  if (!value) return format(0, 2);

  const decimalsFormattingOptions = {
    ...defaultDecimalsOptions,
    ...decimalsOptions,
  };

  let decimals;
  if (value < 10) {
    decimals = decimalsFormattingOptions.singleDigitNumberDecimals;
  } else if (value < 99.5) {
    decimals = decimalsFormattingOptions.doubleDigitNumberDecimals;
  } else if (value < 1000) {
    decimals = decimalsFormattingOptions.threeDigitNumberDecimals;
  } else {
    decimals = decimalsFormattingOptions.fourDigitNumberDecimals;
  }

  return format(value, decimals);
}
export function formatFetchBigIntToHealthFactor(
  data: FetchBigInt,
  decimalsOptions?: Partial<DecimalsOptions>
): AssetBalance {
  const { bigIntValue, decimals, symbol = "" } = data;
  const decimalsFormattingOptions = {
    ...defaultDecimalsOptions,
    ...decimalsOptions,
  };
  if (bigIntValue === undefined) {
    return {
      value: undefined,
      viewValue: UNDEFINED_VIEW_VALUE,
      bigIntValue,
      symbol,
    };
  }

  // Multiply by 100 and divide by 100 to round down on 2 decimals
  const value = decimals ? Math.floor(formatUnitsToNumber(bigIntValue, decimals) * 100) / 100 : undefined;

  return {
    value: decimals ? formatUnits(bigIntValue, decimals) : undefined,
    viewValue:
      bigIntValue < INFINITE_HEALTH_FACTOR_BORDER ? formatToDisplayable(value, decimalsFormattingOptions) : "∞",
    bigIntValue,
    symbol,
  };
}
export function formatFetchBigIntToViewBigInt(
  data?: FetchBigInt,
  decimalsOptions?: Partial<DecimalsOptions>
): AssetBalance {
  if (data === undefined) {
    return {
      value: undefined,
      viewValue: UNDEFINED_VIEW_VALUE,
      bigIntValue: undefined,
      symbol: UNDEFINED_VIEW_SYMBOL,
    };
  }

  const { bigIntValue, decimals, symbol } = data;
  const decimalsFormattingOptions = {
    ...defaultDecimalsOptions,
    ...decimalsOptions,
  };
  const value = decimals ? formatUnitsToNumber(bigIntValue, decimals) : undefined;

  return {
    value: bigIntValue && decimals ? formatUnits(bigIntValue, decimals) : undefined,
    viewValue: formatToDisplayable(value, decimalsFormattingOptions),
    bigIntValue,
    symbol,
  };
}