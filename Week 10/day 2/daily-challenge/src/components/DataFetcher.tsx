import { useEffect, useState, type ReactNode } from 'react'
import { requestFailed, requestStarted, requestSucceeded } from '../features/dataSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks'

interface DataFetcherProps<T> {
  requestKey: string
  fetchData: (signal: AbortSignal) => Promise<T>
  renderData: (data: T) => ReactNode
  idleMessage?: string
}

export function DataFetcher<T>({
  requestKey,
  fetchData,
  renderData,
  idleMessage = 'Choose a search to load data.',
}: DataFetcherProps<T>) {
  const dispatch = useAppDispatch()
  const request = useAppSelector((state) => state.data.requests[requestKey])
  const [data, setData] = useState<T | null>(null)
  const [hasRequested, setHasRequested] = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    let active = true
    setHasRequested(true)
    setData(null)
    dispatch(requestStarted(requestKey))

    fetchData(controller.signal)
      .then((result) => {
        if (!active) return
        setData(result)
        dispatch(requestSucceeded(requestKey))
      })
      .catch((error: unknown) => {
        if (!active || controller.signal.aborted) return
        dispatch(requestFailed({
          key: requestKey,
          error: error instanceof Error ? error.message : 'Something went wrong while loading data.',
        }))
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [attempt, dispatch, fetchData, requestKey])

  if (!hasRequested) return <p className="fetch-message">{idleMessage}</p>
  if (request?.status === 'loading') {
    return <div className="loading-state" role="status"><span className="loader" />Searching recipes<span className="loading-dots">...</span></div>
  }
  if (request?.status === 'failed') {
    return (
      <div className="error-state" role="alert">
        <strong>We couldn’t load recipes.</strong>
        <p>{request.error}</p>
        <button type="button" onClick={() => setAttempt((current) => current + 1)}>Try again</button>
      </div>
    )
  }
  if (request?.status === 'succeeded' && data !== null) return <>{renderData(data)}</>
  return <p className="fetch-message">{idleMessage}</p>
}