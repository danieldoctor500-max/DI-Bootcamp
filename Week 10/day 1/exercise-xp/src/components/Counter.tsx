import { useState } from 'react'

type CounterAction = 'Ready' | 'Incremented' | 'Decremented'

export function Counter() {
  const [count, setCount] = useState<number>(0)
  const [lastAction, setLastAction] = useState<CounterAction>('Ready')

  function changeCount(amount: number, action: CounterAction) {
    setCount((currentCount) => currentCount + amount)
    setLastAction(action)
  }

  return (
    <div className="counter-demo">
      <div className="counter-readout">
        <span className="counter-label">CURRENT COUNT</span>
        <output className="counter-value" aria-live="polite">{count}</output>
        <span className="counter-action">LAST ACTION <strong>{lastAction}</strong></span>
      </div>
      <div className="counter-controls" aria-label="Counter controls">
        <button type="button" onClick={() => changeCount(-1, 'Decremented')} aria-label="Decrement counter">−</button>
        <button type="button" onClick={() => changeCount(1, 'Incremented')} aria-label="Increment counter">+</button>
      </div>
    </div>
  )
}