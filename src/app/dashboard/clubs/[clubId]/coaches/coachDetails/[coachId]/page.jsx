'use client'
import React from 'react';

// queries
import { useAClubCoachCourses } from '@/api/useClub';

const CoachDetails = ({params}) => {

    const { coachId, clubId } = params

    const { data: clubCoachesCoursesData, isLoading:clubCoachesCoursesLoading, error: clubCoachesCoursesError } = useAClubCoachCourses(coachId, clubId);

    return (
        <div className=' w-full flex flex-col gap-y-7 items-center py-6 md:grid md:grid-cols-4'>
            
        </div>
    );
};

export default CoachDetails;