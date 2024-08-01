import * as React from 'react';
import Navbar from '@src/components/atoms/Navbar';
import { Inter } from 'next/font/google';
import Container from '../ui/Container';
import { useRouter } from 'next/router';
import Link from 'next/link';

export interface ILayoutProps {
  children: React.ReactNode;
}

const inter = Inter({
  subsets: ['greek', 'cyrillic', 'cyrillic-ext', 'latin', 'latin-ext'],
});

const Layout: React.FC<ILayoutProps> = (props) => {
  const { pathname } = useRouter();
  const dashboardLinks = ['/swap', '/explorer', '/learn'];
  const isDashboardPage = dashboardLinks.includes(pathname);

  return (
    <div className={`w-full min-h-screen ${inter.className} relative`}>
      <Navbar isDashboardPage={isDashboardPage} />

      <main className="mt-12 min-h-[60vh]">{props.children}</main>

      <Container className="footer py-6">
        {!isDashboardPage ? (
          <div className="text-center">
            Copyrights © 2024 All Rights Reserved by Seamswap
          </div>
        ) : (
          <div className="mt-6">
            Powered by{' '}
            <Link
              href="https://www.seamlessprotocol.com/"
							target='_blank'
              className="text-primary-900 font-medium"
            >
              Seamless Protocol
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Layout;
