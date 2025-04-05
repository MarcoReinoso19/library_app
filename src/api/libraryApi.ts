import type { ApiException } from '@/interfaces/Api'
import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import Cookies from 'js-cookie'
import snakecaseKeys from 'snakecase-keys'

const libraryApi: AxiosInstance = axios.create({
  baseURL: `http://127.0.0.1:8000/v1/`,
  withCredentials: true,
})

let failedRequestsQueue: Array<{
  resolve: (token: string) => void
  reject: (error: AxiosError) => void
}> = []

libraryApi.defaults.headers.common['Content-Type'] = 'application/json'

libraryApi.defaults.transformResponse = [
  (data, headers) => {
    try {
      if (data && headers?.['content-type']?.includes('application/json')) {
        return camelcaseKeys(JSON.parse(data), { deep: true })
      }
    } catch (error) {
      console.error('Error transformando la respuesta:', error)
    }
    return data // Devuelve los datos sin transformar si hay un error
  },
]

// Transformar las solicitudes a snake_case
libraryApi.defaults.transformRequest = [
  (data, headers) => {
    try {
      if (
        data &&
        typeof headers?.['Content-Type'] === 'string' &&
        headers['Content-Type'].includes('application/json')
      ) {
        return JSON.stringify(snakecaseKeys(data, { deep: true }))
      }
    } catch (error) {
      console.error('Error transformando la solicitud:', error)
    }
    return data // Devuelve los datos sin transformar si hay un error
  },
]

// ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
libraryApi.interceptors.request.use(config => {
  // Get the access token from cookies
  const accessToken: string | undefined = Cookies.get('accessToken')

  // If token is found
  if (accessToken) {
    // Get request headers and if headers is undefined assign blank object
    config.headers = config.headers || {}

    // Set authorization header
    // ℹ️ JSON.parse will convert token to string
    config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : ''
  }

  // Transformar los params a snake_case
  if (config.params) {
    config.params = snakecaseKeys(config.params, { deep: true })
  }

  // Return modified config
  return config
})

// Crear un interceptor de Axios para manejar errores
libraryApi.interceptors.response.use(
  response => response, // Pasar la respuesta sin modificar
  async (error: AxiosError<{ message: string }>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
    // Solo manejar errores 401 que no sean del endpoint de refresh
    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes('/refresh')) {
      originalRequest._retry = true
    }

    // Si la respuesta tiene un mensaje de error, devolverlo
    if (error.response?.data && typeof error.response.data.message === 'string') {
      const apiError: ApiException = {
        message: error.response.data.message,
        statusCode: error.response.status || 500,
      }

      return Promise.reject(apiError) // Rechazar la promesa con el error personalizado
    }

    // Si la respuesta tiene un mensaje de error de tipo objeto, devolverlo
    if (error.response?.data && error.response.data.message && error.response.data.message.hasOwnProperty('errors')) {
      // Obtener el objeto de errores (ignorar error de TypeScript)
      const parsedMessage = JSON.parse(error.response.data.message)
      const response: any[] = parsedMessage.errors
      const apiErrors: ApiException[] = []
      let errorMessage = ''

      // Recorrer las propiedades del objeto de errores
      for (const key in response) {
        if (Object.prototype.hasOwnProperty.call(response, key)) {
          const apiError: ApiException = {
            message: response[key].message,
            statusCode: error.response.status || 500,
            loc: response[key].loc,
          }

          apiErrors[key] = apiError
        }

        // Concatenar los mensajes de error
        errorMessage = apiErrors
          .map(e => `(${e.loc?.[1]}),`)
          .filter(loc => loc !== undefined)
          .concat(apiErrors.map(e => e.message))
          .join('\n')
      }

      const apiError: ApiException = {
        message: errorMessage,
        statusCode: error.response.status || 500,
      }

      return Promise.reject(apiError) // Rechazar la promesa con el error personalizado
    }

    if (error.code === 'ERR_BAD_REQUEST') {
      return Promise.reject({
        message: 'Bad Request or Method Not Found',
        statusCode: 404,
      })
    }

    return Promise.reject(error) // Rechazar la promesa con el error original
  }
)

export default libraryApi
