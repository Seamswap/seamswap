import * as React from 'react';
import Navbar from '@src/components/atoms/Navbar';
import { Inter } from 'next/font/google';
import Container from '../ui/Container';
import { useRouter } from 'next/router';

export interface ILayoutProps {
  children: React.ReactNode;
}

const inter = Inter({
  subsets: ['greek', 'cyrillic', 'cyrillic-ext', 'latin', 'latin-ext'],
});

const Layout: React.FC<ILayoutProps> = (props) => {
  const { pathname } = useRouter();
  const landingPageLinks = ['/', '/protocol', '/blog', '/changelog'];
  const isLandingPage = landingPageLinks.includes(pathname);

  return (
    <div className={`w-full min-h-screen ${inter.className} relative`}>
      <Navbar isLandingPage={isLandingPage} />

      <main className="mt-12">{props.children}</main>

      <Container className="footer py-5">
        {isLandingPage ? (
          <div className="text-center">
            Copyrights © 2024 All Rights Reserved by Seamswap
          </div>
        ) : (
          <div className="mt-6">
            Powered by{' '}
            <span className="text-primary-900 font-medium">Seamless Protocol</span>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Layout;
