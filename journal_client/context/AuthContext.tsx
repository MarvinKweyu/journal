import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { User } from "@/models/user";

interface AuthProps {
    authState?: { access: string | null; authenticated: boolean | null };
    onRegister?: (email: string, username: string, password1: string, password2: string) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
    getUser?: () => Promise<User | null>;
    updateUsername?: (username: string) => Promise<User | any>;
    changePassword?: (new_password: string, confirm_password: string) => Promise<any>;
}

const TOKEN_KEY = 'journal-access';
const REFRESH_KEY = 'journal-refresh';
const CURRENT_USER_KEY = 'journal-current-user';
export const BASE_URL = 'http://10.0.2.2:8000/api/account-auth/' // use emulator
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{ access: string | null; refresh: string | null; authenticated: boolean, user: Object | null }>({
        access: null,
        refresh: null,
        authenticated: true,
        user: null
    });

    useEffect(() => {
        const checkAuth = async () => {

            const access = await SecureStore.getItemAsync(TOKEN_KEY);
            const refresh = await SecureStore.getItemAsync(REFRESH_KEY);
            const current_user = await SecureStore.getItemAsync(CURRENT_USER_KEY);
            if (access) {
                setAuthState({ access, authenticated: true, user: current_user, refresh: refresh });
            } else {
                setAuthState({ access: null, refresh: null, authenticated: false, user: null });
            }
        }
        checkAuth();
    }, []);

    const onRegister = async (email: string, username: string, password1: string, password2: string) => {

        try {
            // const response = await axios.post(`${BASE_URL}registration/`, { email, username, password1, password2 });
            const response = await axios.post(`http://10.0.2.2:8000/api/account-auth/registration/`, { email, username, password1, password2 });

            await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(response.data.access));
            await SecureStore.setItemAsync(REFRESH_KEY, JSON.stringify(response.data.refresh));
            await SecureStore.setItemAsync(CURRENT_USER_KEY, JSON.stringify(response.data.user)); // type user
            setAuthState({ access: response.data.access, refresh: response.data.refresh, authenticated: true, user: response.data.user });
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
            return response;
        } catch (error) {

            const message = (error as any).response.data

            const keys = Object.keys(message);
            const prop = keys[Math.floor(Math.random() * keys.length)]

            return { error: true, msg: message[prop] }
        }
    }

    const onLogin = async (email: string, password: string) => {

        try {
            const res = await axios.post(`${BASE_URL}login/`, { email, password });
            await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(res.data.access));
            await SecureStore.setItemAsync(REFRESH_KEY, JSON.stringify(res.data.refresh));
            await SecureStore.setItemAsync(CURRENT_USER_KEY, JSON.stringify(res.data.user));
            setAuthState({ access: res.data.access, refresh: res.data.refresh, authenticated: true, user: res.data.user });
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`;
            return res.data;
        } catch (error) {
            const message = (error as any).response.data
            const keys = Object.keys(message);
            const prop = keys[Math.floor(Math.random() * keys.length)]

            return { error: true, msg: message[prop] }
        }
    }

    const onLogout = async () => {
        try {

            await SecureStore.deleteItemAsync(TOKEN_KEY);
            await SecureStore.deleteItemAsync(REFRESH_KEY);
            await SecureStore.deleteItemAsync(CURRENT_USER_KEY);
            await axios.post(`${BASE_URL}logout/`);
            setAuthState({ access: null, refresh: null, authenticated: false, user: null });
        } catch (error) {
            return { error: true, msg: (error as any).response.status }
        }
    }

    const getUser = async () => {
        const user = await SecureStore.getItemAsync(CURRENT_USER_KEY);
        return user ? JSON.parse(user) : null;
    };

    const updateUsername = async (username: string) => {
        try {
            const res = await axios.patch(`${BASE_URL}user/`, { username });
            await SecureStore.setItemAsync(CURRENT_USER_KEY, JSON.stringify(res.data));
            setAuthState({ ...authState, user: res.data });
            return res.data;
        } catch (error) {
            const message = (error as any).response.data
            return { error: true, msg: message }
        }
    };

    const changePassword = async (new_password: string, confirm_password: string) => {
        try {
            const res = await axios.patch(`${BASE_URL}password/change/`, { new_password1: new_password, new_password2: confirm_password });
        } catch (error) {
            const message = (error as any).response.data
            return { error: true, msg: message }

        }
    };


    return (
        <AuthContext.Provider value={{ authState, onRegister, onLogin, onLogout, getUser, updateUsername, changePassword }}>
            {children}
        </AuthContext.Provider>
    );
}