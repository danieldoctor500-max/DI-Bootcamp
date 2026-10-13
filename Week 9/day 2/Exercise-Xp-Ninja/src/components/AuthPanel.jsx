import { useState } from 'react'
import { connect } from 'react-redux'
import {
  authErrorCleared,
  authFailed,
  authRequestStarted,
  authSucceeded,
} from '../redux/actions.js'
import { loginAccount, registerAccount } from '../services/authService.js'

function AuthPanel({
  error,
  authErrorCleared,
  authFailed,
  authRequestStarted,
  authSucceeded,
}) {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isRegistering = mode === 'register'

  const changeMode = (nextMode) => {
    setMode(nextMode)
    setName('')
    setPassword('')
    authErrorCleared()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    authRequestStarted()

    try {
      const session = isRegistering
        ? await registerAccount({ name, email, password })
        : await loginAccount({ email, password })
      authSucceeded(session)
    } catch (requestError) {
      authFailed(
        requestError instanceof Error
          ? requestError.message
          : 'Something went wrong. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="auth-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Daymark home">
          <span className="brand-mark" aria-hidden="true">D</span>
          daymark
        </a>
        <span className="topbar-note">A little progress, every day.</span>
      </header>

      <section className="auth-card" aria-labelledby="auth-title">
        <div className="auth-art" aria-hidden="true">
          <span className="art-sun" />
          <span className="art-line art-line-one" />
          <span className="art-line art-line-two" />
          <span className="art-line art-line-three" />
          <span className="art-check">✓</span>
        </div>
        <p className="eyebrow">A CALMER WAY TO GET THINGS DONE</p>
        <h1 id="auth-title">
          {isRegistering ? 'Make space for you.' : 'Good to have you back.'}
        </h1>
        <p className="auth-intro">
          {isRegistering
            ? 'Create an account and give your day a little more direction.'
            : 'Sign in to pick up right where you left off.'}
        </p>

        {error && (
          <p className="form-message form-message-error" role="alert">
            {error}
          </p>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegistering && (
            <div className="field">
              <label htmlFor="display-name">Your name</label>
              <input
                id="display-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Alex Morgan"
                autoComplete="name"
                minLength={2}
                maxLength={60}
                required
              />
            </div>
          )}
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              maxLength={254}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={isRegistering ? 'At least 8 characters' : 'Your password'}
              autoComplete={isRegistering ? 'new-password' : 'current-password'}
              minLength={8}
              maxLength={128}
              required
            />
            {isRegistering && (
              <span className="field-hint">Use at least 8 characters, including a letter and a number.</span>
            )}
          </div>
          <button className="auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? 'Please wait…'
              : isRegistering
                ? 'Create account'
                : 'Sign in'}
          </button>
        </form>

        <p className="auth-switch">
          {isRegistering ? 'Already have an account?' : 'New to Daymark?'}
          {' '}
          <button
            className="text-button"
            type="button"
            onClick={() => changeMode(isRegistering ? 'login' : 'register')}
          >
            {isRegistering ? 'Sign in' : 'Create an account'}
          </button>
        </p>
      </section>

      <p className="demo-note">
        This learning demo stores account data in this browser only. It is not
        connected to a secure authentication server.
      </p>
    </main>
  )
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
})

export default connect(mapStateToProps, {
  authErrorCleared,
  authFailed,
  authRequestStarted,
  authSucceeded,
})(AuthPanel)
