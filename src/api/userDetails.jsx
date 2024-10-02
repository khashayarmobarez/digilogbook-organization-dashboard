import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';

import { API_BASE_URL } from '../utils/constants';


// get user data
// /User/Organization/GetUser?userId=890soq
const getUserData = async (userId) => {
    const token = Cookies.get('token');
    try {
        const response = await axios.get(`${API_BASE_URL}/User/Organization/GetUser?userId=${userId}`, {
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

const useUserData = (userId) => {
    return useQuery({
        queryKey: ['getUser', userId],
        queryFn: () => getUserData(userId),
        enabled: userId ? true : false, 
    });
}







// get course counts
// /Course/Organization/GetCourseCounts?userId=890soq
    const getCourseCounts = async (userId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/Course/Organization/GetCourseCounts?userId=${userId}`, {
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

    const useCourseCounts = (userId) => {
        return useQuery({
            queryKey: ['getCourseCounts', userId],
            queryFn: () => getCourseCounts(userId),
            enabled: userId ? true : false, 
        });
    }








// get Courses dividers
// /Course/Organization/GetCourseDividers?userId=890soq
    const getCourseDividers = async (userId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/Course/Organization/GetCourseDividers?userId=${userId}`, {
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

    const useCourseDividers = (userId) => {
        return useQuery({
            queryKey: ['getCourseDividers', userId],
            queryFn: () => getCourseDividers(userId),
            enabled: userId ? true : false, 
        });
    }




// get courses
// /Course/Organization/GetCourses?type=regular&organizationId=1&pageNumber=1&userId=890soq
    const getCourses = async (type, organizationId, pageNumber, userId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/Course/Organization/GetCourses?${type && `type=${type}&`}${organizationId && `organizationId=${organizationId}&`}pageNumber=${pageNumber}&userId=${userId}`, {
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

    const useCourses = (type, organizationId, pageNumber, userId) => {
        return useQuery({
            queryKey: ['getCourses', type, organizationId, pageNumber, userId],
            queryFn: () => getCourses(type, organizationId, pageNumber, userId),
            enabled: userId ? true : false, 
        });
    }



    
// get all students
// /Course/Organization/GetAllStudents?type=active&userId=819cde
    const getAllStudents = async (listType, userId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/Course/Organization/GetAllStudents?type=${listType}&userId=${userId}`, {
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

    const useAllStudents = (listType, userId) => {
        return useQuery({
            queryKey: ['getAllStudents', listType, userId],
            queryFn: () => getAllStudents(listType, userId),
            enabled: (userId && listType) ? true : false, 
        });
    }







// get student courses
// /Course/Organization/GetStudentCourses?studentUserId=890soq&userId=819cde
    const getStudentCourses = async (studentUserId, userId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/Course/Organization/GetStudentCourses?studentUserId=${studentUserId}&userId=${userId}`, {
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

    const useStudentCourses = (studentUserId, userId) => {
        return useQuery({
            queryKey: ['getStudentCourses', studentUserId, userId],
            queryFn: () => getStudentCourses(studentUserId, userId),
            enabled: (userId && studentUserId) ? true : false, 
        });
    }


    



export { useUserData, useCourseCounts, useCourseDividers, useCourses, useAllStudents, useStudentCourses };