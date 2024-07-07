// contain login, signup, logout, check if user is logged in, and get current user functions

import { User } from '@/models/user';
import axios from 'axios';

const API_URL = 'https://6676ab2b145714a1bd727114.mockapi.io/test-api/users';

const login = async (email: string, password: string) => {
    try {
        const response = await axios.get(`${API_URL}?email=${email}&password=${password}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const signup = async (user: User) => {
    try {
        const response = await axios.post(API_URL, user);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const logout = async () => {
    try {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const isLoggedIn = () => {
    const user = localStorage.getItem('user');
    return user ? true : false;
}

const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// change password
// reset password

const changePassword = async (email: string, password: string) => {
    try {
        const response = await axios.put(`${API_URL}?email=${email}&password=${password}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }


}

export const authService = {
    login,
    signup,
    logout,
    isLoggedIn,
    getCurrentUser
};