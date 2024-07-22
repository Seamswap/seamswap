import * as React from 'react';
import { useContext, useEffect } from 'react';
import Image from 'next/image';
import WalletAdd from '@src/components/icons/WalletAdd.icon';

import { LoginProviderContext } from '@src/components/providers/LoginProvider';
import { generateUserNameImage, truncateWalletAddress } from '@src/lib/utils';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ConnectionButton from '../ui/ConnectButton';


export interface INavbarProps {
}

const LINKS = [
  {
    name: 'Swap',
    href: '/swap',
  },
  {
    name: 'Explorer',
    href: '/explorer',
  },
  {
    name: 'Protocol',
    href: '/protocol',
  }, {
    name: 'Learn',
    href: '/learn',
  },
];


const Navbar: React.FC<INavbarProps> = props => {
  const { pathname } = useRouter();

  return (
    <nav className="px-5 py-4 flex justify-between items-center mx-auto w-3/4 bg-white mt-7 border-primary rounded-xl">
      <Link href="/swap"><Image src={'/logo.png'} alt={'Logo'} width={168} height={40} className="h-10 w-auto" /></Link>
      <div className="space-x-16">
        {LINKS.map(link => (
          <Link key={link.name} href={link.href} className="font-medium text-secondary-700 data-true:text-primary-900" data-true={link.href === pathname}>{link.name}</Link>
        ))}
      </div>
      <ConnectionButton />
    </nav>);
};
export default Navbar;
