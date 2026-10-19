import { useEffect, useReducer, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { useContacts } from '../context/useContacts'

interface Profile {
  name: string
  bio: string
}

type ProfileStatus = 'initial' | 'loading' | 'success' | 'error'

interface ProfileState {
  status: ProfileStatus
  profile: Profile | null
  error: string | null
}

type ProfileAction =
  | { type: 'loading' }
  | { type: 'success'; profile: Profile }
  | { type: 'error'; message: string }

const initialProfileState: ProfileState = { status: 'initial', profile: null, error: null }

function profileReducer(state: ProfileState, action: ProfileAction): ProfileState {
  switch (action.type) {
    case 'loading':
      return { ...state, status: 'loading', error: null }
    case 'success':
      return { status: 'success', profile: action.profile, error: null }
    case 'error':
      return { ...state, status: 'error', error: action.message }
  }
}

export function ProfileManager() {
  const [state, dispatch] = useReducer(profileReducer, initialProfileState)
  const [name, setName] = useState('Jordan Lee')
  const [bio, setBio] = useState('Building clear, useful things for the web.')

  function saveProfile(shouldFail = false) {
    dispatch({ type: 'loading' })
    window.setTimeout(() => {
      if (shouldFail) dispatch({ type: 'error', message: 'Profile update failed. Check your connection and retry.' })
      else dispatch({ type: 'success', profile: { name, bio } })
    }, 650)
  }

  return (
    <section className="demo-panel profile-panel" aria-label="Profile reducer demo">
      <div className="panel-topline"><span>PROFILE UPDATE</span><StatusBadge status={state.status} /></div>
      <div className="profile-layout">
        <form className="demo-form" onSubmit={(event: FormEvent) => { event.preventDefault(); saveProfile() }}>
          <label htmlFor="profile-name">Display name</label>
          <input id="profile-name" value={name} onChange={(event) => setName(event.target.value)} />
          <label htmlFor="profile-bio">Bio</label>
          <textarea id="profile-bio" rows={3} value={bio} onChange={(event) => setBio(event.target.value)} />
          <div className="button-row"><button className="primary-button" type="submit" disabled={state.status === 'loading'}>{state.status === 'loading' ? 'Saving...' : 'Save profile'} <span>↗</span></button><button className="text-button" type="button" disabled={state.status === 'loading'} onClick={() => saveProfile(true)}>Simulate error</button></div>
        </form>
        <div className="state-readout"><span className="readout-label">CURRENT REDUCER STATE</span>
          {state.profile ? <div className="profile-result"><div className="profile-avatar">{state.profile.name.slice(0, 1).toUpperCase()}</div><strong>{state.profile.name}</strong><p>{state.profile.bio}</p></div> : <div className="empty-state"><span>01</span><p>Submit the form to update this profile.</p></div>}
          {state.error && <p className="inline-error" role="alert">{state.error}</p>}
          <div className="state-machine"><span className={state.status === 'initial' ? 'current' : ''}>INITIAL</span><i /><span className={state.status === 'loading' ? 'current' : ''}>LOADING</span><i /><span className={state.status === 'success' ? 'current' : ''}>SUCCESS</span><i /><span className={state.status === 'error' ? 'current error' : ''}>ERROR</span></div>
        </div>
      </div>
    </section>
  )
}

function StatusBadge({ status }: { status: ProfileStatus }) {
  return <span className={`status-badge status-${status}`}>{status}</span>
}

type SurveyStatus = 'initial' | 'submitting' | 'completed'

interface SurveyState {
  status: SurveyStatus
  feedback: string
}

type SurveyAction =
  | { type: 'start' }
  | { type: 'feedbackChanged'; feedback: string }
  | { type: 'submit' }
  | { type: 'reset' }

const initialSurveyState: SurveyState = { status: 'initial', feedback: '' }

function surveyReducer(_state: SurveyState, action: SurveyAction): SurveyState {
  switch (action.type) {
    case 'start':
      return { status: 'submitting', feedback: '' }
    case 'feedbackChanged':
      return { status: 'submitting', feedback: action.feedback }
    case 'submit':
      return { status: 'completed', feedback: _state.feedback }
    case 'reset':
      return initialSurveyState
  }
}

export function SurveyForm() {
  const [state, dispatch] = useReducer(surveyReducer, initialSurveyState)
  const steps = state.status === 'completed' ? '03 COMPLETE' : state.status === 'submitting' ? '02 IN PROGRESS' : '01 READY'

  return (
    <section className="demo-panel survey-panel" aria-label="Survey reducer demo">
      <div className="panel-topline"><span>QUICK FEEDBACK</span><span className="step-count">{steps}</span></div>
      {state.status === 'initial' && <div className="survey-start"><div className="survey-art" aria-hidden="true">?</div><div><h2>Your input shapes<br />what we build next.</h2><p>A short feedback prompt with every transition handled by a typed reducer.</p><button className="primary-button" type="button" onClick={() => dispatch({ type: 'start' })}>Start survey <span>↗</span></button></div></div>}
      {state.status === 'submitting' && <form className="survey-active" onSubmit={(event) => { event.preventDefault(); if (state.feedback.trim()) dispatch({ type: 'submit' }) }}><label htmlFor="survey-feedback">What would make this experience better?</label><textarea id="survey-feedback" autoFocus rows={5} value={state.feedback} onChange={(event) => dispatch({ type: 'feedbackChanged', feedback: event.target.value })} placeholder="Share one thing on your mind..." /><div className="button-row"><button className="primary-button" type="submit" disabled={!state.feedback.trim()}>Submit feedback <span>↗</span></button><button className="text-button" type="button" onClick={() => dispatch({ type: 'reset' })}>Reset</button></div></form>}
      {state.status === 'completed' && <div className="survey-complete"><span className="complete-mark">✓</span><div><p className="complete-label">RESPONSE RECORDED</p><h2>Thanks for sharing.</h2><blockquote>{state.feedback}</blockquote><button className="text-button" type="button" onClick={() => dispatch({ type: 'reset' })}>Start over ↗</button></div></div>}
    </section>
  )
}

interface ContactFormState {
  name: string
  email: string
  message: string
  status: 'pristine' | 'editing'
}

type ContactFormAction =
  | { type: 'updateField'; field: 'name' | 'email' | 'message'; value: string }
  | { type: 'resetForm' }

type ContactField = 'name' | 'email' | 'message'

const initialContactFormState: ContactFormState = { name: '', email: '', message: '', status: 'pristine' }

function contactFormReducer(state: ContactFormState, action: ContactFormAction): ContactFormState {
  if (action.type === 'resetForm') return initialContactFormState
  return { ...state, [action.field]: action.value, status: 'editing' }
}

export function ContactForm() {
  const [state, dispatch] = useReducer(contactFormReducer, initialContactFormState)

  function update(field: ContactField) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => dispatch({ type: 'updateField', field, value: event.target.value })
  }

  return (
    <section className="demo-panel contact-form-panel" aria-label="Contact form reducer demo">
      <div className="panel-topline"><span>CONTACT FORM</span><span className={`edit-status ${state.status}`}>{state.status === 'editing' ? 'DRAFT CHANGED' : 'READY'}</span></div>
      <div className="contact-form-layout"><div className="contact-form-intro"><h2>Leave a note.</h2><p>Each field update flows through the reducer. Reset returns the full form to its initial state.</p><button type="button" className="text-button reset-button" onClick={() => dispatch({ type: 'resetForm' })}>Reset fields ↻</button></div>
        <form className="demo-form contact-demo-form" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="contact-name">Name</label><input id="contact-name" value={state.name} onChange={update('name')} placeholder="Your name" />
          <label htmlFor="contact-email">Email</label><input id="contact-email" type="email" value={state.email} onChange={update('email')} placeholder="you@domain.com" />
          <label htmlFor="contact-message">Message</label><textarea id="contact-message" rows={3} value={state.message} onChange={update('message')} placeholder="Write a message..." />
          <p className="form-state-note">FORM STATE <strong>{state.status}</strong> <span>·</span> {Object.values(state).filter((value) => value !== '' && value !== 'pristine').length} values set</p>
        </form>
      </div>
    </section>
  )
}

