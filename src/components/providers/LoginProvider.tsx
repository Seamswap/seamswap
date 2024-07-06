import * as React from 'react';
import { Account } from 'thirdweb/wallets';

export interface ILoginProviderProps {
  children: React.ReactNode;
}

interface InitialLoginContext {
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (account: Account | null) => void;
  logout: () => void;
  account: Account | null;
  isLoginModalOpen: boolean;
}

const initialLoginContext: InitialLoginContext = {
  openLoginModal: () => {
  },
  closeLoginModal: () => {
  },
  login: () => {
  },
  logout: () => {
  },
  account: null,
  isLoginModalOpen: false,
};

export const LoginProviderContext = React.createContext<InitialLoginContext>(initialLoginContext);

const LoginProvider: React.FC<ILoginProviderProps> = props => {
  const [account, setAccount] = React.useState<Account | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState<boolean>(false);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const login = (account: Account | null) => {
    setAccount(account);
  };
  const logout = () => {
    setAccount(null);
  };

  return (
    <LoginProviderContext.Provider
      value={{ isLoginModalOpen, openLoginModal, closeLoginModal, login, logout, account }}>
      {props.children}
    </LoginProviderContext.Provider>
  );

};
export default LoginProvider;
