'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

// styles
import containers from '@/styles/Containers.module.css'
import ButtonStyles from '@/styles/Buttons.module.css'

// queries
import { useAClubCoachCourses } from '@/api/useClub';

const CoachDetails = ({params}) => {

    const router = useRouter();
    const { coachId, clubId } = params

    const { data: clubCoachesCoursesData, isLoading:clubCoachesCoursesLoading, error: clubCoachesCoursesError } = useAClubCoachCourses(coachId, clubId);

    const handleCourseDetails = (courseId) => () => {
        router.push(`/dashboard/clubs/${clubId}/courses/${courseId}/students`)
    }

    return (
        <div className=' w-full flex flex-col gap-y-7 items-center py-6 md:grid md:grid-cols-4'>
            
            {  clubCoachesCoursesError &&
                <p className='w-full text-center'>مشکلی پیش اماده, دوباره تلاش کنید</p>
            }

            {
                 clubCoachesCoursesData && clubCoachesCoursesData.data?.map((courseData, index) => (
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
                                >{courseData.status}</p>
                            </div>

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
                                className={`${ButtonStyles.normalButton} min-w-28 self-end`} >
                                    جزئیات  
                                </button>

                            </div>

                        </div>

                    </div>
                ))
            }

        </div>
    );
};

export default CoachDetails;