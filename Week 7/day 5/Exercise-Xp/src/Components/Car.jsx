import { useState } from 'react'
import Garage from './Garage.jsx'

export default function Car({ carInfo }) {
  const [color, setColor] = useState('red')

  return (
    <div>
      <p className="result-line">This car is {color} {carInfo.model}.</p>
      <Garage size="small" />
      <button className="text-button" onClick={() => setColor('blue')} type="button">
        Change car color
      </button>
    </div>
  )
}
