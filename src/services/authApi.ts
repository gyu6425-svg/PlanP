import { apiClient } from './apiClient'
import { createDemoJwt } from './jwt'

export type LoginRequest = {
  email: string
  password: string
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

export async function login(request: LoginRequest): Promise<LoginResponse> {
  if (import.meta.env.DEV) {
    await new Promise((resolve) => setTimeout(resolve, 350))
    const user: AuthUser = {
      id: 'demo-user',
      name: 'P형 여행자',
      email: request.email,
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
