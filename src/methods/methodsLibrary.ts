import libraryApi from '@/api/libraryApi'
import type { ApiResponse } from '@/interfaces/Api'
import type { LibraryCreate, LibraryRead, LibraryUpdate } from '../interfaces/Library'

export const postLibrary = async (library: LibraryCreate): Promise<ApiResponse<LibraryRead>> => {
  const response = await libraryApi.post<LibraryRead>('library/', library)
  return {
    data: response.data,
    status: response.status,
  }
}

export const getLibrary = async (libraryId: number): Promise<ApiResponse<LibraryRead>> => {
  const response = await libraryApi.get<LibraryRead>(`library/${libraryId}`)
  return {
    data: response.data,
    status: response.status,
  }
}

export const getLibrariesMe = async (): Promise<ApiResponse<LibraryRead[]>> => {
  const response = await libraryApi.get<LibraryRead[]>('user/me/libraries/')
  return {
    data: response.data,
    status: response.status,
  }
}

export const patchLibrary = async (params: {
  libraryId: number
  library: LibraryUpdate
}): Promise<ApiResponse<LibraryRead>> => {
  const response = await libraryApi.patch<LibraryRead>(`library/${params.libraryId}`, params.library)
  return {
    data: response.data,
    status: response.status,
  }
}

export const deleteLibrary = async (libraryId: number): Promise<ApiResponse<void>> => {
  const response = await libraryApi.delete(`library/${libraryId}`)
  return {
    data: response.data,
    status: response.status,
  }
}
