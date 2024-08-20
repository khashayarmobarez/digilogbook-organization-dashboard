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







// get course students data
// /Course/Organization/GetCourseStudents?courseId=38&pageNumber=1&userId=890soq
    const getACourseStudents = async (courseId, pageNumber, userId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/Course/Organization/GetCourseStudents?courseId=${courseId}&pageNumber=${pageNumber}&userId=${userId}`, {
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

    const useACourseStudents = (courseId, pageNumber, userId) => {
        return useQuery({
            queryKey: ['getACourseStudents', courseId, pageNumber, userId],
            queryFn: () => getACourseStudents(courseId, pageNumber, userId),
            enabled: (courseId && pageNumber && userId) ? true : false, 
        });
    }






// get course student history
// /Course/Organization/GetCourseHistoryStudents?courseId=38&pageNumber=1&userId=890soq
    const getACourseHistoryStudents = async (courseId, pageNumber, userId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/Course/Organization/GetCourseStudentsHistory?courseId=${courseId}&pageNumber=${pageNumber}&userId=${userId}`, {
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

    const useACourseHistoryStudents = (courseId, pageNumber, userId) => {
        return useQuery({
            queryKey: ['getACourseHistoryStudents', courseId, pageNumber, userId],
            queryFn: () => getACourseHistoryStudents(courseId, pageNumber, userId),
            enabled: (courseId && pageNumber && userId) ? true : false, 
        });
    }




export { useACourse, useACourseStudents, useACourseHistoryStudents };