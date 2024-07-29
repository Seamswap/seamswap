/* eslint-disable @next/next/no-img-element */
import Container from '@src/components/ui/Container';
import { NextPage } from 'next';
import React from 'react';

const data = {
  id: 1,
  title: 'Introducing Seamswap v1.0.0',
  date: '27 July, 2024',
  image: '/img/changelog_v1.png',
  content: `Before now, there has only been one access point to the ILM market. We are changing that and making it easier to experience the rewards of providing liquidity and trading in the ILM. Enabling faster Integrated Liquidity Market (ILM) strategy position swaps with less transaction fee on Seamless Protocol.`,
};

const Page: NextPage = () => {
  return (
    <>
      <Container className="pb-8">
        <div className="max-w-[960px] mx-auto mb-8 flex flex-col gap-y-6 lg:gap-y-10">
          <div className="left md:w-[70%] max-w-[720px] mx-auto overflow-hidden">
            <img src={data.image} className="w-full h-full object-cover" alt="HeroImg" />
          </div>

          <div className="right md:px-6">
            <div className="content">
              <div className="pb-2 font-medium">{data.date}</div>

              <h1 className="text-4xl xl:text-5xl font-[600] mb-4">{data.title}</h1>

              <p className="lg:text-lg">{data.content}</p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Page;
