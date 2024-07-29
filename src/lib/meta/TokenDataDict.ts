import {
  AERO_ADDRESS,
  BRETT_ADDRESS,
  CBETH_ADDRESS,
  DAI_ADDRESS,
  DEGEN_ADDRESS,
  ethLong,
  SEAM_ADDRESS,
  sWETH_ADDRESS,
  USDBC_ADDRESS,
  USDC_ADDRESS,
  WETH_ADDRESS,
  WSTETH_ADDRESS,
  wstETHBooster_ADDRESS,
} from './constants';
import { Address } from 'viem';

import wethLogo from '@assets/tokens/weth.svg';
import WstEthLogo from '@assets/tokens/wsteth.svg';
import ilmwstETHLogo from '@assets/tokens/ilmWstethEth.svg';
import cbethLogo from '@assets/tokens/cbeth.svg';
import ethLongLogo from '@assets/tokens/ilmEthUsdc.svg';
import usdbcLogo from '@assets/tokens/usdbc.svg';
import daiLogo from '@assets/tokens/dai.svg';
import usdcLogo from '@assets/tokens/usdc.svg';
import degenLogo from '@assets/tokens/degen.svg';
import seamLogo from '@assets/tokens/seam.svg';
import aeroLogo from '@assets/tokens/aero.svg';
import brettLogo from '@assets/tokens/brett.svg';

interface ITokenDataDict {
  [address: Address]: {
    name?: string;
    nameOverride?: string;
    logo: string;
  };
}

export const TokenDataDict: ITokenDataDict = {
  [WETH_ADDRESS]: {
    logo: wethLogo,
  },
  [sWETH_ADDRESS]: {
    logo: WstEthLogo,
  },
  [WSTETH_ADDRESS]: {
    logo: WstEthLogo,
  },
  [wstETHBooster_ADDRESS]: {
    name: 'wstETH Booster',
    logo: ilmwstETHLogo,
  },
  [ethLong]: {
    name: 'Multiply ETH Long',
    logo: ethLongLogo,
  },
  // Adding the missing contracts
  [CBETH_ADDRESS]: {
    logo: cbethLogo,
  },
  [USDBC_ADDRESS]: {
    logo: usdbcLogo,
  },
  [DAI_ADDRESS]: {
    logo: daiLogo,
  },
  [USDC_ADDRESS]: {
    logo: usdcLogo,
  },
  [DEGEN_ADDRESS]: {
    logo: degenLogo,
  },
  [SEAM_ADDRESS]: {
    logo: seamLogo,
  },
  [AERO_ADDRESS]: {
    logo: aeroLogo,
  },
  [BRETT_ADDRESS]: {
    logo: brettLogo,
  },
};
/**
 * export const WETH_ADDRESS: Address = "0x4200000000000000000000000000000000000006";
 export const CBETH_ADDRESS: Address = "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22";
 export const WSTETH_ADDRESS: Address = "0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452";
 export const USDBC_ADDRESS: Address = "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA";
 export const DAI_ADDRESS: Address = "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb";
 export const USDC_ADDRESS: Address = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
 export const rwstETH_ADDRESS: Address = "0xc9ae3B5673341859D3aC55941D27C8Be4698C9e4";
 export const rWETH_ADDRESS: Address = "0x3e8707557d4ad25d6042f590bcf8a06071da2c5f";
 export const DEGEN_ADDRESS: Address = "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed";
 export const SEAM_ADDRESS: Address = "0x1C7a460413dD4e964f96D8dFC56E7223cE88CD85";
 export const AERO_ADDRESS: Address = "0x940181a94A35A4569E4529A3CDfB74e38FD98631";
 export const BRETT_ADDRESS: Address = "0x532f27101965dd16442E59d40670FaF5eBB142E4";
 export const ESSEAM_ADDRESS: Address = "0x998e44232BEF4F8B033e5A5175BDC97F2B10d5e5";
 export const OG_POINTS: Address = "0x5607718c64334eb5174CB2226af891a6ED82c7C6";
 */
export const ILM_TOKENS = [
  {
    name: 'Wrapped Ether',
    address: WETH_ADDRESS,
  },
  {
    name: 'Wrapped stETH',
    address: WSTETH_ADDRESS,
  },
];

export const LENDING_TOKENS = [{
  name: 'Wrapped Ether',
  address: WETH_ADDRESS,
},
  {
    name: 'Wrapped stETH',
    address: WSTETH_ADDRESS,
  },
  {
    name: 'Wrapped Compound Ether',
    address: CBETH_ADDRESS,
  },
  {
    name: 'USD Coin',
    address: USDC_ADDRESS,
  },
  {
    name: 'USD Coin Borrowed',
    address: USDBC_ADDRESS,
  },
  {
    name: 'Dai',
    address: DAI_ADDRESS,

  },
  {
    name: 'Degen',
    address: DEGEN_ADDRESS,
  },
  {
    name: 'Seam',
    address: SEAM_ADDRESS,
  },
  {
    name: 'Aero',
    address: AERO_ADDRESS,
  },
  {
    name: 'Brett',
    address: BRETT_ADDRESS,
  },

];
