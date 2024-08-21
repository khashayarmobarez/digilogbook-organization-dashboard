import React from 'react';

// styles
import containers from '@/styles/Containers.module.css';

const UserDetailsStudentCourses = ({ children }) => {
    return (
        <div className={`${containers.darkMainContainer} w-full rounded-2xl flex flex-col items-center justify-start`}>
            {children}
        </div>
    );  
}

export default UserDetailsStudentCourses;