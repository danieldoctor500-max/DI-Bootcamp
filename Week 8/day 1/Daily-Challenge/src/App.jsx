import { Component } from 'react'
import './App.css'

const initialFormData = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  destination: '',
  lactoseFree: false,
}

function FormComponent({ formData, handleChange }) {
  return (
    <div className="challenge-layout">
      <form className="travel-form" action="/" method="get">
        <div className="form-heading">
          <span className="form-heading__icon" aria-hidden="true">✈</span>
          <div>
            <p className="eyebrow">TRAVEL DETAILS</p>
            <h2>Tell us about yourself</h2>
          </div>
        </div>

        <div className="field-row">
          <label className="field">
            <span>First name</span>
            <input
              autoComplete="given-name"
              name="firstName"
              onChange={handleChange}
              placeholder="e.g. John"
              required
              type="text"
              value={formData.firstName}
            />
          </label>
          <label className="field">
            <span>Last name</span>
            <input
              autoComplete="family-name"
              name="lastName"
              onChange={handleChange}
              placeholder="e.g. Doe"
              required
              type="text"
              value={formData.lastName}
            />
          </label>
        </div>

        <label className="field">
          <span>Age</span>
          <input
            name="age"
            onChange={handleChange}
            placeholder="Enter your age"
            required
            type="number"
            min="1"
            max="120"
            value={formData.age}
          />
        </label>

        <fieldset className="field-group">
          <legend>Gender</legend>
          <div className="choice-row">
            {['male', 'female'].map((gender) => (
              <label className="choice-card" key={gender}>
                <input
                  checked={formData.gender === gender}
                  name="gender"
                  onChange={handleChange}
                  required
                  type="radio"
                  value={gender}
                />
                <span className="choice-card__indicator" />
                <span className="choice-card__label">
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="field">
          <span>Destination</span>
          <select
            name="destination"
            onChange={handleChange}
            required
            value={formData.destination}
          >
            <option disabled value="">
              Choose a destination
            </option>
            <option value="Japan">Japan</option>
            <option value="Thailand">Thailand</option>
            <option value="Brazil">Brazil</option>
            <option value="New Zealand">New Zealand</option>
          </select>
        </label>

        <label className="checkbox-card">
          <input
            checked={formData.lactoseFree}
            name="lactoseFree"
            onChange={handleChange}
            type="checkbox"
          />
          <span className="checkbox-card__indicator" aria-hidden="true" />
          <span className="checkbox-card__copy">
            <strong>Lactose free</strong>
            <small>Let us know about your dietary needs</small>
          </span>
        </label>

        <button className="submit-button" type="submit">
          Submit travel details
          <span aria-hidden="true">→</span>
        </button>
      </form>

      <aside className="preview-card" aria-live="polite">
        <div className="preview-card__top">
          <div>
            <p className="eyebrow">LIVE PREVIEW</p>
            <h2>Your details</h2>
          </div>
          <span className="preview-card__sparkle" aria-hidden="true">✳</span>
        </div>

        <p className="preview-card__hint">
          Your information appears here as you fill out the form.
        </p>

        <dl className="details-list">
          <div className="detail-row">
            <dt>First name</dt>
            <dd>{formData.firstName || <span className="empty-value">—</span>}</dd>
          </div>
          <div className="detail-row">
            <dt>Last name</dt>
            <dd>{formData.lastName || <span className="empty-value">—</span>}</dd>
          </div>
          <div className="detail-row">
            <dt>Age</dt>
            <dd>{formData.age || <span className="empty-value">—</span>}</dd>
          </div>
          <div className="detail-row">
            <dt>Gender</dt>
            <dd>
              {formData.gender
                ? formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)
                : <span className="empty-value">—</span>}
            </dd>
          </div>
          <div className="detail-row">
            <dt>Destination</dt>
            <dd>{formData.destination || <span className="empty-value">—</span>}</dd>
          </div>
          <div className="detail-row">
            <dt>Lactose free</dt>
            <dd>
              <span className={`diet-badge ${formData.lactoseFree ? 'diet-badge--yes' : ''}`}>
                {formData.lactoseFree ? 'Yes' : 'No'}
              </span>
            </dd>
          </div>
        </dl>

        <div className="preview-note">
          <span aria-hidden="true">i</span>
          <p>Submitting adds these fields to the page URL as query parameters.</p>
        </div>
      </aside>
    </div>
  )
}

class App extends Component {
  state = { formData: initialFormData }

  handleChange = (event) => {
    const { name, type, value, checked } = event.target

    this.setState(({ formData }) => ({
      formData: {
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      },
    }))
  }

  render() {
    return (
      <main className="app-shell">
        <header className="page-header">
          <a className="brand" href="/" aria-label="Form Journey home">
            <span className="brand__mark" aria-hidden="true">F</span>
            Form Journey
          </a>
          <span className="header-tag">REACT · FORMS</span>
        </header>

        <section className="intro">
          <p className="eyebrow">DAILY CHALLENGE</p>
          <h1>Plan your next adventure.</h1>
          <p>
            Share a few details and we’ll get your travel preferences ready.
          </p>
        </section>

        <FormComponent
          formData={this.state.formData}
          handleChange={this.handleChange}
        />

        <footer className="page-footer">
          <span>React state · Controlled inputs · Form submission</span>
          <span>Week 8 · Day 1</span>
        </footer>
      </main>
    )
  }
}

export default App
