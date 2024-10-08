import { ExtendedQueryState } from '@src/lib/formatters/mergeQueryStates';


export interface Displayable<T> extends ExtendedQueryState<T> {
  data: T;
}

export interface ViewValueSymbolPair {
  viewValue: string;
  symbol?: string | undefined;
}

export interface ViewNumber extends ViewValueSymbolPair {
  value?: number | undefined;
}

export interface ViewBigInt extends ViewValueSymbolPair {
  value?: string | undefined;
  bigIntValue?: bigint | undefined;
}

export interface ValueSymbolPair {
  value?: string;
  symbol?: string;
  originalValue?: number;
}

export interface DisplayableAmount extends ViewValueSymbolPair {
  isFetched?: boolean;
  isLoading?: boolean;
  isError?: boolean;
}
