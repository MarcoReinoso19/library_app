import type { ApiException, ApiResponse } from '@/interfaces/Api'
import type { LibraryRead } from '@/interfaces/Library'
import type { LibraryUserRead } from '@/interfaces/LibraryUser'
import { postLibrary, getLibrariesMe, patchLibrary, deleteLibrary } from '@/methods/methodsLibrary'
import { useMutation } from '@tanstack/vue-query'

export const useCreateLibrary = () => {
  const errorMessage = ref('')
  const library = ref<LibraryRead>()

  const mutation = useMutation({
    mutationFn: postLibrary,
    onSuccess: async (response: ApiResponse<LibraryRead>) => {
      library.value = response.data
    },
    onError: async (error: ApiException) => {
      errorMessage.value = error.message
    },
  })

  return {
    postLibrary: mutation.mutate,
    isSuccess: computed(() => mutation.isSuccess.value),
    isError: computed(() => mutation.isError.value),
    isPending: computed(() => mutation.isPending.value),
    errorMessage,
    library,
  }
}
export const useReadLibrariesMe = () => {
  const errorMessage = ref('')
  const librariesMe = ref<LibraryRead[]>()

  const getLibrariesMutationMe = useMutation({
    mutationFn: getLibrariesMe,
    onSuccess: async (response: any) => {
      librariesMe.value = response.data
    },
    onError: async (error: ApiException) => {
      errorMessage.value = error.message
    },
  })

  return {
    getLibrariesMe: getLibrariesMutationMe.mutate,
    isSuccess: computed(() => getLibrariesMutationMe.isSuccess.value),
    isError: computed(() => getLibrariesMutationMe.isError.value),
    isPending: computed(() => getLibrariesMutationMe.isPending.value),
    errorMessage,
    librariesMe,
  }
}

export const useAddLibraryMember = () => {
  const errorMessage = ref('')
  const libraryUser = ref<LibraryUserRead>()

  const getLibrariesMutationMe = useMutation({
    mutationFn: getLibrariesMe,
    onSuccess: async (response: any) => {
      libraryUser.value = response
    },
    onError: async (error: ApiException) => {
      errorMessage.value = error.message
    },
  })

  return {
    getLibrariesMe: getLibrariesMutationMe.mutate,
    isSuccess: computed(() => getLibrariesMutationMe.isSuccess.value),
    isError: computed(() => getLibrariesMutationMe.isError.value),
    isPending: computed(() => getLibrariesMutationMe.isPending.value),
    errorMessage,
    libraryUser,
  }
}

export const useUpdateLibrary = () => {
  const errorMessage = ref('')
  const library = ref<LibraryRead>()

  const mutation = useMutation({
    mutationFn: patchLibrary,
    onSuccess: async (response: ApiResponse<LibraryRead>) => {
      library.value = response.data
    },
    onError: async (error: ApiException) => {
      errorMessage.value = error.message
    },
  })

  return {
    updateLibrary: mutation.mutate,
    isSuccess: computed(() => mutation.isSuccess.value),
    isError: computed(() => mutation.isError.value),
    isPending: computed(() => mutation.isPending.value),
    errorMessage,
    library,
  }
}

export const useDeleteLibrary = () => {
  const errorMessage = ref('')

  const mutation = useMutation({
    mutationFn: deleteLibrary,
    onError: async (error: ApiException) => {
      errorMessage.value = error.message
    },
  })

  return {
    deleteLibrary: mutation.mutate,
    isSuccess: computed(() => mutation.isSuccess.value),
    isError: computed(() => mutation.isError.value),
    isPending: computed(() => mutation.isPending.value),
    errorMessage,
  }
}
