import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';

import { API_BASE_URL } from '../utils/constants';

// get organizations 
    const getOrganizations = async () => {
                            
        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${API_BASE_URL}/organization/organization/GetAllOrganizations`, {
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

    const useOrganizations = () => {
        return useQuery({
            queryKey: ['getOrganizations'],
            queryFn: () => getOrganizations(),
            enabled: true, 
        });
    };






// get levels by organizations
    const getLevelsByOrganization = async (organizationId) => {
                            
        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${API_BASE_URL}/Level/organization/GetLevels?organizationId=${organizationId}`, {
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

    const useLevelsByOrganization = (organizationId) => {
        return useQuery({
            queryKey: ['getLevelsByOrganization', organizationId],
            queryFn: () => getLevelsByOrganization(organizationId),
            enabled: organizationId ? true : false, 
        });
    };



export { useOrganizations, useLevelsByOrganization };