export default function Input({ label, name, value, onChange, error, inputMode }) {
  const inputId = `contact-${name}`
  const errorId = `${inputId}-error`

  return (
    <div className="field">
      <label htmlFor={inputId}>{label}</label>
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        autoComplete={name === 'firstName' ? 'given-name' : name === 'lastName' ? 'family-name' : name}
        id={inputId}
        inputMode={inputMode}
        name={name}
        onChange={onChange}
        type="text"
        value={value}
      />
      {error && <span className="field-error" id={errorId}>{error}</span>}
    </div>
  )
}
