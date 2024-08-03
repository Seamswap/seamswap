import '@src/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@src/components/atoms/Layout';
import '@rainbow-me/rainbowkit/styles.css';
import { lightTheme, RainbowKitProvider, Theme } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import LoginProvider from '@src/components/providers/LoginProvider';
import { ChainId, ChainType, config as lifiConfig, createConfig, EVM, getChains } from '@lifi/sdk';
import { getWalletClient } from '@wagmi/core';
import { FC, PropsWithChildren } from 'react';
import { Toaster } from '@src/components/ui/toaster';
import { WagmiProvider } from 'wagmi';
import { config } from '@src/lib/config/rainbow.config';
import Head from 'next/head';
import { api } from '@src/utils/trpc';
// const connectors: CreateConnectorFn[] = [injected()];

// Create Wagmi config with default chain and without connectors
// export const wagmiConfig = createWagmiConfig({
//   // appName: 'Seamswap',
//
//   projectId: '521bbfde80d7a5b3d05df9f024a68807',
//   chains: [base],
//   ssr: true, // If your dApp uses server side rendering (SSR)
//   client({ chain }) {
//     return createClient({ chain, transport: http() });
//   },
// });
// Create SDK config using Wagmi actions and configuration
createConfig({
  integrator: 'Seamswap',
  rpcUrls: {
    [ChainId.BAS]: [
      'https://base-mainnet.g.alchemy.com/v2/ITJZYemtXDZswsfcino5vXg6ikpUq1zI',
      'wss://base-mainnet.g.alchemy.com/v2/ITJZYemtXDZswsfcino5vXg6ikpUq1zI',
    ],
  },
  providers: [
    EVM({
      getWalletClient: (() => getWalletClient(config)) as any,
      // switchChain: async (chainId) => {
      //   const chain = await switchChain(config, { chainId });
      //   return getWalletClient(config, { chainId: chain.id });
      // },
    }),
  ],
  // We disable chain preloading and will update chain configuration in runtime
  preloadChains: false,
});

export const CustomWagmiProvider: FC<PropsWithChildren> = ({ children }) => {
  // Load EVM chains from LI.FI API using getChains action from LI.FI SDK
  const { data: chains } = useQuery({
    queryKey: ['chains'] as const,
    queryFn: async () => {
      const chains = await getChains({
        chainTypes: [ChainType.EVM],
      });
      const base = chains.filter((chain) => chain.id === ChainId.BAS);
      // Update chain configuration for LI.FI SDK
      lifiConfig.setChains(base);
      return base;
    },
  });
  // Synchronize fetched chains with Wagmi config and update connectors
  // useSyncWagmiConfig(config, connectors, [base]);

  return <WagmiProvider config={config}>{children}</WagmiProvider>;
};

const ltheme = lightTheme();
export const myRainbowkitThemeConfigV2: Theme = {
  ...ltheme,
  fonts: {
    ...ltheme.fonts,
    body: 'Satoshi, Arial',
  },
  colors: {
    ...ltheme.colors,
    accentColor: '#00B8A1',
    modalBackground: '#FFFFFF',
    modalBorder: '#00B8A1',
  },

  radii: {
    modal: '12px',
    modalMobile: '12px',
    menuButton: '12px',
    actionButton: '12px',
    connectButton: '12px',
  },
};

const App = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CustomWagmiProvider>
        <RainbowKitProvider initialChain={base} theme={myRainbowkitThemeConfigV2}>
          <LoginProvider>
            <Layout>
              <Head>
                <title>Seamswap</title>
                <meta
                  name="description"
                  content="Seamlessly swap between ILM positions with Seamless Protocol. Enable faster ILM strategy position swaps with reduced transaction fees."
                  key="desc"
                />
                {/* Meta tags for SEO */}
                <meta property="og:title" content="Seamswap" key="title" />
                <meta
                  property="og:description"
                  content="Seamlessly swap between ILM positions with Seamless Protocol. Enable faster ILM strategy position swaps with reduced transaction fees."
                />
                <meta property="og:image" content="/favicon-32x32.png" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Seamswap" />
                <meta
                  name="twitter:description"
                  content="Seamlessly swap between ILM positions with Seamless Protocol. Enable faster ILM strategy position swaps with reduced transaction fees."
                />
                <meta name="twitter:image" content="/favicon-32x32.png" />
                <meta name="twitter:site" content="@seamswap" />
                <meta name="twitter:creator" content="@seamswap" />

                <link
                  rel="apple-touch-icon"
                  sizes="180x180"
                  href="/apple-touch-icon.png"
                />
                <link
                  rel="icon"
                  type="image/png"
                  sizes="32x32"
                  href="/favicon-32x32.png"
                />
                <link
                  rel="icon"
                  type="image/png"
                  sizes="16x16"
                  href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
              </Head>

              <Component {...pageProps} />
              <Toaster />
            </Layout>
          </LoginProvider>
        </RainbowKitProvider>
      </CustomWagmiProvider>
    </QueryClientProvider>
  );
};
export default  api.withTRPC(App)