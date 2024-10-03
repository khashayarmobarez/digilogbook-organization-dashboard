'use client'
import React from 'react';

// queries
import { useStudentCourses } from '@/api/userDetails';

// mui
import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';

// styles
import containers from '@/styles/Containers.module.css';
import ButtonStyles from '@/styles/Buttons.module.css'

// comps
import SmallerPageTitle from '@/components/reusable comps/SmallerPageTitle';
import { useRouter } from 'next/navigation';



const AStudentCourses = ({params}) => {

    const {id , studentId} = params
    const router = useRouter();

    const { data: StudentCourses, isLoading: StudentCoursesLoading, error: StudentCoursesError } = useStudentCourses(studentId, id);

    const handleCourseDetails = (courseId) => () => {
        router.push(`/dashboard/userDetails/${id}/education/aStudentDetails/${courseId}/practical`);
    };

    return (
        <div className='flex flex-col items-center w-[90%] pb-10 gap-y-8'>

            <SmallerPageTitle
                title={StudentCourses ? `${StudentCourses.data[0].studentName}` : 'نام هنرجو' }
                doesBackButtonExists={false} 
            />

            { 
                StudentCoursesLoading &&
                    <span className="loading loading-bars loading-lg mt-16"></span>
            }

            <div className='w-full flex flex-col gap-4 md:grid md:grid-cols-2 '>
                {
                    StudentCourses && StudentCourses.data?.map((courseData, index) => (
                        
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
                                        backgroundColor: 'var(--diffrential-blue)', 
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
                                    <button onClick={handleCourseDetails(courseData.id)} className={`${ButtonStyles.normalButton} self-end`} >
                                        جزئیات  
                                    </button>

                                </div>

                            </div>

                        </div>
                    ))
                }
            </div>

            
        </div>
    );
};

export default AStudentCourses;