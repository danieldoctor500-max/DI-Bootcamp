import { Component, createRef } from 'react'
import ErrorBoundary from './ErrorBoundary.jsx'
import './App.css'

class App extends Component {
  state = { errorInfo: null }

  errorBoundaryRef = createRef()

  handleShowError = () => {
    const error = new Error('This is a simulated application error.')
    this.setState({ errorInfo: error })
    this.errorBoundaryRef.current.occurError(error)
  }

  handleCloseModal = () => {
    this.setState({ errorInfo: null })
  }

  render() {
    const { errorInfo } = this.state

    return (
      <main className="app-shell">
        <header className="page-header">
          <p className="eyebrow">WEEK 8 · DAY 1 · REACT</p>
          <h1>Modal with error handling</h1>
          <p>
            Use the error boundary to show, inspect, and dismiss a simulated
            error without leaving the page.
          </p>
        </header>

        <section className="demo-card" aria-labelledby="demo-title">
          <span className="demo-icon" aria-hidden="true">!</span>
          <h2 id="demo-title">Ready to test the error boundary?</h2>
          <p>
            Clicking the button asks the boundary to display the error modal.
            Close it to return to this screen.
          </p>

          <ErrorBoundary
            ref={this.errorBoundaryRef}
            onReset={this.handleCloseModal}
          >
            <button
              className="button button--primary"
              onClick={this.handleShowError}
              type="button"
            >
              Show error modal
            </button>
          </ErrorBoundary>

          {errorInfo && (
            <span className="sr-only" role="status">
              {errorInfo.message}
            </span>
          )}
        </section>

        <footer className="page-footer">
          <span>Class components</span>
          <span>Error boundary · Modal · Dismiss</span>
        </footer>
      </main>
    )
  }
}

export default App
