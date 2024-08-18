'use client'
import React, { useEffect } from "react";

import container from '@/styles/Containers.module.css';
import { useRouter } from "next/router";


export default function PilotsByCertificate() {

    const router = useRouter();
    const { id } = router.query;
    
    return (
        <div className="flex flex-col w-full  items-center min-h-screen py-16 md:py-20">
            {id}
        </div>
    )

}