'use client'
import React, { useState } from "react";
import Image from "next/image";

// assets
import arrowIcon from '@/../public/svgs/Right Arrow Button.svg';

// queries
import { useStudentUsers } from "@/api/GetUsersData";
import { useOrganizations, useLevelsByOrganization } from "@/api/otherQueries";

// comps
import PageTitle from "@/components/reusable comps/PageTitle";
import SearchInput from "@/components/inputs/SearchInput";
import UserDataBox from "@/components/dashboard/UserDataBox";
import Pagination from "@/components/reusable comps/Pagination";
import TextInput from "@/components/inputs/TextInput";
import DropdownInput from "@/components/inputs/DropDownInput";


const PilotsByCertificatePage = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [organization, setOrganization] = useState('');
    const [level, setLevel] = useState('');

    const [RequestSearchTerm, setRequestSearchTerm] = useState('');
    const [RequestOrganizationId, setRequestOrganizationId] = useState('');
    const [RequestlevelId, setRequestLevelId] = useState('');

    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 8
    
    const { data: StudentUsersData, isLoading:StudentUsersLoading} = useStudentUsers(RequestlevelId, pageNumber, pageSize, RequestSearchTerm, RequestOrganizationId);
    const { data: organsData, isLoading: organsLoading, error: organsError } = useOrganizations();
    const { data: levelsData, isLoading: levelsLoading, error: levelsError } = useLevelsByOrganization(organization && organization.id);


    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSelectOrgan = (selectedOrgan) => {
        setOrganization(selectedOrgan);
    }

    const handleSelectLevel = (selectedLevel) => {
        setLevel(selectedLevel);
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
    
    const handleSubmitSearch = () => {
        setRequestSearchTerm(searchTerm);
        setRequestOrganizationId(organizationId);
        setRequestLevelId(levelId);
    }

    return (
        <div className="flex flex-col w-full  items-center min-h-screen py-16 md:py-20">
            <div className="w-[90%] flex flex-col items-center md:w-[70%] lg:w-[65%] gap-y-8">

                <PageTitle title="خلبانان" doesBackButtonExists={true} />

                <div className="w-full flex flex-col gap-4">

                    <TextInput placeholder='کدکاربری یا نام کاربر وارد کنید' value={searchTerm} onChange={handleSearch}  />

                    <div className="w-full flex flex-col gap-4 justify-between md:flex-row ">
                        {
                            organsData &&
                            <DropdownInput name={'ارگان'} options={organsData.data} selectedOption={organization} handleSelectChange={handleSelectOrgan} />
                        }
                        {
                            organization && !levelsLoading && levelsData &&
                            <DropdownInput name={'مقطع '} options={levelsData.data} selectedOption={level} handleSelectChange={handleSelectLevel} />
                        }
                    </div>

                </div>


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
                    {StudentUsersData && StudentUsersData.totalCount > pageSize &&
                    // pageNumber, totalPagesCount, handlePrevPage, handleNextPage
                        <Pagination 
                        pageNumber={pageNumber} totalPagesCount={StudentUsersData.totalPagesCount} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage}   />
                    }

                </div>
                {/* Add your content or data fetching logic here */}
            </div>                                                                                                                                                                                                                                                                                                                                                               <p className=' absolute -z-10 text-[#000000]/0'>front end developed by khashayar mobarez</p>
        </div>
    );
};

export default PilotsByCertificatePage;
