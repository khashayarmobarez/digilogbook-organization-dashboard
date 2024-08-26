'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// styles
import containers from '@/styles/Containers.module.css';

// assets
import pencil from '@/../public/svgs/pencil-alt.svg';

// queries
import { useUserData } from '@/api/userDetails';

// comps
import UserDetailsDataBox from '@/components/userDetails/UserDetailsDataBox';


const UserDetails = ({ children, params }) => {

    const { id } = params;

    const { data, isLoading } = useUserData(id);

    return (
        <div className="w-full min-h-screen bg-mainBgColor py-24 md:py-32 flex flex-col items-center">
            <div className="w-[90%] flex flex-col md:w-[70%] lg:w-[65%] gap-y-8 items-center">

            {
                isLoading &&
                <span className="loading loading-dots loading-lg"></span>
            }
            

            {   data &&
            <>
                <UserDetailsDataBox id={id} data={data.data} />

                <div className='flex justify-around w-full md:fixed md:left-0 md:top-28 md:flex-col md:w-28 md:h-[20rem]'>

                    <Link href={`/dashboard/userDetails/${id}/flightHistory`} className={`${containers.container2} w-[60px] h-[60px] rounded-2xl flex flex-col justify-between items-center p-3 text-[#A5E65E] text-xs 
                    hover:w-[57px] hover:h-[57px] hover:mr-1`}>
                        <Image src={pencil} alt='icon' className='w-[56%]'/>
                        <p className='text-xs'>سوابق</p>
                    </Link>
                    
                    <Link href={`/dashboard/userDetails/${id}/studentCourses`} className={`${containers.container2} w-[60px] h-[60px] rounded-2xl flex flex-col justify-between items-center p-3 text-[#A5E65E] text-xs 
                    hover:w-[57px] hover:h-[57px] hover:mr-1`}>
                        <Image src={pencil} alt='icon' className='w-[56%]'/>
                        <p>دوره‌ها</p>
                    </Link>
                    
                    <Link href={`/dashboard/userDetails/${id}/education`} className={`${containers.container2} w-[60px] h-[60px] rounded-2xl flex flex-col justify-between items-center p-3 text-[#A5E65E] text-xs 
                    hover:w-[57px] hover:h-[57px] hover:mr-1`}>
                        <Image src={pencil} alt='icon' className='w-[56%]'/>
                        <p>آموزش</p>
                    </Link>

                    <Link href={`/dashboard/userDetails/${id}/education`} className={`${containers.container2} w-[60px] h-[60px] rounded-2xl flex flex-col justify-between items-center p-3 text-[#A5E65E] text-xs 
                    hover:w-[57px] hover:h-[57px] hover:mr-1`}>
                        <Image src={pencil} alt='icon' className='w-[56%]'/>
                        <p>باشگاه</p>
                    </Link>

                </div>
            </>
            }

            <main className='w-full'>{children}</main>
            </div>
        </div>
        );
    };
  
export default UserDetails;