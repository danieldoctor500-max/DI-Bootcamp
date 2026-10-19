import { useDataFetching } from '../hooks/useDataFetching'

interface User {
  id: number
  name: string
  email: string
  company: { name: string }
}

const usersUrl = 'https://jsonplaceholder.typicode.com/users'

export function UserList() {
  const { data, loading, error, refetch, invalidateCache } = useDataFetching<User[]>(usersUrl, { maxAge: 5 * 60 * 1000 })

  function clearCacheAndRefresh() {
    invalidateCache()
    void refetch()
  }

  return (
    <div className="exercise-view fetch-view">
      <div className="view-heading"><div><p className="exercise-kicker">EXERCISE 03 <span>·</span> CACHE CONTROL</p><h1>User directory</h1></div><span className="view-index">03</span></div>
      <div className="fetch-summary">
        <p>Cached in memory for <strong>5 minutes</strong>. Refresh bypasses the cache; clear removes it before loading again.</p>
        <div className="fetch-actions">
          <button type="button" className="quiet-button" onClick={() => void refetch()} disabled={loading}>↻ <span>Refresh</span></button>
          <button type="button" className="dark-button" onClick={clearCacheAndRefresh} disabled={loading}><span>Clear cache &amp; refresh</span> ↗</button>
        </div>
      </div>
      <section className="user-results" aria-live="polite">
        <div className="results-header"><span>JSONPLACEHOLDER / USERS</span>{!loading && !error && data && <strong>{data.length} RECORDS</strong>}</div>
        {loading && <p className="fetch-state"><i className="loading-indicator" />Fetching users...</p>}
        {error && <div className="fetch-error" role="alert"><p>Could not load users</p><span>{error}</span><button type="button" onClick={() => void refetch()}>Retry ↗</button></div>}
        {!loading && !error && data && <ul className="api-user-list">{data.map((user) => <li key={user.id}>
          <span className="user-initial">{user.name.slice(0, 1)}</span>
          <span className="api-user-name"><strong>{user.name}</strong><small>{user.email}</small></span>
          <span className="company-name">{user.company.name}</span>
          <span className="record-number">{String(user.id).padStart(2, '0')}</span>
        </li>)}</ul>}
      </section>
    </div>
  )
}