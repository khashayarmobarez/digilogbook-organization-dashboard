'use client'
import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function Dashboard() {

    // const router = useRouter();

    // useEffect(() => {
    //     const token = Cookies.get('token');

    //     if (!token) {
    //         router.replace('/login'); // Use replace instead of push to avoid adding to history
    //     }
    // }, [router]);

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}