import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '@src/server/routers/_app';
import type { TRPCError } from '@trpc/server';
import { createTRPCContext } from '@src/server/trpc';
const ENV = process.env.NODE_ENV;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  /**
   * @link https://trpc.io/docs/v11/context
   */
  createContext: createTRPCContext,
  /**
   * @link https://trpc.io/docs/v11/error-handling
   */
  onError:
    ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
          );
        }
      : undefined,
  /**
   * @link https://trpc.io/docs/v11/caching#api-response-caching
   */
  // responseMeta() {
  //   // ...
  // },
});
