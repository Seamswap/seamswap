import * as React from 'react';
import { Account } from '../ui/ConnectButton';

export interface ILoginProviderProps {
  children: React.ReactNode;
}

interface InitialLoginContext {
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (account?: Account) => void;
  logout: () => void;
  account?: Account;
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
  account: undefined,
  isLoginModalOpen: false,
};

export const LoginProviderContext = React.createContext<InitialLoginContext>(initialLoginContext);

const LoginProvider: React.FC<ILoginProviderProps> = props => {
  const [account, setAccount] = React.useState<Account | undefined>(undefined);
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState<boolean>(false);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const login = (account?: Account) => {
    setAccount(account);
  };
  const logout = () => {
    setAccount(undefined);
  };

  return (
    <LoginProviderContext.Provider
      value={{ isLoginModalOpen, openLoginModal, closeLoginModal, login, logout, account }}>
      {props.children}
    </LoginProviderContext.Provider>
  );

};
export default LoginProvider;
