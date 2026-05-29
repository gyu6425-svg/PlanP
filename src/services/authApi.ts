import { apiClient } from './apiClient'
import { createDemoJwt } from './jwt'

const DEV_USERS_KEY = 'planp.devUsers'

export type LoginRequest = {
  loginId: string
  password: string
}

export type SignupRequest = {
  loginId: string
  password: string
  name: string
  birthYear: string
  birthMonth: string
  birthDay: string
  email?: string
}

export type AuthUser = {
  id: string
  name: string
  email: string
  mpti: 'P' | 'J'
}

export type LoginResponse = {
  accessToken: string
  user: AuthUser
}

type DevUserRecord = SignupRequest & {
  id: string
  createdAt: string
}

function getDevUsers() {
  try {
    const rawUsers = localStorage.getItem(DEV_USERS_KEY)
    return rawUsers ? (JSON.parse(rawUsers) as DevUserRecord[]) : []
  } catch {
    return []
  }
}

function setDevUsers(users: DevUserRecord[]) {
  localStorage.setItem(DEV_USERS_KEY, JSON.stringify(users))
}

export async function login(request: LoginRequest): Promise<LoginResponse> {
  if (import.meta.env.DEV) {
    await new Promise((resolve) => setTimeout(resolve, 350))
    const userRecord = getDevUsers().find((user) => user.loginId === request.loginId)

    if (userRecord && userRecord.password !== request.password) {
      throw new Error('아이디 또는 비밀번호를 확인해 주세요.')
    }

    const user: AuthUser = {
      id: userRecord?.id ?? 'demo-user',
      name: userRecord?.name ?? 'P형 여행자',
      email: userRecord?.email ?? `${request.loginId}@planp.local`,
      mpti: 'P',
    }

    return {
      accessToken: createDemoJwt(user),
      user,
    }
  }

  const { data } = await apiClient.post<LoginResponse>('/auth/login', request)
  return data
}

export async function signup(request: SignupRequest): Promise<{ user: AuthUser }> {
  if (import.meta.env.DEV) {
    await new Promise((resolve) => setTimeout(resolve, 350))
    const users = getDevUsers()

    if (users.some((user) => user.loginId === request.loginId)) {
      throw new Error('이미 사용 중인 아이디입니다.')
    }

    const userRecord: DevUserRecord = {
      ...request,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }

    setDevUsers([...users, userRecord])

    return {
      user: {
        id: userRecord.id,
        name: userRecord.name,
        email: userRecord.email ?? '',
        mpti: 'P',
      },
    }
  }

  const { data } = await apiClient.post<{ user: AuthUser }>('/auth/signup', request)
  return data
}
