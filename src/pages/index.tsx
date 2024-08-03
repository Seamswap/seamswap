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
  return null;
}
