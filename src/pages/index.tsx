/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Container from '@src/components/ui/Container';
import Link from 'next/link';
import WalletAdd from '@src/components/icons/WalletAdd.icon';

export default function Home() {
  // const { push } = useRouter();
  // useEffect(() => {
  //   push('/swap');
  // }, []);

  return (
    <>
      <div className="hero">
        <Container>
          <div className="grid md:grid-cols-2 gap-x-5 gap-y-4">
            <div className="left p-6 lg:p-8 lg:pt-14 pb-12 bg-[#00B8A1] rounded-[20px] relative overflow-hidden">
              <div className="content lg:w-[94%] text-[#001F1B] z-10 relative">
                <div className="px-[16px] py-[9px] mb-5 bg-[#001f1b] rounded-[100px] justify-center items-center inline-flex">
                  <span className="text-[#ccfff8] text-sm">
                    Built on Seamless Protocol
                  </span>
                </div>

                <h1 className="text-4xl xl:text-[54px] xl:leading-[58px] font-[700] mb-5 max-w-[400px]">
                  Seamlessly swap between ILM positions
                </h1>

                <p className="lg:text-[20px] max-w-[440px]">
                  Enabling faster Integrated Liquidity Market (ILM) strategy position
                  swaps with less transaction fee on Seamless Protocol.
                </p>

                <Link
                  href={'/swap'}
                  className="bg-[#001F1B] mt-6 px-6 py-3 gap-x-3 rounded-md text-white inline-flex items-center"
                >
                  <WalletAdd className="" />
                  <span className="">Get started</span>
                </Link>
              </div>

              <div className="bgElement absolute right-0 bottom-0">
                <HeroBgElement />
              </div>
            </div>

            <div className="right rounded-[20px] border-[0.5px] border-[#00B8A1] overflow-hidden">
              <img
                src="/img/heroImage.png"
                className="h-full object-cover"
                alt="HeroImg"
              />
            </div>
          </div>
        </Container>
      </div>

      <Container className="mt-8">
        <div className="p-6 pb-12 bg-[#001F1B] rounded-[20px] relative overflow-hidden">
          <div className="content">
            {/*  */}
            {/*  */}
          </div>
        </div>
      </Container>
    </>
  );
}

const HeroBgElement = () => (
  <svg
    className="w-[74px] md:w-[100px] xl:w-[130px]"
    viewBox="0 0 189 389"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="1.29904"
      y="0.75"
      width="169.133"
      height="332.606"
      transform="matrix(0.866025 -0.5 0 1 0.174038 86.7162)"
      stroke="#001F1B"
      strokeWidth={3}
      strokeDasharray="6 6"
    />
    <rect
      x="1.29904"
      y="0.75"
      width="169.133"
      height="332.606"
      transform="matrix(0.866025 -0.5 0 1 60.801 107.286)"
      fill="#00B8A1"
      stroke="#001F1B"
      strokeWidth={3}
      strokeDasharray="6 6"
    />
    <rect
      x="1.29904"
      y="0.75"
      width="63.6314"
      height="192.717"
      transform="matrix(0.866025 -0.5 0 1 106.27 150.886)"
      fill="#00B8A1"
      stroke="#001F1B"
      strokeWidth={3}
      strokeDasharray="6 6"
    />
    <path
      d="M1.62402 87.1493L62.7909 107.719"
      stroke="#001F1B"
      strokeWidth={3}
      strokeDasharray="6 6"
    />
    <path
      d="M148.316 1.6239L208.942 22.1933"
      stroke="#001F1B"
      strokeWidth={3}
      strokeDasharray="6 6"
    />
  </svg>
);
