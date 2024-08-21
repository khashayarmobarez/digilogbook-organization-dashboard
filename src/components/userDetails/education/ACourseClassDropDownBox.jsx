import React from 'react';

// styles
import container from '@/styles/Containers.module.css';

// queries
import { useACourseClass } from '@/api/courseDetails';
import Image from 'next/image';

const ACourseClassDropDownBox = ({classData,userId}) => {

    const {  data: classDetails, isLoading: classDetailsLoading, error: classDetailsError } = useACourseClass(classData.id,userId);

    return (
        <div className={`${container.container2withHover} w-full min-h-12 flex justify-between items-center pl-10 pr-4 md:pl-40 rounded-2xl`}>
            {
                classData &&
                <>

                    <Image  src={calender} alt='icon' />

                    <p>{classData.name} </p>
                    
                    <p>{classData.classDuration}</p>

                    <div/>

                </>
            }
        </div>
    );
};

export default ACourseClassDropDownBox;