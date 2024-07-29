import Container from '@src/components/ui/Container';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';


const Page: NextPage = () => {
  return (
    <>
      <Container className="">
        <div className="text-center">
          <h1 className="text-black text-4xl lg:text-5xl font-semibold mb-3">
            Changelog
          </h1>
          <p className="text-black lg:text-lg">Follow updates from our product</p>
        </div>

        <hr className="my-6 border-gray-300" />
      </Container>
    </>
  );
};

export default Page;
