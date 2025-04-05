import libraryApi from '@/api/libraryApi'
import type { ApiResponse } from '@/interfaces/Api'
import type { AuthorCreate, AuthorRead, AuthorUpdate } from '../interfaces/Author'

export const postAuthor = async (author: AuthorCreate): Promise<ApiResponse<AuthorRead>> => {
  const response = await libraryApi.post<AuthorRead>('author/', author)
  return {
    data: response.data,
    status: response.status,
  }
}

export const getAuthor = async (authorId: number): Promise<ApiResponse<AuthorRead>> => {
  const response = await libraryApi.get<AuthorRead>(`author/${authorId}`)
  return {
    data: response.data,
    status: response.status,
  }
}

export const getAuthors = async (): Promise<ApiResponse<AuthorRead[]>> => {
  const response = await libraryApi.get<AuthorRead[]>(`author/`)
  return {
    data: response.data,
    status: response.status,
  }
}

export const patchAuthor = async (params: {
  authorId: number
  author: AuthorUpdate
}): Promise<ApiResponse<AuthorRead>> => {
  const response = await libraryApi.patch<AuthorRead>(`author/${params.authorId}`, params.author)
  return {
    data: response.data,
    status: response.status,
  }
}

export const deleteAuthor = async (authorId: number): Promise<ApiResponse<boolean>> => {
  const response = await libraryApi.delete(`author/${authorId}`)
  return {
    data: response.data,
    status: response.status,
  }
}
