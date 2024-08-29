'use client'
import React from 'react';

// queries
import { useAClubCourseStudentSyllabi } from '@/api/useClub';

// comps
import DropDownSyllabiData from '@/components/userDetails/studentCourses/DropDownSyllabiData'

const SyllabiStudentCourse = ({params}) => {

    const { clubId, studentId } = params;

    const {  data: syllabiData, isLoading: syllabiDataLoading, error: syllabiDataError } = useAClubCourseStudentSyllabi(studentId, clubId);
    
    return (
        <div className=' w-full flex flex-col gap-y-6 py-8 '>
            {
                syllabiData && syllabiData.data.theorySyllabi.length > 0 &&
                <DropDownSyllabiData title={"سرفصل‌های تئوری"} data={syllabiData.data.theorySyllabi} percent={syllabiData.data.theorySyllabiPercent}  />
            }
            {
                syllabiData && syllabiData.data.practicalSyllabi.length > 0 &&
                <DropDownSyllabiData title={"سرفصل‌های عملی"} data={syllabiData.data.practicalSyllabi} percent={syllabiData.data.practicalSyllabiPercent} />
            }
        </div>
    );
};

export default SyllabiStudentCourse;