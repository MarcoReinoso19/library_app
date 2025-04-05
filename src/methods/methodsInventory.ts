import libraryApi from '@/api/libraryApi'
import type { ApiResponse } from '@/interfaces/Api'
import type { InventoryCreate, InventoryRead, InventoryUpdate } from '../interfaces/Inventory'

export const postInventory = async (inventory: InventoryCreate): Promise<ApiResponse<InventoryRead>> => {
  const response = await libraryApi.post<InventoryRead>('inventory/', inventory)
  return {
    data: response.data,
    status: response.status,
  }
}

export const getInventoriesMe = async (): Promise<ApiResponse<InventoryRead[]>> => {
  const response = await libraryApi.get<InventoryRead[]>(`inventory/me/`)
  return {
    data: response.data,
    status: response.status,
  }
}

export const patchInventory = async (params: {
  inventoryId: number
  inventory: InventoryUpdate
}): Promise<ApiResponse<InventoryRead>> => {
  const response = await libraryApi.patch<InventoryRead>(`inventory/${params.inventoryId}`, params.inventory)
  return {
    data: response.data,
    status: response.status,
  }
}

export const deleteInventory = async (inventoryId: number): Promise<ApiResponse<boolean>> => {
  const response = await libraryApi.delete(`inventory/${inventoryId}`)
  return {
    data: response.data,
    status: response.status,
  }
}
