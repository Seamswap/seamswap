import '@src/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@src/components/atoms/Layout';
import '@rainbow-me/rainbowkit/styles.css';
import { connectorsForWallets, lightTheme, RainbowKitProvider, Theme } from '@rainbow-me/rainbowkit';
import {
  Config,
  createConfig as createWagmiConfig,
  CreateConnectorFn,
  fallback,
  http,
  WagmiProvider,
  webSocket,
} from 'wagmi';
import { arbitrum, base, mainnet, optimism, polygon, zkSync } from 'wagmi/chains';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import LoginProvider from '@src/components/providers/LoginProvider';
import WalletPopup from '@src/components/atoms/WalletPopup';
import { ChainType, config, createConfig, EVM, getChains } from '@lifi/sdk';
import { createClient, createWalletClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { injected } from 'wagmi/connectors';
import { getWalletClient, switchChain } from '@wagmi/core';
import { FC, PropsWithChildren } from 'react';
import { useSyncWagmiConfig } from '@lifi/wallet-management';
import { Toaster } from '@src/components/ui/toaster';
import {
  coinbaseWallet,
  metaMaskWallet,
  rabbyWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import logoSeamSwap from "@assets/tokens/seamswap.svg";
const rpcConfig = [
  // Free
  { url: 'https://rpc.ankr.com/base', isWebSocket: false },
  { url: 'https://base.drpc.org', isWebSocket: false },
  { url: 'wss://base.drpc.org', isWebSocket: true },
].filter(({ url }) => url);
// Create Wagmi config with default chain and without connectors
const connectors = connectorsForWallets(
  [
    {
      groupName: "Smart wallets",
      wallets: [
        () =>
          // todo double check () =>
          coinbaseWallet({
            appName: "Seamless Protocol",
            appIcon: logoSeamSwap,
          }),
      ],
    },
    {
      groupName: "Popular",
      wallets: [metaMaskWallet, rabbyWallet, walletConnectWallet, rainbowWallet],
    },
  ],
  {
    appName: "Seamswap",
    appDescription: "Seamswap is a decentralized exchange for token positions lending and borrowing protocol on Base.",
    appUrl: "https://seamseap.com/",
    appIcon: logoSeamSwap,
    projectId: '521bbfde80d7a5b3d05df9f024a68807',
  }
);

export const wagmiConfig = createWagmiConfig({
  connectors,
  chains: [base],
  transports: {
    [base.id]: fallback(
      rpcConfig.map(({ url, isWebSocket }) => (isWebSocket ? webSocket(url) : http(url))),
      { rank: true }
    ),
  },
});

// Create SDK config using Wagmi actions and configuration
createConfig({
  integrator: 'Seamswap',
  providers: [
    EVM({
      getWalletClient: () => getWalletClient(wagmiConfig),
      switchChain: async (chainId) => {
        const chain = await switchChain(wagmiConfig, { chainId });
        return getWalletClient(wagmiConfig, { chainId: chain.id });
      },
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
      // Update chain configuration for LI.FI SDK
      config.setChains(chains);
      return chains;
    },
  });

  // Synchronize fetched chains with Wagmi config and update connectors
  useSyncWagmiConfig(wagmiConfig, connectors, chains);

  return (
    <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
      {children}
    </WagmiProvider>
  );
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

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CustomWagmiProvider>
        <RainbowKitProvider theme={myRainbowkitThemeConfigV2}>
          <LoginProvider>
            <WalletPopup />
            <Layout>
              <Component {...pageProps} />
              <Toaster />
            </Layout>
          </LoginProvider>
        </RainbowKitProvider>
      </CustomWagmiProvider>
    </QueryClientProvider>
  );
}
