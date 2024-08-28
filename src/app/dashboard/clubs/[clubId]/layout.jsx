'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// styles
import containers from '@/styles/Containers.module.css';

// assets
import pencil from '@/../public/svgs/pencil-alt.svg';
import pencilDark from '@/../public/svgs/pencil-alt-dark.svg';

// queries
import { useAClubData } from '@/api/useClub';

// comps
import ClubDetailsDataBox from'@/components/clubDetails/ClubDetailsDataBox'


const ClubDetails = ({ children, params }) => {

    const { clubId } = params;
    const pathname = usePathname()

    const { data, isLoading } = useAClubData(clubId);

    return (
        <div className="w-full min-h-screen bg-mainBgColor py-24 md:py-32 flex flex-col items-center">
            <div className="w-[90%] flex flex-col md:w-[70%] lg:w-[65%] gap-y-8 items-center">

            {
                isLoading &&
                <span className="loading loading-dots loading-lg"></span>
            }
            

            {   data &&
            <>
                <ClubDetailsDataBox id={clubId} data={data.data} />

                <div className='flex justify-around w-full md:fixed md:left-0 md:top-28 md:flex-col md:w-28 md:h-[20rem]'>

                    <Link href={`/dashboard/userDetails/${clubId}/education`} className={`${containers.container2} w-[65px] h-[65px] rounded-2xl flex flex-col justify-between items-center p-2 text-[#A5E65E] text-xs hover:w-[57px] hover:h-[57px] hover:mr-1
                    ${pathname === `/dashboard/userDetails/${clubId}/education` ? 'text-mainBgColor' : 'text-accentColorNormal'  }
                    ${pathname === `/dashboard/userDetails/${clubId}/education` ? containers.container2active : containers.container2  } 
                    `}>
                        <Image src={pathname === `/dashboard/userDetails/${clubId}/education` ? pencilDark : pencil} alt='icon' className='w-[56%]'/>
                        <p className='text-xs text-center'>پنل مسئول</p>
                    </Link>
                    
                    <Link href={`/dashboard/clubs/${clubId}/courses`} className={`${containers.container2} w-[65px] h-[65px] rounded-2xl flex flex-col justify-between items-center p-2 text-[#A5E65E] text-xs hover:w-[57px] hover:h-[57px] hover:mr-1
                    ${pathname === `/dashboard/clubs/${clubId}/courses` ? 'text-mainBgColor' : 'text-accentColorNormal'  }
                    ${pathname === `/dashboard/clubs/${clubId}/courses` ? containers.container2active : containers.container2  } 
                    `}>
                        <Image src={pathname === `/dashboard/clubs/${clubId}/courses` ? pencilDark : pencil} alt='icon' className='w-[56%]'/>
                        <p>دوره‌ها</p>
                    </Link>
                    
                    <Link href={`/dashboard/clubs/${clubId}/coaches`} className={`${containers.container2} w-[65px] h-[65px] rounded-2xl flex flex-col justify-between items-center p-2 text-[#A5E65E] text-xs hover:w-[57px] hover:h-[57px] hover:mr-1
                    ${pathname === `/dashboard/clubs/${clubId}/coaches` ? 'text-mainBgColor' : 'text-accentColorNormal'  }
                    ${pathname === `/dashboard/clubs/${clubId}/coaches` ? containers.container2active : containers.container2  } 
                    `}>
                        <Image src={pathname === `/dashboard/clubs/${clubId}/coaches` ? pencilDark : pencil} alt='icon' className='w-[56%]'/>
                        <p>مربیان</p>
                    </Link>

                </div>
            </>
            }

            <main className='w-full'>{children}</main>
            </div>
        </div>
        );
    };
  
export default ClubDetails;