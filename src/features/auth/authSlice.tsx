import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authResponse, loginUser, registerUser } from "./api";

export interface authState {
  isAuth: boolean,
  userInfo: authResponse['user'] | null,
  userToken: string | null,
  loading: boolean,
  error: any,
}

const userToken = localStorage.getItem('userToken') 
  ? localStorage.getItem('userToken')
  : null

const initialState: authState = {
  isAuth: false,
  userInfo: null,
  userToken,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logout(state) {
      state.isAuth = false 
      state.userToken = null
      state.userInfo = null
    },
    authAfterRefresh(state, action: PayloadAction<{userInfo: authState['userInfo'], userToken: authState['userToken']}>) {
      state.isAuth = true
      state.userInfo = action.payload.userInfo
      state.userToken = action.payload.userToken
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true
      state.error = null
    })
     builder.addCase(registerUser.fulfilled, (state, {payload}) => {
      state.loading = false
      state.isAuth = true
      state.userToken = `Bearer ${payload.jwt}`
      state.userInfo = payload.user
    })
     builder.addCase(registerUser.rejected, (state: authState, {payload}) => {
      state.loading = false
      state.error = payload
    })
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(loginUser.fulfilled, (state, {payload}) => {
      state.loading = false
      state.isAuth = true
      state.userToken = `Bearer ${payload.jwt}`
      state.userInfo = payload.user
    })
    builder.addCase(loginUser.rejected, (state, {payload}) => {
      state.loading = false
      state.error = payload
    })
  }
})

export const authReducer = authSlice.reducer

export const {logout, authAfterRefresh} = authSlice.actions