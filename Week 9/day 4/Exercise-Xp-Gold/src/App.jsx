import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddTodo from './components/AddTodo.jsx'
import TodoList from './components/TodoList.jsx'
import { fetchTodos } from './redux/todosSlice.js'

function App() {
  const dispatch = useDispatch()
  const { items: todos, status, error } = useSelector((state) => state.todos)
  const completedCount = todos.filter((todo) => todo.completed).length
  const remainingCount = todos.length - completedCount

  useEffect(() => {
    if (status === 'idle') dispatch(fetchTodos())
  }, [dispatch, status])

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
          <div
            className="date-badge"
            aria-label={new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(new Date())}
          >
            <span className="date-day">
              {new Intl.DateTimeFormat('en', { day: '2-digit' }).format(new Date())}
            </span>
            <span className="date-month">
              {new Intl.DateTimeFormat('en', { month: 'short' }).format(new Date())}
            </span>
          </div>
        </div>

        <AddTodo />

        {status === 'loading' && todos.length === 0 && (
          <p className="loading-state" role="status">Fetching your todos…</p>
        )}
        {status === 'failed' && (
          <div className="error-state" role="alert">
            <p>{error}</p>
            <button
              className="retry-button"
              type="button"
              onClick={() => dispatch(fetchTodos())}
            >
              Try again
            </button>
          </div>
        )}
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
