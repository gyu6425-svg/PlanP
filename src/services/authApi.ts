import { apiClient } from './apiClient';
import { createDemoJwt } from './jwt';
import { AxiosError } from 'axios';

const DEV_USERS_KEY = 'planp.devUsers';
const shouldUseMockAuth = !import.meta.env.VITE_API_BASE_URL;

export type LoginRequest = {
    loginId: string;
    password: string;
};

export type SignupRequest = {
    loginId: string;
    password: string;
    name: string;
    birthYear: string;
    birthMonth: string;
    birthDay: string;
    email?: string;
};

export type AuthUser = {
    id: string;
    name: string;
    email: string;
    mpti: 'P' | 'J';
};

export type LoginResponse = {
    accessToken: string;
    user: AuthUser;
};

type DevUserRecord = SignupRequest & {
    id: string;
    createdAt: string;
};

function getApiErrorMessage(error: unknown, fallback: string) {
    if (error instanceof AxiosError) {
        const message = (error.response?.data as { message?: string } | undefined)?.message;
        return message ?? fallback;
    }

    if (error instanceof Error) {
        return error.message;
    }

    return fallback;
}

function getDevUsers() {
    try {
        const rawUsers = localStorage.getItem(DEV_USERS_KEY);
        return rawUsers ? (JSON.parse(rawUsers) as DevUserRecord[]) : [];
    } catch {
        return [];
    }
}

function setDevUsers(users: DevUserRecord[]) {
    localStorage.setItem(DEV_USERS_KEY, JSON.stringify(users));
}

export async function login(request: LoginRequest): Promise<LoginResponse> {
    const normalizedRequest = {
        ...request,
        loginId: request.loginId.trim(),
    };

    if (shouldUseMockAuth) {
        await new Promise((resolve) => setTimeout(resolve, 350));
        const userRecord = getDevUsers().find((user) => user.loginId === normalizedRequest.loginId);

        if (userRecord && userRecord.password !== normalizedRequest.password) {
            throw new Error('아이디 또는 비밀번호를 확인해 주세요.');
        }

        const user: AuthUser = {
            id: userRecord?.id ?? 'demo-user',
            name: userRecord?.name ?? 'P형 여행자',
            email: userRecord?.email ?? `${normalizedRequest.loginId}@planp.local`,
            mpti: 'P',
        };

        return {
            accessToken: createDemoJwt(user),
            user,
        };
    }

    try {
        const { data } = await apiClient.post<LoginResponse>('/auth/login', normalizedRequest);
        return data;
    } catch (error) {
        throw new Error(getApiErrorMessage(error, '로그인에 실패했습니다.'), { cause: error });
    }
}

export async function signup(request: SignupRequest): Promise<{ user: AuthUser }> {
    const normalizedRequest = {
        ...request,
        loginId: request.loginId.trim(),
        name: request.name.trim(),
        birthYear: request.birthYear.trim(),
        birthMonth: request.birthMonth.trim(),
        birthDay: request.birthDay.trim(),
        email: request.email?.trim() || undefined,
    };

    if (shouldUseMockAuth) {
        await new Promise((resolve) => setTimeout(resolve, 350));
        const users = getDevUsers();

        if (users.some((user) => user.loginId === normalizedRequest.loginId)) {
            throw new Error('이미 사용 중인 아이디입니다.');
        }

        const userRecord: DevUserRecord = {
            ...normalizedRequest,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
        };

        setDevUsers([...users, userRecord]);

        return {
            user: {
                id: userRecord.id,
                name: userRecord.name,
                email: userRecord.email ?? '',
                mpti: 'P',
            },
        };
    }

    try {
        const { data } = await apiClient.post<{ user: AuthUser }>(
            '/auth/signup',
            normalizedRequest
        );
        return data;
    } catch (error) {
        throw new Error(getApiErrorMessage(error, '회원가입에 실패했습니다.'), { cause: error });
    }
}
