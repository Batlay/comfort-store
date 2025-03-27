import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ILoginUser, IRegisterUser } from "../../shared/interfaces/users.interface";
import { VITE_API_ENDPOINT } from "../../shared/constants/constants";

export interface authResponse {
  jwt: string,
  user: {
    id: number,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    createdAt: string,
    updatedAt: string,
  }
}

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({username, email, password}: IRegisterUser, {rejectWithValue})=> {
    try {
      const {data} = await axios.post<authResponse>(
        `${VITE_API_ENDPOINT}/auth/local/register`, 
        {username, email, password},
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      localStorage.setItem('userToken', `Bearer ${data.jwt}`)
      localStorage.setItem('userInfo', JSON.stringify(data.user))

      return data 
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({email, password}: ILoginUser, {rejectWithValue}) => {
    try {
      const {data} = await axios.post<authResponse>(
        `${VITE_API_ENDPOINT}/auth/local`, 
        {identifier: email, password},
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      localStorage.setItem('userToken', `Bearer ${data.jwt}`)
      localStorage.setItem('userInfo', JSON.stringify(data.user))

      return data
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)