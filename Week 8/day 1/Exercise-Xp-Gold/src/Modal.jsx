import { Component } from 'react'

class Modal extends Component {
  componentDidMount() {
    this.previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    this.closeButton?.focus()
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.body.style.overflow = this.previousOverflow
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  closeButton = null

  handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      this.props.onClose()
    }
  }

  handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      this.props.onClose()
    }
  }

  render() {
    const { children, onClose } = this.props

    return (
      <div
        className="modal-background"
        onClick={this.handleOverlayClick}
        role="presentation"
      >
        <section
          aria-labelledby="modal-title"
          aria-modal="true"
          className="modal-body"
          role="dialog"
        >
          <div className="modal-header">
            <span className="modal-icon" aria-hidden="true">!</span>
            <div>
              <p className="eyebrow">ERROR BOUNDARY</p>
              <h2 id="modal-title">An error occurred</h2>
            </div>
          </div>
          <div className="modal-content">{children}</div>
          <div className="modal-actions">
            <button
              className="button button--primary"
              onClick={onClose}
              ref={(element) => {
                this.closeButton = element
              }}
              type="button"
            >
              Close
            </button>
          </div>
        </section>
      </div>
    )
  }
}

export default Modal
