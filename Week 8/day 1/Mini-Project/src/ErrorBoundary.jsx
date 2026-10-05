import { Component } from 'react'

class ErrorBoundary extends Component {
  state = {
    error: null,
    errorInfo: null,
    hasError: false,
  }

  static getDerivedStateFromError(error) {
    return { error, hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({ errorInfo })
  }

  render() {
    const { error, errorInfo, hasError } = this.state

    if (hasError) {
      return (
        <div className="card error-card" role="alert">
          <div className="error-card__icon" aria-hidden="true">!</div>
          <div className="error-card__content">
            <p className="eyebrow">RENDER ERROR CAUGHT</p>
            <h2>Something went wrong in this section.</h2>
            <p className="error-card__message">
              The rest of the page is still available. Reload to try this
              section again.
            </p>
            <details className="error-details" style={{ whiteSpace: 'pre-wrap' }}>
              {error?.toString()}
              <br />
              {errorInfo?.componentStack}
            </details>
            <button
              className="button button--primary"
              onClick={() => window.location.reload()}
              type="button"
            >
              Reload page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
