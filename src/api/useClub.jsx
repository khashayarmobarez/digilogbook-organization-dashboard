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
    
    


export { useAClubData, useAClubCoaches, useAClubHistoryCoaches }