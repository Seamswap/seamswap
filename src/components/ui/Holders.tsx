import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Address } from 'viem';
import { Explorer } from '@src/pages/explorer';
import { getIsStrategy } from '@src/lib/utils/configUtils';

interface VaultData {
  'name': string
  'address': Address
  'network': string
  'tvl': string
  'liquid': string
  'locked': string
  'numberOfHolders': number,
  'lendLink': null,
  'tags': [],
  'token': {
    'name': string
    'assetAddress': Address
    'symbol': string
    'decimals': number
  },
  'apy': {
    '1day': number,
    '7day': number
  },
  'rewards': [
    {
      'apy': {
        '1day': number,
        '7day': number,
        '30day': number
      },
      'assetPriceInUsd': number,
      'asset': {
        'name': string,
        'assetAddress': Address,
        'symbol': string,
        'decimals': number
      }
    }
  ]
}

const fetchHolders = async (vaultAddress?: Address) => {
  if (!vaultAddress) return 0;
  const req = await fetch(`https://api.vaults.fyi/v1/vaults/base/${vaultAddress}`, {
    headers: {
      'x-api-key': 'BegMtPFI3O5AUNZoe5fVH3qWK9fRo1aptjGMrsRld8w',
    },
  });
  const data: VaultData = await req.json();
  return data?.numberOfHolders || 0;

};
const Holders = (asset: Explorer) => {
  const { data, isLoading } = useQuery({
    queryKey: ['holders', asset],
    queryFn: async () => {
      return fetchHolders(getIsStrategy(asset.address) ? asset.subStrategy : asset.vaultAddress);
    },
  });
  return isLoading ? (<span>Loading...</span>) : (
    <span className="text-gray-500">{data?.toLocaleString()}</span>
  );
};

export default Holders;