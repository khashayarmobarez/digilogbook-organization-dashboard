import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';

import { API_BASE_URL } from '../utils/constants';


// use a club data
// /Club/Organization/GetClub?userId=819cde
    const getAClubData = async ( userId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/Club/Organization/GetClub?userId=${userId}`, {
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

    const useAClubData = ( userId) => {
        return useQuery({
            queryKey: ['getAClubData',  userId],
            queryFn: () => getAClubData( userId),
            enabled: (userId) ? true : false, 
        });
    }
    
    
    
    
    
// get club coaches
// /Club/Organization/GetClubCoaches?pageNumber=1&pageSize=5&userId=819cde
    const getAClubCoaches = async (pageNumber, pageSize ,userId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/Club/Organization/GetClubCoaches?pageNumber=${pageNumber}&pageSize=${pageSize}&userId=${userId}`, {
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
    
    const useAClubCoaches = (pageNumber, pageSize ,userId) => {
        return useQuery({
            queryKey: ['getAClubCoaches',  pageNumber, pageSize ,userId],
            queryFn: () => getAClubCoaches( pageNumber, pageSize ,userId),
            enabled: (pageNumber && pageSize && userId) ? true : false, 
        });
    }
    
    
    
    
    
    
// get club coaches
// /Club/Organization/GetClubCoachesHistory?pageNumber=1&pageSize=5&userId=819cde
    const getAClubHistoryCoaches = async (pageNumber, pageSize ,userId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/Club/Organization/GetClubCoachesHistory?pageNumber=${pageNumber}&pageSize=${pageSize}&userId=${userId}`, {
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

    const useAClubHistoryCoaches = (pageNumber, pageSize ,userId) => {
        return useQuery({
            queryKey: ['getAClubHistoryCoaches',  pageNumber, pageSize ,userId],
            queryFn: () => getAClubHistoryCoaches( pageNumber, pageSize ,userId),
            enabled: (pageNumber && pageSize && userId) ? true : false, 
        });
    }





// get club course dividers
// /Club/Organization/GetClubCourseDividers?userId=819cde
    const getAClubCourseDividers = async (userId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/Club/Organization/GetClubCourseDividers?userId=${userId}`, {
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

    const useAClubCourseDividers = (userId) => {
        return useQuery({
            queryKey: ['getAClubCourseDividers',  userId],
            queryFn: () => getAClubCourseDividers( userId),
            enabled: (userId) ? true : false, 
        });
    }





// get club courses based on dividers
// /Club/Organization/GetClubCourses?type=regular&organizationId=1&pageNumber=1&userId=819cde
    const getAClubCourses = async (pageNumber, type, organizationId, userId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/Club/Organization/GetClubCourses?pageNumber=${pageNumber}&type=${type}&userId=${userId}${organizationId ? `&organizationId=${organizationId}` : ''}`, {
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

    const useAClubCourses = (pageNumber, type ,organizationId ,userId) => {
        return useQuery({
            queryKey: ['getAClubCourses',  pageNumber, type ,organizationId ,userId],
            queryFn: () => getAClubCourses( pageNumber, type ,organizationId ,userId),
            enabled: (pageNumber && type && userId) ? true : false, 
        });
    }





// get club course counts
// /Club/Organization/GetClubCourseCounts?userId=819cde
    const getAClubCourseCounts = async (userId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/Club/Organization/GetClubCourseCounts?userId=${userId}`, {
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

    const useAClubCourseCounts = (userId) => {
        return useQuery({
            queryKey: ['getAClubCourseCounts',  userId],
            queryFn: () => getAClubCourseCounts( userId),
            enabled: (userId) ? true : false, 
        });
    }

    


export { useAClubData, useAClubCoaches, useAClubHistoryCoaches, useAClubCourseDividers, useAClubCourses, useAClubCourseCounts }