import { base } from 'wagmi/chains';
import { createConfig, fallback, http, webSocket } from 'wagmi';

import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  metaMaskWallet,
  rabbyWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
// @ts-ignore
import seamSwap from '@assets/tokens/seamswap.svg';


const rpcConfig = [
  { url: 'https://base-mainnet.g.alchemy.com/v2/ITJZYemtXDZswsfcino5vXg6ikpUq1zI', isWebSocket: false },
  { url: 'wss://base-mainnet.g.alchemy.com/v2/ITJZYemtXDZswsfcino5vXg6ikpUq1zI', isWebSocket: true },
  {
    url: 'https://lb.drpc.org/ogrpc?network=base&dkey=AvBCZwsn-kqoqXOvbbV6cPmFUTfiS3oR77PsvmJKmvm9',
    isWebSocket: false,
  },
  { url: 'wss://lb.drpc.org/ogws?network=base&dkey=AvBCZwsn-kqoqXOvbbV6cPmFUTfiS3oR77PsvmJKmvm9', isWebSocket: true },
  { url: 'https://rpc.ankr.com/base', isWebSocket: false },
  { url: 'https://base.gateway.tenderly.co/6bfWwrr1dPk69jC2YXS9bt', isWebSocket: false },
  { url: 'wss://base.gateway.tenderly.co/6bfWwrr1dPk69jC2YXS9bt', isWebSocket: true },
].filter(({ url }) => url);

export const connectors = connectorsForWallets(
  [
    {
      groupName: 'Smart wallets',
      wallets: [
        () =>
          coinbaseWallet({
            appName: 'Seamless Protocol',
            appIcon: seamSwap,
          }),
      ],
    },
    {
      groupName: 'Popular',
      wallets: [metaMaskWallet, rabbyWallet, walletConnectWallet, rainbowWallet],
    },
  ],
  {
    appName: 'Seamswap',
    appDescription: 'Seamswap is the first decentralized swap that lets\'s you swap your lending and deposit positions on Seamless Protocol.',
    appUrl: 'https://seamswap.com/',
    appIcon: seamSwap,
    projectId: '521bbfde80d7a5b3d05df9f024a68807',
  },
);


export const config = createConfig({
  connectors,
  chains: [base],

  transports: {
    [base.id]: fallback(
      rpcConfig.map(({ url, isWebSocket }) => (isWebSocket ? webSocket(url) : http(url))),
      { rank: true },
    ),
  },
});


declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
