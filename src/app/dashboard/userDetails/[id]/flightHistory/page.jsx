'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// styles
import ButtonStyles from '@/styles/Buttons.module.css'

// assets 
import arrowIcon from '@/../public/svgs/Right Arrow Button.svg';
import eraser from '@/../public/svgs/eraser 1.svg';

// queires
import { useFlightHistory } from '@/api/flightDataQueries';

// comps
import SmallerPageTitle from '@/components/reusable comps/SmallerPageTitle';
import PracticalFlightHistoryBox from '@/components/flightHistory/PracticalFlightHistoryBox';
import Image from 'next/image';
import Pagination from '@/components/reusable comps/Pagination';

const FlightHistory = ({params}) => {

    const router = useRouter()

    const { id } = params

    const [pageNumber, setPageNumber] = useState(1);

    const { data: userFlights, isLoading: userFlightsLoading } = useFlightHistory(pageNumber,10,'', '', '', '', '', '', '', '', '', id);

    const handleNextPage = () => {
        if (pageNumber < userFlights?.totalPagesCount) {
            setPageNumber(pageNumber + 1);
        }
    };

    const handlePrevPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };


    return (
        <div className='flex flex-col items-center w-[90%] pb-10 gap-y-8'>

            <SmallerPageTitle title='سوابق پروازی' doesBackButtonExists={false} />

            <div className='w-full flex flex-col'>
                    <div className='w-full flex flex-col justify-center items-center px-1 gap-y-8'>

                        <div className='w-full flex justify-between gap-x-4'>
                            <button
                                className={`w-full ${ButtonStyles.normalButton} min-w-28`}
                                // onClick={() => router.push('/')}
                            >
                                فیلتر جست‌وجو
                            </button>
                            <button className={` w-12 h-12 rounded-2xl flex justify-center items-center 
                            ${ButtonStyles.normalButtonBackgroundOnly}`}
                            // onClick={handleResetData}
                            >
                                <Image src={eraser} alt='eraser' />
                            </button>

                        </div>
 
                        {/* <FilterVariables /> */}

                        {userFlights && userFlights.data.length === 0 && (
                            <p className='text-base text-center font-medium mt-6' style={{ color: 'var(--red-text)' }}>
                                هیچ پروازی یافت نشد
                            </p>
                        )}

                        {userFlights && userFlights.data.length > 0 && (
                            <div className='w-full flex flex-col gap-y-6'>
                                {userFlights.data.map((flight) => (
                                    <PracticalFlightHistoryBox key={flight.id} flightBaseData={flight} userId={id} />
                                ))}
                            </div>
                        )}

                        {userFlights && userFlights.data.length > 0 && (
                            <div className='w-full flex justify-center px-10 items-center'>
                                <Pagination
                                pageNumber={pageNumber} totalPagesCount={userFlights.totalPagesCount} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage}   />
                            </div>
                        )}
                    </div>
                </div>
            
        </div>
    );
};

export default FlightHistory;