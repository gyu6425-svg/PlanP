import axios from 'axios';
import { isJwtExpired } from './jwt';

const TOKEN_KEY = 'planp.accessToken';
let unauthorizedHandler: (() => void) | null = null;

export const tokenStorage = {
    get: () => localStorage.getItem(TOKEN_KEY),
    set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
    clear: () => localStorage.removeItem(TOKEN_KEY),
};

export function setUnauthorizedHandler(handler: () => void) {
    unauthorizedHandler = handler;
}

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
    timeout: 8000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = tokenStorage.get();

    if (token && !isJwtExpired(token)) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            tokenStorage.clear();
            unauthorizedHandler?.();
        }

        return Promise.reject(error);
    }
);
