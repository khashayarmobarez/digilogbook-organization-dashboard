import { useMutation, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';

import { API_BASE_URL } from '../utils/constants';
import { useRouter } from "next/navigation";


// get countries list
// api/Country/GetAllCountries 
    const getCountries = async () => {
                
        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${API_BASE_URL}/Country/GetAllCountries`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;

        } catch (error) {
            if (error.response.data.ErrorMessages[0].ErrorKey === 'login') {
                Cookies.remove('token')
            } else {
                throw error;
            }
        }

    };


    const useCountries = () => {
        return useQuery({
            queryKey: ['getCountries'],
            queryFn: getCountries,
            cacheTime: 0,
            staleTime: Infinity,
        });
    };



// Get Provinces By CountryId
// /Province/GetProvincesByCountryId?countryId=1
    const getProvincesByCountryId = async (countryId) => {
                
        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${API_BASE_URL}/Province/GetProvinces?${countryId && `countryId=${countryId}`}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;

        } catch (error) {
            if (error.response.data.ErrorMessages[0].ErrorKey === 'login') {
                Cookies.remove('token')
            } else {
                throw error;
            }
        }

    };

    const useProvincesByCountryId = (countryId) => {
        return useQuery({
            queryKey: ['getProvincesByCountryId', countryId],
            queryFn: () => getProvincesByCountryId(countryId),
            cacheTime: 0,
            staleTime: Infinity,
            enabled: !!countryId,  // Only run query if countryId is provided
        });
    };





// get flight sites by ProvinceId
    const getSitesByProvinceId = async (provinceId, countryId) => {
                
        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${API_BASE_URL}/Site/GetSites?${provinceId && `provinceId=${provinceId}&`}${countryId && `countryId=${countryId}&`} `, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;

        } catch (error) {
            if (error.response.data.ErrorMessages[0].ErrorKey === 'login') {
                Cookies.remove('token')
            } else {
                throw error;
            }
        }

    };

    const useSitesByProvinceId = (provinceId, countryId) => {
        return useQuery({
            queryKey: ['getSitesByProvinceId', provinceId, countryId],
            queryFn: () => getSitesByProvinceId(provinceId, countryId),
            enabled: !!provinceId && !!countryId, // Only run query if both provinceId and countryId are provided
        });
    };






