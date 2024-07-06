import { Inter } from 'next/font/google';
import * as React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { push } = useRouter();
  useEffect(() => {
    push('/swap');
  }, []);
  return (
    <section className="flex items-center justify-center h-full my-auto min-h-[80vh]">
      <button className="bg-primary-900 px-5 py-3.5 rounded-md text-white">Connect wallet</button>
    </section>
  );
}
