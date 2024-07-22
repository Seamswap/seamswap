import '@src/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@src/components/atoms/Layout';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import LoginProvider from '@src/components/providers/LoginProvider';
import WalletPopup from '@src/components/atoms/WalletPopup';
import { createConfig } from '@lifi/sdk'

createConfig({
  integrator: 'Seamswap',
})
const config = getDefaultConfig({
  appName: 'Seamswap',
  projectId: '521bbfde80d7a5b3d05df9f024a68807',
  chains: [base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
import { Theme, lightTheme } from "@rainbow-me/rainbowkit";

const ltheme = lightTheme();
export const myRainbowkitThemeConfigV2: Theme = {
  ...ltheme,
  fonts: {
    ...ltheme.fonts,
    body: "Satoshi, Arial",
  },
  colors: {
    ...ltheme.colors,
    accentColor: '#00B8A1',
    modalBackground: '#FFFFFF',
    modalBorder: '#00B8A1',
  },

  radii: {
    modal: "12px",
    modalMobile: "12px",
    menuButton: "12px",
    actionButton: "12px",
    connectButton: "12px",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={myRainbowkitThemeConfigV2}>
          <LoginProvider>
            <WalletPopup />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </LoginProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
