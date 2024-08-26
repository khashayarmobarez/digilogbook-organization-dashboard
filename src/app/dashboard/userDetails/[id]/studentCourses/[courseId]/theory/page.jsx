'use client'
import React from 'react';

// quieries
import { useAUserCourseClasses } from '@/api/courseDetails';

// styles
import containers from '@/styles/Containers.module.css'

// comps
import ClassesBox from '@/components/userDetails/studentCourses/ClassesBox'

const CoursesTheory = ({params}) => {

    const { id, courseId } = params;

    const {  data: classesData, isLoading: classesDataLoading, error: classesDataError } = useAUserCourseClasses(courseId,id);

    return (
        <div className=' w-full flex flex-col gap-y-7 pb-2'>

            {
                classesDataLoading &&
                <div className='w-full py-8 flex justify-center items-center'>
                    <span className="loading loading-dots loading-lg"></span>
                </div>
            }

            {classesData && classesData.data.classesCount === 0 && 
                <p> هنوز کلاس  تئوری برای این دوره توسط مربی ثبت نشده</p>
            }

            {classesData && classesData.data.classesCount > 0 &&
            <>

                    <div className='flex w-full justify-between gap-x-2 mb-2'>
                        
                            <div className='w-full flex flex-col items-center gap-y-2'>
                                <p className=' text-xs'>تعداد کلاس های برگزار شده</p>
                                <div className= {`${containers.classDetailsData} flex justify-center items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                    <p>{classesData.data.classesCount}</p>
                                </div>
                            </div>

                            <div className='w-full flex flex-col items-center gap-y-2'>
                                <p className=' text-xs'>جمع ساعت کلاس ها</p>
                                <div className= {`${containers.classDetailsData} flex justify-center items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                    <p>{classesData.data.totalClassHours}</p>
                                </div>
                            </div>

                    </div>

                {
                    classesData.data.classes.map((classData) => {
                    return <ClassesBox title={'کلاس‌ها'} key={classData.id} classData={classData} userId={id} />;
                    })
                }
            </>
            }

        </div>
    );
};

export default CoursesTheory;