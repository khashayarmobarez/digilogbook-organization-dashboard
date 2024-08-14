'use client'
import React, { useEffect } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

export default function Dashboard() {

    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');

        if (!token) {
            router.push('/login'); 
        }
    }, [router]);

    return (
        <div className="flex flex-col w-full items-center min-h-screen pt-16">
            <h1>Dashboard</h1>
        </div>
    );
}