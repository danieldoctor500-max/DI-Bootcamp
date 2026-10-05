import { Component } from 'react'

class ErrorBoundary extends Component {
  state = { error: null, errorInfo: null }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({ error, errorInfo })
  }

  render() {
    const { error, errorInfo } = this.state

    if (error) {
      return (
        <div className="error-fallback" role="alert">
          <span className="error-fallback__icon" aria-hidden="true">
            !
          </span>
          <div>
            <p className="eyebrow">RENDER ERROR CAUGHT</p>
            <h3>One of these counters crashed.</h3>
            <p className="error-fallback__message">
              The boundary replaced its child tree with this fallback UI.
            </p>
            <details className="error-fallback__details" style={{ whiteSpace: 'pre-wrap' }}>
              {error.toString()}
              <br />
              {errorInfo?.componentStack}
            </details>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
