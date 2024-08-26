'use client'
import { useAUserCourseClasses } from '@/api/courseDetails';
import React from 'react';

// styles
import containers from '@/styles/Containers.module.css'

const CoursesTheory = ({params}) => {

    const { id, courseId } = params;

    const {  data: classesData, isLoading: classesDataLoading, error: classesDataError } = useAUserCourseClasses(courseId,id);

    return (
        <div className=' w-full flex flex-col gap-y-7 pb-2'>

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

                {/* {
                    classesData.data.classes.map((classData) => {
                    return <ClassesBoxMyCourses title={'کلاس‌ها'} key={classData.id} classData={classData} />;
                    })
                } */}
            </>
            }

        </div>
    );
};

export default CoursesTheory;