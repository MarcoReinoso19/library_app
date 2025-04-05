import libraryApi from '@/api/libraryApi'
import type { ApiResponse } from '@/interfaces/Api'
import axios from 'axios'

export interface Auth {
  username: string
  password: string
}

export interface AuthToken {
  accessToken: string
}

export const login = async (auth: Auth): Promise<ApiResponse<AuthToken>> => {
  // Create a new FormData object
  const formData = new FormData()

  // Append the username and password fields to the form data
  formData.append('username', auth.username)
  formData.append('password', auth.password)

  const response = await libraryApi.post<AuthToken>('/login', formData, {
    headers: { 'Content-Type': 'x-www-form-urlencoded' },
  })
  return {
    data: response.data,
    status: response.status,
  }
}

export const logout = async () => {
  const response = await libraryApi.post('/logout').finally(() => {
    delete axios.defaults.headers.common.Authorization
  })
  return {
    data: response.data,
    status: response.status,
  }
}
