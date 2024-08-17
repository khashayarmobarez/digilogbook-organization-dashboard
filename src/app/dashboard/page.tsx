'use client'
import React, { useEffect } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

import container from '@/styles/Containers.module.css';

// components
import IranMap from '@/components/dashboard/iranMap/components/IranMap';
import PageTitle from "@/components/reusable comps/PageTitle";
import FlightSitesData from "@/components/dashboard/FlightSitesData";

export default function Dashboard() {

    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');

        if (!token) {
            router.push('/login'); 
        }
    }, [router]);

    return (
        <div className="flex flex-col w-full  items-center min-h-screen py-16 md:py-20">

            <div className="w-[90%] flex flex-col md:w-[70%] lg:w-[65%] gap-y-8">

                <PageTitle title="داشبورد انجمن" doesBackButtonExists={false} />

                <div className={` w-full min-h-10 rounded-2xl py-8 px-6 flex flex-row justify-start items-start lg:flex lg:flex-col ${container.darkMainContainer}`}>
                    
                    
                    <FlightSitesData />


                </div>
            </div>
        </div>
    );
}