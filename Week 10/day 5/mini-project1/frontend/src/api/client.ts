import type { AuthResponse } from '@shared/index'

const API_URL = import.meta.env.VITE_API_URL ?? ''

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function readResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) return undefined as T
  const payload: unknown = await response.json().catch(() => null)
  if (!response.ok) {
    const message =
      typeof payload === 'object' &&
      payload !== null &&
      'message' in payload &&
      typeof payload.message === 'string'
        ? payload.message
        : 'The request could not be completed.'
    throw new ApiError(message, response.status)
  }
  return payload as T
}

let refreshPromise: Promise<AuthResponse> | null = null

export function refreshAccessToken(): Promise<AuthResponse> {
  if (!refreshPromise) {
    refreshPromise = makeRequest('/auth/refresh', null, { method: 'POST' })
      .then((response) => readResponse<AuthResponse>(response))
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}

function makeRequest(path: string, accessToken: string | null, init: RequestInit): Promise<Response> {
  const headers = new Headers(init.headers)
  if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`)
  if (init.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json')
  return fetch(`${API_URL}/api${path}`, {
    ...init,
    headers,
    credentials: 'include',
  })
}

export async function apiRequest<T>(
  path: string,
  accessToken: string | null,
  init: RequestInit = {},
  onTokenUpdate?: (token: string | null) => void,
  allowRefresh = true,
): Promise<T> {
  const response = await makeRequest(path, accessToken, init)
  if (response.status !== 401 || !accessToken || !allowRefresh) {
    return readResponse<T>(response)
  }

  try {
    const refreshed = await refreshAccessToken()
    onTokenUpdate?.(refreshed.accessToken)
    return readResponse<T>(await makeRequest(path, refreshed.accessToken, init))
  } catch (error) {
    onTokenUpdate?.(null)
    throw error
  }
}

export function jsonBody(value: unknown): string {
  return JSON.stringify(value)
}
