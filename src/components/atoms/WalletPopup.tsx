import * as React from 'react';
import { useContext } from 'react';


import { LoginProviderContext } from '@src/components/providers/LoginProvider';
import { Wallet } from '@rainbow-me/rainbowkit';

export interface IWalletPopupProps {
}

const WalletPopup: React.FC<IWalletPopupProps> = props => {
  const { closeLoginModal, login, isLoginModalOpen } = useContext(LoginProviderContext);
  const onConnect = async (wallet: Wallet) => {
    console.log({ wallet: wallet.getAccount() });
    login(wallet.getAccount() || null);
    closeLoginModal();
  };
  return (
    <div className={`fixed w-full h-full items-center z-50 ${!isLoginModalOpen ? 'hidden' : 'flex'}`}>
      {/* <ConnectEmbed
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
      /> */}
    </div>
  );
};
export default WalletPopup;
