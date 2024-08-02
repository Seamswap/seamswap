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
  isDashboardPage: boolean;
}

const Navbar: React.FC<INavbarProps> = ({ isDashboardPage }) => {
  const { pathname } = useRouter();
  const [openNavbar, setOpenNavbar] = React.useState(false);
  const pageNavLinks = isDashboardPage ? LINKS : LandingPageLINKS;

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
            <NavLinks pageNavLinks={pageNavLinks} pathname={pathname} />
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

          {isDashboardPage ? (
            <ConnectionButton />
          ) : (
            <Link
              href={'/swap'}
              className="connectBtn bg-primary-900 px-4 py-2 md:py-3 gap-x-2 text-sm rounded-md text-white inline-flex items-center"
            >
              <WalletAdd className="" />
              <span>Launch app</span>
            </Link>
          )}
        </div>
      </nav>
    </Container>
  );
};

const NavLinks: React.FC<{ pathname: string; pageNavLinks: Array<any> }> = ({
  pageNavLinks,
  pathname,
}) => {
  const [navDropDown, setNavDropDown] = React.useState(false);

  return (
    <>
      {pageNavLinks.map((link) =>
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
                  {link.links.map((subLink: { name: string; href: string }) => (
                    <li key={subLink.name}>
                      <Link
                        href={subLink.href}
                        className="block !px-4 py-2 hover:bg-gray-100 data-true:text-primary-900"
                        data-true={subLink.href === pathname}
                        target={subLink.href.startsWith('http') ? '_blank' : ''}
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
            href={link.href || '#'}
            className={
              'font-medium text-black data-true:text-primary-900 ' +
              (link.href ? '' : '!text-[#a1a1a1] cursor-default')
            }
            data-true={link.href === pathname}
            target={link.href.startsWith('http') ? '_blank' : ''}
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
    href: 'https://www.seamlessprotocol.com/',
  },
  {
    name: 'Learn',
    href: '',
  },
];

const LandingPageLINKS = [
  {
    name: 'Protocol',
    href: 'https://www.seamlessprotocol.com/',
  },
  {
    name: 'Blog',
    href: '',
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
