import React from 'react';
import Link from 'next/link';

import digilogbookLogo from '../../../public/svgs/Digilogbook -1401 1.svg'
import Image from 'next/image';

export default function Navbar() {
    return (
        <div className="navbar  bg-navbar-gradient-shadow absolute top-0 z-50 h-14 md:h-20 ">
            <div className="flex-none w-2/6 md:w-1/12">
                <button className="btn btn-square btn-ghost w-full">
                    <Image src={digilogbookLogo} alt="digilogbookLogo" width={100} height={100} />
                </button>
            </div>
            <div className="flex-1">
            </div>
        </div>
    );
};