import React from 'react';
import Image from 'next/image';

// assets and mui
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import LoginIcon from '@mui/icons-material/Login';
import digilogbookLogo from '../../../public/svgs/Digilogbook -1401 1.svg'


export default function Navbar() {
    return (
        <div className="navbar  bg-navbar-gradient-shadow flex justify-between absolute top-0 z-50 h-14 md:h-20 lg:px-10 ">
            <div className="flex-none w-2/6 md:w-1/12">
                <button className="btn btn-square btn-ghost w-full">
                    <Image src={digilogbookLogo} alt="digilogbookLogo" width={100} height={100} />
                </button>
            </div>
            <div className=" flex gap-x-2 px-2">
                <LoginIcon sx={{fill:'var(#ebebf0)'}} />
                <NotificationsOutlinedIcon sx={{fill:'var(#ebebf0)', height:'30px',width:'30px'}} />
            </div>
        </div>
    );
};