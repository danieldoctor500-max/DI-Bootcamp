import { useState } from 'react'
import { connect } from 'react-redux'
import DayTasks from './components/DayTasks.jsx'
import MonthCalendar from './components/MonthCalendar.jsx'
import { clearStorageError } from './redux/actions.js'
import { formatShortDate, toDateKey } from './utils/dates.js'

function App({ tasksByDate, storageError, clearStorageError }) {
  const [selectedDate, setSelectedDate] = useState(() => toDateKey(new Date()))
  const allTasks = Object.values(tasksByDate).flat()
  const today = toDateKey(new Date())
  const todayTasks = tasksByDate[today] ?? []
  const todayLabel = formatShortDate(today)

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Daymark planner home">
          <span className="brand-mark" aria-hidden="true">D</span>
          daymark
          <span className="brand-divider" />
          <span className="brand-section">PLANNER</span>
        </a>
        <span className="topbar-note">A little intention goes a long way.</span>
      </header>

      <section className="page-heading" aria-labelledby="page-title">
        <div>
          <p className="eyebrow">MAKE SPACE FOR WHAT MATTERS</p>
          <h1 id="page-title">Your days, <span>well spent.</span></h1>
          <p className="intro">
            A little structure. A lot more room to breathe.
          </p>
        </div>
        <div className="overview-card">
          <span className="overview-icon" aria-hidden="true">◷</span>
          <div>
            <span className="overview-label">ON YOUR PLATE TODAY</span>
            <strong>{todayTasks.length} <span>{todayTasks.length === 1 ? 'plan' : 'plans'}</span></strong>
          </div>
          <span className="overview-date">{todayLabel}</span>
        </div>
      </section>

      {storageError && (
        <div className="storage-banner" role="alert">
          <span>{storageError}</span>
          <button
            type="button"
            aria-label="Dismiss message"
            onClick={clearStorageError}
          >
            ×
          </button>
        </div>
      )}

      <div className="planner-layout">
        <MonthCalendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
        <DayTasks date={selectedDate} />
      </div>

      <footer className="page-footer">
        <span>One day at a time.</span>
        <span>{allTasks.length} {allTasks.length === 1 ? 'plan' : 'plans'} in your planner</span>
      </footer>
    </main>
  )
}

const mapStateToProps = (state) => ({
  tasksByDate: state.tasksByDate,
  storageError: state.storageError,
})

export default connect(mapStateToProps, { clearStorageError })(App)
