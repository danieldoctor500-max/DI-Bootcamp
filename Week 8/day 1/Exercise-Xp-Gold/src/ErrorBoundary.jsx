import { Component } from 'react'
import Modal from './Modal.jsx'

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({ errorInfo })
  }

  occurError = (error) => {
    this.setState({
      hasError: true,
      error,
      errorInfo: null,
    })
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
    this.props.onReset?.()
  }

  render() {
    const { children } = this.props
    const { error, errorInfo, hasError } = this.state

    if (hasError) {
      return (
        <Modal onClose={this.resetError}>
          <p className="error-message">
            {error?.toString() ?? 'An unexpected error occurred.'}
          </p>
          {errorInfo?.componentStack && (
            <details className="error-stack">
              <summary>View error details</summary>
              <pre>{errorInfo.componentStack}</pre>
            </details>
          )}
        </Modal>
      )
    }

    return children
  }
}

export default ErrorBoundary
