'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectAppControl, updateSideMenu } from '@/utils/redux toolkit/appControlStates/appSlice';

// assets
import dashboard from '@/../public/svgs/dashboard.svg';
import blackDashboard from '@/../public/svgs/dashboard-black.svg';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import usersIcon from '@/../public/svgs/users.svg'
import blackUsersIcon from '@/../public/svgs/users-black.svg'
import userIcon from '@/../public/svgs/user.svg'
import blackUserIcon from '@/../public/svgs/user-black.svg'


export default function SideMenu() {

    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch()

    // redux
    const { isSideMenuOpen } = useSelector(selectAppControl)
    
    const [usersOpen, setUsersOpen] = useState(false);

    const handleClickSection = (path: string) => {
        router.push(path);
        dispatch(updateSideMenu(!isSideMenuOpen));
    }

    return (
        <div className={` fixed flex flex-col h-full rounded-bl-2xl z-40 w-full  pt-28 transition-all ease-out duration-300 delay-75 md:pt-0 md:bg-inherit md:w-1/6 md:right-0
        ${isSideMenuOpen ? 'right-0 backdrop-blur-xl' : 'right-[-100vw] backdrop-blur-none'}`}>
            
            <div className='w-5/6 md:w-full h-full md:mt-36 flex flex-col gap-y-4 '>

                <button className={`btn w-full md:w-4/5 rounded-l-3xl flex justify-between rounded-r-none font-normal text-sm
                ${pathname === '/dashboard' ? 'text-primaryADarkHover bg-accentColorNormal' :'text-mainTextColor bg-navbar-gradient-shadow' } hover:text-mainTextColor `}
                onClick={() => handleClickSection('/dashboard')}>
                    <Image src={pathname === '/dashboard' ? blackDashboard : dashboard} alt='icon' width={20} height={20} />
                    داشبورد انجمن
                    <div/>
                </button>
                
                <div className='w-full flex flex-col'>
                    <button 
                    className={`btn w-full md:w-4/5 rounded-l-3xl flex justify-between rounded-r-none font-normal text-sm hover:text-white
                    ${pathname === '/dashboard/users' ? 'text-primaryADarkHover bg-accentColorNormal' :'text-mainTextColor bg-navbar-gradient-shadow' }`}
                    onClick={() => {
                        setUsersOpen(!usersOpen);
                        router.push('/dashboard/users');
                    }}>
                        <Image src={pathname === '/dashboard/users' ? blackUsersIcon : usersIcon} alt='icon' width={20} height={20} />
                        کاربران
                        <ArrowBackIosNewIcon sx={{ transition: 'transform 0.3s ease-in-out', transform:usersOpen ? 'rotate(90deg)' : 'rotate(-90deg)' }} />
                    </button>

                    {
                        usersOpen && 
                        <ul className="w-10/12 md:w-8/12 bg-primaryADarkHover rounded-bl-2xl flex flex-col text-mainTextColor">

                            <li className={`flex w-full h-full justify-between items-center py-5 pl-8 pr-12 hover:bg-accentColorNormal hover:text-primaryADarkHover
                            ${pathname === '/dashboard/users/students' ? 'text-primaryADarkHover bg-accentColorNormal' :'' }`}
                            onClick={() => handleClickSection('/dashboard/users/students')}>
                                <Image src={pathname === '/dashboard/users/students' ? blackUserIcon : userIcon}
                                alt='icon' width={20} height={20} />
                                <p className="text-sm">هنرجویان</p>
                            </li>

                            <li className={`flex w-full h-full justify-between items-center py-5 pl-8 pr-12 hover:bg-accentColorNormal hover:text-primaryADarkHover
                            ${pathname === '/dashboard/users/freePilots' ? 'text-primaryADarkHover bg-accentColorNormal' :'' }`}
                            onClick={() => handleClickSection('/dashboard/users/freePilots')}>
                                <Image src={pathname === '/dashboard/users/freePilots' ? blackUserIcon : userIcon}
                                alt='icon' width={20} height={20} />
                                <p className="text-sm">خلبانان آزاد</p>
                            </li>
                            <li className={`flex w-full h-full justify-between items-center py-5 pl-8 pr-12 hover:bg-accentColorNormal hover:text-primaryADarkHover
                            ${pathname === '/dashboard/users/tandemPilots' ? 'text-primaryADarkHover bg-accentColorNormal' :'' }`}
                            onClick={() => handleClickSection('/dashboard/users/tandemPilots')}>
                                <Image src={pathname === '/dashboard/users/tandemPilots' ? blackUserIcon : userIcon}
                                alt='icon' width={20} height={20} />
                                <p className="text-sm">خلبانان تندم</p>
                            </li>
                            <li className={`flex w-full h-full justify-between items-center py-5 pl-8 pr-12 rounded-bl-xl hover:bg-accentColorNormal hover:text-primaryADarkHover
                            ${pathname === '/dashboard/users/coaches' ? 'text-primaryADarkHover bg-accentColorNormal' :'' }`}
                            onClick={() => handleClickSection('/dashboard/users/coaches')}>
                                <Image src={pathname === '/dashboard/users/coaches' ? blackUserIcon : userIcon}
                                alt='icon' width={20} height={20} />
                                <p className="text-sm">مربیان</p>
                            </li>
                        </ul>
                    }
                </div>

                <button className={`btn md:w-4/5 rounded-l-3xl flex justify-between rounded-r-none font-normal text-sm
                ${pathname === '/dashboard/clubs' ? 'text-primaryADarkHover bg-accentColorNormal' :'text-mainTextColor bg-navbar-gradient-shadow' } hover:text-mainTextColor `}
                onClick={() => handleClickSection('/dashboard/clubs')}>
                    <Image src={pathname === '/dashboard/clubs' ? blackDashboard : dashboard} alt='icon' width={20} height={20} />
                    باشگاه‌ها
                    <div/>
                </button>
                
            </div>
        </div>
    );
}