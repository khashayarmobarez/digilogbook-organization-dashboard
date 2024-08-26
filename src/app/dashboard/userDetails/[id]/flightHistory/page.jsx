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

const FlightHistory = ({params}) => {

    const router = useRouter()

    const { id } = params

    const [pageNumber, setPageNumber] = useState(1);

    const { data: userFlights, isLoading: userFlightsLoading } = useFlightHistory(1,10,'', '', '', '', '', '', '', '', '', id);

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
                                    <PracticalFlightHistoryBox key={flight.id} flightBaseData={flight} />
                                ))}
                            </div>
                        )}

                        {userFlights && userFlights.data.length > 0 && (
                            <div className='w-full flex justify-between px-10 items-center'>
                                <button
                                    className='w-10 justify-self-start'
                                    disabled={userFlights.totalPagesCount === 1 || userFlights.totalPagesCount === pageNumber}
                                    // onClick={handleNextPage}
                                >
                                    <Image
                                        src={arrowIcon}
                                        alt='arrow'
                                        className={`${(userFlights.totalPagesCount === 1 || userFlights.totalPagesCount === pageNumber) && 'opacity-60'}`}
                                    />
                                </button>

                                <p className='text-sm justify-self-center' style={{ color: 'var(--yellow-text)' }}>
                                    صفحه ی {pageNumber}
                                </p>

                                <button
                                    className='transform rotate-180 w-10 justify-self-end'
                                    disabled={pageNumber === 1}
                                    // onClick={handlePrevPage}
                                >
                                    <Image
                                        src={arrowIcon}
                                        alt='arrow'
                                        className={`mt-2 ${pageNumber === 1 && 'opacity-60'}`}
                                    />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            
        </div>
    );
};

export default FlightHistory;