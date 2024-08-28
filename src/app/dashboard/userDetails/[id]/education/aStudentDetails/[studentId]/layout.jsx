'use client'
import React from 'react';
import Image from 'next/image';

// utils
import { useAStudentDataFromACourse } from '@/api/courseDetails';

// styles
import containers from '@/styles/Containers.module.css';

// assets
import flightQuantity from '@/../public/svgs/flightQuantity.svg'
import flightHour from '@/../public/svgs/flightHour.svg'
import userIcon from '@/../public/svgs/user.svg'

// mui
import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';

const AStudentDetailsLayout = ({ children, params }) => {

    const {id, studentId} = params

    const { data: studentData, isLoading } = useAStudentDataFromACourse(studentId, id)

    return (
        <div className='w-full h-full flex flex-col items-center'>

            {
                studentData &&
                <div className={`${containers.darkMainContainer} w-[90%] rounded-2xl flex flex-col py-6 my-6 items-center justify-between gap-y-8`}>

                    <div className='w-[90%] flex justify-between items-center'>
                        <p>
                            {studentData.data.name}
                        </p>
                        <p className='flex'> 
                            <span className='text-lowOpacityWhite'>وضعیت:&nbsp;</span>
                            {
                                studentData.data.status === 'Active' && 
                                <p className='text-accentColorNormal'>فعال</p>
                            }
                            {
                                studentData.data.status === 'Disabled' && 
                                <p className='text-warningNormal'>غیر فعال</p>
                            }
                            {
                                studentData.data.status === 'Finished' && 
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
                                src={studentData.data.image ? studentData.data.image.path : ''} 
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
                                <p>{studentData.data.flightCounts} تعداد پرواز</p>
                            </div>
                            <div className='flex items-center justify-start gap-x-2'>
                                <Image 
                                src={flightHour} 
                                alt='icon'
                                />
                                <p>{studentData.data.flightHours} ساعت پرواز</p>
                            </div>
                            <div className='flex items-center justify-start gap-x-2'>
                                <Image 
                                width={22}
                                height={22}
                                src={userIcon} 
                                alt='icon'
                                />
                                <p>کد کاربری : {studentData.data.userId}</p>
                            </div>
                        </div>

                    </div>

                    <div className='w-[90%] flex flex-col justify-between items-center gap-y-4'>
                        <div className='w-full flex justify-between'>
                            <p>درصد پیشرفت</p>
                            <p>{studentData.data.percent}%</p>
                        </div>
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress 
                                variant="determinate" 
                                value={studentData.data.percent + (studentData.data.percent < 2 ? 2 : 0)} 
                                sx={{ 
                                height: '1rem', 
                                borderRadius: '1rem', 
                                backgroundColor: 'var(--primaryA-normal)', 
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: 
                                    studentData.data.status === 'Active' ? 'var(--warning-normal)' :
                                    studentData.data.status === 'Completed' ? 'var(--accent-color-normal)' :
                                    studentData.data.status === 'Canceled' ? 'var(--notification-normal)' :
                                    undefined, // Optional: A default value if none of the conditions match
                                }
                                }} 
                            />
                        </Box>
                    </div>

                </div>
            }

            {children}

        </div>
    );
}

export default AStudentDetailsLayout;