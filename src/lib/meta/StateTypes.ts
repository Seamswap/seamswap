import { Address } from "viem";
import { LendMarketConfig, SubStrategyDataConfig } from '@meta/configTypes';


export type TagType = "LEND" | "ILM";

export interface AssetBase {
  address: Address;
  isStrategy: boolean;
  tags: TagType[];
  // todo add apy? and any other sortable/filterable data
}
export interface LendMarketState extends AssetBase { }
export interface StrategyState extends AssetBase {
  // todo replace it with fetched data
  underlyingAsset: LendMarketConfig;
  debtAsset: LendMarketConfig;
  subStrategyData: SubStrategyDataConfig[];
  subStrategy?: Address;
  multiplier?: string;
}
