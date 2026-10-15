import { useDispatch, useSelector } from 'react-redux'
import { ageDownAsync, ageUpAsync } from '../redux/ageSlice.js'

function AgeControls() {
  const dispatch = useDispatch()
  const { age, loading } = useSelector((state) => state.age)

  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <form className="age-controls" onSubmit={handleSubmit}>
      <p className="control-hint">A little change, one year at a time.</p>
      <div className="button-row">
        <button
          className="age-button secondary-button"
          type="button"
          disabled={loading || age === 0}
          onClick={() => dispatch(ageDownAsync())}
        >
          <span aria-hidden="true">−</span> Age Down
        </button>
        <button
          className="age-button primary-button"
          type="button"
          disabled={loading}
          onClick={() => dispatch(ageUpAsync())}
        >
          Age Up <span aria-hidden="true">+</span>
        </button>
      </div>
      <p className="async-note">Each update takes a moment.</p>
    </form>
  )
}

export default AgeControls
