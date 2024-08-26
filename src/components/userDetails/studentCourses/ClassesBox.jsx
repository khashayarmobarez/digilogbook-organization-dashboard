import React, { useState } from 'react';
import Image from 'next/image';

// styles
import containers from '@/styles/Containers.module.css'

// mui
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

// assets
import clipboard from '@/../public/svgs/clipboard.svg'

// queries
import { useAUserCourseClass } from '@/api/courseDetails';


const ClassesBox = (props) => {

    const { classData, userId } = props

    const [isExpanded, setIsExpanded] = useState(false)


    const {  data: classDetails, isLoading: classDetailsLoading, error: classDetailsError } = useAUserCourseClass(classData.id, userId);


    const handleClick = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <div className='flex flex-col space-y-4 w-full'>

                {
                    classData &&
                    <>
                        {/* classesInput */}
                        <div onClick={handleClick} className={`${containers.classDetails} flex w-full justify-between items-center h-12 pr-3 rounded-2xl text-sm hover:text-accentColorNormal
                        ${isExpanded && 'text-accentColorNormal'}`}>
                            <span>
                                <AutoStoriesOutlinedIcon />
                            </span>
                            <p>{classData.name}</p>
                            <p>{classData.classDuration}</p>
                            <div/>
                        </div>

                        {isExpanded && classDetailsLoading && 
                            <div className='w-full py-8 flex justify-center items-center'>
                                <span className="loading loading-dots loading-lg"></span>
                            </div>
                        }

                        {isExpanded && classDetails &&
                            <form className={` ${containers.classDetails} w-full rounded-xl flex flex-col items-center pt-10 pb-8`}>

                            <div className=' grid grid-cols-2 gap-x-4 gap-y-7 w-[90%]'>
            
                                <div className='flex flex-col items-start gap-y-2'>
                                    <p className=' text-sm'>نام</p>
                                    <div className= {`${containers.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                        <p>{classDetails.data.name}</p>
                                    </div>
                                </div>
            
                                <div className='flex flex-col items-start gap-y-2'>
                                    <p className=' text-sm'>مدت زمان</p>
                                    <div className= {`${containers.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                        <p>{classDetails.data.classDuration}</p>
                                    </div>
                                </div>
            
                                <div className='flex flex-col items-start gap-y-2'>
                                    <p className=' text-sm'>زمان شروع</p>
                                    <div className= {`${containers.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                        <p>{classDetails.data.startTime}</p>
                                    </div>
                                </div>
            
                                <div className='flex flex-col items-start gap-y-2'>
                                    <p className=' text-sm'>زمان پایان</p>
                                    <div className= {`${containers.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                        <p>{classDetails.data.endTime}</p>
                                    </div>
                                </div>  
            
                                <div className='flex flex-col items-start gap-y-2'>
                                    <p className=' text-sm'>تاریخ</p>
                                    <div className= {`${containers.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                        <p>{classDetails.data.dateTime}</p>
                                    </div>
                                </div>  
            
                            </div>

                            <div className=' w-[90%] flex flex-col items-start justify-between gap-y-2 mt-6' >
                                <p>توضیحات کلاس</p>
                                <p className='border-solid border-[1px] rounded-3xl p-4 text-sm min-h-14 w-full text-right'>{classDetails.data.description}</p>
                            </div>
            
                            {classDetails.data.syllabi &&
                                <div className='flex flex-col items-start gap-y-2 w-[90%] mt-7'>
                                        <p className=' text-sm'>مباحث مطرح شده</p>
                                        { 
                                            classDetails.data.syllabi.map((syllabus,index) => (
                                                <div key={index} className={`${containers.classDetailsData} flex justify-start items-center px-4 w-full min-h-12 rounded-xl`} id='data'>
                                                    <p>{syllabus.description}</p>
                                                </div>
                                            ))

                                        }
                                </div>
                            }
            
            
                        </form>
                        }
                    </>
                }

        </div>
    );
};

export default ClassesBox;