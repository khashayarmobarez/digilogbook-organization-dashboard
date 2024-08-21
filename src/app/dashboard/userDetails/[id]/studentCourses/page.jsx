'use client';
import React from 'react';
import { useState } from 'react';

// queries
import { useUserCourseDividers, useUserCourses } from '@/api/courseDetails';

// comps
import SmallerPageTitle from '@/components/reusable comps/SmallerPageTitle';

const StudentCourses = () => {

    // courseData
    const [courseType, setCourseType] = useState('')
    const [organizationId, setOrganizationId] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    
    const [DropDown, setDropDown] = useState('')

    const { data: courseDividerData, isLoading: courseDividerLoading, error: courseDividerError } = useUserCourseDividers();
    const { data: courseData, isLoading: courseDataLoading, error: courseDataError } = useUserCourses(courseType, organizationId, pageNumber);

    return (
        <div className='flex flex-col items-center w-[90%] pb-10 gap-y-8'>

            <SmallerPageTitle title='دوره‌ها' doesBackButtonExists={false} />
            
        </div>
    );
};

export default StudentCourses;