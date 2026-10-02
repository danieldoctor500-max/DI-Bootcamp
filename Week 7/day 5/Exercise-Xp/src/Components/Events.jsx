import { useState } from 'react'

export default function Events() {
  const [isToggleOn, setIsToggleOn] = useState(true)

  const clickMe = () => alert('I was clicked')

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      alert(event.currentTarget.value)
    }
  }

  const toggleButton = () => {
    setIsToggleOn((currentValue) => !currentValue)
  }

  return (
    <div className="control-stack">
      <button className="action-button" onClick={clickMe} type="button">
        Click me
      </button>
      <label className="field-label" htmlFor="enter-message">
        Press Enter to alert your text
      </label>
      <input
        id="enter-message"
        className="text-input"
        onKeyDown={handleKeyDown}
        placeholder="Type a message"
        type="text"
      />
      <button
        aria-pressed={isToggleOn}
        className={`toggle-button ${isToggleOn ? 'is-on' : 'is-off'}`}
        onClick={toggleButton}
        type="button"
      >
        {isToggleOn ? 'ON' : 'OFF'}
      </button>
    </div>
  )
}
