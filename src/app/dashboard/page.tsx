'use client'
import React, { useEffect } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

// components
import IranMap from '@/components/dashboard/iranMap/components/IranMap';

export default function Dashboard() {

    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');

        if (!token) {
            router.push('/login'); 
        }
    }, [router]);

    return (
        <div className="flex flex-col w-full items-center min-h-screen pt-24">
            {/* map */}
            <div className=' w-full flex flex-row-reverse justify-start items-start lg:flex lg:flex-col-reverse'>
                <IranMap />
            </div>
        </div>
    );
}