'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// styles
import otherStyles from '@/styles/OtherStyles.module.css';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectAppControl, updateSideMenu } from '@/utils/redux toolkit/appControlStates/appSlice';

// utils and api
import { useLogout } from '@/api/authentication';
import Cookies from 'js-cookie';

// assets and mui
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import digilogbookLogo from '../../../public/svgs/Digilogbook -1401 1.svg'
import { usePathname, useRouter } from 'next/navigation';


export default function Navbar() {

    const token = Cookies.get('token');
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch()
    // get token cookie

    // redux
    const { isSideMenuOpen } = useSelector(selectAppControl)
    
    const {  mutate: logout } = useLogout();

    const hasDashboardInPath = pathname.includes('/dashboard');

    const handleLogout = () => {
        // call logout api
        logout();
        // remove token from cookies
        Cookies.remove('token');
        // redirect to login page
        router.push('/login');
    }

    const toggleSideMenu = () => {
        dispatch(updateSideMenu(!isSideMenuOpen));
    }

    return (
        <div className="navbar bg-navbar-gradient-shadow flex justify-between fixed top-0 z-50 h-14 md:h-20 lg:px-10 ">
            <div className="flex-none w-2/6 md:w-1/12">
                <button className="btn btn-square btn-ghost w-full">
                    <Image src={digilogbookLogo} alt="digilogbookLogo" width={100} height={100} />
                </button>
            </div>
            <div className=" flex gap-x-2 px-2">
                {
                    // condititon to cehck if the path starts with '/dashboard' 
                    hasDashboardInPath &&
                    <>
                        <LogoutIcon sx={{fill:'var(--primary-light-hover)'}} onClick={handleLogout} />
                        <NotificationsOutlinedIcon sx={{fill:'var(--primary-light-hover)', height:'30px',width:'30px'}} />
                        <label className={`${otherStyles.burger}`} htmlFor="burger" >
                            <input type="checkbox" id="burger" 
                            onClick={toggleSideMenu}
                            />
                                <span></span>
                                <span></span>
                                <span></span>
                        </label>
                    </>
                }
            </div>
        </div>
    );
};