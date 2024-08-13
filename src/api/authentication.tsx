import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../utils/constants';
import { useMutation } from '@tanstack/react-query';

interface LoginFormData {
    username: string;
    password: string;
    rememberMe: boolean;
}

// login function to send login request to the server
    const login = async (formData: LoginFormData) => {
        try {
        const response = await axios.post(`${API_BASE_URL}/Auth/Organization/Login`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });

        if (response.data.data.token) {
            Cookies.set('token', response.data.data.token);
        }

        return response.data;
        } catch (error) {
            if ((error as any).response.data.ErrorMessages[0].ErrorKey === 'login') {
                window.location.reload();
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



export { useLogin }