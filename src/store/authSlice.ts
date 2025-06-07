import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Token } from '../types/Token'
import type { User } from '../types/User'

interface AuthState {
  token: Token | null
  user: User | null
}

const initialState: AuthState = {
  token: null,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: Token; user: User }>) => {

      state.token = action.payload.token
      state.user = action.payload.user
    },
    logout: (state) => {
      state.token = null
      state.user = null
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
