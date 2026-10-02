import { useState } from 'react'

export default function Forms() {
  const [username, setUsername] = useState('')
  const [age, setAge] = useState(null)
  const [errormessage, setErrormessage] = useState('')
  const [message, setMessage] = useState('React makes forms interactive.')
  const [selectedCar, setSelectedCar] = useState('Volvo')

  const handleChange = (event) => {
    const { name, value } = event.target

    if (name === 'username') {
      setUsername(value)
    }

    if (name === 'age') {
      setAge(value)
      setErrormessage(value.trim() !== '' && !/^\d+$/.test(value.trim())
        ? 'Please enter a numeric age.'
        : '')
    }
  }

  const mySubmitHandler = (event) => {
    event.preventDefault()
    window.alert(username)
  }

  let header = null
  if (username.trim() || (age !== null && age !== '')) {
    header = (
      <h2 className="form-result" aria-live="polite">
        {username.trim() && <span>Name: {username}</span>}
        {age !== null && age !== '' && <span>Age: {age}</span>}
      </h2>
    )
  }

  return (
    <div className="forms-layout">
      <section className="form-panel" aria-labelledby="form-title">
        <div className="section-heading">
          <span className="section-index">01</span>
          <div>
            <p className="section-kicker">Controlled inputs</p>
            <h2 id="form-title">Your details</h2>
          </div>
        </div>

        {header}

        <form className="details-form" onSubmit={mySubmitHandler}>
          <label className="field" htmlFor="username">
            <span>Name</span>
            <input
              autoComplete="name"
              id="username"
              name="username"
              onChange={handleChange}
              placeholder="e.g. Alex Morgan"
              type="text"
              value={username}
            />
          </label>

          <label className="field" htmlFor="age">
            <span>Age</span>
            <input
              aria-describedby={errormessage ? 'age-error' : undefined}
              aria-invalid={Boolean(errormessage)}
              id="age"
              inputMode="numeric"
              name="age"
              onChange={handleChange}
              placeholder="e.g. 28"
              type="text"
              value={age ?? ''}
            />
            {errormessage && <span className="error-message" id="age-error" role="alert">{errormessage}</span>}
          </label>

          <button className="submit-button" type="submit">Submit details</button>
        </form>
      </section>

      <section className="form-panel secondary-panel" aria-labelledby="textarea-title">
        <div className="section-heading">
          <span className="section-index">02</span>
          <div>
            <p className="section-kicker">State and textarea</p>
            <h2 id="textarea-title">A short note</h2>
          </div>
        </div>
        <label className="field" htmlFor="message">
          <span>Message</span>
          <textarea
            id="message"
            name="message"
            onChange={(event) => setMessage(event.target.value)}
            rows="4"
            value={message}
          />
        </label>
      </section>

      <section className="form-panel secondary-panel" aria-labelledby="select-title">
        <div className="section-heading">
          <span className="section-index">03</span>
          <div>
            <p className="section-kicker">State and select</p>
            <h2 id="select-title">Choose a car</h2>
          </div>
        </div>
        <label className="field" htmlFor="car-brand">
          <span>Car brand</span>
          <select
            id="car-brand"
            name="carBrand"
            onChange={(event) => setSelectedCar(event.target.value)}
            value={selectedCar}
          >
            <option value="Volvo">Volvo</option>
            <option value="Saab">Saab</option>
            <option value="Mercedes">Mercedes</option>
            <option value="Audi">Audi</option>
          </select>
        </label>
        <p className="selection-note">Selected: <strong>{selectedCar}</strong></p>
      </section>
    </div>
  )
}
