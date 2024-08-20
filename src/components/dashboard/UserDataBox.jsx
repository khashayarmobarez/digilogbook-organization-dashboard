'use client';
import React from 'react';
import Image from "next/image";

// assets
import userIcon from "@/../public/svgs/user.svg"; 

// styles
import container from '@/styles/Containers.module.css';
import { useRouter } from 'next/navigation';

const UserDataBox = ({userData, isForClub, isForCourseDetails}) => {

    const router = useRouter();

    const handleSendToUserDetails = () => {
        !isForCourseDetails && router.push(`/dashboard/userDetails/${userData.id}`);
    };
    
    return (
        <>
            {
                userData &&
                <div className={`${container.container2withHover} w-full min-h-12 flex justify-between items-center pl-10 pr-4 md:pl-40 rounded-2xl`}
                onClick={() => handleSendToUserDetails()}>
                    <Image src={userIcon} alt='icon' className='ml-[-25%]' />
                    {
                        userData.clubName &&
                        <p className='w-20 mr-10'>{userData.clubName}</p>
                    }
                    {
                        isForCourseDetails && userData.percent >= 0 &&
                        <p className='text-accentColorNormal mr-4'>{userData.percent}%</p>
                    }
                    {   
                        userData.fullName &&
                        <p className='w-20 text-sm md:w-32 md:text-base'>{userData.fullName}</p>
                    }
                    {   
                        userData.name &&
                        <p className=' text-sm md:text-base'>{userData.name}</p>
                    }
                    {
                        userData.id && !isForClub && !isForCourseDetails &&
                        <p className='md:-mr-28 -mr-16'>{userData.id}</p>
                    }
                    {
                        userData.flightHours &&
                            <p>{userData.flightHours}</p>
                    }
                    {
                        userData.coachingHours &&
                            <p>{userData.coachingHours}</p>
                    }
                    {
                        userData.studentCount && isForClub &&
                            <p>{userData.studentCount}</p>
                    }
                    {
                        userData.status && isForCourseDetails &&
                            <p>وضعیت: {userData.status}</p>
                    }
                </div>
            }
        </>
    );
};

export default UserDataBox;