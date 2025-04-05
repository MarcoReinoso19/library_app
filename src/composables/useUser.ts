import type { ApiException, ApiResponse } from '@/interfaces/Api'
import type { UserRead } from '@/interfaces/User'
import { getUserMe } from '@/methods/methodsUser'
import { useMutation } from '@tanstack/vue-query'

export const useReadUserMe = () => {
  const errorMessage = ref('')
  const user = ref<UserRead>()

  const getUserMutationMe = useMutation({
    mutationFn: getUserMe,
    onSuccess: async (response: ApiResponse<UserRead>) => {
      user.value = response.data
    },
    onError: async (error: ApiException) => {
      errorMessage.value = error.message
    },
  })

  return {
    getUserMe: getUserMutationMe.mutate,
    isSuccess: computed(() => getUserMutationMe.isSuccess.value),
    isError: computed(() => getUserMutationMe.isError.value),
    isPending: computed(() => getUserMutationMe.isPending.value),
    errorMessage,
    user,
  }
}
