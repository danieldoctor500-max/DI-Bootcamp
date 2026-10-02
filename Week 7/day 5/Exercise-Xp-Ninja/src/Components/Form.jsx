import { useState } from 'react'
import Input from './Input.jsx'

const initialValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
}

function getFieldError(name, value) {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return `${name === 'firstName' ? 'First name' : name === 'lastName' ? 'Last name' : name} is required.`
  }

  if (name === 'phone') {
    const digits = trimmedValue.replace(/\D/g, '')
    const allowedCharacters = /^\+?[\d\s().-]+$/
    if (!allowedCharacters.test(trimmedValue) || digits.length < 7 || digits.length > 15) {
      return 'Enter a valid phone number with 7 to 15 digits.'
    }
  }

  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedValue)) {
    return 'Enter a valid email address.'
  }

  return ''
}

function validate(values) {
  return Object.fromEntries(
    Object.entries(values).map(([name, value]) => [name, getFieldError(name, value)]),
  )
}

export default function Form() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((currentValues) => ({ ...currentValues, [name]: value }))

    if (Object.hasOwn(errors, name)) {
      setErrors((currentErrors) => ({ ...currentErrors, [name]: getFieldError(name, value) }))
    }

    setSubmitted(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.values(nextErrors).every((error) => !error)) {
      setSubmitted(true)
    }
  }

  return (
    <section className="form-panel" aria-labelledby="form-title">
      <div className="panel-heading">
        <p className="panel-label">Form validation</p>
        <h2 id="form-title">Your contact details</h2>
      </div>

      <form className="contact-form" noValidate onSubmit={handleSubmit}>
        <div className="field-row">
          <Input
            error={errors.firstName}
            label="First name"
            name="firstName"
            onChange={handleChange}
            value={values.firstName}
          />
          <Input
            error={errors.lastName}
            label="Last name"
            name="lastName"
            onChange={handleChange}
            value={values.lastName}
          />
        </div>
        <Input
          error={errors.phone}
          inputMode="tel"
          label="Phone"
          name="phone"
          onChange={handleChange}
          value={values.phone}
        />
        <Input
          error={errors.email}
          inputMode="email"
          label="Email"
          name="email"
          onChange={handleChange}
          value={values.email}
        />
        <button className="submit-button" type="submit">Submit details</button>
      </form>

      {submitted && (
        <p className="success-message" role="status">
          Details submitted successfully for {values.firstName} {values.lastName}.
        </p>
      )}
    </section>
  )
}
