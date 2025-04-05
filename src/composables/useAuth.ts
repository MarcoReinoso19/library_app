import { useMutation } from '@tanstack/vue-query'

import { login, logout } from '@/methods/methodsAuth'
import type { ApiException, ApiResponse } from '@/interfaces/Api'

import { getUserMe, postUser } from '@/methods/methodsUser'
import type { AuthToken } from '@/methods/methodsAuth'
import libraryApi from '@/api/libraryApi'
import Cookie from 'js-cookie'
import router from '@/router'
import axios from 'axios'

export const useLogin = () => {
  const errorMessage = ref('')
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async (response: ApiResponse<AuthToken>) => {
      const accessToken = response.data.accessToken

      const jwt = `Bearer ${accessToken}`

      axios.defaults.headers.common.Authorization = jwt
      libraryApi.defaults.headers.common.Authorization = jwt

      const { data: user } = await getUserMe()

      Cookie.set('userData', JSON.stringify(user), { expires: 7 }) // Set cookie with 7 days expiration
      Cookie.set('accessToken', accessToken, { expires: 7 }) // Set cookie with 7 days expiration
    },
    onError: async (error: ApiException) => {
      errorMessage.value = error.message
      Cookie.remove('accessToken')
      Cookie.remove('userData')
    },
  })
  return {
    login: mutation.mutate,
    isSuccess: computed(() => mutation.isSuccess.value),
    isError: computed(() => mutation.isError.value),
    isPending: computed(() => mutation.isPending.value),
    errorMessage,
  }
}

export const useRegister = () => {
  const errorMessage = ref('')
  const mutation = useMutation({
    mutationFn: postUser,
  })
  return {
    register: mutation.mutate,
    isSuccess: computed(() => mutation.isSuccess.value),
    isError: computed(() => mutation.isError.value),
    isPending: computed(() => mutation.isPending.value),
    errorMessage,
  }
}

export const useLogout = () => {
  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      Cookie.remove('userData')
      Cookie.remove('accessToken')

      await router.push('/login')
    },
  })

  return {
    logout: mutation.mutate,
    isSuccess: computed(() => mutation.isSuccess.value),
    isError: computed(() => mutation.isError.value),
    isPending: computed(() => mutation.isPending.value),
  }
}
