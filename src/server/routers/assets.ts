/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { publicProcedure, createTRPCRouter } from '../trpc';
import { TRPCError } from '@trpc/server';
import { get } from 'http';
import { z } from 'zod';
import { useSeamlessContractRead } from '@src/lib/shared/useSeamlessContractRead';
import { lendingPoolAbi, lendingPoolAddress } from '@src/lib/config/contract';
import { metadataQueryConfig } from '@src/lib/utils';
import { LendMarketState, StrategyState } from '@meta/StateTypes';
import { lendingAssetToHide } from '@src/lib/meta';
import { assetsConfig, strategiesConfig } from '@src/lib/config/config';
import { Address } from 'viem';

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @link https://github.com/prisma/prisma/issues/9353
 */

export const wishListRouter = createTRPCRouter({
  getAssets: publicProcedure
    .input(z.object({ wallet_address: z.string(), asset_address: z.string() }))
    .mutation(async ({ input: { wallet_address, asset_address }, ctx }) => {
      const { data: lendingAssets, ...rest } = useSeamlessContractRead({
        address: lendingPoolAddress,
        abi: lendingPoolAbi,
        functionName: 'getReservesList',
        query: {
          ...metadataQueryConfig,
          refetchOnMount: false,
        },
      });
      const lendingMarkets: LendMarketState[] | undefined = lendingAssets
        ?.filter((asset) => {
          return lendingAssetToHide.indexOf(asset?.toLowerCase()) === -1;
        })
        .map((asset) => ({
          address: asset,
          isStrategy: false,
          tags: ['LEND'],
          vaultAddress: assetsConfig[asset]?.sTokenAddress
        }));
      console.log({lendingAssets})

      // todo: fetch rest of the things for strategies?
      const ilmMarkets: StrategyState[] = [];
      Object.keys(strategiesConfig).forEach((key) => {
        const { subStrategyData } = strategiesConfig[key as Address];
        const index = subStrategyData.length - 1;
        const subStrategy = subStrategyData[index] ? subStrategyData[index].address : undefined;
        ilmMarkets.push({
          isStrategy: true,
          tags: ['ILM'],
          subStrategy,
          ...strategiesConfig[key as Address],
        });
      });
      const data = lendingAssets ? [...ilmMarkets, ...(lendingMarkets || [])] : [];

      return {
        data,
        ...rest,
      };
    }),
});
