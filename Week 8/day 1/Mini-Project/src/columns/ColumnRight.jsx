import { useState } from 'react'
import ErrorBoundary from '../ErrorBoundary.jsx'

function ColumnRight() {
  const crasher = { function: 'I live to crash' }
  const [text, setText] = useState(JSON.stringify(crasher))

  const eventHandler = () => {
    throw new Error('Event handler error')
  }

  return (
    <div className="right-content">
      <p className="eyebrow">ERROR HANDLING DEMO</p>
      <h2>Right column</h2>
      <p className="column-intro">
        React handles rendering errors differently from errors thrown by event
        handlers. Try each button to compare.
      </p>

      <div className="demo-card">
        <div className="demo-card__heading">
          <span className="step-number">01</span>
          <div>
            <h3>Trigger a rendering error</h3>
            <p>
              Replacing this string with a plain object makes React throw while
              rendering the paragraph.
            </p>
          </div>
        </div>

        <ErrorBoundary>
          <p className="object-preview">
            Current value: <code>{text}</code>
          </p>
        </ErrorBoundary>

        <button
          className="button button--danger"
          onClick={() => setText(crasher)}
          type="button"
        >
          Replace string with object
        </button>
      </div>

      <div className="demo-card">
        <div className="demo-card__heading">
          <span className="step-number step-number--muted">02</span>
          <div>
            <h3>Trigger an event-handler error</h3>
            <p>
              Error boundaries do not catch event-handler errors. Check the
              developer console after clicking.
            </p>
          </div>
        </div>

        <button
          className="button button--outline"
          onClick={eventHandler}
          type="button"
        >
          Invoke event handler
        </button>
      </div>
    </div>
  )
}

export default ColumnRight
