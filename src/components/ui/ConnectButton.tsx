import * as React from 'react';
import { AuthenticationStatus, ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { generateUserNameImage } from '@src/lib/utils';
import WalletAdd from '../icons/WalletAdd.icon';
import { LoginProviderContext } from '../providers/LoginProvider';

export interface Account {
  address: `0x${string}`;
  balanceDecimals?: number;
  balanceFormatted?: string;
  balanceSymbol?: string;
  displayBalance?: string;
  displayName: string;
  ensAvatar?: string;
  ensName?: string;
  hasPendingTransactions: boolean;
}

export interface IConnectButtonProps {
  account?: Account;
  chain?: {
    hasIcon: boolean;
    iconUrl?: string;
    iconBackground?: string;
    id: number;
    name?: string;
    unsupported?: boolean;
  };
  mounted: boolean;
  authenticationStatus?: AuthenticationStatus;
  openAccountModal: () => void;
  openChainModal: () => void;
  openConnectModal: () => void;
  accountModalOpen: boolean;
  chainModalOpen: boolean;
  connectModalOpen: boolean;
  isExternal?: boolean;
}

const ConnectorButton: React.FC<IConnectButtonProps> = ({
                                                          account,
                                                          chain,
                                                          openAccountModal,
                                                          openChainModal,
                                                          openConnectModal,
                                                          authenticationStatus,
                                                          mounted,
                                                          isExternal,
                                                        }) => {
  const [userNameImage, setUserNameImage] = React.useState<string>('');
  const { openLoginModal, login } = React.useContext(LoginProviderContext);

  // Note: If your app doesn't use authentication, you
  // can remove all 'authenticationStatus' checks
  const ready = mounted && authenticationStatus !== 'loading';
  const connected =
    ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

  async function setImageUrlHandler() {
    if (account?.address) {
      const url = await generateUserNameImage(account?.address);
      setUserNameImage(url);
    }
  }

  React.useEffect(() => {
    setImageUrlHandler();
    login(account);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);
  return (
    <div
      {...(!ready && {
        'aria-hidden': true,
        style: {
          opacity: 0,
          pointerEvents: 'none',
          userSelect: 'none',
        },
      })}
    >
      {(() => {
        if (!connected && isExternal) {
          return (
            <button
              className="bg-primary-900 px-5 py-3.5 text-white w-full rounded-xl"
              onClick={openConnectModal}
            >
              Connect wallet
            </button>
          );
        }
        if (!connected) {
          return (
            <button
              onClick={openConnectModal}
              className="connectBtn bg-primary-900 px-4 py-2 md:py-3 gap-x-2 text-sm rounded-md text-white inline-flex items-center"
            >
              <WalletAdd className="" />
              <span className="">Connect wallet</span>
            </button>
          );
        }
        return (
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={openAccountModal}
              type="button"
              className="connectBtn bg-primary-400 px-4 py-1 md:py-2 gap-x-3 rounded-md flex items-center text-primary-900"
            >
              {userNameImage && <Image
                src={userNameImage}
                alt="User Avatar"
                width={26}
                height={26}
                className="md:w-[28px]"
              />}
              <span>{account.displayName}</span>
            </button>
          </div>
        );
      })()}
    </div>
  );
};
const ConnectionButton: React.FC<{ isExternal?: boolean }> = (prop) => {
  return (
    <ConnectButton.Custom>
      {(props) => <ConnectorButton {...(props as IConnectButtonProps)} isExternal={prop.isExternal} />}
    </ConnectButton.Custom>
  );
};

export default ConnectionButton;
