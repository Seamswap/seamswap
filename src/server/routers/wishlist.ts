/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { publicProcedure, createTRPCRouter } from '../trpc';
import { TRPCError } from '@trpc/server';
import { get } from 'http';
import { z } from 'zod';

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @link https://github.com/prisma/prisma/issues/9353
 */

export const wishListRouter = createTRPCRouter({
  getWishList: publicProcedure
    .input(z.object({ wallet_address: z.string() }))
    .query(async ({ input, ctx }) => {
      const wishList = await ctx.db.wishlist.findMany({
        where: {
          wallet_address: input.wallet_address,
        },
      });
      return wishList;
    }),
  getWishListById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id }, ctx }) => {
      const wishList = await ctx.db.wishlist.findUnique({
        where: {
          id,
        },
      });
      if (!wishList) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'WishList not found',
        });
      }
      return wishList;
    }),
  getWishListByAsset: publicProcedure
    .input(z.object({ asset_address: z.string(), wallet_address: z.string().optional().default(".") }))
    .query(async ({ input: { asset_address, wallet_address }, ctx }) => {
      if (!wallet_address) {
        return {}
      }
      return await ctx.db.wishlist.findFirst({
        where: {
          asset_address,
          wallet_address,
        },
      });
    }),
  createWishList: publicProcedure
    .input(z.object({ wallet_address: z.string(), asset_address: z.string() }))
    .mutation(async ({ input: { wallet_address, asset_address }, ctx }) => {
      const wishList = await ctx.db.wishlist.findFirst({
        where: {
          asset_address,
          wallet_address,
        },
      });

      if (wishList) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'WishList already exists',
        });
      }

      await ctx.db.wishlist.create({
        data: {
          wallet_address,
          asset_address,
        },
      });
      return {
        success: true,
      };
    }),
  deleteWishList: publicProcedure
    .input(z.object({ wallet_address: z.string(), asset_address: z.string() }))
    .mutation(async ({ input: { wallet_address, asset_address }, ctx }) => {
      const wishList = await ctx.db.wishlist.findFirst({
        where: {
          asset_address,
          wallet_address,
        },
      });

      if (!wishList) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'WishList already exists',
        });
      }
      await ctx.db.wishlist.delete({
        where: {
          id: wishList.id,
        },
      });

      return {
        success: true,
      };
    }),
});
