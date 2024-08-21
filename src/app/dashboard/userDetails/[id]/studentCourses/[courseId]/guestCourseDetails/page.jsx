'use client'
import React from 'react';

// styles
import containers from '@/styles/Containers.module.css';

// queries
import { useAGuestUserClass } from '@/api/courseDetails';

// comps
import SmallerPageTitle from '@/components/reusable comps/SmallerPageTitle';

const GuestCourseDetails = ({params}) => {

    const { id, courseId } = params;

    const { data: aCourseData, isLoading: courseDataLoading, error: courseDataError } = useAGuestUserClass(courseId,id);

    return (
        <div className='w-[90%] flex flex-col pb-8 gap-y-8'>

            <SmallerPageTitle title='جزئیات کلاس' doesBackButtonExists={false} />

            {
                    aCourseData &&
                    <>
                        <div className={` ${containers.classDetails} w-full rounded-xl flex flex-col items-center py-8 gap-y-8`}>

                            <div className=' grid grid-cols-8 gap-x-4 gap-y-4 w-[90%] md:grid md:grid-cols-2 md:gap-4'>

                                <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                    <p className=' text-xs pr-2'>نام</p>
                                    <div className= {`${containers.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                        <p>{aCourseData.data.name}</p>
                                    </div>
                                </div>


                                {
                                    aCourseData.data.classDuration &&
                                    <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                        <p className=' text-xs pr-2'>مدت زمان</p>
                                        <div className= {`${containers.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                            <p>{aCourseData.data.classDuration}</p>
                                        </div>  
                                    </div>
                                }

                                {
                                    aCourseData.data.startTime &&
                                    <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                        <p className=' text-xs pr-2'>زمان شروع</p>
                                        <div className= {`${containers.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                            <p>{aCourseData.data.startTime}</p>
                                        </div>
                                    </div>
                                }

                                {
                                    aCourseData.data.endTime &&
                                    <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                        <p className=' text-xs pr-2'>زمان پایان</p>
                                        <div className= {`${containers.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                            <p>{aCourseData.data.endTime}</p>
                                        </div>
                                    </div>
                                }

                                {
                                    aCourseData.data.dateTime &&
                                    <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                        <p className=' text-xs pr-2'>تاریخ</p>
                                        <div className= {`${containers.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                            <p>{aCourseData.data.dateTime}</p>
                                        </div>
                                    </div>
                                }
                                
                                {
                                    aCourseData.data.description &&
                                    <div className=' w-full flex flex-col items-start justify-between col-span-2 gap-y-2' >
                                            <p>توضیحات درباره دوره</p>
                                            <p className='border-solid border-[1px] rounded-3xl p-4 text-sm min-h-14 w-full text-right'>{aCourseData.data.description}</p>
                                    </div>
                                }

                                {aCourseData.data.syllabi &&
                                    <div className='flex flex-col items-start gap-y-2 col-span-8 md:col-span-2'>
                                            <p className=' text-sm'>مباحث مطرح شده</p>
                                            { 
                                                aCourseData.data.syllabi.map((syllabus,index) => (
                                                    <div key={index} className={`${containers.classDetailsData} flex justify-start items-center px-4 w-full min-h-12 rounded-xl`} id='data'>
                                                        <p>{syllabus.description}</p>
                                                    </div>
                                                ))
                                            }
                                    </div>
                                }   

                            </div>

                        </div>
                    </>
                }

        </div>
    );
};

export default GuestCourseDetails;