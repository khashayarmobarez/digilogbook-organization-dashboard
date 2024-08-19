
import React from 'react';
import Image from "next/image";

// assets
import userIcon from "@/../public/svgs/user.svg"; 

// styles
import container from '@/styles/Containers.module.css';

const UserDataBox = ({userData, isForClub}) => {
    
    return (
        <>
            {
                userData &&
                <div className={`${container.container2withHover} w-full min-h-12 flex justify-between items-center pl-10 pr-4 md:pl-40 rounded-2xl`}>
                    <Image src={userIcon} alt='icon' className='ml-[-25%]' />
                    {
                        userData.clubName &&
                            <p className='w-20 mr-10'>{userData.clubName}</p>
                    }
                    <p className='w-20 text-sm md:w-32 md:text-base'>{userData.fullName && userData.fullName}</p>
                    {
                        userData.id && !isForClub &&
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
                </div>
            }
        </>
    );
};

export default UserDataBox;