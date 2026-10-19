import { useCallback, useEffect, useRef, useState } from 'react'

interface CacheEntry {
  data: unknown
  fetchedAt: number
}

const responseCache = new Map<string, CacheEntry>()

interface DataFetchingConfig {
  maxAge: number
}

export function useDataFetching<T>(url: string, config: DataFetchingConfig) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const requestId = useRef(0)
  const controllerRef = useRef<AbortController | null>(null)

  const request = useCallback(async (bypassCache = false) => {
    const currentRequest = ++requestId.current
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller
    setLoading(true)
    setError(null)

    try {
      const cached = responseCache.get(url)
      if (!bypassCache && cached && Date.now() - cached.fetchedAt < config.maxAge) {
        if (currentRequest === requestId.current) setData(cached.data as T)
        return
      }

      const response = await fetch(url, { signal: controller.signal })
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
      const result = (await response.json()) as T
      responseCache.set(url, { data: result, fetchedAt: Date.now() })
      if (currentRequest === requestId.current) setData(result)
    } catch (requestError) {
      if (controller.signal.aborted || currentRequest !== requestId.current) return
      setError(requestError instanceof Error ? requestError.message : 'An unexpected error occurred.')
    } finally {
      if (currentRequest === requestId.current) setLoading(false)
    }
  }, [url, config.maxAge])

  useEffect(() => {
    void request()
    return () => {
      controllerRef.current?.abort()
      requestId.current += 1
    }
  }, [request])

  const refetch = useCallback(() => request(true), [request])
  const invalidateCache = useCallback(() => {
    responseCache.delete(url)
  }, [url])

  return { data, loading, error, refetch, invalidateCache }
}