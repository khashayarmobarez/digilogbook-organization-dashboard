'use client'
import React, { useState } from "react";
import Image from "next/image";


// queries
import { useFreePilots } from "@/api/GetUsersData";

// comps
import PageTitle from "@/components/reusable comps/PageTitle";
import SearchInput from "@/components/inputs/SearchInput";
import UserDataBox from "@/components/dashboard/UserDataBox";
import Pagination from "@/components/reusable comps/Pagination";
import ErrorBox from "@/components/reusable comps/ErrorBox";


const FreePilots = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 8
    
    const { data: UsersData, isLoading: UsersLoading, error: usersError } = useFreePilots(pageNumber, pageSize, searchTerm);

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
    }

    const handleNextPage = () => {
        if (pageNumber < UsersData?.totalPagesCount) {
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

                <PageTitle title="خلبانان آزاد" doesBackButtonExists={true} navigateTo={'/dashboard'} />

                <SearchInput
                onSearch={handleSearch}
                name="کدکاربری یا نام کاربر وارد کنید"
                // isLoading={}
                />

                <div className="w-full flex flex-col items-center gap-y-4">
                    
                    <div className="w-full min-h-12 bg-primaryANomral text-accentColorNormal flex justify-between items-center px-10 md:px-40 rounded-2xl border border-mainTextColor mb-4">
                        <p>نام کاربر</p>
                        <p>کد کاربری</p>
                        <p>ساعت پرواز</p>
                    </div>

                    {/* loading */}
                    {
                        UsersLoading &&
                        <span className="loading loading-bars loading-lg mt-16"></span>
                    }

                    {/* error */}
                    {usersError &&
                        <ErrorBox errorText={'مشکلی پیش امده, بعدا دوباره تلاش کنید'} />
                    }

                    {/* users data  */}
                    { UsersData && UsersData.data.length > 0 
                        && UsersData.data.map((userData) => (
                            <UserDataBox userData={userData} key={userData.id} />
                        ))
                    }

                    {/* empty users data  */}
                    { UsersData && UsersData.data.length < 1 &&
                        <p className="text-base font-bold text-accentColorNormal">کاربری یافت نشد ...</p>
                    }

                    {/*  page navigation */}
                    {UsersData && UsersData.totalCount > pageSize && (
                        <Pagination
                        pageNumber={pageNumber} totalPagesCount={UsersData.totalPagesCount} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage}   />
                    )}

                </div>
            </div>                                                                                                                                                                                                                                                                                                                                                               <p className=' absolute -z-10 text-[#000000]/0'>front end developed by khashayar mobarez</p>
        </div>
    );
};

export default FreePilots;
