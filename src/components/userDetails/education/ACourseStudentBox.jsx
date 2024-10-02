import React from 'react';
import { useRouter } from 'next/navigation';

// styles
import containers from '@/styles/Containers.module.css';

// mui
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';


const ACourseStudentBox = ({studentData, isForHistory, isForClub, ownerId}) => {

    const router = useRouter()
    

    const handleClickStudent = () => {
        !isForClub && router.push(`/dashboard/userDetails/${ownerId}/education/studentsList/aStudentCourses/${studentData.id}`)
        isForClub && router.push(`/dashboard/clubs/${ownerId}/courses/studentsList/aStudentCourses/${studentData.id}`)
    }
    


    return (
            <div className={`${containers.darkMainContainer} z-10 flex w-full justify-between items-center h-12 px-4 rounded-2xl text-sm`}
            onClick={handleClickStudent}>

                <span >
                    <PersonOutlineOutlinedIcon />
                </span>
                
                <p className='-mr-4 md:-mr-20'>{studentData.fullName}</p>

                {
                    !isForHistory &&
                    <p className='text-[var(--yellow-text)]'>دوره فعال:{studentData.activeCourseCount}</p>
                }
                 
                <p>دوره غیر فعال:{studentData.disableCourseCount}</p>

            </div>
    );
};

export default ACourseStudentBox;