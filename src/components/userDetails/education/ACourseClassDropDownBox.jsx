import React, { useState } from 'react';

// styles
import container from '@/styles/Containers.module.css';

// assets
import bookIcon from '@/../public/svgs/book.svg';
import yellowBookIcon from '@/../public/svgs/book-yellow.svg';

// queries
import { useACourseClass } from '@/api/courseDetails';
import Image from 'next/image';

const ACourseClassDropDownBox = ({classData,userId}) => {

    const [dropdown, setDropdown] = useState(false);
    const [extraData, setExtraData] = useState(false);

    const {  data: classDetails, isLoading: classDetailsLoading, error: classDetailsError } = useACourseClass(classData.id,userId);

    const handleDropDown = () => {
        setDropdown(!dropdown);
    }

    const handleClickExtraData = () => {
        setExtraData(!extraData);
    }

    return (
        <div className='w-full flex flex-col items-center gap-y-4'>

            {
                classDetailsLoading &&
                <span className="loading loading-dots loading-lg"></span>
            }
            <div className={`${container.container2withHover} w-full min-h-12 flex justify-start gap-x-[20%] md:gap-x-[25%] items-center pl-10 pr-4 md:pl-40 rounded-2xl
            ${dropdown ? 'text-accentColorNormal' : 'text-mainTextColor'} cursor-pointer`}
            onClick={handleDropDown}>
                {
                    classData &&
                    <>

                        {
                            dropdown ?
                            <Image  src={yellowBookIcon} alt='icon' />
                            :
                            <Image  src={bookIcon} alt='icon' />
                        }

                        <p>{classData.name} </p>
                        
                        <p className='text-xs md:text-sm'>{classData.classDuration}</p>

                    </>
                }
            </div>

            {
                dropdown && classDetails &&
                <form className={` ${container.classDetails} w-full rounded-xl flex flex-col pt-10 pb-8 items-center`}>

                            <div className=' grid grid-cols-2 gap-x-4 gap-y-7 w-[90%]'>
            
                                <div className='flex flex-col items-start gap-y-2'>
                                    <p className=' text-sm'>نام</p>
                                    <div className= {`${container.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                        <p>{classDetails.data.name}</p>
                                    </div>
                                </div>
            
                                <div className='flex flex-col items-start gap-y-2'>
                                    <p className=' text-sm'>مدت زمان</p>
                                    <div className= {`${container.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                        <p>{classDetails.data.classDuration}</p>
                                    </div>
                                </div>
            
                                <div className='flex flex-col items-start gap-y-2'>
                                    <p className=' text-sm'>زمان شروع</p>
                                    <div className= {`${container.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                        <p>{classDetails.data.startTime}</p>
                                    </div>
                                </div>
            
                                <div className='flex flex-col items-start gap-y-2'>
                                    <p className=' text-sm'>زمان پایان</p>
                                    <div className= {`${container.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                        <p>{classDetails.data.endTime}</p>
                                    </div>
                                </div>  
            
                                <div className='flex flex-col items-start gap-y-2'>
                                    <p className=' text-sm'>تاریخ</p>
                                    <div className= {`${container.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                        <p>{classDetails.data.dateTime}</p>
                                    </div>
                                </div>  
            
                            </div>

                            {
                                !extraData &&
                                <div className='w-full flex justify-center px-4 mt-12'>
                                    <button onClick={handleClickExtraData} className='underline underline-offset-4 text-xs text-accentColorNormal'  >اطلاعات بیشتر...</button>
                                </div>
                            }
            
                            { extraData &&
                                <div id='no grid list' className='w-[90%] flex flex-col gap-y-5 mt-6'>

                                <div className=' w-full flex flex-col items-start justify-between gap-y-2 mt-6' >
                                    <p>توضیحات کلاس</p>
                                    <p className='border-solid border-[1px] rounded-3xl p-4 text-sm min-h-14 w-full text-right'>{classDetails.data.description}</p>
                                </div>
                
                
                                <div className=' w-full flex flex-col items-start gap-y-2 mt-7'>
                                        <p className=' text-sm'>مباحث مطرح شده</p>
                                        {
                                            classDetails.data.syllabi.map((syllabus) => (
                                                <div key={syllabus.id} className={`${container.classDetailsData} flex justify-start items-center px-4 w-full min-h-12 rounded-xl`} id='data'>
                                                    <p>{syllabus.description}</p>
                                                </div>
                                            ))

                                        }
                                </div>
            

            
                                {
                                     classDetails.data.userCourses.length > 0 &&
                                        <div className=' flex flex-col items-start gap-y-2 w-full'>
                                                <p className=' text-sm'>هنرجویان</p>
                                                <div className='w-full flex flex-col gap-y-5'>
                                                {
                                                classDetails.data.userCourses.map((student) => (    
                                                    <div key={student.id} className= {`${container.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{student.name}</p>
                                                    </div>
                                                ))
                                                }
                                                </div>
                                        </div>
                                }

            
                                {classDetails.data.guestUsers && classDetails.data.guestUsers.length > 0 &&
                                    <div className=' flex flex-col items-start gap-y-2 '>
                                            <p className=' text-sm'>هنرجویان مهمان</p>
                                            <div className='w-full flex flex-col gap-y-5'>   
                                            {
                                            classDetails.data.guestUsers.map((student) => ( 
                                                <div key={student.id} className= {`${container.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                    <p>{student.name}</p>
                                                </div>))
                                            }
                                            </div>
                                    </div>
                                }
            
                            </div>}

                            {
                                extraData &&
                                <div className='w-full flex justify-center mt-12'>
                                    <button onClick={handleClickExtraData} className='underline underline-offset-4 text-xs text-accentColorNormal'  >بستن اطلاعات بیشتر</button>
                                </div>
                            }
            
            
                        </form>
            }

        </div>
    );
};

export default ACourseClassDropDownBox;