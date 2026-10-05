import { Component } from 'react'
import './App.css'

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function getClockState(date = new Date()) {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    weekday: date.getDay(),
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  }
}

function pad(value) {
  return String(value).padStart(2, '0')
}

function toTwelveHour(hour) {
  return hour % 12 || 12
}

class CompassClock extends Component {
  state = getClockState()

  componentDidMount() {
    this.clockInterval = window.setInterval(() => {
      this.setState(getClockState())
    }, 1000)
  }

  componentWillUnmount() {
    window.clearInterval(this.clockInterval)
  }

  render() {
    const { year, month, weekday, day, hour, minute, second } = this.state
    const hourAngle = ((hour % 12) + minute / 60) * 30
    const minuteAngle = (minute + second / 60) * 6
    const secondAngle = second * 6

    return (
      <main className="clock-page">
        <header className="page-header">
          <p className="eyebrow">WEEK 8 · DAY 1 · DAILY CHALLENGE</p>
          <h1>React Clock</h1>
          <p className="page-subtitle">
            A little time, measured in every direction.
          </p>
        </header>

        <section className="clock-card" aria-label="Live compass clock">
          <div className="compass-frame">
            <span className="corner-label corner-label--year">{year}</span>
            <span className="corner-label corner-label--month">{MONTHS[month]}</span>
            <span className="side-label side-label--top">N · 12</span>
            <span className="side-label side-label--right">E · 03</span>
            <span className="side-label side-label--bottom">S · 06</span>
            <span className="side-label side-label--left">W · 09</span>

            <div
              className="clock-face"
              role="img"
              aria-label={`${WEEKDAYS[weekday]}, ${MONTHS[month]} ${day}, ${year}, ${pad(hour)}:${pad(minute)}:${pad(second)}`}
            >
              <div className="clock-ticks" aria-hidden="true">
                {Array.from({ length: 60 }, (_, index) => (
                  <span
                    className={`clock-tick ${index % 5 === 0 ? 'clock-tick--major' : ''}`}
                    key={index}
                    style={{ '--tick-angle': `${index * 6}deg` }}
                  />
                ))}
              </div>

              {Array.from({ length: 12 }, (_, index) => {
                const numeral = index === 0 ? 12 : index
                return (
                  <span
                    className="clock-numeral"
                    key={numeral}
                    style={{ '--numeral-angle': `${index * 30}deg` }}
                  >
                    <span>{numeral}</span>
                  </span>
                )
              })}

              <span
                className="clock-hand clock-hand--hour"
                style={{ '--hand-angle': `${hourAngle}deg` }}
                aria-hidden="true"
              />
              <span
                className="clock-hand clock-hand--minute"
                style={{ '--hand-angle': `${minuteAngle}deg` }}
                aria-hidden="true"
              />
              <span
                className="clock-hand clock-hand--second"
                style={{ '--hand-angle': `${secondAngle}deg` }}
                aria-hidden="true"
              />
              <span className="clock-pin" aria-hidden="true" />

              <div className="digital-display" aria-hidden="true">
                <span className="digital-display__date">
                  {WEEKDAYS[weekday]}, {MONTHS[month]} {day}
                </span>
                <span className="digital-display__time">
                  {pad(toTwelveHour(hour))}:{pad(minute)}:{pad(second)}
                  <small>{hour >= 12 ? 'PM' : 'AM'}</small>
                </span>
              </div>
            </div>
          </div>

          <div className="clock-caption" aria-live="off">
            <span className="live-indicator" />
            <span>Live local time</span>
            <span className="caption-divider">·</span>
            <span>{WEEKDAYS[weekday]}</span>
          </div>
        </section>

        <footer className="page-footer">
          <span>Built with a React class component</span>
          <span>Updated every second</span>
        </footer>
      </main>
    )
  }
}

export default CompassClock
