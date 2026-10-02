import { useEffect, useState } from 'react'

export default function Clock() {
  const [currentDate, setCurrentDate] = useState(() => new Date())

  useEffect(() => {
    const tick = () => setCurrentDate(new Date())
    const intervalId = window.setInterval(tick, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <section className="clock-panel" aria-labelledby="clock-title">
      <p className="panel-label">Local time</p>
      <h2 id="clock-title">Live clock</h2>
      <time className="clock-time" dateTime={currentDate.toISOString()}>
        {currentDate.toLocaleTimeString()}
      </time>
      <p className="clock-date">{currentDate.toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })}</p>
    </section>
  )
}
