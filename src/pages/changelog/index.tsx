/* eslint-disable @next/next/no-img-element */
import Container from '@src/components/ui/Container';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

const changeLogData = [
  {
    id: 1,
    title: 'Introducing Seamswap v1.0.0',
    date: '27 July, 2024',
    image: '/img/changelog_v1.png',
    content: `Before now, there has only been one access point to the ILM market. We are changing that and making it easier to experience the rewards of providing liquidity and trading in the ILM. Enabling faster Integrated Liquidity Market (ILM) strategy position swaps with less transaction fee on Seamless Protocol.`,
  },
];

const Page: NextPage = () => {
  return (
    <>
      <Container className="pt-4">
        <div className="text-center">
          <h1 className="text-black text-4xl lg:text-5xl font-semibold mb-3">
            Changelog
          </h1>
          <p className="text-black lg:text-lg">Follow updates from our product</p>
        </div>

        <hr className="my-8 md:my-12 border-gray-300" />
      </Container>

      <Container className="listing mb-8">
        {changeLogData.map((data, index) => (
          <ChangeLogCard key={index} data={data} />
        ))}
      </Container>
    </>
  );
};

const ChangeLogCard = ({ data }: { data: any }) => {
  return (
    <div className="mb-8 flex flex-col md:flex-row gap-x-5 gap-y-2">
      <div className="left md:w-[46%] lg:w-[45%] rounded-[20px] border-primary overflow-hidden">
        <img src={data.image} className="w-full h-full object-cover" alt="HeroImg" />
      </div>

      <div className="right md:px-6 md:w-[54%] lg:w-[55%]">
        <div className="content">
          <div className="pb-2 font-medium">{data.date}</div>

          <h1 className="text-4xl xl:text-5xl font-[600] mb-4">{data.title}</h1>

          <p className="lg:text-lg">
            {data.content}{' '}
            <Link href={'/changelog/1'} className="text-primary-900 underline">
              Read more
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
