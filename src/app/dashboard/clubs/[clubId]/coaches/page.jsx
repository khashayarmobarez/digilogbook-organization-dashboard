'use client'
import React, { useState } from 'react';
import Image from 'next/image';

// styles
import containers from '@/styles/Containers.module.css'

// queries
import { useAClubCoaches, useAClubHistoryCoaches } from '@/api/useClub';

// comps
import SmallerPageTitle from '@/components/reusable comps/SmallerPageTitle';
import DropDownLine from '@/components/reusable comps/DropDownLine';

const ClubCoachesList = ({params}) => {

    const { clubId } = params;

    const [DropDown , setDropDown] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)

    const { data: clubCoachesData, isLoading:clubCoachesLoading, error: clubCoachesError } = useAClubCoaches(pageNumber, 10, clubId);
    const { data: clubCoachesHistoryData, isLoading:clubCoachesHistoryLoading, error: clubCoachesHistoryError } = useAClubHistoryCoaches(pageNumber, 10, clubId);

    const handleDropDownClick = (dropdownid) => {
        setDropDown(DropDown === dropdownid ? '' : dropdownid)
        setPageNumber(1)
    }

    return (
        <div className='flex flex-col items-center justify-center w-[90%] pb-14 gap-y-8'>
                
            <SmallerPageTitle title='مربیان' doesBackButtonExists={false} />


            {
                clubCoachesData && clubCoachesData.totalCount === 0 && clubCoachesHistoryData && clubCoachesHistoryData.totalCount === 0 &&
                <p className='text-lg font-medium text-warningNormal py-8'>مربی در این باشگاه عضو نیست</p>
            }

            {  
            clubCoachesData && clubCoachesData.totalCount > 0 &&
                <DropDownLine  
                onClickActivation={() => handleDropDownClick(1)}
                title='مربیان'
                dropDown={DropDown} 
                isActive={DropDown === 1}  
                />
            }

            {
                DropDown === 1 && clubCoachesData &&
                <div className='w-full flex flex-col gap-y-4'>
                    {
                        clubCoachesData.data.map((coach) => 
                            <div key={coach.id} className={`w-full h-20 flex justify-between px-4 py-2 rounded-3xl items-center text-sm hover:text-mainBgColor ${containers.container2withHover}`}>

                                <div className="avatar placeHolder">
                                    <div className="w-14 h-14 rounded-full bg-lowOpacityWhite">
                                        {
                                            coach.profilePicture &&
                                            <Image width={100} height={100}
                                            src={coach.profilePicture} alt='user picture' />
                                        }
                                    </div>
                                </div>

                                <p>{coach.name}</p>

                                <p className='text-lowOpacityWhite hover:text-mainBgColor'>وضعیت:&nbsp;
                                    {
                                        coach.status === 'Active' &&
                                        <span className='text-accentColorNormal'>فعال</span>
                                    }
                                    {
                                        coach.status === 'Pending' &&
                                        <span className='text-mainTextColor'>در انتظار ... </span>
                                    }
                                    {
                                        coach.status === 'Rejected' &&
                                        <span className=''>رد شده</span>
                                    }
                                    {
                                        coach.status === 'Disable' &&
                                        <span className='text-notificationNormal'>غیر فعال</span>
                                    }
                                </p>

                                <div/>

                            </div>
                        )
                    }
                </div>
            }

            {
                clubCoachesHistoryData && clubCoachesHistoryData.totalCount > 0 &&
                    <DropDownLine  
                        onClickActivation={() => handleDropDownClick(2)}
                        title='مربیان سابق'
                        dropDown={DropDown} 
                        isActive={DropDown === 2}  
                    />
            }

            {
                DropDown === 2 && clubCoachesHistoryData && 
                clubCoachesHistoryData.data.map((coach) => 
                    <div key={coach.id} className={`w-full h-20 flex justify-between px-4 py-2 rounded-3xl items-center text-sm hover:text-mainBgColor ${containers.container2withHover}`}>

                        <div className="avatar placeHolder">
                            <div className="w-14 h-14 rounded-full bg-lowOpacityWhite">
                                {
                                    coach.profilePicture &&
                                        <Image width={100} height={100}
                                        src={coach.profilePicture} alt='user picture' />
                                }
                            </div>
                        </div>

                        <p>{coach.name}</p>

                        <p className='text-lowOpacityWhite hover:text-mainBgColor'>وضعیت:&nbsp;
                            {
                                coach.status === 'Active' &&
                                <span className='text-accentColorNormal'>فعال</span>
                            }
                            {
                                coach.status === 'Pending' &&
                                <span className='text-mainTextColor'>در انتظار ... </span>
                            }
                            {
                                coach.status === 'Rejected' &&
                                <span className=''>رد شده</span>
                            }
                            {
                                coach.status === 'Disable' &&
                                <span className='text-notificationNormal'>غیر فعال</span>
                            }
                        </p>

                        <div/>

                    </div>
                )
            }

            {
                (clubCoachesLoading || clubCoachesHistoryLoading) &&
                <span className="loading loading-dots loading-md"></span>
            }
            
        </div>
    );
};

export default ClubCoachesList;