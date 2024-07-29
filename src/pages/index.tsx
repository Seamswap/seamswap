/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Container from '@src/components/ui/Container';
import Link from 'next/link';
import WalletAdd from '@src/components/icons/WalletAdd.icon';
import FeaturesSection from '@src/components/molecule/FeaturesSection';
import Input from '@src/components/ui/Input';

export default function Home() {
  // const { push } = useRouter();
  // useEffect(() => {
  //   push('/swap');
  // }, []);

  return (
    <>
      <Container className="hero">
        <div className="grid md:grid-cols-2 gap-x-5 gap-y-4">
          <div className="left p-6 lg:p-8 lg:pt-12 pb-12 bg-[#00B8A1] rounded-[20px] relative overflow-hidden">
            <div className="content lg:w-[92%] text-grey-960 z-10 relative">
              <div className="px-[16px] py-[9px] mb-5 bg-grey-960 rounded-[100px] justify-center items-center inline-flex">
                <span className="text-[#ccfff8] text-sm">Built on Seamless Protocol</span>
              </div>

              <h1 className="text-4xl xl:text-[54px] xl:leading-[58px] font-[700] mb-4 max-w-[400px]">
                Seamlessly swap between ILM positions
              </h1>

              <p className="lg:text-[18px] max-w-[400px] mb-5">
                Enabling faster Integrated Liquidity Market (ILM) strategy position swaps
                with less transaction fee on Seamless Protocol.
              </p>

              <Link
                href={'/swap'}
                className="bg-grey-960 px-6 py-3 gap-x-3 rounded-md text-white inline-flex items-center"
              >
                <WalletAdd className="" />
                <span className="">Get started</span>
              </Link>
            </div>

            <div className="bgElement absolute right-0 bottom-0 w-[74px] lg:w-[20%] xl:lg:w-[27%] max-w-[180px]">
              <HeroBgElement />
            </div>
          </div>

          <div className="right rounded-[20px] border-primary overflow-hidden">
            <img src="/img/heroImage.png" className="w-full h-full object-cover" alt="HeroImg" />
          </div>
        </div>
      </Container>

      <Container className="mt-6">
        <div className="banner1 bg-grey-960 rounded-[20px] relative overflow-hidden">
          <div className="content stats px-6 py-14 text-white">
            <div className="item">
              <b>3+</b>
              <span>ILM Strategies</span>
            </div>

            <div className="item">
              <b>100+%</b>
              <span>Distributed in rewards</span>
            </div>

            <div className="item">
              <b>Solid</b>
              <span>Secured and tested protocol</span>
            </div>

            <div className="item">
              <b>12</b>
              <span>Streams of earning</span>
            </div>
          </div>
        </div>
      </Container>

      <Container className="mt-6">
        <FeaturesSection />
      </Container>

      <Container className="mt-6" >
        <div id='newsletter' className="banner1 bg-grey-960 rounded-[20px] relative overflow-hidden">
          <div className="content px-6 lg:px-8 py-14 md:w-[80%] lg:w-[64%] text-white">
            <h3 className="text-3xl md:text-5xl xl:text-[44px] !leading-[55px] font-semibold mb-2">
              Stay updated on what we’re building.
            </h3>

            <p>Sign up to our newsletter.</p>

            <div className="mt-5 items-center gap-3 inline-flex">
              <Input
                className="bg-white text-white px-4 py-3 text-base rounded-[10px] w-full xl:min-w-[380px]"
                placeholder="Enter your email address"
              />

              <div className="bg-[#ccfff8] py-2.5 px-4 rounded-[10px] justify-center items-center gap-2.5 inline-flex">
                <span className="text-[#001f1b] font-medium lg:text-lg">Subscribe</span>
              </div>
            </div>
          </div>

          <div className="bgElement absolute right-2 lg:right-10 bottom-0 w-[120px] md:w-[40%]">
            <NewsletterBgElement className="" />
          </div>
        </div>
      </Container>
    </>
  );
}

const HeroBgElement = () => (
  <svg
    className="w-full"
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

const NewsletterBgElement = ({ className }: { className?: string }) => (
  <svg
    className={'w-full ' + className}
    viewBox="0 0 539 289"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="1.4388"
      y="1.07592"
      width="395.209"
      height="436.001"
      transform="matrix(0.959202 -0.282722 0 1 1.0587 112.989)"
      stroke="#CCFFF9"
      stroke-width="3"
      stroke-dasharray="6 6"
    />
    <rect
      x="1.4388"
      y="1.07592"
      width="395.209"
      height="436.001"
      transform="matrix(0.959202 -0.282722 0 1 156.397 139.896)"
      fill="#001F1B"
      stroke="#CCFFF9"
      stroke-width="3"
      stroke-dasharray="6 6"
    />
    <rect
      x="1.4388"
      y="1.07592"
      width="151.143"
      height="253.014"
      transform="matrix(0.959202 -0.282722 0 1 272.902 196.929)"
      fill="#001F1B"
      stroke="#CCFFF9"
      stroke-width="3"
      stroke-dasharray="6 6"
    />
    <path
      d="M5.16211 113.999L161.888 140.905"
      stroke="#CCFFF9"
      stroke-width="3"
      stroke-dasharray="6 6"
    />
    <path
      d="M381.025 2.12415L536.365 29.0306"
      stroke="#CCFFF9"
      stroke-width="3"
      stroke-dasharray="6 6"
    />
  </svg>
);
