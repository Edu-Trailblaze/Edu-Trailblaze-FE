import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  role: string | null
  twoFactorCode: string | null
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  role: typeof window !== 'undefined' ? localStorage.getItem('role') : null,
  twoFactorCode: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      const decode = jwtDecode(action.payload.accessToken)
      const role = (decode as any).role

      state.role = role
      localStorage.setItem('accessToken', action.payload.accessToken)
      localStorage.setItem('refreshToken', action.payload.refreshToken)
      localStorage.setItem('role', role)
    },
    logout: (state) => {
      state.accessToken = null
      state.refreshToken = null
      state.role = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('role')
    },
    changeUserRole: () => {
      localStorage.removeItem('role')
    }
  }
})
const authReducer = authSlice.reducer

export const { setCredentials, logout, changeUserRole } = authSlice.actions
export default authReducer
