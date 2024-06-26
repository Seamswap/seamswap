import * as React from "react";
import Image from "next/image";

export interface INavbarProps {
}

const LINKS = [
    {
        name: 'Swap',
        href: '/swap',
    },
    {
        name: 'Explorer',
        href: '/explorer',
    },
    {
        name: 'Protocol',
        href: '/protocol',
    }, {
        name: 'Learn',
        href: '/learn',
    },
]
const Navbar: React.FC<INavbarProps> = props => {
    return (<nav className='px-5 py-4 flex justify-between items-center mx-auto w-3/4 bg-white mt-7 border-primary rounded-xl'>
        <Image src={'/logo.png'} alt={'Logo'} width={168} height={40} className='h-10 w-auto'/>
        <div className='space-x-16'>
            {LINKS.map(link => (
                <a key={link.name} href={link.href} className='font-medium text-secondary-700'>{link.name}</a>
            ))}
        </div>
        <button className='bg-primary-900 px-5 py-3.5 rounded-md text-white'>Connect wallet</button>
    </nav>);
};
export default Navbar;
