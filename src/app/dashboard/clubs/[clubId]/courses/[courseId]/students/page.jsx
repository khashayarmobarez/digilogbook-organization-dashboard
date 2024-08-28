'use client'
import React, { useState } from 'react';

// queries
import { useAClubCourseHistoryStudents, useAClubCourseStudents } from '@/api/useClub';

// comps
import DropDownLine from '@/components/reusable comps/DropDownLine';
import Pagination from "@/components/reusable comps/Pagination";
import UserDataBox from '@/components/dashboard/UserDataBox';

const StudentDetails = ({params}) => {

    const { clubId, courseId } = params;

    const [pageNumber, setPageNumber] = useState(1);
    const [historyPageNumber, sethistoryPageNumber] = useState(1);
    const [DropDownHistory, setDropDownHistory] = useState(false);
    const [DropDownActive, setDropDownActive] = useState(true);

    const { data: studentsData, isLoading: studentsDataLoading, error: studentsDataError, refetch: refetchStudentdata } = useAClubCourseStudents(courseId,pageNumber,clubId);
    const { data: studentsHistoryData, isLoading: studentsHistoryDataLoading, error: studentsHistoryDataError, refetch:refetchStudentHistorydata } = useAClubCourseHistoryStudents(courseId,historyPageNumber, clubId);

    const handleNextPage = () => {
        setPageNumber(prev => prev + 1)
        setTimeout(() => {
            refetchStudentdata();
        }, 100);
    }

    const handlePrevPage = () => {
        setPageNumber(prev => prev - 1)
        setTimeout(() => {
            refetchStudentdata();
        }, 100);
    }

    const handleNextPageHistory = () => {
        if(studentsHistoryData.totalPagesCount === historyPageNumber) return;
        console.log('next page')
        sethistoryPageNumber(prev => prev + 1)
    }

    const handlePrevPageHistory = () => {
        sethistoryPageNumber(prev => prev - 1)
    }

    return (
        <div className='w-full flex flex-col items-center'>

            {
                (studentsDataLoading || studentsHistoryDataLoading) &&
                <span className="loading loading-dots loading-lg"></span>
            }

            {
                studentsData && studentsData.data.length < 1 &&
                <div className='w-full flex flex-col items-center text-accentColorNormal font-normal'>
                    <p>هنرجویی برای این دوره ثبت نام نکرده است</p>
                </div>
            }            

            {
                studentsData && studentsData.data.length > 0 && !(studentsDataLoading || studentsHistoryDataLoading) &&
                <div className='w-full flex flex-col items-center gap-y-6'>
                    {
                        studentsData.totalCount > 0 &&
                        <DropDownLine  
                            onClickActivation={() => setDropDownActive(!DropDownActive)}
                            title={'هنر جویان'} 
                            dropDown={DropDownActive} 
                            isActive={DropDownActive === true}  
                        />
                    }
                    {
                        DropDownActive &&
                        studentsData.data?.map((student) => (
                            <UserDataBox isForClubCourseDetails={true} userData={student} key={student.id} />
                        )
                    )}
                    {studentsData && studentsData.totalPagesCount > 1 && (
                        <Pagination
                        pageNumber={pageNumber} totalPagesCount={studentsData.totalPagesCount} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage}   />
                    )}

                </div>
            }
            {
                studentsHistoryData && studentsHistoryData.data.length > 0 && !(studentsDataLoading || studentsHistoryDataLoading) &&
                <div className='w-full flex flex-col items-center gap-y-6'>
                    {
                        studentsData.totalCount > 0 &&
                        <DropDownLine  
                            onClickActivation={() => setDropDownHistory(!DropDownHistory)}
                            title={'هنر جویان سابق'} 
                            dropDown={DropDownHistory} 
                            isActive={DropDownHistory === true}  
                        />
                    }
                    {
                        DropDownHistory &&
                        studentsHistoryData.data?.map((student) => (
                            <UserDataBox isForCourseDetails={true} userData={student} key={student.id} />
                        )
                    )}
                    {studentsHistoryData && studentsHistoryData.totalPagesCount > 1 && (
                        <Pagination
                        pageNumber={historyPageNumber} totalPagesCount={studentsHistoryData.totalPagesCount} handlePrevPage={handlePrevPageHistory} handleNextPage={handleNextPageHistory}   />
                    )}

                </div>
            }
        </div>
    );
};

export default StudentDetails;