export function ContactDirectory() {
  const { state, dispatch } = useContacts()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  function addContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!name.trim() || !email.trim()) return
    dispatch({ type: 'addContact', contact: { id: Date.now(), name: name.trim(), email: email.trim() } })
    setName('')
    setEmail('')
  }

  return (
    <section className="demo-panel directory-panel" aria-label="Contact context demo">
      <div className="panel-topline"><span>GLOBAL CONTACTS</span><span className="step-count">{String(state.contacts.length).padStart(2, '0')} RECORDS</span></div>
      <div className="directory-layout"><form className="directory-form" onSubmit={addContact}><h2>Add a contact</h2><p>This nested view reads and updates shared state through <code>useContacts</code>.</p><label htmlFor="new-contact-name">Full name</label><input id="new-contact-name" required value={name} onChange={(event) => setName(event.target.value)} placeholder="Casey Morgan" /><label htmlFor="new-contact-email">Email address</label><input id="new-contact-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="casey@domain.com" /><button className="primary-button" type="submit">Add to directory <span>↗</span></button></form>
        <div className="directory-list"><div className="list-heading"><span>CONTACT LIST</span><span>SHARED CONTEXT</span></div>{state.contacts.length === 0 ? <div className="directory-empty"><span>∅</span><p>No contacts yet. Add one to update the shared list.</p></div> : <ul>{state.contacts.map((contact) => <li key={contact.id}><span className="directory-avatar">{contact.name.slice(0, 1).toUpperCase()}</span><span className="directory-person"><strong>{contact.name}</strong><small>{contact.email}</small></span><button type="button" aria-label={`Remove ${contact.name}`} onClick={() => dispatch({ type: 'removeContact', id: contact.id })}>×</button></li>)}</ul>}</div>
      </div>
    </section>
  )
}

export function FocusField() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [value, setValue] = useState('')

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function focusInput() {
    inputRef.current?.focus()
  }

  return (
    <section className="demo-panel focus-panel" aria-label="Typed DOM ref demo">
      <div className="panel-topline"><span>DOM ELEMENT REFERENCE</span><span className="step-count">HTMLINPUTELEMENT</span></div>
      <div className="focus-layout"><div className="focus-copy"><span className="focus-glyph">⌁</span><h2>Focus follows<br />the ref.</h2><p>The input is focused on mount. The button uses a null-safe ref to return focus whenever you need it.</p></div><div className="focus-demo"><label htmlFor="focus-target">FOCUS TARGET</label><input ref={inputRef} id="focus-target" value={value} onChange={(event) => setValue(event.target.value)} placeholder="Type here, or focus me" /><button className="primary-button" type="button" onClick={focusInput}>Focus input <span>↗</span></button><p className="ref-type">const inputRef = useRef&lt;HTMLInputElement | null&gt;(null)</p></div></div>
    </section>
  )
}