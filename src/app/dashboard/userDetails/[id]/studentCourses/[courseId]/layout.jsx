'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// queries
import { useAUserCourse } from '@/api/courseDetails';

// styles
import ButtonStyles from '@/styles/Buttons.module.css';

// comps
import SmallerPageTitle from '@/components/reusable comps/SmallerPageTitle';
import StudentCourseDetailsBox from '@/components/userDetails/studentCourses/StudentCourseDetailsBox';

const CourseDetailsLayout = ({ children, params }) => {

    const { id, courseId } = params;
    const pathname = usePathname();

    const { data: aCourseData, isLoading: courseDataLoading, error: courseDataError, refetch: refetchCourseData } = useAUserCourse(courseId, id);

    return (
        <div className='w-[90%] pb-10 flex flex-col items-center gap-y-6'>

            <SmallerPageTitle title='جزئیات دوره' doesBackButtonExists={false} />

            <StudentCourseDetailsBox courseId={courseId} aCourseData={aCourseData} />

            {
                aCourseData && aCourseData.data &&
                <div className={`${ButtonStyles.ThreeStickedButtonCont} bg-white z-10`}>
                    <Link 
                        href={`/dashboard/userDetails/${id}/studentCourses/${courseId}/practical`} 
                        className={`${ButtonStyles.ThreeStickedButtonButton} rounded-r-xl ${pathname === `/dashboard/userDetails/${id}/studentCourses/${courseId}/practical` ? ButtonStyles.activeYellow : ''} `} >
                        عملی
                    </Link> 
                    <Link 
                        href={aCourseData.data.status === 'Pending' ? '#' : `/dashboard/userDetails/${id}/studentCourses/${courseId}/theory`} 
                        className={`${ButtonStyles.ThreeStickedButtonButton} ${aCourseData.data.status === 'Pending' && 'opacity-55'} 
                        ${pathname === `/dashboard/userDetails/${id}/studentCourses/${courseId}/theory` ? ButtonStyles.activeYellow : ''}
                        `} >
                        تئوری
                    </Link> 
                    <Link
                        href={`/dashboard/userDetails/${id}/studentCourses/${courseId}/studentSyllabi`}  
                        className={`${ButtonStyles.ThreeStickedButtonButton} rounded-l-xl ${pathname === `/dashboard/userDetails/${id}/studentCourses/${courseId}/studentSyllabi` ? ButtonStyles.activeYellow : ''} `} >
                        وضعیت من
                    </Link>
                </div>
            }

            {children}

        </div>
    );
}

export default CourseDetailsLayout;