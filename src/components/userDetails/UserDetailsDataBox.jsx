import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// styles
import containers from '@/styles/Containers.module.css'

// mui
import { useMediaQuery } from '@mui/material';

// assets
import flightHour from '@/../public/svgs/flightHour.svg'
import flightQuan from '@/../public/svgs/flightQuantity.svg'
import favicon from '@/../public/images/favicon.ico'
import rightArrowButton from '@/../public/svgs/Right Arrow Button.svg';

const UserDetailsDataBox = ({data}) => {

    const isMobile = useMediaQuery('(max-width:720px)');

    const router = useRouter();

    const handleNavigation = () => {
          router.back();
        };

    return (
        <div className={`w-full min-h-52 rounded-3xl flex justify-between items-center p-4 relative ${containers.darkMainContainer}`}>

            {/* avatar and name */}
            <div className='w-full flex flex-col justify-between items-center gap-y-4'>
                
                {
                    isMobile &&
                    <h1 className='text-lg font-medium'>{data.firstName}&nbsp;{data.lastName}</h1>
                }

                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <Image w={100} h={100} src={favicon} alt='userPicture' />
                    </div>
                </div>

            </div>


            {/* user name and level for desktop */}
            {
                !isMobile && 
                <div className='w-full flex flex-col justify-center items-center gap-y-4'>
                    <h1 className='text-lg font-medium'>{data.firstName}&nbsp;{data.lastName}</h1>
                    <p className='text-xs text-lowOpacityWhite'>گواهینامه {data.levelName}</p>
                </div>
            }


            {/* user data */}
            <div className='w-full flex flex-col justify-between items-center gap-y-4  py-2'>

                {
                    isMobile &&
                    <p className='text-xs text-lowOpacityWhite'>گواهینامه {data.levelName}</p>
                }

                <div className='w-full flex flex-col items-start justify-between gap-y-2 mr-4 text-sm md:pr-[20%]'>
                    <p className='flex gap-x-2'>
                        <Image alt='icon' src={flightQuan} />
                        {data.flightCount} تعداد پرواز
                    </p>
                    <p className='flex gap-x-2'>
                        <Image alt='icon' src={flightHour} />
                        {data.flightHours} ساعت پرواز
                    </p>
                    <p className='flex gap-x-2'>
                        <Image alt='icon' src={flightHour} />
                        {data.coachingHours} ساعت مربی‌گری
                    </p>
                    <p className='flex gap-x-2'>
                        <Image alt='icon' src={flightQuan} />
                        کد کاربری: {data.userId}
                    </p>
                </div>

            </div>

            {/* back button */}
            <Image
                src={rightArrowButton}
                alt="rightArrowButton"
                onClick={handleNavigation}
                className='absolute left-4 top-2 w-8 h-8 transform rotate-180'
            />
            
        </div>
    );
};

export default UserDetailsDataBox;