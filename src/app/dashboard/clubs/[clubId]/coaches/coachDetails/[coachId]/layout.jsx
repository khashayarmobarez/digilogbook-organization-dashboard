'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// utils
import { useAClubCoachDetails } from '@/api/useClub';

// styles
import containers from '@/styles/Containers.module.css';

// assets
import flightQuantity from '@/../public/svgs/flightQuantity.svg'
import flightHour from '@/../public/svgs/flightHour.svg'
import userIcon from '@/../public/svgs/user.svg'
import noProfilePicturePic from '@/../public/svgs/no-profile-picture-icon.svg';


const ACoachDetailsLayout = ({ children, params }) => {

    const { coachId, clubId } = params

    const { data: clubCoachData, isLoading:clubCoachLoading, error: clubCoachError } = useAClubCoachDetails(coachId, clubId);

    return (
        <div className='w-[90%] h-full flex flex-col items-center'>

            {
                clubCoachData &&
                <div className={`${containers.darkMainContainer} w-full rounded-2xl flex flex-col py-6 my-6 items-center justify-between gap-y-8`}>

                    <div className='w-[90%] flex justify-between items-center'>
                        <p>
                            {clubCoachData.data.name}
                        </p>
                        <p className='flex'> 
                            <span className='text-lowOpacityWhite'>وضعیت:&nbsp;</span>
                            {
                                clubCoachData.data.status === 'Active' && 
                                <p className='text-accentColorNormal'>فعال</p>
                            }
                            {
                                clubCoachData.data.status === 'Disabled' && 
                                <p className='text-warningNormal'>غیر فعال</p>
                            }
                            {
                                clubCoachData.data.status === 'Finished' && 
                                <p className=''>تمام شده</p>
                            }
                        </p>
                    </div>

                    <div className='w-[90%] flex justify-between items-center md:gap-x-10'>
                        <div className="avatar">
                            <div className="w-24 rounded-full">
                            <Image
                                width={100}    
                                height={100}   
                                src={clubCoachData.data.image ? clubCoachData.data.image.path : noProfilePicturePic} 
                                alt='userPicture' 
                            />
                            </div>
                        </div>

                        <div className='w-full flex flex-col md:flex-row md:justify-between pr-4 gap-y-2'>
                            <div className='flex items-center justify-start gap-x-2'>
                                <Image 
                                src={flightQuantity} 
                                alt='icon'
                                />
                                <p>{clubCoachData.data.studentsCount} تعداد هنرجویان</p>
                            </div>
                            <div className='flex items-center justify-start gap-x-2'>
                                <Image 
                                src={flightHour} 
                                alt='icon'
                                />
                                <p>{clubCoachData.data.coachingHours} ساعت مربیگری</p>
                            </div>
                            <div className='flex items-center justify-start gap-x-2'>
                                <Image 
                                width={22}
                                height={22}
                                src={userIcon} 
                                alt='icon'
                                />
                                <p>کد عضویت : {clubCoachData.data.id}</p>
                            </div>
                        </div>

                    </div>

                </div>
            }

            {children}

        </div>
    );
}

export default ACoachDetailsLayout;