import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
    authState?: { access: string | null; authenticated: boolean | null };
    onRegister?: (email: string, username: string, password1: string, password2: string) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
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
    const [authState, setAuthState] = useState<{ access: string | null; refresh: string | null; authenticated: boolean | null, user: Object | null }>({
        access: null,
        refresh: null,
        authenticated: null,
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
            return response;
        } catch (error) {
            console.log("\n\n Server response")
            console.log(error);
            return { error: true, msg: (error as any).response }
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

            console.log("\n\n")
            console.log((error as any).response.data)
            return { error: true, msg: (error as any).response.data }
        }
    }

    const onLogout = async () => {
        try {

            await SecureStore.deleteItemAsync(TOKEN_KEY);
            await SecureStore.deleteItemAsync(REFRESH_KEY);
            await SecureStore.deleteItemAsync(CURRENT_USER_KEY);
            setAuthState({ access: null, refresh: null, authenticated: false, user: null });
        } catch (error) {
            return { error: true, msg: (error as any).response.status }
        }
    }

    return (
        <AuthContext.Provider value={{ authState, onRegister, onLogin, onLogout }}>
            {children}
        </AuthContext.Provider>
    );
}