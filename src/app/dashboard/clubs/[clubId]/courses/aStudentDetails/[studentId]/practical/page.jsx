'use client'
import React, { useEffect } from 'react';

// queries
import { useAClubCourseStudentFlights } from '@/api/useClub';

// comps
import PracticalFlightHistoryBox from '@/components/flightHistory/PracticalFlightHistoryBox';

const PracticalDetails = ({params}) => {

    const {clubId, studentId} = params

    const { data: userFlights, isLoading: userFlightsLoading } = useAClubCourseStudentFlights(studentId,1,10,clubId);

    useEffect(() => {
        if(userFlights) {
            console.log(userFlights)
        }
    }, [userFlights])

    return (
        <div className=' w-full flex flex-col gap-y-7 items-center py-6'>
            
            {
            userFlights && userFlights.totalCount === 0 &&
                <p> هنوز پروازی برای این دوره ثبت نشده است</p>
            }
            {
                userFlights && userFlights.totalCount > 0 &&
                <div className='w-full flex flex-col gap-y-6'>

                    <div className='w-full flex flex-col gap-y-6'>
                        {userFlights.data.map((flight) => (
                            <PracticalFlightHistoryBox key={flight.id} flightBaseData={flight} userId={clubId} isForAStudentFromClubCourse={true} isForAStudentFromCourse={false} />
                        ))}
                    </div>

                </div>
            }
        </div>
    );
};

export default PracticalDetails;