import { useState } from 'react'

const IMAGES_URL = 'https://picsum.photos/v2/list?page=0&limit=2'

function ColumnLeft() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [requestError, setRequestError] = useState('')

  const fetchImages = async () => {
    setLoading(true)
    setRequestError('')

    try {
      const response = await fetch(IMAGES_URL)

      if (!response.ok) {
        throw new Error(`Image request failed (${response.status}).`)
      }

      const data = await response.json()

      if (!Array.isArray(data)) {
        throw new Error('The image service returned an unexpected response.')
      }

      setImages(data)
    } catch (error) {
      setRequestError(
        error instanceof Error ? error.message : 'Unable to load images.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="left-content">
      <p className="eyebrow">LIVE API DEMO</p>
      <h2>Left column</h2>
      <p className="column-intro">
        This column stays available while the error boundary handles a crash on
        the right.
      </p>

      <button
        className="button button--primary image-button"
        disabled={loading}
        onClick={fetchImages}
        type="button"
      >
        {loading ? 'Loading images…' : 'Get images'}
      </button>

      {requestError && (
        <p className="request-error" role="alert">
          {requestError}
        </p>
      )}

      {images.length > 0 && (
        <div className="image-list" aria-live="polite">
          {images.map(({ id, author, download_url }) => (
            <figure className="image-card" key={id}>
              <img src={download_url} alt={`Photograph by ${author}`} />
              <figcaption>{author}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  )
}

export default ColumnLeft
