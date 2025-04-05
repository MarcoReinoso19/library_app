import type { ApiException, ApiResponse } from '@/interfaces/Api'
import type { MaterialRead } from '@/interfaces/Material'
import { postMaterial, getMaterials, deleteMaterial, patchMaterial } from '@/methods/methodsMaterial'
import { useMutation } from '@tanstack/vue-query'

export const useCreateMaterial = () => {
  const errorMessage = ref('')
  const material = ref<MaterialRead>()

  const mutation = useMutation({
    mutationFn: postMaterial,
    onSuccess: async (response: ApiResponse<MaterialRead>) => {
      material.value = response.data
    },
    onError: async (error: ApiException) => {
      errorMessage.value = error.message
    },
  })

  return {
    postMaterial: mutation.mutate,
    isSuccess: computed(() => mutation.isSuccess.value),
    isError: computed(() => mutation.isError.value),
    isPending: computed(() => mutation.isPending.value),
    errorMessage,
    material,
  }
}
export const useReadMaterials = () => {
  const errorMessage = ref('')
  const materials = ref<MaterialRead[]>()

  const mutation = useMutation({
    mutationFn: getMaterials,
    onSuccess: async (response: any) => {
      materials.value = response.data
    },
    onError: async (error: ApiException) => {
      errorMessage.value = error.message
    },
  })

  return {
    getMaterials: mutation.mutate,
    isSuccess: computed(() => mutation.isSuccess.value),
    isError: computed(() => mutation.isError.value),
    isPending: computed(() => mutation.isPending.value),
    errorMessage,
    materials,
  }
}

export const useUpdateMaterial = () => {
  const errorMessage = ref('')
  const material = ref<MaterialRead>()

  const mutation = useMutation({
    mutationFn: patchMaterial,
    onSuccess: async (response: ApiResponse<MaterialRead>) => {
      material.value = response.data
    },
    onError: async (error: ApiException) => {
      errorMessage.value = error.message
    },
  })

  return {
    updateMaterial: mutation.mutate,
    isSuccess: computed(() => mutation.isSuccess.value),
    isError: computed(() => mutation.isError.value),
    isPending: computed(() => mutation.isPending.value),
    errorMessage,
    material,
  }
}

export const useDeleteMaterial = () => {
  const errorMessage = ref('')

  const mutation = useMutation({
    mutationFn: deleteMaterial,
    onError: async (error: ApiException) => {
      errorMessage.value = error.message
    },
  })

  return {
    deleteMaterial: mutation.mutate,
    isSuccess: computed(() => mutation.isSuccess.value),
    isError: computed(() => mutation.isError.value),
    isPending: computed(() => mutation.isPending.value),
    errorMessage,
  }
}
