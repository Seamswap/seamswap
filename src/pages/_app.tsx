import '@src/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@src/components/atoms/Layout';
import { ThirdwebProvider } from 'thirdweb/react';
import LoginProvider from '@src/components/providers/LoginProvider';
import WalletPopup from '@src/components/atoms/WalletPopup';
import { createConfig } from '@lifi/sdk'

createConfig({
  integrator: 'Seamswap',
})
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider>
      <LoginProvider>
        <WalletPopup />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LoginProvider>
    </ThirdwebProvider>
  );
}
