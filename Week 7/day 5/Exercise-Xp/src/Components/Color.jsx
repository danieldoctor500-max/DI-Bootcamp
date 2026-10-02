import { useEffect, useState } from 'react'

export default function Color() {
  const [favoriteColor, setFavoriteColor] = useState('red')

  useEffect(() => {
    alert('useEffect reached')
  }, [])

  return (
    <div>
      <p className="result-line">
        My favorite color is <span className={`color-value color-${favoriteColor}`}>{favoriteColor}</span>.
      </p>
      <button className="text-button" onClick={() => setFavoriteColor('blue')} type="button">
        Change favorite color
      </button>
    </div>
  )
}
