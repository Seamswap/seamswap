import * as React from 'react';
import Navbar  from '@src/components/atoms/Navbar';
import { Inter } from 'next/font/google';

export interface ILayoutProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ['greek', 'cyrillic', 'cyrillic-ext', 'latin', 'latin-ext'] });


const Layout: React.FC<ILayoutProps> = props => {

  return (
    <main className={`w-full min-h-screen ${inter.className} relative`}>
      <Navbar />
      {props.children}
      <span className="absolute bottom-4 left-4">Powered by <span className="text-primary-900 font-medium">Seamless Protocol</span></span>
    </main>);
};
export default Layout;
