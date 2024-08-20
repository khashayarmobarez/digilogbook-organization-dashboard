'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// styles
import ButtonStyles from '@/styles/Buttons.module.css';

// comps
import SmallerPageTitle from '@/components/reusable comps/SmallerPageTitle';
import UserCourseDetailsBox from '@/components/userDetails/education/UserCourseDetailsBox';

// queries
import {useACourse} from '@/api/courseDetails';


const CourseDetailsLayout = ({ children, params }) => {

    const { id, courseId } = params;
    const pathname = usePathname();

    const { data: aCourseData, isLoading: courseDataLoading, error: courseDataError, refetch: refetchCourseData } = useACourse(courseId, id);

    return (
        <div className='w-[90%] pb-10 flex flex-col items-center gap-y-6'>

            <SmallerPageTitle title='جزئیات دوره' doesBackButtonExists={false} />

            <UserCourseDetailsBox courseId={courseId} aCourseData={aCourseData} />

            {
                aCourseData && aCourseData.data &&
                <div className={`${ButtonStyles.ThreeStickedButtonCont} bg-white z-10`}>
                    <Link 
                        href={`/dashboard/userDetails/${id}/education/courseDetails/${courseId}/students`} 
                        className={`${ButtonStyles.ThreeStickedButtonButton} rounded-r-xl ${pathname === `/dashboard/userDetails/${id}/education/courseDetails/${courseId}/students` ? ButtonStyles.activeYellow : ''} `} >
                        هنرجویان
                    </Link> 
                    <Link 
                        href={aCourseData.data.status === 'Pending' ? '#' : `/dashboard/userDetails/${id}/education/courseDetails/${courseId}/theoryClass`} 
                        className={`${ButtonStyles.ThreeStickedButtonButton} ${aCourseData.data.status === 'Pending' && 'opacity-55'} 
                        ${pathname === `/dashboard/userDetails/${id}/education/courseDetails/${courseId}/theoryClass` ? ButtonStyles.activeYellow : ''}
                        `} >
                        کلاس تئوری
                    </Link> 
                    <Link 
                        href={`/dashboard/userDetails/${id}/education/courseDetails/${courseId}/syllabi`}  
                        className={`${ButtonStyles.ThreeStickedButtonButton} rounded-l-xl ${pathname === `/dashboard/userDetails/${id}/education/courseDetails/${courseId}/syllabi` ? ButtonStyles.activeYellow : ''} `} >
                        سرفصل‌ها
                    </Link>
                </div>
            }

            {children}

        </div>
    );
}

export default CourseDetailsLayout;