import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';

import { API_BASE_URL } from '../utils/constants';


// get course data
// /Course/Organization/GetCourse?courseId=38&userId=890soq 
    const getACourse = async (courseId, userId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/Course/Organization/GetCourse?courseId=${courseId}&userId=${userId}`, {
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

    const useACourse = (courseId, userId) => {
        return useQuery({
            queryKey: ['getACourse', courseId, userId],
            queryFn: () => getACourse(courseId, userId),
            enabled: (courseId && userId) ? true : false, 
        });
    }


export { useACourse };