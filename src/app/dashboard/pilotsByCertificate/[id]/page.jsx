'use client'
import React, { useState } from "react";

// queries
import { useStudentUsers } from "@/api/GetUsersData";

// comps
import PageTitle from "@/components/reusable comps/PageTitle";
import SearchInput from "@/components/inputs/SearchInput";

const PilotsByCertificatePage = ({ params }) => {

    const { id } = params; // This is the dynamic ID from the URL

    const [searchTerm, setSearchTerm] = useState('');
    
    const { data, isLoading, error } = useStudentUsers(id, '', '', searchTerm, '');

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
    }

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
                    
                    <div className="w-full min-h-12 bg-primaryANomral flex justify-between items-center px-10 rounded-2xl border border-mainTextColor">

                    </div>
                </div>
                {/* Add your content or data fetching logic here */}
            </div>
        </div>
    );
};

export default PilotsByCertificatePage;
