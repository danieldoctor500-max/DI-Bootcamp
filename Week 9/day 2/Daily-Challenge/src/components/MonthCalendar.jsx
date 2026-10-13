import { connect } from 'react-redux'
import { fromDateKey, toDateKey } from '../utils/dates.js'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function MonthCalendar({ selectedDate, onSelectDate, tasksByDate }) {
  const selected = fromDateKey(selectedDate)
  const monthStart = new Date(selected.getFullYear(), selected.getMonth(), 1)
  const gridStart = new Date(
    monthStart.getFullYear(),
    monthStart.getMonth(),
    1 - monthStart.getDay(),
  )
  const today = toDateKey(new Date())
  const days = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart)
    date.setDate(gridStart.getDate() + index)
    return date
  })

  const changeMonth = (amount) => {
    const targetMonth = new Date(
      selected.getFullYear(),
      selected.getMonth() + amount,
      1,
    )
    const lastDay = new Date(
      targetMonth.getFullYear(),
      targetMonth.getMonth() + 1,
      0,
    ).getDate()
    targetMonth.setDate(Math.min(selected.getDate(), lastDay))
    onSelectDate(toDateKey(targetMonth))
  }

  return (
    <section className="calendar-card" aria-label="Calendar">
      <header className="calendar-heading">
        <div>
          <p className="eyebrow">YOUR SCHEDULE</p>
          <h2>
            {new Intl.DateTimeFormat('en', {
              month: 'long',
              year: 'numeric',
            }).format(selected)}
          </h2>
        </div>
        <div className="month-controls">
          <button
            className="month-button"
            type="button"
            aria-label="Previous month"
            onClick={() => changeMonth(-1)}
          >
            ‹
          </button>
          <button
            className="month-button"
            type="button"
            aria-label="Next month"
            onClick={() => changeMonth(1)}
          >
            ›
          </button>
        </div>
      </header>

      <div className="calendar-grid" role="grid" aria-label="Select a day">
        {WEEKDAYS.map((weekday) => (
          <span className="weekday" role="columnheader" key={weekday}>
            {weekday}
          </span>
        ))}
        {days.map((date) => {
          const dateKey = toDateKey(date)
          const hasTasks = (tasksByDate[dateKey]?.length ?? 0) > 0
          const isSelected = dateKey === selectedDate
          const isCurrentMonth = date.getMonth() === selected.getMonth()
          const className = [
            'calendar-day',
            isSelected ? 'is-selected' : '',
            dateKey === today ? 'is-today' : '',
            !isCurrentMonth ? 'is-outside-month' : '',
          ].filter(Boolean).join(' ')

          return (
            <button
              className={className}
              type="button"
              role="gridcell"
              aria-label={`${new Intl.DateTimeFormat('en', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              }).format(date)}${hasTasks ? `, ${tasksByDate[dateKey].length} tasks` : ''}`}
              aria-pressed={isSelected}
              onClick={() => onSelectDate(dateKey)}
              key={dateKey}
            >
              <span>{date.getDate()}</span>
              {hasTasks && <span className="day-dot" aria-hidden="true" />}
            </button>
          )
        })}
      </div>

      <footer className="calendar-footer">
        <span className="legend-dot" aria-hidden="true" />
        <span>Days with plans</span>
        <button
          className="today-button"
          type="button"
          onClick={() => onSelectDate(today)}
        >
          Today
        </button>
      </footer>
    </section>
  )
}

const mapStateToProps = (state) => ({
  tasksByDate: state.tasksByDate,
})

export default connect(mapStateToProps)(MonthCalendar)
