import { useState } from 'react'
import { useSelector } from 'react-redux'
import AddTask from './components/AddTask.jsx'
import DatePicker from './components/DatePicker.jsx'
import TaskList from './components/TaskList.jsx'

function getLocalDateString(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function App() {
  const [selectedDate, setSelectedDate] = useState(() => getLocalDateString(new Date()))
  const tasks = useSelector((state) => state.planner.tasksByDate[selectedDate] ?? [])
  const prettyDate = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${selectedDate}T00:00:00Z`))

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Daymark home">
          <span className="brand-mark" aria-hidden="true">D</span>
          daymark
        </a>
        <span className="topbar-note">A little progress, every day.</span>
      </header>

      <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />

      <section className="planner-card" aria-labelledby="tasks-heading">
        <div className="planner-heading">
          <div>
            <p className="eyebrow">YOUR PLAN</p>
            <h2 id="tasks-heading">{prettyDate}</h2>
          </div>
          <span className="task-count">
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
          </span>
        </div>

        <AddTask date={selectedDate} />
        <TaskList date={selectedDate} />
      </section>

      <p className="page-note">One thing at a time.</p>
    </main>
  )
}

export default App
