import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../features/auth/authSlice.js'

function AuthForm() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const displayName = name.trim()
    const userEmail = email.trim()
    if (!displayName || !userEmail) return

    dispatch(login({ name: displayName, email: userEmail }))
    setName('')
    setEmail('')
  }

  if (user) {
    return (
      <div className="account-status">
        <span className="welcome">Hi, {user.name}</span>
        <button className="text-button" type="button" onClick={() => dispatch(logout())}>
          Sign out
        </button>
      </div>
    )
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="login-name">Name</label>
      <input
        id="login-name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Your name"
        autoComplete="name"
        maxLength={60}
        required
      />
      <label className="sr-only" htmlFor="login-email">Email</label>
      <input
        id="login-email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email address"
        autoComplete="email"
        required
      />
      <button className="sign-in-button" type="submit">Sign in</button>
    </form>
  )
}

export default AuthForm
