import React from 'react';

// styles
import containers from '@/styles/Containers.module.css';

// mui
import { Box, LinearProgress } from '@mui/material';

const StudentCourseDetailsBox = ({courseId, aCourseData}) => {
    return (
        <div className='w-full flex flex-col'>
            {
                aCourseData &&
                <>
                    <div className={` ${containers.classDetails} w-full rounded-xl flex flex-col items-center py-6 gap-y-8`}>

                        <div className=' grid grid-cols-8 gap-x-4 gap-y-4 w-[90%] md:grid-cols-2 md:gap-6'>

                            <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                <p className=' text-xs pr-2'>نام</p>
                                <div className= {`${containers.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                    <p>{aCourseData.data.name}</p>
                                </div>
                            </div>

                            <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                <p className=' text-xs pr-2'>نوع</p>
                                <div className= {`${containers.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                    <p>
                                        {aCourseData.data.type === 'Regular' && <p>مطابق سیلابس</p> }
                                        {aCourseData.data.type === 'Retraining' && <p>بازآموزی</p> }
                                        {aCourseData.data.type === 'Custom' && <p>شخصی‌سازی شده</p> }
                                    </p>
                                </div>
                            </div>

                            {
                                aCourseData.data.organization &&
                                <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                    <p className=' text-xs pr-2'>ارگان</p>
                                    <div className= {`${containers.classDetailsData} flex justify-start items-center pr-4 w-full h-12 rounded-xl text-xs`}  id='data' >
                                        <p>{aCourseData.data.organization}</p>
                                    </div>
                                </div>
                            }

                            {
                                aCourseData.data.level &&
                                <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                    <p className=' text-xs pr-2'>مقطع</p>
                                    <div className= {`${containers.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                        <p>{aCourseData.data.level}</p>
                                    </div>
                                </div>
                            }

                            <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                <p className=' text-xs pr-2'>تعداد پرواز</p>
                                <div className= {`${containers.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                    <p>{aCourseData.data.flightsCount}</p>
                                </div>
                            </div>

                            {
                                aCourseData.data.clubName &&
                                <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                    <p className=' text-xs pr-2'>نام باشگاه</p>
                                    <div className= {`${containers.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                        <p>{aCourseData.data.clubName}</p>
                                    </div>
                                </div>
                            }

                            {
                                aCourseData.data.coach &&
                                <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                    <p className=' text-xs pr-2'>نام مربی</p>
                                    <div className= {`${containers.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                        <p>{aCourseData.data.coach}</p>
                                    </div>
                                </div>
                            }

                            <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                <p className=' text-xs pr-2'>وضعیت</p>
                                <div className= {`${containers.classDetailsData} flex justify-start items-center px-4 gap-x-2 w-full h-12 rounded-xl text-sm`}  id='data' >
                                    {
                                    aCourseData.data.status === 'Active' && 
                                        <>
                                            <p>فعال</p>
                                            <div className='w-3 h-3 rounded-full bg-warningNormal' ></div>
                                        </>
                                    }
                                    {
                                    aCourseData.data.status === 'Canceled' &&
                                        <>
                                            <p>لغو شده</p>
                                            <div className='w-3 h-3 rounded-full bg-notificationNormal'></div>
                                        </>
                                    }
                                    {
                                    aCourseData.data.status === 'Completed' &&
                                        <>
                                            <p>تمام شده</p>
                                            <div className='w-3 h-3 rounded-full bg-accentColorNormal' ></div>
                                        </>
                                    }
                                </div> 
                            </div>

                        </div>
                        
                        <Box sx={{ width: '90%', display:'flex', flexDirection:'column', rowGap:'1rem' }}>
                            <div className='w-full flex justify-between px-1'>
                                    <p>درصد پیشرفت</p>
                                    <p>{aCourseData.data.percent}%</p>
                            </div>
                            <LinearProgress variant="determinate" value={aCourseData.data.percent > 3 ? aCourseData.data.percent : aCourseData.data.percent + 3} 
                            sx={{ height:'1rem', borderRadius:'1rem', backgroundColor :'#454459', '& .MuiLinearProgress-bar': {
                                borderRadius:'1rem',backgroundColor: 'var(--warning-normal)' // Change this to your desired color
                            }}} />
                        </Box>
                        
                        <div className=' w-[90%] flex flex-col items-start justify-between gap-y-2' >
                                    <p>توضیحات درباره دوره</p>
                                    <p className='border-solid border-[1px] rounded-3xl p-4 text-sm min-h-14 w-full text-right'>{aCourseData.data.description}</p>
                        </div>

                    </div>
                </>
            }
        </div>
    );
};

export default StudentCourseDetailsBox;