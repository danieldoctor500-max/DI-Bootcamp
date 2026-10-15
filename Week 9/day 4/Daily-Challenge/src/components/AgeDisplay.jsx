import { useSelector } from 'react-redux'

function AgeDisplay() {
  const { age, loading } = useSelector((state) => state.age)

  return (
    <section className="age-display" aria-live="polite" aria-busy={loading}>
      <p className="eyebrow">YOUR AGE</p>
      <div className="age-number">
        {loading ? (
          <span className="spinner" role="status" aria-label="Updating age" />
        ) : (
          age
        )}
      </div>
      <p className="age-label">{age === 1 ? 'year old' : 'years old'}</p>
    </section>
  )
}

export default AgeDisplay
