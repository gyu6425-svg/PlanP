import { configureStore } from '@reduxjs/toolkit'
import { setUnauthorizedHandler } from '../services/apiClient'
import authReducer from './slices/authSlice'
import { logout } from './slices/authSlice'
import plannerReducer from './slices/plannerSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    planner: plannerReducer,
  },
})

setUnauthorizedHandler(() => {
  store.dispatch(logout())
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
