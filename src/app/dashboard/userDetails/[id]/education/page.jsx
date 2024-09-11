'use client'
import React, { useEffect, useState } from 'react';

// styles
import containers from '@/styles/Containers.module.css';
import ButtonStyles from '@/styles/Buttons.module.css';

// assets
import arrowIcon from '@/../public/svgs/Right Arrow Button.svg';

// get course counts
import { useCourseCounts, useCourseDividers, useCourses } from '@/api/userDetails';

// comps
import SmallerPageTitle from '@/components/reusable comps/SmallerPageTitle';
import DropDownLine from '@/components/reusable comps/DropDownLine';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Pagination from '@/components/reusable comps/Pagination';

const UserDetailsEducation = ({params}) => {

    const { id } = params;
    const router = useRouter();

    // courseData
    const [courseType, setCourseType] = useState('')
    const [organizationId, setOrganizationId] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    
    const [DropDown, setDropDown] = useState('')

    const { data: courseDividerData, isLoading: courseDividerLoading, error: courseDividerError } = useCourseDividers(id);
    const { data: courseData, isLoading: courseDataLoading, error: courseDataError, refetch: courseDataRefetch } = useCourses(courseType, organizationId, pageNumber, id);
    const { data: courseCountsData, isLoading: courseCountsLoading, error: courseCountsError } = useCourseCounts(id);

    useEffect(() => {
        courseCountsError && console.log(courseCountsError)
    },[courseCountsError])

    // to set the first state for dropdown 
    useEffect(() => {
        if(courseDividerData && courseDividerData.data.length > 0) {
            setDropDown('dropDown0')
            setCourseType(courseDividerData.data[0].courseType)
            setOrganizationId(courseDividerData.data[0].organizationId)
        }
    }, [courseDividerData])

    // dropDown onClick
    const handleDropDownClick = (index, course) => {
        setDropDown(DropDown === `dropDown${index}` ? '' : `dropDown${index}`)
        setCourseType(course.courseType)
        setOrganizationId(course.organizationId)
        setPageNumber(1)
    }

    const handleCourseDetails = (courseId) => () => {
        router.push(`/dashboard/userDetails/${id}/education/courseDetails/${courseId}/students`);
    };

    const handleNextPageNumber = () => {
        setPageNumber(prev => prev + 1)
    }

    const handleLastPageNumber = () => {
        setPageNumber(prev => prev - 1)
    }


    return (
            <div className='flex flex-col items-center w-[90%] pb-10 gap-y-8'>
                
                <SmallerPageTitle title='آموزش' doesBackButtonExists={false} />

                {/* error handling */}
                {   
                    courseCountsError &&
                    <p>{courseCountsError?.response.data.ErrorMessages[0].ErrorMessage || 'مشکلی پیش آمده، بعدا دوباره تلاش کنید'}</p>
                }

                {courseCountsData && 
                <div className='flex w-full justify-between gap-x-2'>
                    
                        <div className='w-full flex flex-col items-center gap-y-2'>
                            <p className=' text-xs'>دوره های فعال</p>
                            <div className= {`${containers.classDetailsData} flex justify-center items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                <p>{courseCountsData.data.activeCourseCounts}</p>
                            </div>
                        </div>

                        <div className='w-full flex flex-col items-center gap-y-2'>
                            <p className=' text-xs'>دوره های غیرفعال</p>
                            <div className= {`${containers.classDetailsData} flex justify-center items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                <p>{courseCountsData.data.disableCourseCounts}</p>
                            </div>
                        </div>

                </div>
                }

                {
                courseDividerLoading &&
                <div className='w-full py-8 flex justify-center items-center'>
                    <span className="loading loading-dots loading-lg"></span>
                </div>
                }

                {courseDividerData && courseDividerData.data.length > 0 && 
                    courseDividerData.data.map((course, index) => (
                        <div key={index} className='w-full flex flex-col items-center gap-y-4'>
                            <DropDownLine  
                                onClickActivation={() => handleDropDownClick(index, course)}
                                title={course.name} 
                                dropDown={DropDown} 
                                isActive={DropDown === `dropDown${index}`}  
                            />

                            {DropDown === `dropDown${index}` && 
                                <div className='w-full flex flex-col gap-y-4 lg:grid lg:grid-cols-2 lg:gap-8'>

                                    {courseDataLoading && 
                                        <div className='w-full py-8 flex justify-center items-center'>
                                            <span className="loading loading-dots loading-lg"></span>
                                        </div>
                                    }

                                    {
                                        courseDataError &&
                                        <p className='w-full text-center'>مشکلی پیش اماده, دوباره تلاش کنید</p>
                                    }

                                    {
                                        courseData && courseData.data?.map((course,index) => (
                                            <div key={index} className='w-full flex flex-col items-center'>

                                                <div
                                                key={course.id}
                                                className={`w-full justify-between items-center px-4 py-4 rounded-[1.6rem] flex flex-col gap-y-4 md:col-span-1 z-10 text-xs
                                                ${containers.darkMainContainer}`}
                                                >
                                                    <div className='w-full flex justify-between items-center'>
                                                    
                                                        <h1 className='text-base'>{course.name}</h1>

                                                        <div className='flex gap-x-1'>

                                                            <p className='text-lowOpacityWhite'>وضعیت:
                                                                {course.status === 'Active' && 
                                                                    <span className='text-accentColorNormal'> فعال</span>
                                                                }
                                                                {course.status === 'Pending' &&
                                                                    <span className='text-mainTextColor'> در انتظار تایید</span>
                                                                }
                                                                {course.status === 'Disable' && 
                                                                    <span className='text-notificationNormal'> غیر فعال</span>
                                                                }
                                                                {course.status === 'Rejected' && 
                                                                    <span className='text-notificationNormal'> رد شده</span>
                                                                }
                                                            </p>

                                                        </div>
                                                    
                                                    </div>

                                                    <div className='w-full flex justify-between items-center'>

                                                        <div className='flex flex-col text-start gap-y-3'>
                                                            
                                                            {
                                                                course.type === 'Regular' &&
                                                                <p className='text-sm'>
                                                                    {course.organization}
                                                                </p>
                                                            }
                                                            {
                                                                course.type === 'Retraining' &&
                                                                <p className='text-sm'>
                                                                    <span className='text-lowOpacityWhite'>مقطع:</span> {course.level}
                                                                </p>
                                                            } 

                                                            <p>
                                                                <span className='text-lowOpacityWhite'>تعداد پرواز: </span>{course.flightsCount}
                                                            </p>

                                                            { course.clubName &&
                                                                <p>
                                                                    <span className='text-lowOpacityWhite'>باشگاه: </span> {course.clubName}
                                                                </p>
                                                            }

                                                        </div>

                                                        <div className='flex flex-col text-start gap-y-2'>
                                                            <p>
                                                                <span className='text-lowOpacityWhite'>تعداد هنرجویان فعال: </span>{course.activeStudentCounts}
                                                            </p>
                                                            <p>
                                                                <span className='text-lowOpacityWhite'>تعداد هنرجویان سابق: </span>{course.historyStudentCounts}
                                                            </p>
                                                        </div>


                                                    </div>

                                                    {
                                                        course.status !== 'Rejected' &&
                                                            <button
                                                            onClick={handleCourseDetails(course.id)} 
                                                            className={`${ButtonStyles.normalButton} min-w-28 self-center`} >
                                                                جزئیات  
                                                            </button>
                                                    }

                                                </div>

                                            </div>
                                        ))
                                    }

                                    {courseData && courseData.totalPagesCount > 1 &&
                                    <div className='w-full flex items-center justify-center col-span-2'>
                                        <Pagination
                                        pageNumber={pageNumber} totalPagesCount={courseData.totalPagesCount} handlePrevPage={handleLastPageNumber} handleNextPage={handleNextPageNumber}   />
                                    </div>
                                    }

                                </div>
                            }
                        </div>
                    ))
                }

            </div>
    );
};

export default UserDetailsEducation;