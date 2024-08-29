import React from 'react';
import Image from 'next/image';

// styles
import containers from '@/styles/Containers.module.css';

// assets
import timer from '@/../public/svgs/timer.svg'
import check from '@/../public/svgs/checkGreen.svg'
import { useRouter } from 'next/navigation';


const PracticalFlightHistoryBox = (props) => {

    const router = useRouter()

    const { flightBaseData, userId,  isForAStudentFromCourse, isForAStudentFromClubCourse, studentId } = props;

    const handleClick = (id) => {
        !isForAStudentFromCourse && !isForAStudentFromClubCourse && router.push(`/dashboard/userDetails/${userId}/flightHistory/flightDetails/${id}`)
        isForAStudentFromCourse && router.push(`/dashboard/userDetails/${userId}/education/aStudentFlightHistory/${flightBaseData.id}`)
        isForAStudentFromClubCourse && router.push(`/dashboard/clubs/${userId}/courses/aStudentFlightHistory/${flightBaseData.id}`)
    }

    return (
        <div className='flex flex-col gap-y-4'>

            
                {/* classesInput */}
                {
                    flightBaseData &&
                    <div 
                    onClick={() => handleClick(flightBaseData.id)} 
                    className={`${containers.classDetails} flex w-full justify-between items-center h-12 pl-3 rounded-2xl text-xs hover:text-accentColorNormal`} >
                        <button className={`${containers.clipboardButtonBackgroundGradient} w-14 h-full flex items-center justify-center rounded-r-xl`}>
                            <p>{flightBaseData.index}</p>
                        </button>
                        <p>{flightBaseData.takeOffDateAndFlightDuration && flightBaseData.takeOffDateAndFlightDuration}</p>
                        <p>{flightBaseData.city && flightBaseData.city.slice(0, 10)}</p>
                        <p>{flightBaseData.site && flightBaseData.site.slice(0, 14)}</p>
                        { flightBaseData.status === 'Pending' &&
                            <Image src={timer} alt='timer' />
                        }
                        { flightBaseData.status === 'Accepted' &&
                            <Image src={check} alt='check' />
                        }
                    </div>
                }

        </div>
    );
};

export default PracticalFlightHistoryBox;