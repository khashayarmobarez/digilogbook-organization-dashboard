'use client'
import React from 'react';
import { useParams, useRouter } from 'next/navigation';

// styles
import buttonStyles from '@/styles/Buttons.module.css'

// redux
import { useDispatch, useSelector } from 'react-redux';
import {  selectFlightFilter, updateCoachNameFilter, updateCountryFilter, updateCourseFilter, updateFlightStatusFilter, updateFlightTypeFilter, updateFromDateFilter,  updateProvinceFilter, updateSiteFilter, updateToDateFilter } from '@/utils/redux toolkit/flightHistoryAdvancedFilter/flightFilterSlice';

// providers
import { flightTypeOptions, flightStatusOptions } from '@/utils/Providers/dropdownInputOptions';

// uils
import useDateFormat from '@/utils/useDateFormat';

// queries
import { useCountries, useProvincesByCountryId, useSitesByProvinceId, useAllUserCoursesForDropdown, useAllUserCouches } from '@/api/flightDataQueries';

// comps
import DateButtonInput from '@/components/inputs/DateButtonInput';
import DropdownInput from '@/components/inputs/DropDownInput';
import SearchInputWithDropdown from '@/components/inputs/SearchInputWithDropdown';
import SmallerPageTitle from '@/components/reusable comps/SmallerPageTitle';

const FlightFilter = ({params}) => {

    const { id } = params;

    const dispatch = useDispatch()
    const router = useRouter()
    const { formatDate } = useDateFormat();


    // redux
    const { 
        courseFilter,
        countryFilter,
        provinceFilter,
        siteFilter,
        flightTypeFilter,
        flightStatusFilter,
        coachNameFilter,
        fromDateFilter,
        toDateFilter
    } = useSelector(selectFlightFilter)


    const { data: userCoursesData, loading:userCoursesLoading, error:userCoursesError } = useAllUserCoursesForDropdown(id)
    const { data: userCoachesData, loading:userCoachesLoading, error:userCoachesError } = useAllUserCouches(id)
    const { data: countriesData, loading:countriesLoading, error:countriesError } = useCountries()
    const { data: provincesData, loading:provincesLoading, error:provincesError, refetch: refetchProvinces } = useProvincesByCountryId(countryFilter ? countryFilter.id : '')
    const { data: flightSitesData, loading:flightSitesLoading, error:flightSitesError, refetch: refetchSites } = useSitesByProvinceId(provinceFilter  && provinceFilter.id, countryFilter && countryFilter.id)
    
    const handleSelectCourseFilter = (selectedOption) => {
        dispatch(updateCourseFilter(selectedOption));
    };

    const handleSelectFlightTypeFilter = (selectedOption) => {
        dispatch(updateFlightTypeFilter(selectedOption));
    };

    const handleSelectFlightStatusFilter = (selectedOption) => {
        dispatch(updateFlightStatusFilter(selectedOption));
    }

    const handleSelectCoachNameFilter = (selectedOption) => {
        dispatch(updateCoachNameFilter(selectedOption));
    }

    const handleSelectSetCountryFilter = (selectedOption) => {
        dispatch(updateCountryFilter(selectedOption));
        dispatch(updateProvinceFilter({name:'',id:''})); // Clear province filter
        dispatch(updateSiteFilter({name:'',id:''})); // Clear site filter
    };

    const handleSelectSetCityFilter = (selectedOption) => {
        dispatch(updateProvinceFilter(selectedOption));
    };

    const handleSelectSetSiteFilter = (selectedOption) => {
        dispatch(updateSiteFilter(selectedOption));
    };


    const handleFlightFromDateFilterChange = (value) => {

        const formattedFromDate = formatDate(value);
        dispatch(updateFromDateFilter(formattedFromDate));

        // function to close the datePicker
        clickOnRightSide()
    }

    const handleFlightToDateFilterChange = (value) => {

        const formattedToDate = formatDate(value);
        dispatch(updateToDateFilter(formattedToDate));

        // function to close the datePicker
        clickOnRightSide()
    }

    // function to close the datePicker
    const clickOnRightSide = () => {
        // Create a new mouse event
        const clickEvent = new MouseEvent('mousedown', {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: window.innerWidth - 1, // Right edge of the screen
            clientY: window.innerHeight / 2 // Middle of the screen vertically
        });

        // Dispatch the event to the document
        document.dispatchEvent(clickEvent);
    };





    return (
        <div className='w-[90%] flex flex-col items-center pb-8 gap-y-6'>

            <SmallerPageTitle title={'فیلتر جست‌وجو'} doesBackButtonExists={false} />

            <div className='w-full flex flex-col gap-y-6'>

            {
                    ( userCoursesData && countriesData) &&

                    <>
                        <div className='w-full flex flex-col gap-y-4'>
                    
                            {
                                userCoursesData && userCoursesData.data.length > 0 &&
                                <DropdownInput name={'دوره'} options={userCoursesData.data} selectedOption={courseFilter} handleSelectChange={handleSelectCourseFilter} />
                            }

                            {
                                countriesData && 
                                <DropdownInput name={'کشور'} options={countriesData.data} selectedOption={countryFilter} handleSelectChange={handleSelectSetCountryFilter} />
                            }

                            {
                                provincesData && !provincesLoading && (countryFilter && countryFilter.id) &&
                                (<SearchInputWithDropdown name={'استان'} options={provincesData.data} selectedOption={provinceFilter} handleSelectChange={handleSelectSetCityFilter} />)
                            }

                            {
                                flightSitesData && !flightSitesLoading && provinceFilter && provinceFilter.id &&
                                (<SearchInputWithDropdown name={'سایت'} options={flightSitesData.data} selectedOption={siteFilter} handleSelectChange={handleSelectSetSiteFilter} />)
                            }

                            <DropdownInput name={'نوع پرواز'} options={flightTypeOptions} selectedOption={flightTypeFilter} handleSelectChange={handleSelectFlightTypeFilter} />
                            
                            {
                                userCoachesData && userCoachesData.data.length > 0 &&
                                <DropdownInput name={'نام مربی'} options={userCoachesData.data} selectedOption={coachNameFilter} handleSelectChange={handleSelectCoachNameFilter} />
                            }

                            <DropdownInput name={' وضعیت پرواز'} options={flightStatusOptions} selectedOption={flightStatusFilter} handleSelectChange={handleSelectFlightStatusFilter} />


                            {/* the date picker component comes from equipment section */}
                            <DateButtonInput name={'از تاریخ'}  onChange={handleFlightFromDateFilterChange} placeH={'از تاریخ'} />

                            {/* the date picker component comes from equipment section */}
                            <DateButtonInput name={'تا تاریخ'}  onChange={handleFlightToDateFilterChange} placeH={'تا تاریخ'} />

                        </div>

                        <div className='w-full flex justify-center'>
                            <button onClick={() => router.push(`/dashboard/userDetails/${id}/flightHistory`)}
                            className={` ${buttonStyles.addButton} w-40 h-12`}>اعمال فیلتر</button>
                        </div>
                    </>
                    
                }
            </div>
            
        </div>
    );
};

export default FlightFilter;