// get cities by ProvinceId
    const getCitiesByProvinceId = async (provinceId) => {
                    
        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${API_BASE_URL}/City/GetCitiesByProvinceId?${provinceId && `provinceId=${provinceId}&`} `, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;

        } catch (error) {
            if (error.response.data.ErrorMessages[0].ErrorKey === 'login') {
                Cookies.remove('token')
            } else {
                throw error;
            }
        }

    };

    const useCitiesByProvinceId = (provinceId) => {
        return useQuery({
            queryKey: ['getCitiesByProvinceId', provinceId],
            queryFn: () => getCitiesByProvinceId(provinceId),
            enabled: !!provinceId, // Only run query if provinceId is provided
        });
    };





// get flight counts
    const getFlightCounts = async (siteId, provinceId, countryId, fromDate, toDate) => {
                    
        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${API_BASE_URL}/Flight/Organization/GetFlightCount?${siteId && `siteId=${siteId}&`}${provinceId && `provinceId=${provinceId}&`}${countryId && `countryId=${countryId}&`}${fromDate && `fromDate=${fromDate}&`}${toDate && `toDate=${toDate}&`}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;

        } catch (error) {
            if (error.response.data.ErrorMessages[0].ErrorKey === 'login') {
                Cookies.remove('token')
            } else {
                throw error;
            }
        }

    };

    export const useFlightCounts = (siteId, provinceId, countryId, fromDate, toDate) => {
        return useQuery({
            queryKey: ['getFlightCounts', siteId, provinceId, countryId, fromDate, toDate],
            queryFn: () => getFlightCounts(siteId, provinceId, countryId, fromDate, toDate),
            enabled: true
        });
    };









// get flights history
// Flight/Organization/GetFlights?pageNumber=1&pageSize=5&userCourseId=35&wingId=26&harnessId=27&siteId=1&type=tandem&fromDate=2024/07/10&toDate=2024/07/10&coachUserId=819cde&status=accepted&userId=890soq
    const getFlightsHistory = async (pageNumber, pageSize, userCourseId, wingId, harnessId, siteId, type, fromDate, toDate, coachUserId, status, userId, countryId ,provinceId) => {
                        
            const token = Cookies.get('token');
    
            try {
            const response = await axios.get(`${API_BASE_URL}/Flight/Organization/GetFlights?pageNumber=${pageNumber}&pageSize=${pageSize}&${userCourseId && `userCourseId=${userCourseId}&`}${wingId && `wingId=${wingId}&`}${harnessId && `harnessId=${harnessId}&`}${siteId && `siteId=${siteId}&`}${type && `type=${type}&`}${fromDate && `fromDate=${fromDate}&`}${toDate && `toDate=${toDate}&`}${coachUserId && `coachUserId=${coachUserId}&`}${status && `status=${status}&`}${userId && `userId=${userId}&`}${countryId && `countryId=${countryId}&`}${provinceId && `provinceId=${provinceId}&`}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
    
            } catch (error) {
                if (error.response.data.ErrorMessages[0].ErrorKey === 'login') {
                    Cookies.remove('token')
                } else {
                    throw error;
                }
            }
    
        };

    
    const useFlightHistory = (pageNumber, pageSize, userCourseId, wingId, harnessId, siteId, type, fromDate, toDate, coachUserId, status, userId, countryId ,provinceId) => {
        return useQuery({
            queryKey: ['getFlightsHistory', pageNumber, pageSize, userCourseId, wingId, harnessId, siteId, type, fromDate, toDate, coachUserId, status, userId, countryId ,provinceId],
            queryFn: () => getFlightsHistory(pageNumber, pageSize, userCourseId, wingId, harnessId, siteId, type, fromDate, toDate, coachUserId, status, userId, countryId ,provinceId),
            enabled: true
        });
    };







//  get a user flight 
// /Flight/Organization/GetFlight?flightId=29&userId=890soq
    const getAFlight = async (flightId, userId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/Flight/Organization/GetFlight?${flightId && `flightId=${flightId}&`}&userId=${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            if (error.response.data.ErrorMessages[0].ErrorKey === 'login') {
                Cookies.remove('token')
            } else {
                throw error;
            }
        }

    };

    const useAFlight = (flightId, userId) => {
        return useQuery({
            queryKey: ['getAFlight', flightId, userId],
            queryFn: () => getAFlight(flightId, userId),
            enabled: userId ? true : false, 
        });
    }







//  use all user coaches fro dropdown
// /User/Organization/GetAllUsersCoaches?userId=890soq
    const getAllUserCoaches = async ( userId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/User/Organization/GetAllUsersCoaches?userId=${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            if (error.response.data.ErrorMessages[0].ErrorKey === 'login') {
                Cookies.remove('token')
            } else {
                throw error;
            }
        }

    };

    const useAllUserCouches = ( userId) => {
        return useQuery({
            queryKey: ['getAllUserCoaches',  userId],
            queryFn: () => getAllUserCoaches( userId),
            enabled: userId ? true : false, 
        });
    }







//  use all user courses for a dropdown
// /userCourse/organization/getAllUserCoursesForDropdown?userId=890soq
    const getAllUserCoursesForDropdown = async ( userId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/userCourse/organization/getAllUserCoursesForDropdown?userId=${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            if (error.response.data.ErrorMessages[0].ErrorKey === 'login') {
                Cookies.remove('token')
            } else {
                throw error;
            }
        }

    };

    const useAllUserCoursesForDropdown = ( userId) => {
        return useQuery({
            queryKey: ['getAllUserCoursesForDropdown',  userId],
            queryFn: () => getAllUserCoursesForDropdown( userId),
            enabled: userId ? true : false, 
        });
    }







    


export { useCountries, useProvincesByCountryId, useSitesByProvinceId, useCitiesByProvinceId, useFlightHistory, useAFlight, useAllUserCoursesForDropdown, useAllUserCouches };