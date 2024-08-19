import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';

import { API_BASE_URL } from '../utils/constants';



// get users devided by certificate
    const getUsersDividedByCertificates = async () => {
                        
        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${API_BASE_URL}/User/Organization/GetUserCountsDividedByCertificateLevels `, {
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


    const useUsersDividedByCertificates = () => {
        return useQuery({
            queryKey: ['getUserCountsDividedByCertificateLevels'],
            queryFn: () => getUsersDividedByCertificates(),
            enabled: true, 
        });
    };






// get student users based on level id, organization id and search, the get function also checks that if the prompts aren't provided, it will request withoutthe prompts
// /api/User/Organization/GetStudentUsers?levelId=6&pageNumber=1&pageSize=10&search=محمود&organizationId=2
    const getStudentUsers = async (levelId, pageNumber, pageSize, search, organizationId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/User/Organization/GetStudentUsers?${levelId && `levelId=${levelId}&`}${pageNumber && `pageNumber=${pageNumber}&`}${pageSize && `pageSize=${pageSize}&`}${search && `search=${search}&`}${organizationId && `organizationId=${organizationId}`} `, {
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

    const useStudentUsers = (levelId, pageNumber, pageSize, search, organizationId) => {
        return useQuery({
            queryKey: ['getStudentUsers',levelId, pageNumber, pageSize, search, organizationId],  
            queryFn: () => getStudentUsers(levelId, pageNumber, pageSize, search, organizationId),
            enabled: (levelId || pageNumber || pageSize || search || organizationId) ? true : false, // Only run query if provinceId is provided
        });
    }




// get all users data
// /User/Organization/GetUsers?pageNumber=1&pageSize=10&search=حسام
    const getUsersData = async (pageNumber, pageSize, search) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/User/Organization/GetUsers?${pageNumber && `pageNumber=${pageNumber}&`}${pageSize && `pageSize=${pageSize}&`}${search && `search=${search}&`}`, {
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

    const useUsersData = (pageNumber, pageSize, search) => {
        return useQuery({
            queryKey: ['getUsers', pageNumber, pageSize, search],
            queryFn: () => getUsersData(pageNumber, pageSize, search),
            enabled: (pageNumber || pageSize || search) ? true : false, 
        });
    }



    




export { useUsersDividedByCertificates, useStudentUsers, useUsersData };