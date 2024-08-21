'use client'
import React, { useEffect } from 'react';

// queries
import { useFlightHistory } from '@/api/flightDataQueries';

// comps
import PracticalFlightHistoryBox from '@/components/flightHistory/PracticalFlightHistoryBox';

const PracticalDetails = ({params}) => {

    const { id, courseId } = params;

    const { data: userFlights, isLoading: userFlightsLoading } = useFlightHistory(1,10,courseId, '', '', '', '', '', '', '', '', id);

    useEffect(() => {
        if(userFlights) {
            console.log(userFlights)
        }
    }, [userFlights])

    return (
        <div className=' w-full flex flex-col gap-y-7 pb-2'>
            
            {
            userFlights && userFlights.totalCount === 0 &&
                <p> هنوز پروازی برای این دوره ثبت نشده است</p>
            }
            {
                userFlights && userFlights.totalCount > 0 &&
                <div className='flex flex-col gap-y-6'>

                    <div className='w-full flex flex-col gap-y-6'>
                        {userFlights.data.map((flight) => (
                            <PracticalFlightHistoryBox key={flight.id} flightBaseData={flight} />
                        ))}
                    </div>

                </div>
            }
        </div>
    );
};

export default PracticalDetails;