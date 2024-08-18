import { useMutation, useQuery } from "@tanstack/react-query";
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
            enabled: true, // Only run query if provinceId is provided
        });
    };






// get student users based on level id, organization id and search, the get function also checks that if the prompts aren't provided, it will request withoutthe prompts
// /api/User/Organization/GetStudentUsers?levelId=6&pageNumber=1&pageSize=10&search=محمود&organizationId=2
    const getStudentUsers = async ({ levelId, pageNumber, pageSize, search, organizationId }) => {
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

    const useStudentUsers = () => {
        return useQuery({
            queryKey: ['getStudentUsers'],
            queryFn: () => getStudentUsers(),
            enabled: true, 
        });
    }




export { useUsersDividedByCertificates, useStudentUsers };