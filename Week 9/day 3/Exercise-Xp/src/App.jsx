import { useSelector } from 'react-redux'
import AddTodo from './components/AddTodo.jsx'
import TodoList from './components/TodoList.jsx'

function App() {
  const todos = useSelector((state) => state.todos.items)
  const completedCount = todos.filter((todo) => todo.completed).length
  const remainingCount = todos.length - completedCount

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Daymark home">
          <span className="brand-mark" aria-hidden="true">D</span>
          daymark
        </a>
        <span className="topbar-note">A little progress, every day.</span>
      </header>

      <section className="todo-card" aria-labelledby="page-title">
        <div className="card-heading">
          <div>
            <p className="eyebrow">YOUR PERSONAL SPACE</p>
            <h1 id="page-title">Today&apos;s list<span>.</span></h1>
          </div>
          <div className="date-badge" aria-label={new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(new Date())}>
            <span className="date-day">
              {new Intl.DateTimeFormat('en', { day: '2-digit' }).format(new Date())}
            </span>
            <span className="date-month">
              {new Intl.DateTimeFormat('en', { month: 'short' }).format(new Date())}
            </span>
          </div>
        </div>

        <AddTodo />
        <TodoList />

        <footer className="list-footer">
          <span>{remainingCount} {remainingCount === 1 ? 'task' : 'tasks'} left to do</span>
          <span className="completion-note">
            {completedCount > 0
              ? `${completedCount} ${completedCount === 1 ? 'task' : 'tasks'} done — nice work`
              : 'One thing at a time'}
          </span>
        </footer>
      </section>

      <p className="page-note">Make room for what matters.</p>
    </main>
  )
}

export default App
