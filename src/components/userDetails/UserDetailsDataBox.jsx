import React from 'react';
import Image from 'next/image';

import containers from '@/styles/Containers.module.css'

// assets
import flightHour from '@/../public/svgs/flightHour.svg'
import flightQuan from '@/../public/svgs/flightQuantity.svg'
import YellowPlus from '@/../public/svgs/yellowPlus.svg'
import favicon from '@/../public/images/favicon.ico'

const UserDetailsDataBox = () => {
    return (
        <div className={`w-full min-h-52 rounded-3xl flex justify-between items-center p-4 ${containers.darkMainContainer}`}>

            <div className='w-full flex flex-col justify-between items-center gap-y-4'>
                
                <h1>name</h1>

                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <Image w={100} h={100} src={favicon} alt='userPicture' />
                    </div>
                </div>

            </div>

            <div className='w-full flex flex-col justify-between items-center gap-y-4'>

                <p>certificate level</p>

                <div className='w-full flex flex-col items-center justify-between gap-y-2'>
                    <p className='flex gap-x-2'>
                        <Image alt='icon' src={flightQuan} />
                        certificate level
                    </p>
                    <p className='flex gap-x-2'>
                        <Image alt='icon' src={flightHour} />
                        certificate level
                    </p>
                    <p className='flex gap-x-2'>
                        <Image alt='icon' src={flightHour} />
                        certificate level
                    </p>
                    <p className='flex gap-x-2'>
                        <Image alt='icon' src={flightQuan} />
                        certificate level
                    </p>
                </div>

            </div>
            
        </div>
    );
};

export default UserDetailsDataBox;