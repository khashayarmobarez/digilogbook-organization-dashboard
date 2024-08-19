import React from 'react';

const loading = () => {
    return (
        <div className="flex flex-col w-full items-center min-h-screen py-40 md:py-40">
            <span className="loading loading-infinity loading-lg"></span>
        </div>
    );
};

export default loading;