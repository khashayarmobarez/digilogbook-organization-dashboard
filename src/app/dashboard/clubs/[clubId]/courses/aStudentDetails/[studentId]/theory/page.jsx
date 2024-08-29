'use client'
import React from 'react';

// quieries
import { useAStudentCourseClasses} from '@/api/courseDetails';

// styles
import containers from '@/styles/Containers.module.css'

// comps
import StudentClassesBox from '@/components/userDetails/studentCourses/StudentClassesBox'
import { useAClubCourseStudentClasses } from '@/api/useClub';

const CoursesTheory = ({params}) => {

    const { clubId, studentId } = params;

    const {  data: classesData, isLoading: classesDataLoading, error: classesDataError } = useAClubCourseStudentClasses(studentId,clubId);

    return (
        <div className=' w-full flex flex-col gap-y-7 items-center py-6'>

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
                    classesData.data.classes.map((classData) =>  
                    <StudentClassesBox title={'کلاس‌ها'} key={classData.id} classData={classData} userId={clubId} />
                    )
                }
            </>
            }

        </div>
    );
};

export default CoursesTheory;