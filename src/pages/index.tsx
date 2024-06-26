import Image from "next/image";
import {Inter} from "next/font/google";
import Layout from "@src/components/atoms/Layout";
import * as React from "react";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
    return (
            <section className='flex items-center justify-center h-full my-auto min-h-[80vh]'>
                <button className='bg-primary-900 px-5 py-3.5 rounded-md text-white'>Connect wallet</button>
            </section>
    );
}
