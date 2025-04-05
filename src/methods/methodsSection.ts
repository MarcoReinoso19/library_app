import libraryApi from '@/api/libraryApi'
import type { ApiResponse } from '@/interfaces/Api'
import type { SectionCreate, SectionRead, SectionUpdate } from '../interfaces/Section'

export const postSection = async (section: SectionCreate): Promise<ApiResponse<SectionRead>> => {
  const response = await libraryApi.post<SectionRead>('section/', section)
  return {
    data: response.data,
    status: response.status,
  }
}

export const getSection = async (sectionId: number): Promise<ApiResponse<SectionRead>> => {
  const response = await libraryApi.get<SectionRead>(`section/${sectionId}`)
  return {
    data: response.data,
    status: response.status,
  }
}

export const getSections = async (): Promise<ApiResponse<SectionRead[]>> => {
  const response = await libraryApi.get<SectionRead[]>(`section/`)
  return {
    data: response.data,
    status: response.status,
  }
}

export const patchSection = async (params: {
  sectionId: number
  section: SectionUpdate
}): Promise<ApiResponse<SectionRead>> => {
  const response = await libraryApi.patch<SectionRead>(`section/${params.sectionId}`, params.section)
  return {
    data: response.data,
    status: response.status,
  }
}

export const deleteSection = async (sectionId: number): Promise<ApiResponse<boolean>> => {
  const response = await libraryApi.delete(`section/${sectionId}`)
  return {
    data: response.data,
    status: response.status,
  }
}
