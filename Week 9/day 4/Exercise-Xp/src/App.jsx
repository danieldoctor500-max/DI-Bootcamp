import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from './redux/userSlice.js'

function UserData() {
  const dispatch = useDispatch()
  const { data: user, status, error } = useSelector((state) => state.user)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUser())
    }
  }, [dispatch, status])

  return (
    <section className="user-card" aria-labelledby="page-title">
      <p className="eyebrow">REDUX THUNK DEMO</p>
      <h1 id="page-title">User profile</h1>
      <p className="intro">User data fetched from JSONPlaceholder and stored in Redux.</p>

      {status === 'loading' && (
        <div className="notice" role="status">
          <span className="spinner" aria-hidden="true" />
          Fetching user data…
        </div>
      )}

      {status === 'failed' && (
        <div className="error-panel" role="alert">
          <p>{error}</p>
          <button className="retry-button" onClick={() => dispatch(fetchUser())}>
            Try again
          </button>
        </div>
      )}

      {status === 'succeeded' && user && (
        <article className="profile">
          <div className="avatar" aria-hidden="true">
            {user.name.charAt(0)}
          </div>
          <div className="profile-heading">
            <h2>{user.name}</h2>
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </div>
          <dl className="details">
            <div>
              <dt>Username</dt>
              <dd>{user.username}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{user.phone}</dd>
            </div>
            <div>
              <dt>Website</dt>
              <dd>
                <a href={`https://${user.website}`} target="_blank" rel="noreferrer">
                  {user.website}
                </a>
              </dd>
            </div>
            <div>
              <dt>Company</dt>
              <dd>{user.company.name}</dd>
            </div>
            <div className="address">
              <dt>Address</dt>
              <dd>
                {user.address.street}, {user.address.suite}
                <br />
                {user.address.city}, {user.address.zipcode}
              </dd>
            </div>
          </dl>
        </article>
      )}
    </section>
  )
}

function App() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="User directory home">
          <span className="brand-mark" aria-hidden="true">U</span>
          user directory
        </a>
        <span className="topbar-note">Week 9 · Exercise 1</span>
      </header>
      <UserData />
      <p className="page-note">Asynchronous state, made clear.</p>
    </main>
  )
}

export default App
