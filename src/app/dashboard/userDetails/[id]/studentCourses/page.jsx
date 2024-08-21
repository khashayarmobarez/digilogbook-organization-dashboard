'use client';
import React, { useEffect } from 'react';
import { useState } from 'react';

// styles
import containers from '@/styles/Containers.module.css';
import ButtonStyles from '@/styles/Buttons.module.css';

// mui
import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';

// queries
import { useGuestUserClasses, useUserCourseDividers, useUserCourses } from '@/api/courseDetails';

// comps
import SmallerPageTitle from '@/components/reusable comps/SmallerPageTitle';
import DropDownLine from '@/components/reusable comps/DropDownLine';
import Pagination from '@/components/reusable comps/Pagination';
import { useRouter } from 'next/navigation';

const StudentCourses = ({params}) => {

    const router = useRouter();
    const { id } = params;

    // courseData
    const [courseType, setCourseType] = useState('')
    const [organizationId, setOrganizationId] = useState('')
    
    const [pageNumber, setPageNumber] = useState(1)
    
    const [DropDown, setDropDown] = useState('')

    const { data: courseDividerData, isLoading: courseDividerLoading, error: courseDividerError } = useUserCourseDividers(id);
    const { data: courseData, isLoading: courseDataLoading, error: courseDataError } = useUserCourses(courseType, organizationId, pageNumber, id);
    const { data: guestClassesData } = useGuestUserClasses(id);

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

    const handleNextPageNumber = () => {
        setPageNumber(prev => prev + 1)
    }

    const handleLastPageNumber = () => {
        setPageNumber(prev => prev - 1)
    }

    const handleCourseDetails = (courseId) => () => {
        router.push(`/dashboard/userDetails/${id}/studentCourses/${courseId}/practical`)
    }

    const handleGuestClassDetails = (courseId) => () => {
        router.push(`/dashboard/userDetails/${id}/studentCourses/${courseId}/guestCourseDetails`)
    }

    return (
        <div className='flex flex-col items-center w-[90%] pb-10 gap-y-8'>

            <SmallerPageTitle title='دوره‌ها' doesBackButtonExists={false} />

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
                                <div className='w-full flex flex-col gap-y-4 md:grid md:grid-cols-2 md:gap-4'>

                                    {/* { course.courseType !== 'Guest' && courseDataLoading && 
                                        <Box sx={{ display: 'flex', width:'full' , justifyContent:'center' }}>
                                            <CircularProgress /> 
                                        </Box>
                                    } */}

                                    { course.courseType !== 'Guest' && courseDataError &&
                                        <p className='w-full text-center'>مشکلی پیش اماده, دوباره تلاش کنید</p>
                                    }

                                    {
                                        course.courseType !== 'Guest' && courseData && courseData.data?.map((courseData, index) => (
                                            <div key={index} className='w-full flex flex-col items-center'>

                                                <div className={`${containers.darkMainContainer} rounded-3xl h-auto z-0 w-[98%] md:w-full flex flex-col justify-between items-center px-4 py-4 gap-y-4 mr-1 mt-1`}>


                                                    <div className='w-full flex justify-between'>
                                                        
                                                        {/* conditional course name */}
                                                        {courseData.status === 'Active' && <p className='text-base'>{courseData.name}</p>}
                                                        {courseData.status === 'Completed' && <p className='text-base text-accentColorNormal'>{courseData.name}(تمام شده)</p>}
                                                        {courseData.status === 'Canceled' && <p className='text-base text-notificationNormal'>{courseData.name}(لغو شده)</p>}

                                                        {/* conditional course percent */}
                                                        <p
                                                        className={`
                                                            ${courseData.status === 'Completed'&& 'text-accentColorNormal'}
                                                            ${courseData.status === 'Canceled'&& 'text-notificationNormal'}
                                                            ${courseData.status === 'Active'&& ''}
                                                        `}
                                                        >{courseData.percent}%</p>
                                                    </div>

                                                    <Box sx={{ width: '100%' }}>
                                                        <LinearProgress 
                                                            variant="determinate" 
                                                            value={courseData.percent + (courseData.percent < 2 ? 2 : 0)} 
                                                            sx={{ 
                                                            height: '1rem', 
                                                            borderRadius: '1rem', 
                                                            backgroundColor: 'var(--primaryA-normal)', 
                                                            '& .MuiLinearProgress-bar': {
                                                                backgroundColor: 
                                                                courseData.status === 'Active' ? 'var(--warning-normal)' :
                                                                courseData.status === 'Completed' ? 'var(--accent-color-normal)' :
                                                                courseData.status === 'Canceled' ? 'var(--notification-normal)' :
                                                                undefined, // Optional: A default value if none of the conditions match
                                                            }
                                                            }} 
                                                        />
                                                    </Box>

                                                    <div className='w-full flex justify-between text-start text-sm'>
                                                        <div className='flex flex-col justify-between self-start'>
                                                            { courseData.organization && courseData.type !== 'Regular' &&
                                                                <p>
                                                                    <span className='text-lowOpacityWhite'>
                                                                        ارگان:&nbsp;
                                                                    </span>
                                                                     {courseData.organization}
                                                                </p>
                                                            }
                                                            { courseData.clubName &&
                                                                <p>
                                                                    <span className='text-lowOpacityWhite'>
                                                                        باشگاه:&nbsp;
                                                                    </span>
                                                                    {courseData.clubName}
                                                                </p>
                                                            }
                                                            { courseData.coach &&
                                                                <p>
                                                                    <span className='text-lowOpacityWhite'>
                                                                        مربی:&nbsp;
                                                                    </span> 
                                                                    {courseData.coach}
                                                                </p>
                                                            }
                                                        </div>
                                                        <button 
                                                        onClick={handleCourseDetails(courseData.id)}
                                                        className={`${ButtonStyles.normalButton} self-end`} >
                                                            جزئیات  
                                                        </button>

                                                    </div>

                                                </div>

                                            </div>
                                        ))
                                    }

                                    { course.courseType !== 'Guest' && courseData && courseData.totalPagesCount > 1 && (
                                        <div className='w-full flex items-center justify-center col-span-2'>
                                            <Pagination
                                            pageNumber={pageNumber} totalPagesCount={courseData.totalPagesCount} handlePrevPage={handleLastPageNumber} handleNextPage={handleNextPageNumber}   />
                                        </div>
                                    )}

                                    {course.courseType === 'Guest' && guestClassesData && guestClassesData.data.map((guestClass, index) => (
                                        <div key={index} className='w-full flex flex-col items-center'>
                                            <div className={`${containers.darkMainContainer} rounded-3xl h-auto z-0 w-[98%] md:w-full flex flex-col justify-between items-center px-4 py-4 gap-y-4 mr-1 mt-1`}>
                                                <div className='w-full flex justify-between text-sm'>
                                                    <p className='text-base'>{guestClass.name}</p>
                                                    <p>
                                                        <span className='text-lowOpacityWhite'>
                                                            تاریخ:&nbsp;
                                                        </span>
                                                        {guestClass.dateTime}
                                                    </p>
                                                </div>
                                                <div className='w-full flex justify-between items-center text-start text-sm'>
                                                    { guestClass.classDuration &&
                                                        <p>
                                                            <span className='text-lowOpacityWhite'>
                                                                مدت زمان:&nbsp;
                                                            </span> 
                                                            {guestClass.classDuration}
                                                        </p>
                                                    }
                                                    <button 
                                                    onClick={handleGuestClassDetails(guestClass.id)}
                                                     className={`${ButtonStyles.normalButton} self-end`} >
                                                        جزئیات  
                                                    </button>
                                                </div>


                                            </div>
                                        </div>
                                    
                                    ))}      

                                </div>

                            }
                                
                        </div>
                    ))
                }
            
        </div>
    );
};

export default StudentCourses;