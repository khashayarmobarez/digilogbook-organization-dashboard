'use client'
import Image from 'next/image';
import React from 'react';

// assets
import test from '../../../../public/vercel.svg';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


export default function SideMenu() {
    return (
            <div className=" absolute right-0 flex flex-col h-full z-50 w-full md:w-1/6 ">
                <div className='w-1/2 md:w-full h-full md:mt-36 flex flex-col gap-y-4'>

                    <button className="btn w-full md:w-4/5 rounded-l-3xl flex justify-between rounded-r-none font-normal text-sm">
                        <Image src={test} alt='icon' width={20} height={20} />
                        داشبورد انجمن
                        <div/>
                    </button>

                    <div className="w-full">
                        <button className="btn w-full md:w-4/5 rounded-l-3xl flex justify-between rounded-r-none font-normal text-sm">
                            <Image src={test} alt='icon' width={20} height={20} />
                            کاربران
                            <ArrowBackIosNewIcon sx={{ transform: 'rotate(-90deg)' }} />
                        </button>
                    </div>

                    <button className="btn md:w-4/5 rounded-l-3xl flex justify-between rounded-r-none font-normal text-sm">
                        <Image src={test} alt='icon' width={20} height={20} />
                        باشگاه‌ها
                        <div/>
                    </button>
                    
                </div>
            </div>
    );
}