import React from 'react';

// styles
import containers from '@/styles/Containers.module.css';

const UserDetailsFlightHistory = ({ children }) => {
    return (
        <div className={`${containers.darkMainContainer} w-full rounded-2xl flex flex-col items-center`}>
            {children}
        </div>
    );
}

export default UserDetailsFlightHistory;