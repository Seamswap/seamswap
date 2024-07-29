import * as React from 'react';
import { useContext, useEffect } from 'react';
import Image from 'next/image';
import WalletAdd from '@src/components/icons/WalletAdd.icon';

import { LoginProviderContext } from '@src/components/providers/LoginProvider';
import { generateUserNameImage, truncateWalletAddress } from '@src/lib/utils';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ConnectionButton from '../ui/ConnectButton';
import Container from '../ui/Container';

export interface INavbarProps {
  isLandingPage: boolean;
}

const Navbar: React.FC<INavbarProps> = ({ isLandingPage }) => {
  const { pathname } = useRouter();
  const [openNavbar, setOpenNavbar] = React.useState(false);

  const toggleNavbar = () => {
    setOpenNavbar(!openNavbar);
  };

  useEffect(() => {
    // Close the navbar when the route changes
    setOpenNavbar(false);
  }, [pathname]);

  return (
    <Container className="relative">
      <nav className="px-5 py-4 xl:px-6 xl:py-3 flex justify-between items-center mx-auto bg-white mt-6 border-primary rounded-xl">
        <Link href="/">
          <Image
            src={'/logo.png'}
            alt={'Logo'}
            width={168}
            height={40}
            className="h-[30px] lg:h-9 w-auto"
          />
        </Link>

        <div
          className={`md:!block transition-all ${
            openNavbar ? 'mobile_nav md:hidden' : 'hidden'
          }`}
        >
          <ul className="flex gap-x-5 lg:gap-x-10">
            {isLandingPage ? (
              <LandingPageNavLinks pathname={pathname} />
            ) : (
              LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-medium text-black data-true:text-primary-900"
                  data-true={link.href === pathname}
                >
                  {link.name}
                </Link>
              ))
            )}
          </ul>
        </div>

        <div className="flex items-center flex-row-reverse gap-x-4">
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="md:hidden flex items-center w-8 h-8 justify-center text-sm text-[#000] rounded-md  hover:text-[#444]"
            onClick={toggleNavbar}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <ConnectionButton />
        </div>
      </nav>
    </Container>
  );
};

const LandingPageNavLinks: React.FC<{ pathname: string }> = ({ pathname }) => {
  const [navDropDown, setNavDropDown] = React.useState(false);

  return (
    <>
      {LandingPageLINKS.map((link) =>
        link.links ? (
          <Link
            key={link.name}
            href={'#'}
            className="relative flex items-center font-medium text-black data-true:text-primary-900"
            data-true={link.href === pathname}
            onClick={() => setNavDropDown(!navDropDown)}
          >
            {link.name}
            <svg
              className={'w-3 h-3 ms-2 ' + (navDropDown ? 'rotate-180' : 'rotate-0')}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="{2}"
                d="m1 1 4 4 4-4"
              />
            </svg>

            {navDropDown && (
              <div className="z-10 top-0 mt-11 lg:mt-8 absolute font-normal bg-white border-primary rounded-lg shadow w-44 ">
                <div className="py-2 text-sm text-black font-medium">
                  {link.links.map((subLink) => (
                    <li key={subLink.name}>
                      <Link
                        href={subLink.href}
                        className="block !px-4 py-2 hover:bg-gray-100 "
                      >
                        {subLink.name}
                      </Link>
                    </li>
                  ))}
                </div>
              </div>
            )}
          </Link>
        ) : (
          <Link
            key={link.name}
            href={link.href}
            className="font-medium text-black data-true:text-primary-900"
            data-true={link.href === pathname}
          >
            {link.name}
          </Link>
        ),
      )}
    </>
  );
};

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
  },
  {
    name: 'Learn',
    href: '/learn',
  },
];

const LandingPageLINKS = [
  {
    name: 'Protocol',
    href: '/protocol',
  },
  {
    name: 'Blog',
    href: '/blog',
  },
  {
    name: 'Resources',
    href: '/resources',
    links: [
      {
        name: 'Changelog',
        href: '/changelog',
      },
      {
        name: 'Newsletter',
        href: '/#newsletter',
      },
    ],
  },
  {
    name: 'X(Twitter)',
    href: 'https://x.com/seamswap',
  },
];

export default Navbar;
