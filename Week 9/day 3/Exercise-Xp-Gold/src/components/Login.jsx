import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser, setUser } from '../redux/authSlice.js'

function Login() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  function handleSubmit(event) {
    event.preventDefault()
    const user = {
      name: name.trim(),
      email: email.trim(),
    }

    dispatch(setUser(user))
    dispatch(loginUser())
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label className="field-label" htmlFor="name">Your name</label>
      <input
        id="name"
        className="auth-input"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Alex Morgan"
        autoComplete="name"
        required
        maxLength={80}
      />

      <label className="field-label" htmlFor="email">Email address</label>
      <input
        id="email"
        className="auth-input"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="alex@example.com"
        autoComplete="email"
        required
      />

      <label className="field-label" htmlFor="password">Password</label>
      <input
        id="password"
        className="auth-input"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Enter any password"
        autoComplete="current-password"
        required
      />

      <button className="primary-button" type="submit">Sign in</button>
      <p className="form-note">Demo only — credentials are not sent to a server.</p>
    </form>
  )
}

export default Login
