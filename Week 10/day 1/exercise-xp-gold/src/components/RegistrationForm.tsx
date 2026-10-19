import { useForm, type FormErrors } from '../hooks/useForm'

interface RegistrationValues {
  email: string
  password: string
  confirmPassword: string
}

const initialValues: RegistrationValues = { email: '', password: '', confirmPassword: '' }

function validateRegistration(values: RegistrationValues): FormErrors<RegistrationValues> {
  const errors: FormErrors<RegistrationValues> = {}
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!values.email.trim()) errors.email = 'Email is required.'
  else if (!emailPattern.test(values.email)) errors.email = 'Enter a valid email address.'
  if (!values.password) errors.password = 'Password is required.'
  else if (values.password.length < 8 || !/[A-Z]/.test(values.password) || !/\d/.test(values.password)) {
    errors.password = 'Use 8+ characters, one uppercase letter, and one number.'
  }
  if (!values.confirmPassword) errors.confirmPassword = 'Please confirm your password.'
  else if (values.confirmPassword !== values.password) errors.confirmPassword = 'Passwords do not match.'

  return errors
}

async function submitRegistration(values: RegistrationValues) {
  await new Promise((resolve) => window.setTimeout(resolve, 450))
  if (values.email.toLowerCase() === 'error@example.com') {
    throw new Error('That email is already registered. Try another address.')
  }
}

export function RegistrationForm() {
  const form = useForm(initialValues, validateRegistration, submitRegistration)

  function fieldError(field: keyof RegistrationValues) {
    return form.touched[field] ? form.errors[field] : undefined
  }

  return (
    <div className="exercise-view registration-view">
      <div className="view-heading">
        <div><p className="exercise-kicker">EXERCISE 01 <span>·</span> CUSTOM HOOK</p><h1>Registration form</h1></div>
        <span className="view-index">01</span>
      </div>
      <div className="form-layout">
        <div className="form-intro">
          <span className="intro-line" />
          <h2>One hook.<br />Every field.</h2>
          <p>Typed values, live validation, and submission states, bundled into a reusable <code>useForm</code> hook.</p>
          <div className="validation-key"><span className="key-dot" /> EMAIL + PASSWORD VALIDATION</div>
        </div>
        <form className="registration-form" onSubmit={form.handleSubmit} noValidate>
          <label htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="you@domain.com" value={form.values.email} onChange={form.handleChange} onBlur={form.handleBlur} aria-invalid={Boolean(fieldError('email'))} aria-describedby={fieldError('email') ? 'email-error' : undefined} />
          {fieldError('email') && <span className="field-error" id="email-error">{fieldError('email')}</span>}
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" autoComplete="new-password" placeholder="8+ characters" value={form.values.password} onChange={form.handleChange} onBlur={form.handleBlur} aria-invalid={Boolean(fieldError('password'))} aria-describedby={fieldError('password') ? 'password-error' : undefined} />
          {fieldError('password') && <span className="field-error" id="password-error">{fieldError('password')}</span>}
          <label htmlFor="confirmPassword">Confirm password</label>
          <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" placeholder="Repeat your password" value={form.values.confirmPassword} onChange={form.handleChange} onBlur={form.handleBlur} aria-invalid={Boolean(fieldError('confirmPassword'))} aria-describedby={fieldError('confirmPassword') ? 'confirm-error' : undefined} />
          {fieldError('confirmPassword') && <span className="field-error" id="confirm-error">{fieldError('confirmPassword')}</span>}
          {form.submissionMessage && <p className={`form-feedback ${form.submission}`} role={form.submission === 'error' ? 'alert' : 'status'}>{form.submissionMessage}</p>}
          <button className="submit-button" type="submit" disabled={form.submission === 'submitting'}>{form.submission === 'submitting' ? 'Creating account...' : 'Create account'}<span aria-hidden="true">↗</span></button>
          <p className="form-footnote">Use <code>error@example.com</code> to preview the server error state.</p>
        </form>
      </div>
    </div>
  )
}