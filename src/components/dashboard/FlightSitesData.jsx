import React, { useEffect, useState } from 'react';

// styles
import containers from '@/styles/Containers.module.css'

// utilities
import useDateFormat from '@/utils/useDateFormat';

// queries
import { useCountries, useProvincesByCountryId, useSitesByProvinceId, useCitiesByProvinceId, useFlightCounts } from '../../api/flightDataQueries';
import { useUsersDividedByCertificates } from '../../api/GetUsersData';

// assets
import eraser from '@/../public/svgs/eraser 1.svg';

// components
import IranMap from '../../components/dashboard/iranMap/components/IranMap';
import DropDownInput from '../../components/inputs/DropDownInput';
import SearchInputWithDropdown from '../../components/inputs/SearchInputWithDropdown';
import DateButtonInput from '../../components/inputs/DateButtonInput';
import Image from 'next/image';
import DashBoardFlightQuantity from '@/components/dashboard/DashBoardFlightQuantity';
import DashBoardPilotsQuantity from '@/components/dashboard/DashboardPilotsQuantiy';


const FlightSitesData = () => {

    const { formatDate } = useDateFormat();

    const [country, setCountry] = useState('')
    const [province, setProvince] = useState('')
    const [city, setCity] = useState('')
    const [site, setSite] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')

    // here i'm writing some dirty code cause there was no solution
    // state to stop rendering the dateInput when date changes
    const [showDateInput, setShowDateInput] = useState(true)

    const { data: countriesData, isLoading:countriesLoading, error:countriesError } = useCountries()
    const { data: provincesData, isLoading:provincesLoading, error:provincesError, refetch: refetchProvinces } = useProvincesByCountryId(country ? country.id : '')
    const { data: flightCitiesData, isLoading:flightCitiesLoading, error:flightCitiesError, refetch: refetchCities } = useCitiesByProvinceId(province  && province.id)
    const { data: flightSitesData, isLoading:flightSitesLoading, error:flightSitesError, refetch: refetchSites } = useSitesByProvinceId(province  && province.id, country && country.id)
    const { data: flightCountsData, isLoading: flightCountsLoading, error: flightCountsError, refetch: refetchCounts } = useFlightCounts(site.id || '', province.id || '', fromDate || '', toDate || '');
    
    const { data: organsUserData, isLoading: organsUserLoading, error: organsUserError, refetch: refetchorgansUser } = useUsersDividedByCertificates();

    // use effect for when country data changes other filled resets
    useEffect(() => {
        setProvince('')
        setCity('')
        setSite('')
    },[country])

    const handleSelectSetCountry = (selectedCountry) => {
        setCountry('')
        setTimeout(() => {
            setCountry(selectedCountry)
        }, 100);
        setProvince('')
        setCity('')
        setSite('')
    }

    const handleSelectSetProvince = (selectedProvince) => {
        setProvince(selectedProvince)
        setCity('')
        setSite('')
    }

    const handleSelectSetCity = (selectedCity) => {
        setCity(selectedCity)
        setSite('')
    }

    const handleSelectSetSite = (selectedSite) => {
        setSite(selectedSite)
        setCity('')
    }

    // function to rerender the component
    const handleResetData = () => {
        setCountry('')
        setProvince('')
        setCity('')
        setSite('')
        setFromDate('')
        setToDate('')
        setShowDateInput(false)
        // timeout to stop render and rerender the component
        setTimeout(() => {
            setShowDateInput(true)
        }, 100);
    }

    const handleFlightFromDateFilterChange = (value) => {

        const formattedFromDate = formatDate(value);
        setFromDate(formattedFromDate)

        // function to close the datePicker
        clickOnRightSide()
    }

    const handleFlightToDateFilterChange = (value) => {
        const formattedToDate = formatDate(value);
        setToDate(formattedToDate)

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
            <div className=' flex flex-col w-full gap-y-8 items-center '>

                <div className=' flex flex-col w-full h-auto justify-between gap-x-6 lg:flex-row'>

                    <div className=' w-full h-full flex flex-col items-center gap-y-4 lg:mt-6'>

                            <p className='text-lg self-start text-accentColorNormal'>آمار پرواز در سایت‌ها</p>

                            {
                                countriesData && 
                                <DropDownInput name={'کشور'} options={countriesData.data} selectedOption={country} handleSelectChange={handleSelectSetCountry} />
                            }

                            {
                                provincesData && !provincesLoading && (country && country.id) &&
                                (<SearchInputWithDropdown name={'استان'} options={provincesData.data} selectedOption={province} handleSelectChange={handleSelectSetProvince} />)
                            }

                            {
                                flightCitiesData && !flightCitiesLoading && province && province.id &&
                                (<SearchInputWithDropdown name={'شهر'} options={flightCitiesData.data} selectedOption={city} handleSelectChange={handleSelectSetCity} />)
                            }

                            {
                                flightSitesData && !flightSitesLoading && province && province.id &&
                                (<SearchInputWithDropdown name={'سایت'} options={flightSitesData.data} selectedOption={site} handleSelectChange={handleSelectSetSite} />)
                            }

                            <div className='w-full flex gap-x-2 mt-2'>
                                { showDateInput &&
                                    <>
                                        <DateButtonInput name={'از تاریخ ...'} value={fromDate} onChange={handleFlightFromDateFilterChange} placeH={'از تاریخ ...'} />
                                        <DateButtonInput name={'تا تاریخ ...'} value={toDate} onChange={handleFlightToDateFilterChange} placeH={'تا تاریخ ...'} />
                                    </>
                                }
                                <button className={`w-24 rounded-2xl flex justify-center items-center ${containers.container2}`}
                                    onClick={handleResetData}>
                                        <Image src={eraser} alt='eraser' />
                                </button>
                            </div>
                        
                    </div>

                    
                    {/* map */}
                    <div className=' w-full flex flex-row-reverse justify-start items-start lg:flex lg:flex-col-reverse'>
                        <IranMap />
                    </div>

                </div>


                <div className={`bg-primaryDarkActive w-full rounded-3xl h-12 flex justify-between items-center px-6 border border-lowOpacityWhite text-xs lg:text-base`}>
                    <p className='text-accentColorNormal'>تعداد پروازهای انجام شده</p>
                    {flightCountsData ?
                        <p className='text-accentColorNormal'>{flightCountsData.data}</p>
                        :
                        <span className="loading loading-dots loading-sm"></span>
                    }
                    <>
                        {
                            !toDate && !fromDate ?
                            'از تاریخ ابتدا تا کنون'
                            :
                            <p>
                                {fromDate && `از ${fromDate}`} {toDate && `تا ${toDate}`}
                            </p>
                        }
                    </>
                </div>

                <p className=''>با کلیک روی ستون های زیر محتوای مربوطه را ببینید</p>

                {/* map the users data */}
                {
                    organsUserLoading &&
                    <div className='w-full flex justify-center items-center h-64'>
                        <span className="loading loading-bars loading-lg"></span>
                    </div>
                }
                {
                    organsUserData && !organsUserLoading && organsUserData.data.map((data, index) => {
                        return (
                            <div key={index} className={`w-full rounded-2xl  ${containers.darkMainContainer}`}>
                                <DashBoardPilotsQuantity  data={data} />
                            </div>
                        )
                    })
                }

            </div>
    );
};

export default FlightSitesData;