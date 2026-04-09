import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  type AxiosRequestConfig,
} from "axios"

import { clearSessionCookiesViaRoute } from "@/lib/auth/clear-session"
import { getAuthAccessToken } from "@/lib/cookies"
import { endpoints } from "@/lib/endpoints"
import { env } from "@/lib/env"

import type { ApiError } from "@/lib/api/api-error"

export { type ApiError, isApiError } from "@/lib/api/api-error"

export const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30_000,
})

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getAuthAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error: AxiosError) => {
    const status = error.response?.status
    const requestUrl = error.config?.url ?? ""
    const isLoginRequest = requestUrl.includes(endpoints.auth.login)
    const isLogoutRequest = requestUrl.includes(endpoints.auth.logout)

    const apiError: ApiError = {
      message: error.message || "An unexpected error occurred",
      status,
    }

    if (error.response) {
      apiError.message =
        (error.response.data as { message?: string })?.message ||
        error.message ||
        `Request failed with status ${error.response.status}`
    } else if (error.request) {
      apiError.message = "No response received from server"
    }

    if (status === 401 && !isLoginRequest && !isLogoutRequest) {
      await clearSessionCookiesViaRoute()
      return Promise.reject(apiError)
    }

    return Promise.reject(apiError)
  }
)

export function get<T = unknown>(url: string, config?: AxiosRequestConfig) {
  return apiClient.get<T>(url, config)
}

export function post<T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
) {
  return apiClient.post<T>(url, data, config)
}

export function patch<T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
) {
  return apiClient.patch<T>(url, data, config)
}

export function put<T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
) {
  return apiClient.put<T>(url, data, config)
}

export function del<T = unknown>(url: string, config?: AxiosRequestConfig) {
  return apiClient.delete<T>(url, config)
}
