import * as React from 'react';
import Navbar from '@src/components/atoms/Navbar';
import { Inter } from 'next/font/google';
import Container from '../ui/Container';

export interface ILayoutProps {
  children: React.ReactNode;
}

const inter = Inter({
  subsets: ['greek', 'cyrillic', 'cyrillic-ext', 'latin', 'latin-ext'],
});

const Layout: React.FC<ILayoutProps> = (props) => {
  return (
    <div className={`w-full min-h-screen ${inter.className} relative`}>
      <Navbar />

      <main className="mt-12">{props.children}</main>

      <Container className="footer py-5 mt-6">
        Powered by <span className="text-primary-900 font-medium">Seamless Protocol</span>
      </Container>
    </div>
  );
};
export default Layout;
