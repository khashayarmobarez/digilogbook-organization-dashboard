'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

// assets
import dashboard from '../../../../public/svgs/dashboard.svg';
import blackDashboard from '../../../../public/svgs/dashboard-black.svg';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


export default function SideMenu() {

    const pathname = usePathname();
    const router = useRouter();

    const [usersOpen, setUsersOpen] = useState(false);

    return (
        <div className=" absolute right-[-100vw] md:right-0 flex flex-col h-full z-50 w-full md:w-1/6 ">
            <div className='w-1/2 md:w-full h-full md:mt-36 flex flex-col gap-y-4 '>

                <button className={`btn w-full md:w-4/5 rounded-l-3xl flex justify-between rounded-r-none font-normal text-sm
                ${pathname === '/dashboard' ? 'text-primaryDarkHover bg-accentColorNormal' :'text-mainTextColor bg-navbar-gradient-shadow' } hover:text-mainTextColor `}
                onClick={() => router.push('/dashboard')}>
                    <Image src={pathname === '/dashboard' ? blackDashboard : dashboard} alt='icon' width={20} height={20} />
                    داشبورد انجمن
                    <div/>
                </button>

                <div className="w-full">
                    <button 
                    className="btn w-full md:w-4/5 rounded-l-3xl flex justify-between rounded-r-none font-normal text-sm text-mainTextColor bg-navbar-gradient-shadow"
                    onClick={() => setUsersOpen(!usersOpen)}>
                        <Image src={dashboard} alt='icon' width={20} height={20} />
                        کاربران
                        <ArrowBackIosNewIcon sx={{ transition: 'transform 0.3s ease-in-out', transform:usersOpen ? 'rotate(90deg)' : 'rotate(-90deg)' }} />
                    </button>
                    {
                        usersOpen && 
                        <ul className="w-8/12 bg-primaryADarkHover rounded-bl-2xl flex flex-col text-mainTextColor">
                            <li className="flex w-full h-full justify-between items-center py-5 pl-8 pr-12 hover:bg-accentColorNormal hover:text-primaryDarkHover">
                                <Image src={dashboard} alt='icon' width={20} height={20} />
                                <p className="text-sm">هنرجویان</p>
                            </li>
                            <li className="flex w-full h-full justify-between items-center py-5 pl-8 pr-12 hover:bg-accentColorNormal hover:text-primaryDarkHover">
                                <Image src={dashboard} alt='icon' width={20} height={20} />
                                <p className="text-sm">خلبانان آزاد</p>
                            </li>
                            <li className="flex w-full h-full justify-between items-center py-5 pl-8 pr-12 hover:bg-accentColorNormal hover:text-primaryDarkHover">
                                <Image src={dashboard} alt='icon' width={20} height={20} />
                                <p className="text-sm">خلبانان تندم</p>
                            </li>
                            <li className="flex w-full h-full justify-between items-center py-5 pl-8 pr-12 rounded-bl-xl hover:bg-accentColorNormal hover:text-primaryDarkHover">
                                <Image src={dashboard} alt='icon' width={20} height={20} />
                                <p className="text-sm">مربیان</p>
                            </li>
                        </ul>
                    }
                </div>

                <button className="btn md:w-4/5 rounded-l-3xl flex justify-between rounded-r-none font-normal text-sm text-mainTextColor bg-navbar-gradient-shadow">
                    <Image src={dashboard} alt='icon' width={20} height={20} />
                    باشگاه‌ها
                    <div/>
                </button>
                
            </div>
        </div>
    );
}