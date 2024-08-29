import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../utils/constants';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

interface LoginPostData {
    username: string;
    password: string;
    rememberMe: boolean;
}

// login function to send login request to the server
    const login = async (postData: LoginPostData) => {
        try {
        const response = await axios.post(`${API_BASE_URL}/Auth/Organization/Login`, postData, {
            headers: {
            'Content-Type': 'application/json',
            },
        });

        return response.data;
        } catch (error) {
            if ((error as any).response.data.ErrorMessages[0].ErrorKey === 'login') {
                Cookies.remove('token')
            } else {
                throw error;
            }
        }
    };

    const useLogin = () => {
        return useMutation({
          mutationFn: login,
        });
    };





// post loog out
    const postLogout = async (): Promise<any> => {

        const token = Cookies.get('token');

        try {
        const response = await axios.post(`${API_BASE_URL}/Auth/Logout`, {}, {
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
        } catch (error) {
            if ((error as any).response.data.ErrorMessages[0].ErrorKey === 'login') {
                Cookies.remove('token')
            } else {
                throw error;
            }
        }
    };


    export const useLogout = (): UseMutationResult<any, Error, void, unknown> => {
        return useMutation({
            mutationFn: postLogout,
        });
    };



export { useLogin };