'use client';
import React from 'react';

// styles
import containers from '@/styles/Containers.module.css';

// queries
import { useACourseClasses } from '@/api/courseDetails';

// comps
import ACourseClassDropDownBox from '@/components/userDetails/education/ACourseClassDropDownBox';

const TheoryClass = ({params}) => {

    const { id, courseId } = params;

    const {  data: classesData, isLoading: classesDataLoading, error: classesDataError } = useACourseClasses(courseId,id);

    return (
        <div className='w-full flex flex-col items-center gap-y-8'>

            {classesData && classesData.data.classesCount === 0 &&
                <p className='w-full text-center'>کلاسی اضافه نشده است</p>
            }

            {classesData && classesData.data.classesCount > 0 &&
            <>
                <div className=' w-full grid grid-cols-4 items-center text-border-button-yellow gap-x-10'>
                    
                    <div className='w-full col-span-2 flex flex-col justify-center items-start gap-y-2'>
                        <p className='text-xs'>تعداد کلاس های برگزارشده</p>
                        <p className={` ${containers.classDetailsData} w-full h-10 rounded-xl flex items-center justify-center`}>
                        {classesData.data.classesCount}
                        </p>
                    </div>
                    
                    <div className='w-full col-span-2 flex flex-col justify-center items-start gap-y-2'>
                        <p className='text-xs'>جمع ساعت کلاس ها</p>
                        <p className={` ${containers.classDetailsData} w-full h-10 rounded-xl flex items-center justify-center`}>
                        {classesData.data.totalClassHours}
                        </p>
                    </div>

                </div>
            
                {/* mapping classes */}
                {   classesData &&
                    classesData.data.classes.map((classData) => {
                        return <ACourseClassDropDownBox title={'کلاس‌ها'} key={classData.id} classData={classData} userId={id} />;
                    })
                }
            </>
            }
        </div>
    );
};

export default TheoryClass;