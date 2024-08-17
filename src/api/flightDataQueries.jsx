import { useMutation, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';

import { API_BASE_URL } from '../utils/constants';


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
                window.location.reload();
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
                window.location.reload();
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
                window.location.reload();
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
                window.location.reload();
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
    const getFlightCounts = async (siteId, provinceId, fromDate, toDate) => {
                    
        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${BASE_URL}/Flight/Organization/GetFlightCount?${siteId && `siteId=${siteId}&`}${provinceId && `provinceId=${provinceId}&`}${fromDate && `fromDate=${fromDate}&`}${toDate && `toDate=${toDate}&`}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;

        } catch (error) {
            if (error.response.data.ErrorMessages[0].ErrorKey === 'login') {
                window.location.reload();
            } else {
                throw error;
            }
        }

    };

    const useFlightCounts = (siteId, provinceId, fromDate, toDate) => {
        return useQuery({
            queryKey: ['getFlightCounts', siteId, provinceId, fromDate, toDate],
            queryFn: () => getFlightCounts(siteId, provinceId, fromDate, toDate),
            enabled: !!(siteId || provinceId || fromDate || toDate),
        });
    };



export { useCountries, useProvincesByCountryId, useSitesByProvinceId, useCitiesByProvinceId, useFlightCounts };