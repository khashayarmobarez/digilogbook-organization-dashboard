'use client'
import React, { useState } from "react";

// assets
import arrowIcon from '@/../public/svgs/Right Arrow Button.svg';

// queries
import { useStudentUsers } from "@/api/GetUsersData";

// comps
import PageTitle from "@/components/reusable comps/PageTitle";
import SearchInput from "@/components/inputs/SearchInput";
import UserDataBox from "@/components/dashboard/UserDataBox";
import Image from "next/image";

const PilotsByCertificatePage = ({ params }) => {

    const { id } = params; // This is the dynamic ID from the URL

    const [searchTerm, setSearchTerm] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 8
    
    const { data: StudentUsersData, isLoading:StudentUsersLoading} = useStudentUsers(id, pageNumber, pageSize, searchTerm, '');

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
    }

    const handleNextPage = () => {
        if (pageNumber < StudentUsersData?.totalPagesCount) {
            setPageNumber(pageNumber + 1);
        }
    };

    const handlePrevPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };

    return (
        <div className="flex flex-col w-full  items-center min-h-screen py-16 md:py-20">
            <div className="w-[90%] flex flex-col items-center md:w-[70%] lg:w-[65%] gap-y-8">

                <PageTitle title="خلبانان" doesBackButtonExists={true} />

                <SearchInput
                onSearch={handleSearch}
                name="کدکاربری یا نام کاربر وارد کنید"
                // isLoading={}
                />

                <div className="w-full flex flex-col items-center gap-y-4">
                    
                    <div  className="w-full min-h-12 bg-primaryANomral text-accentColorNormal flex justify-between items-center px-10 md:px-40 rounded-2xl border border-mainTextColor mb-4">
                        <p>نام کاربر</p>
                        <p>کد کاربری</p>
                        <p>ساعت پرواز</p>
                    </div>

                    {/* loading */}
                    {
                        StudentUsersLoading &&
                        <span className="loading loading-bars loading-lg mt-16"></span>
                    }

                    {/* users data  */}
                    { StudentUsersData && StudentUsersData.data.length > 0 
                        && StudentUsersData.data.map((userData) => (
                            <UserDataBox userData={userData} key={userData.id} />
                        ))
                    }

                    {/*  page navigation */}
                    {StudentUsersData && StudentUsersData.totalCount > pageSize && (
                        <div className='w-full flex justify-between px-10 items-center mt-4 md:w-3/5 lg:w-2/5'>

                            <button
                                className='transform  w-10 justify-self-end'
                                disabled={pageNumber === 1}
                                onClick={handlePrevPage}
                            >
                                <Image
                                    src={arrowIcon}
                                    alt='arrow'
                                    className={`mt-2 ${pageNumber === 1 && 'opacity-40'}`}
                                />
                            </button>

                            <p className='text-sm justify-self-center text-accentColorNormal'>
                                صفحه ی {pageNumber}
                            </p>

                            <button
                                className='w-10 rotate-180 justify-self-start'
                                disabled={StudentUsersData.totalPagesCount === 1 || StudentUsersData.totalPagesCount === pageNumber}
                                onClick={handleNextPage}
                            >
                                <Image
                                    src={arrowIcon}
                                    alt='arrow'
                                    className={`${(StudentUsersData.totalPagesCount === 1 || StudentUsersData.totalPagesCount === pageNumber) && 'opacity-40'}`}
                                />
                            </button>

                        </div>
                    )}

                </div>
                {/* Add your content or data fetching logic here */}
            </div>                                                                                                                                                                                                                                                                                                                                                               <p className=' absolute -z-10 text-[#000000]/0'>front end developed by khashayar mobarez</p>
        </div>
    );
};

export default PilotsByCertificatePage;
