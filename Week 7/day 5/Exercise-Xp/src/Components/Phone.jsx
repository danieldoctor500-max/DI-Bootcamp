import { useState } from 'react'

export default function Phone() {
  const [brand] = useState('Samsung')
  const [model] = useState('Galaxy S20')
  const [color, setColor] = useState('black')
  const [year] = useState(2020)

  const changeColor = () => setColor('blue')

  return (
    <div>
      <p className="result-line">
        My {brand} {model} is {color} and was released in {year}.
      </p>
      <button className="text-button" onClick={changeColor} type="button">
        Change phone color
      </button>
    </div>
  )
}
