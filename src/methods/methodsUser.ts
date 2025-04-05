import libraryApi from '@/api/libraryApi'
import type { ApiResponse } from '@/interfaces/Api'
import type { UserCreate, UserRead, UserUpdate } from '../interfaces/User'

export const postUser = async (user: UserCreate): Promise<ApiResponse<UserRead>> => {
  const response = await libraryApi.post<UserRead>('user/', user)
  return {
    data: response.data,
    status: response.status,
  }
}

export const getUser = async (userId: number): Promise<ApiResponse<UserRead>> => {
  const response = await libraryApi.get<UserRead>(`user/${userId}`)
  return {
    data: response.data,
    status: response.status,
  }
}

export const getUserMe = async (): Promise<ApiResponse<UserRead>> => {
  const response = await libraryApi.get<UserRead>('/users/me')
  return {
    data: response.data,
    status: response.status,
  }
}

export const patchUser = async (params: { userId: number; user: UserUpdate }): Promise<ApiResponse<UserRead>> => {
  const response = await libraryApi.patch<UserRead>(`user/${params.userId}`, params.user)
  return {
    data: response.data,
    status: response.status,
  }
}

export const deleteUser = async (userId: number): Promise<ApiResponse<void>> => {
  const response = await libraryApi.delete(`user/${userId}`)
  return {
    data: response.data,
    status: response.status,
  }
}
