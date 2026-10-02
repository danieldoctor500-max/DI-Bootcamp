import { useState } from 'react'

const emptyUser = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
}

export default function ContactForm() {
  const [user, setUser] = useState(emptyUser)
  const [submittedUser, setSubmittedUser] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setUser((currentUser) => ({ ...currentUser, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmittedUser({ ...user })
  }

  const resetForm = () => {
    setUser(emptyUser)
    setSubmittedUser(null)
  }

  return (
    <section className="exercise-panel" aria-labelledby="contact-title">
      <div className="panel-heading">
        <span className="exercise-number">02</span>
        <div>
          <p className="eyebrow">Exercise 2</p>
          <h2 id="contact-title">Contact details</h2>
        </div>
      </div>

      {submittedUser ? (
        <div className="user-summary" aria-live="polite">
          <p className="summary-label">Submission complete</p>
          <h3>{submittedUser.firstName} {submittedUser.lastName}</h3>
          <dl className="summary-details">
            <div>
              <dt>Phone</dt>
              <dd>{submittedUser.phone}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{submittedUser.email}</dd>
            </div>
          </dl>
          <button className="secondary-button" onClick={resetForm} type="button">
            Reset form
          </button>
        </div>
      ) : (
        <form className="form-fields" onSubmit={handleSubmit}>
          <div className="field-row">
            <label className="field" htmlFor="first-name">
              <span>First name</span>
              <input
                autoComplete="given-name"
                id="first-name"
                name="firstName"
                onChange={handleChange}
                required
                type="text"
                value={user.firstName}
              />
            </label>
            <label className="field" htmlFor="last-name">
              <span>Last name</span>
              <input
                autoComplete="family-name"
                id="last-name"
                name="lastName"
                onChange={handleChange}
                required
                type="text"
                value={user.lastName}
              />
            </label>
          </div>
          <label className="field" htmlFor="phone">
            <span>Phone number</span>
            <input
              autoComplete="tel"
              id="phone"
              name="phone"
              onChange={handleChange}
              pattern="\\+?[0-9\\s().-]{7,20}"
              required
              title="Enter 7 to 20 digits; spaces and + ( ) . - are allowed."
              type="tel"
              value={user.phone}
            />
          </label>
          <label className="field" htmlFor="email">
            <span>Email address</span>
            <input
              autoComplete="email"
              id="email"
              name="email"
              onChange={handleChange}
              required
              type="email"
              value={user.email}
            />
          </label>
          <button className="primary-button" type="submit">Submit details</button>
        </form>
      )}
    </section>
  )
}
