import type { ApiException, ApiResponse } from '@/interfaces/Api'
import type { AuthorRead } from '@/interfaces/Author'
import { postAuthor, getAuthors, deleteAuthor, patchAuthor } from '@/methods/methodsAuthor'
import { useMutation } from '@tanstack/vue-query'

export const useCreateAuthor = () => {
  const errorMessage = ref('')
  const author = ref<AuthorRead>()

  const mutation = useMutation({
    mutationFn: postAuthor,
    onSuccess: async (response: ApiResponse<AuthorRead>) => {
      author.value = response.data
    },
    onError: async (error: ApiException) => {
      errorMessage.value = error.message
    },
  })

  return {
    postAuthor: mutation.mutate,
    isSuccess: computed(() => mutation.isSuccess.value),
    isError: computed(() => mutation.isError.value),
    isPending: computed(() => mutation.isPending.value),
    errorMessage,
    author,
  }
}
export const useReadAuthors = () => {
  const errorMessage = ref('')
  const authors = ref<AuthorRead[]>()

  const mutation = useMutation({
    mutationFn: getAuthors,
    onSuccess: async (response: any) => {
      authors.value = response.data
    },
    onError: async (error: ApiException) => {
      errorMessage.value = error.message
    },
  })

  return {
    getAuthors: mutation.mutate,
    isSuccess: computed(() => mutation.isSuccess.value),
    isError: computed(() => mutation.isError.value),
    isPending: computed(() => mutation.isPending.value),
    errorMessage,
    authors,
  }
}

export const useUpdateAuthor = () => {
  const errorMessage = ref('')
  const author = ref<AuthorRead>()

  const mutation = useMutation({
    mutationFn: patchAuthor,
    onSuccess: async (response: ApiResponse<AuthorRead>) => {
      author.value = response.data
    },
    onError: async (error: ApiException) => {
      errorMessage.value = error.message
    },
  })

  return {
    updateAuthor: mutation.mutate,
    isSuccess: computed(() => mutation.isSuccess.value),
    isError: computed(() => mutation.isError.value),
    isPending: computed(() => mutation.isPending.value),
    errorMessage,
    author,
  }
}

export const useDeleteAuthor = () => {
  const errorMessage = ref('')

  const mutation = useMutation({
    mutationFn: deleteAuthor,
    onError: async (error: ApiException) => {
      errorMessage.value = error.message
    },
  })

  return {
    deleteAuthor: mutation.mutate,
    isSuccess: computed(() => mutation.isSuccess.value),
    isError: computed(() => mutation.isError.value),
    isPending: computed(() => mutation.isPending.value),
    errorMessage,
  }
}
