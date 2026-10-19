import { useEffect, useState } from 'react'

interface User {
  id: number
  name: string
  email: string
  company: {
    name: string
  }
}

type UserListState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; users: User[] }

export function UserList() {
  const [state, setState] = useState<UserListState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    async function loadUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`)
        }

        const users: User[] = await response.json()
        setState({ status: 'success', users })
      } catch (error) {
        if (controller.signal.aborted) return
        setState({
          status: 'error',
          message: error instanceof Error ? error.message : 'An unexpected error occurred.',
        })
      }
    }

    void loadUsers()
    return () => controller.abort()
  }, [])

  if (state.status === 'loading') {
    return <p className="request-state" role="status"><span className="loading-dot" /> Loading users...</p>
  }

  if (state.status === 'error') {
    return <p className="request-state error-state" role="alert">Could not load users: {state.message}</p>
  }

  return (
    <>
      <p className="user-list-count">{state.users.length} USERS <span>FROM JSONPLACEHOLDER</span></p>
      <ul className="user-list">
        {state.users.map((user) => (
          <li key={user.id}>
            <span className="api-user-initial">{user.name.charAt(0)}</span>
            <span className="api-user-main"><strong>{user.name}</strong><small>{user.email}</small></span>
            <span className="api-company">{user.company.name}</span>
          </li>
        ))}
      </ul>
    </>
  )
}