import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { login, signup, type AuthUser, type LoginRequest, type SignupRequest } from '../../services/authApi'
import { tokenStorage } from '../../services/apiClient'
import { getUserFromJwt, isJwtExpired } from '../../services/jwt'
import { clearFavorites } from './favoritesSlice'

type AuthState = {
  accessToken: string | null
  user: AuthUser | null
  status: 'idle' | 'loading' | 'authenticated' | 'error'
  error: string | null
}

const storedToken = tokenStorage.get()
const initialToken = storedToken && !isJwtExpired(storedToken) ? storedToken : null
const initialUser = initialToken ? getUserFromJwt(initialToken) : null

if (storedToken && (!initialToken || !initialUser)) {
  tokenStorage.clear()
}

const initialState: AuthState = {
  accessToken: initialUser ? initialToken : null,
  user: initialUser,
  status: initialUser ? 'authenticated' : 'idle',
  error: null,
}

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (payload: LoginRequest) => login(payload),
)

export const signupThunk = createAsyncThunk(
  'auth/signup',
  async (payload: SignupRequest) => signup(payload),
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.accessToken = null
      state.user = null
      state.status = 'idle'
      state.error = null
      tokenStorage.clear()
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = 'authenticated'
        state.accessToken = action.payload.accessToken
        state.user = action.payload.user
        tokenStorage.set(action.payload.accessToken)
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message ?? '로그인에 실패했습니다.'
      })
      .addCase(signupThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(signupThunk.fulfilled, (state) => {
        state.status = 'idle'
        state.error = null
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message ?? '회원가입에 실패했습니다.'
      })
  },
})

export const { logout } = authSlice.actions
export const logoutAndClearFavorites = () => (dispatch: (action: unknown) => void) => {
  dispatch(logout())
  dispatch(clearFavorites())
}
export default authSlice.reducer
