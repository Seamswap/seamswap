/**
 * This file contains the root router of your tRPC-backend
 */
import { createTRPCRouter, publicProcedure } from '../trpc';
import { wishListRouter } from './wishlist';

export const appRouter = createTRPCRouter({ wishlist: wishListRouter });


export type AppRouter = typeof appRouter;
