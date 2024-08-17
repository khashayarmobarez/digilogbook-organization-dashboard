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


    export const useUsersDividedByCertificates = () => {
        return useQuery({
            queryKey: ['getUserCountsDividedByCertificateLevels'],
            queryFn: () => getUsersDividedByCertificates(),
            enabled: true, // Only run query if provinceId is provided
        });
    };