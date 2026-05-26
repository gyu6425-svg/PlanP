import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { login, type AuthUser, type LoginRequest } from '../../services/authApi'
import { tokenStorage } from '../../services/apiClient'
import { getUserFromJwt, isJwtExpired } from '../../services/jwt'

type AuthState = {
  accessToken: string | null
  user: AuthUser | null
  status: 'idle' | 'loading' | 'authenticated' | 'error'
  error: string | null
}

const storedToken = tokenStorage.get()
const initialToken = storedToken && !isJwtExpired(storedToken) ? storedToken : null

if (storedToken && !initialToken) {
  tokenStorage.clear()
}

const initialState: AuthState = {
  accessToken: initialToken,
  user: initialToken ? getUserFromJwt(initialToken) : null,
  status: initialToken ? 'authenticated' : 'idle',
  error: null,
}

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (payload: LoginRequest) => login(payload),
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
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
