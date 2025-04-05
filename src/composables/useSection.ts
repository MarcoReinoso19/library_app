import type { ApiException, ApiResponse } from '@/interfaces/Api'
import type { SectionRead } from '@/interfaces/Section'
import { postSection, getSections, deleteSection, patchSection } from '@/methods/methodsSection'
import { useMutation } from '@tanstack/vue-query'

export const useCreateSection = () => {
  const errorMessage = ref('')
  const section = ref<SectionRead>()

  const mutation = useMutation({
    mutationFn: postSection,
    onSuccess: async (response: ApiResponse<SectionRead>) => {
      section.value = response.data
    },
    onError: async (error: ApiException) => {
      errorMessage.value = error.message
    },
  })

  return {
    postSection: mutation.mutate,
    isSuccess: computed(() => mutation.isSuccess.value),
    isError: computed(() => mutation.isError.value),
    isPending: computed(() => mutation.isPending.value),
    errorMessage,
    section,
  }
}
export const useReadSections = () => {
  const errorMessage = ref('')
  const sections = ref<SectionRead[]>()

  const mutation = useMutation({
    mutationFn: getSections,
    onSuccess: async (response: any) => {
      sections.value = response.data
    },
    onError: async (error: ApiException) => {
      errorMessage.value = error.message
    },
  })

  return {
    getSections: mutation.mutate,
    isSuccess: computed(() => mutation.isSuccess.value),
    isError: computed(() => mutation.isError.value),
    isPending: computed(() => mutation.isPending.value),
    errorMessage,
    sections,
  }
}

export const useUpdateSection = () => {
  const errorMessage = ref('')
  const section = ref<SectionRead>()

  const mutation = useMutation({
    mutationFn: patchSection,
    onSuccess: async (response: ApiResponse<SectionRead>) => {
      section.value = response.data
    },
    onError: async (error: ApiException) => {
      errorMessage.value = error.message
    },
  })

  return {
    updateSection: mutation.mutate,
    isSuccess: computed(() => mutation.isSuccess.value),
    isError: computed(() => mutation.isError.value),
    isPending: computed(() => mutation.isPending.value),
    errorMessage,
    section,
  }
}

export const useDeleteSection = () => {
  const errorMessage = ref('')

  const mutation = useMutation({
    mutationFn: deleteSection,
    onError: async (error: ApiException) => {
      errorMessage.value = error.message
    },
  })

  return {
    deleteSection: mutation.mutate,
    isSuccess: computed(() => mutation.isSuccess.value),
    isError: computed(() => mutation.isError.value),
    isPending: computed(() => mutation.isPending.value),
    errorMessage,
  }
}
