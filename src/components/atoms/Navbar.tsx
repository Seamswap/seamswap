import * as React from 'react';
import { useContext, useEffect } from 'react';
import Image from 'next/image';
import WalletAdd from '@src/components/icons/WalletAdd.icon';
import { createThirdwebClient } from 'thirdweb';
import { LoginProviderContext } from '@src/components/providers/LoginProvider';
import { generateUserNameImage, truncateWalletAddress } from '@src/lib/utils';

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

export const thirdWebClient = createThirdwebClient({ clientId: 'd420daa7ec2137746b2c96077ae26ba1' });
const Navbar: React.FC<INavbarProps> = props => {
  const { openLoginModal, account } = useContext(LoginProviderContext);
  const [userNameImage, setUserNameImage] = React.useState<string>('');

  async function setImageUrlHandler() {
    if (account) {
      const url = await generateUserNameImage(account?.address || '');
      console.log({ url });
      setUserNameImage(url);
    }
  }

  useEffect(() => {
    setImageUrlHandler();
  }, [account]);
  console.log(generateUserNameImage(account?.address || ''));
  return (
    <nav className="px-5 py-4 flex justify-between items-center mx-auto w-3/4 bg-white mt-7 border-primary rounded-xl">
      <Image src={'/logo.png'} alt={'Logo'} width={168} height={40} className="h-10 w-auto" />
      <div className="space-x-16">
        {LINKS.map(link => (
          <a key={link.name} href={link.href} className="font-medium text-secondary-700">{link.name}</a>
        ))}
      </div>
      {account ? <button className="bg-primary-400 px-5 py-3.5 rounded-md flex items-center text-primary-900">
          <Image src={userNameImage} alt="User Avatar" width={30} height={30}
                 className="mr-2" /><span>{truncateWalletAddress(account.address)}</span></button> :
        <button onClick={() => openLoginModal()
        } className="bg-primary-900 px-5 py-3.5 rounded-md text-white inline-flex items-center"><WalletAdd
          className="mr-1.5" />Connect wallet
        </button>}
    </nav>);
};
export default Navbar;
