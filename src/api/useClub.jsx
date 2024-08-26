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


export { useAClubData }