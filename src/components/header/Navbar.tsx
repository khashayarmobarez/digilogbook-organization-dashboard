'use client'
import React from 'react';
import Image from 'next/image';

// utils and api
import { useLogout } from '@/api/authentication';
import Cookies from 'js-cookie';

// assets and mui
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import digilogbookLogo from '../../../public/svgs/Digilogbook -1401 1.svg'
import { useRouter } from 'next/navigation';


export default function Navbar() {

    const router = useRouter();
    const {  mutate: logout } = useLogout();

    const handleLogout = () => {
        // call logout api
        logout();
        // remove token from cookies
        Cookies.remove('token');
        // redirect to login page
        router.push('/login');
    }

    return (
        <div className="navbar  bg-navbar-gradient-shadow flex justify-between absolute top-0 z-50 h-14 md:h-20 lg:px-10 ">
            <div className="flex-none w-2/6 md:w-1/12">
                <button className="btn btn-square btn-ghost w-full">
                    <Image src={digilogbookLogo} alt="digilogbookLogo" width={100} height={100} />
                </button>
            </div>
            <div className=" flex gap-x-2 px-2">
                <LogoutIcon sx={{fill:'var(--primary-light-hover)'}} onClick={handleLogout} />
                <NotificationsOutlinedIcon sx={{fill:'var(--primary-light-hover)', height:'30px',width:'30px'}} />
            </div>
        </div>
    );
};