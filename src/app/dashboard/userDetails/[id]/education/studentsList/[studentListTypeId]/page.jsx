'use client'
import React, { useEffect, useState } from 'react';

// styles
import containers from '@/styles/Containers.module.css';

// queries
import { useAllStudents, useCourseCounts } from '@/api/userDetails';

// comps
import SmallerPageTitle from '@/components/reusable comps/SmallerPageTitle';
import Pagination from '@/components/reusable comps/Pagination';
import ACourseStudentBox from '@/components/userDetails/education/ACourseStudentBox'

const StudentList = ({params}) => {

    // studentListTypeId can be 1(active) or 2(disabled), for the type of students
    const { id, studentListTypeId } = params;

    // queries
    const { data: courseCountsData, isLoading: courseCountsLoading } = useCourseCounts(id);
    // id 1 is for active students and id 2 is for history student
    const { data: AllStudents, isLoading: AllStudentLoading, error: AllStudentError } = useAllStudents(studentListTypeId ,id);

    return (
        <div className='flex flex-col items-center w-[90%] pb-10 gap-y-8'>
                
            <SmallerPageTitle 
                title='هنرجویان فعال' 
                // title={`${studentListTypeId === '1' ? `هنرجویان فعال (${courseCountsData.data.activeStudentCounts})` : `هنرجویان سابق (${courseCountsData.data.disableStudentCounts})`}`}
                doesBackButtonExists={false} 
            />

            { 
            (courseCountsLoading || AllStudentLoading) &&
                <span className="loading loading-bars loading-lg mt-16"></span>
            }

            {
                AllStudentError &&
                    <p className='w-full text-center'>مشکلی پیش اماده, دوباره تلاش کنید</p>
            }

            {
                courseCountsData && AllStudents &&
                <div className='w-full flex flex-col justify-center items-center gap-y-8'>

                    {
                        AllStudents && AllStudents.data.length < 1 && !AllStudentLoading && !AllStudentError &&
                        <p className='h-60vh w-full text-center flex justify-center items-center mt-8'> هنرجویی یافت نشد</p>
                    }

                    <div className='w-full flex flex-col gap-y-4 items-center'>
                        {AllStudents.data.length > 0 && AllStudents.data &&
                            AllStudents.data.map((student) => (
                                <ACourseStudentBox ownerId={id} key={student.id} studentData={student} isForHistory={studentListTypeId === '1' ? false : true} />
                            ))
                        }
                    </div>
                    
                </div>
            }
            
        </div>
    );
};

export default StudentList;