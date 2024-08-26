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








// get course theory classes
// /Course/Organization/GetCourseClasses?courseId=38&userId=890soq
    const getACourseClasses = async (courseId, userId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/Course/Organization/GetCourseClasses?courseId=${courseId}&userId=${userId}`, {
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

    const useACourseClasses = (courseId, userId) => {
        return useQuery({
            queryKey: ['getACourseClasses', courseId, userId],
            queryFn: () => getACourseClasses(courseId, userId),
            enabled: (courseId && userId) ? true : false, 
        });
    }








// get a class
// /Course/Organization/GetCourseClass?classId=7&userId=890soq
    const getACourseClass = async (classId, userId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/Course/Organization/GetCourseClass?classId=${classId}&userId=${userId}`, {
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

    const useACourseClass = (classId, userId) => {
        return useQuery({
            queryKey: ['getACourseClass', classId, userId],
            queryFn: () => getACourseClass(classId, userId),
            enabled: (classId && userId) ? true : false, 
        });
    }








// get course syllabi
// /Course/Organization/GetCourseSyllabi?courseId=38&type=2&userId=890soq
    const getACourseSyllabi = async (courseId, type, userId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/Course/Organization/GetCourseSyllabi?courseId=${courseId}&type=${type}&userId=${userId}`, {
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

    const useACourseSyllabi = (courseId, type, userId) => {
        return useQuery({
            queryKey: ['getACourseSyllabi', courseId, type, userId],
            queryFn: () => getACourseSyllabi(courseId, type, userId),
            enabled: (courseId && type && userId) ? true : false, 
        });
    }
    


// the below section is for student classes,equal to mycourses in the main app


// get user courses deviders
// /UserCourse/Organization/GetUserCourseDividers?userId=890soq
    const getUserCourseDividers = async (userId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/UserCourse/Organization/GetUserCourseDividers?userId=${userId}`, {
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

    const useUserCourseDividers = (userId) => {
        return useQuery({
            queryKey: ['getUserCourseDividers', userId],
            queryFn: () => getUserCourseDividers(userId),
            enabled: (userId) ? true : false, 
        });
    }






// get user courses
// /UserCourse/Organization/GetUserCourses?type=regular&organizationId=1&pageNumber=1&userId=890soq
    const getUserCourses = async (type, organizationId, pageNumber, userId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/UserCourse/Organization/GetUserCourses?type=${type}&pageNumber=${pageNumber}&userId=${userId}&${organizationId && `organizationId=${organizationId}`}`, {
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

    const useUserCourses = (type, organizationId, pageNumber, userId) => {
        return useQuery({
            queryKey: ['getUserCourses', type, organizationId, pageNumber, userId],
            queryFn: () => getUserCourses(type, organizationId, pageNumber, userId),
            enabled: type && (organizationId || pageNumber || userId) ? true : false, 
        });
    }








// get user course
// /UserCourse/Organization/GetUserCourse?userCourseId=35&userId=890soq
    const getAUserCourse = async (userCourseId, userId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/UserCourse/Organization/GetUserCourse?userCourseId=${userCourseId}&userId=${userId}`, {
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
    
    const useAUserCourse = (userCourseId, userId) => {
        return useQuery({
            queryKey: ['getAUserCourse', userCourseId, userId],
            queryFn: () => getAUserCourse(userCourseId, userId),
            enabled: (userCourseId && userId) ? true : false, 
        });
    }



    



// get guest user classes
// /UserCourse/Organization/GetGuestUserClasses?userId=890soq
    const getGuestUserClasses = async (userId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/UserCourse/Organization/GetGuestUserClasses?userId=${userId}`, {
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

    const useGuestUserClasses = (userId) => {
        return useQuery({
            queryKey: ['getGuestUserClasses', userId],
            queryFn: () => getGuestUserClasses(userId),
            enabled: (userId) ? true : false, 
        });
    }






// get guest user class
// /UserCourse/Organization/GetGuestUserClass?classId=7&userId=890soq
    const getAGuestUserClass = async (classId, userId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/UserCourse/Organization/GetGuestUserClass?guestUserClassId=${classId}&userId=${userId}`, {
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

    const useAGuestUserClass = (classId, userId) => {
        return useQuery({
            queryKey: ['getAGuestUserClass', classId, userId],
            queryFn: () => getAGuestUserClass(classId, userId),
            enabled: (classId && userId) ? true : false, 
        });
    }







// a user course classes
// /UserCourse/Organization/GetUserCourseClasses?userCourseId=35&userId=890soq
    const getAUserCourseClasses = async (courseId, userId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/UserCourse/Organization/GetUserCourseClasses?userCourseId=${courseId}&userId=${userId}`, {
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

    const useAUserCourseClasses = (courseId, userId) => {
        return useQuery({
            queryKey: ['getAUserCourseClasses', courseId, userId],
            queryFn: () => getAUserCourseClasses(courseId, userId),
            enabled: (courseId && userId) ? true : false, 
        });
    }






// use a user course class
// /UserCourse/Organization/GetUserCourseClass?classId=1&userId=890soq
    const getAUserCourseClass = async (classId, userId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/UserCourse/Organization/GetUserCourseClass?classId=${classId}&userId=${userId}`, {
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

    const useAUserCourseClass = (classId, userId) => {
        return useQuery({
            queryKey: ['getAUserCourseClass', classId, userId],
            queryFn: () => getAUserCourseClass(classId, userId),
            enabled: (classId && userId) ? true : false, 
        });
    }







// use a user course syllabi data
// /UserCourse/Organization/GetUserCourseSyllabi?userCourseId=35&type=practical&userId=890soq
    const getAUserCourseSyllabi = async (userCourseId, userId) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`${API_BASE_URL}/UserCourse/Organization/GetUserCourseSyllabi?userCourseId=${userCourseId}&userId=${userId}`, {
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

    const useAUserCourseSyllabi = (userCourseId, userId) => {
        return useQuery({
            queryKey: ['getAUserCourseSyllabi', userCourseId, userId],
            queryFn: () => getAUserCourseSyllabi(userCourseId, userId),
            enabled: (userCourseId && userId) ? true : false, 
        });
    }





export { useACourse, useACourseStudents, useACourseHistoryStudents, useACourseClasses, useACourseClass, useACourseSyllabi, useUserCourseDividers, useUserCourses, useGuestUserClasses, useAGuestUserClass, useAUserCourse, useAUserCourseClasses, useAUserCourseClass, useAUserCourseSyllabi };