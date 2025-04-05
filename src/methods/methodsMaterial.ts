import libraryApi from '@/api/libraryApi'
import type { ApiResponse } from '@/interfaces/Api'
import type { MaterialCreate, MaterialRead, MaterialUpdate } from '../interfaces/Material'

export const postMaterial = async (material: MaterialCreate): Promise<ApiResponse<MaterialRead>> => {
  const response = await libraryApi.post<MaterialRead>('material/', material)
  return {
    data: response.data,
    status: response.status,
  }
}

export const getMaterial = async (materialId: number): Promise<ApiResponse<MaterialRead>> => {
  const response = await libraryApi.get<MaterialRead>(`material/${materialId}`)
  return {
    data: response.data,
    status: response.status,
  }
}

export const getMaterials = async (): Promise<ApiResponse<MaterialRead[]>> => {
  const response = await libraryApi.get<MaterialRead[]>(`material/`)
  return {
    data: response.data,
    status: response.status,
  }
}

export const patchMaterial = async (params: {
  materialId: number
  material: MaterialUpdate
}): Promise<ApiResponse<MaterialRead>> => {
  const response = await libraryApi.patch<MaterialRead>(`material/${params.materialId}`, params.material)
  return {
    data: response.data,
    status: response.status,
  }
}

export const deleteMaterial = async (materialId: number): Promise<ApiResponse<boolean>> => {
  const response = await libraryApi.delete(`material/${materialId}`)
  return {
    data: response.data,
    status: response.status,
  }
}
