import { Address } from "viem";
import { useSeamlessContractRead } from '@src/lib/shared/useSeamlessContractRead';
import { loopStrategyAbi } from '@src/lib/config/contract';
import { metadataQueryConfig } from '@src/lib/utils/queryConfig';
export const useFetchStrategyAsset = (strategy?: Address) => {
  return useSeamlessContractRead({
    address: strategy,
    abi: loopStrategyAbi,
    functionName: "asset",
    query: {
      ...metadataQueryConfig,
      enabled: !!strategy,
    },
  });
};
