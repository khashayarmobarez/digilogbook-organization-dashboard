'use client'
import React, { useState } from 'react';

// styles
import containers from '@/styles/Containers.module.css';

const UserCourseDetailsBox = ({aCourseData}) => {

    const [showExtra, setShowExtra ] = useState(false);

    return (
        <>
            {
                    aCourseData &&
                    <>
                        <div className={` ${containers.classDetails} w-full rounded-xl flex flex-col items-center py-6 gap-y-6`}>

                            <div className=' grid grid-cols-8 gap-x-4 gap-y-4 w-[90%] md:grid-cols-2 md:gap-y-6'>

                                <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                    <p className=' text-xs pr-2'>نام</p>
                                    <div className= {`${containers.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                        <p>{aCourseData.data.name}</p>
                                    </div>
                                </div>

                                <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                    <p className=' text-xs pr-2'>نوع</p>
                                    <div className= {`${containers.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                        {aCourseData.data.type === 'Regular' && <p>مطابق سیلابس</p> }
                                        {aCourseData.data.type === 'Retraining' && <p>بازآموزی</p> }
                                        {aCourseData.data.type === 'Custom' && <p>شخصی‌سازی شده</p> }
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

                                    {/* show extra version */}
                                    {
                                    showExtra &&
                                        <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                            <p className=' text-xs pr-2'>وضعیت</p>
                                            <div className= {`${containers.classDetailsData} flex justify-start items-center px-4 gap-x-2 w-full h-12 rounded-xl text-sm`}  id='data' >
                                                {aCourseData.data.status === 'Active' && 
                                                    <>
                                                        <p>فعال</p>
                                                        <div className='w-3 h-3 rounded-full bg-darkHover'></div>
                                                    </>
                                                }
                                                {aCourseData.data.status === 'Pending' &&
                                                    <>
                                                        <p>در انتظار تایید</p>
                                                        <div className='w-3 h-3 rounded-full bg-mainTextColor' ></div>
                                                    </>
                                                }
                                                {aCourseData.data.status === 'Disable' &&
                                                    <>
                                                        <p>غیرفعال</p>
                                                        <div className='w-3 h-3 rounded-full bg-notificationNormal' ></div>
                                                    </>
                                                }
                                            </div> 
                                        </div>
                                    }   
                            </div>

                            {/* show extra version */}
                            {
                            showExtra &&       
                                <div className=' w-[90%] flex flex-col items-start justify-between gap-y-2' >
                                    <p>توضیحات درباره دوره</p>
                                    <p className='border-solid border-[1px] rounded-3xl p-4 text-sm min-h-14 w-full text-right'>{aCourseData.data.description}</p>
                                </div>
                            }   

                            <p onClick={() => setShowExtra(!showExtra)}
                            className='w-[90%] text-sm text-accentColorNormal text-start hover:underline'>
                                {showExtra ? 'بستن اطلاعات بیشتر' : 'نمایش اطلاعات بیشتر ...'}
                            </p>

                        </div>

                    
                    </>
                }
        </>
    );
};

export default UserCourseDetailsBox;