import React from 'react';

// styles
import container from '@/styles/Containers.module.css';

// assets
import bookIcon from '@/../public/svgs/book.svg';

// queries
import { useACourseClass } from '@/api/courseDetails';
import Image from 'next/image';

const ACourseClassDropDownBox = ({classData,userId}) => {

    const {  data: classDetails, isLoading: classDetailsLoading, error: classDetailsError } = useACourseClass(classData.id,userId);

    return (
        <div className={`${container.container2withHover} w-full min-h-12 flex justify-start gap-x-[20%] items-center pl-10 pr-4 md:pl-40 rounded-2xl`}>
            {
                classData &&
                <>

                    <Image  src={bookIcon} alt='icon' />

                    <p>{classData.name} </p>
                    
                    <p className='text-xs'>{classData.classDuration}</p>

                </>
            }
        </div>
    );
};

export default ACourseClassDropDownBox;