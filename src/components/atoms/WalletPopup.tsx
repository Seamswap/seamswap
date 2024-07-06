import * as React from 'react';
import { useContext } from 'react';
import { ConnectEmbed, lightTheme } from 'thirdweb/react';
import { thirdWebClient } from '@src/components/atoms/Navbar';
import { createWallet, Wallet } from 'thirdweb/wallets';
import { LoginProviderContext } from '@src/components/providers/LoginProvider';

export interface IWalletPopupProps {
}

const wallets = [
  // inAppWallet(),
  createWallet('io.metamask'),
  createWallet('com.coinbase.wallet'),
  createWallet('me.rainbow'),
];
const WalletPopup: React.FC<IWalletPopupProps> = props => {
  const { closeLoginModal, login, isLoginModalOpen } = useContext(LoginProviderContext);
  const onConnect = async (wallet: Wallet) => {
    console.log({ wallet: wallet.getAccount() });
    login(wallet.getAccount() || null);
    closeLoginModal();
  };
  return isLoginModalOpen && (
    <div className="fixed w-full h-full flex items-center">
      <ConnectEmbed
        client={thirdWebClient}
        theme={lightTheme({
          colors: {
            accentText: '#0C1430',
            modalBg: '#FFFFFF',
            borderColor: '#00B8A1',
          },
        })}
        modalSize="wide"
        showThirdwebBranding={false}
        wallets={wallets}
        className="m-auto"
        onConnect={onConnect}
        appMetadata={{
          name: 'SeamSwap',
          url: 'https://seamswap.xyz',
          description:
            'Seamswap is an LLM',
          logoUrl: 'https://ucarecdn.com/45ea7446-f646-4fb4-be14-d0dca64aba34/-/preview/504x120/',
        }}
        walletConnect={{
          projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
        }}
      />
    </div>
  );
};
export default WalletPopup;
