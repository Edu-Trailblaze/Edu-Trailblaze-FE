import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  twoFactorCode: string | null
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
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
      localStorage.setItem('accessToken', action.payload.accessToken)
      localStorage.setItem('refreshToken', action.payload.refreshToken)
      localStorage.setItem('role', (decode as any).role)
    },
    logout: (state) => {
      state.accessToken = null
      state.refreshToken = null
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
