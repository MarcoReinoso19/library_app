import type { ApiException, ApiResponse } from '@/interfaces/Api'
import type { InventoryRead } from '@/interfaces/Inventory'
import { postInventory, getInventoriesMe, deleteInventory, patchInventory } from '@/methods/methodsInventory'
import { useMutation } from '@tanstack/vue-query'

export const useCreateInventory = () => {
  const errorMessage = ref('')
  const inventory = ref<InventoryRead>()

  const mutation = useMutation({
    mutationFn: postInventory,
    onSuccess: async (response: ApiResponse<InventoryRead>) => {
      inventory.value = response.data
    },
    onError: async (error: ApiException) => {
      errorMessage.value = error.message
    },
  })

  return {
    postInventory: mutation.mutate,
    isSuccess: computed(() => mutation.isSuccess.value),
    isError: computed(() => mutation.isError.value),
    isPending: computed(() => mutation.isPending.value),
    errorMessage,
    inventory,
  }
}
export const useReadInventoriesMe = () => {
  const errorMessage = ref('')
  const inventoriesMe = ref<InventoryRead[]>()

  const mutation = useMutation({
    mutationFn: getInventoriesMe,
    onSuccess: async (response: any) => {
      inventoriesMe.value = response.data
    },
    onError: async (error: ApiException) => {
      errorMessage.value = error.message
    },
  })

  return {
    getInventoriesMe: mutation.mutate,
    isSuccess: computed(() => mutation.isSuccess.value),
    isError: computed(() => mutation.isError.value),
    isPending: computed(() => mutation.isPending.value),
    errorMessage,
    inventoriesMe,
  }
}

export const useUpdateInventory = () => {
  const errorMessage = ref('')
  const inventory = ref<InventoryRead>()

  const mutation = useMutation({
    mutationFn: patchInventory,
    onSuccess: async (response: ApiResponse<InventoryRead>) => {
      inventory.value = response.data
    },
    onError: async (error: ApiException) => {
      errorMessage.value = error.message
    },
  })

  return {
    updateInventory: mutation.mutate,
    isSuccess: computed(() => mutation.isSuccess.value),
    isError: computed(() => mutation.isError.value),
    isPending: computed(() => mutation.isPending.value),
    errorMessage,
    inventory,
  }
}

export const useDeleteInventory = () => {
  const errorMessage = ref('')

  const mutation = useMutation({
    mutationFn: deleteInventory,
    onError: async (error: ApiException) => {
      errorMessage.value = error.message
    },
  })

  return {
    deleteInventory: mutation.mutate,
    isSuccess: computed(() => mutation.isSuccess.value),
    isError: computed(() => mutation.isError.value),
    isPending: computed(() => mutation.isPending.value),
    errorMessage,
  }
}
