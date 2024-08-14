'use client'
import React from 'react';


export default function SideMenu() {
    return (
        <div>
            <div className=" absolute right-0 flex flex-col h-full z-50 w-full md:w-1/6 ">
                <div className='w-1/2 md:w-full h-full md:mt-24'>
                    <div className="flex flex-col items-center justify-center h-20 border-b-2 border-gray-200">
                        <h1 className="text-2xl font-bold">Digilogbook</h1>
                    </div>
                    <div className="flex flex-col items-center justify-center h-20 border-b-2 border-gray-200">
                        <h1 className="text-2xl font-bold">Digilogbook</h1>
                    </div>
                    <div className="flex flex-col items-center justify-center h-20 border-b-2 border-gray-200">
                        <h1 className="text-2xl font-bold">Digilogbook</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}