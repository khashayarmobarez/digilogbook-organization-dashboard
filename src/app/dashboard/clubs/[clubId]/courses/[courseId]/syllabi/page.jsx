'use client'
import React from 'react';

// queries
import { useAClubCourseSyllabi } from '@/api/useClub';

// comps
import DropDownDataBox from '@/components/userDetails/education/DropDownDataBox';

const Syllabi = ({params}) => {

    const { clubId, courseId }= params;

    const {  data: syllabiDataTheory, isLoading: syllabiDataTheoryLoading, error: syllabiDataTheoryError } = useAClubCourseSyllabi(courseId,1,clubId);
    const {  data: syllabiDataPractical, isLoading: syllabiDataPracticalLoading, error: syllabiDataPracticalError } = useAClubCourseSyllabi(courseId,2,clubId);

    return (
        <div className=' w-full flex flex-col gap-y-7 '>

            {
                (syllabiDataTheoryLoading || syllabiDataPracticalLoading) &&
                <span className="loading loading-dots loading-lg"></span>
            }
            {
                (syllabiDataTheoryError || syllabiDataPracticalError) &&
                <p className='w-full text-center'>خطا در دریافت اطلاعات</p>
            }
            {
                syllabiDataTheory && syllabiDataTheory.data.length === 0 && syllabiDataPractical && syllabiDataPractical.data.length === 0 &&
                <p className='w-full text-center'>سیلابسی اضافه نشده است</p>
            }
            {
                syllabiDataTheory && syllabiDataTheory.data.length > 0 &&
                <DropDownDataBox title={"سیلابس تئوری"} data={syllabiDataTheory.data}  />
            }
            {
                 syllabiDataPractical && syllabiDataPractical.data.length > 0 &&
                <DropDownDataBox title={"سیلابس عملی"} data={syllabiDataPractical.data} />
            }
        </div>
    );
};

export default Syllabi;