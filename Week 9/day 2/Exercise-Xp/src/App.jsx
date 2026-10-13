import { connect } from 'react-redux'
import TodoForm from './components/TodoForm.jsx'
import TodoList from './components/TodoList.jsx'

function App({ todos }) {
  const completedCount = todos.filter((todo) => todo.completed).length

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
          <div className="date-badge">
            <span className="date-day">
              {new Intl.DateTimeFormat('en', { day: '2-digit' }).format(new Date())}
            </span>
            <span className="date-month">
              {new Intl.DateTimeFormat('en', { month: 'short' }).format(new Date())}
            </span>
          </div>
        </div>

        <TodoForm />
        <TodoList />

        <footer className="list-footer">
          <span>{todos.length - completedCount} left to do</span>
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

const mapStateToProps = (state) => ({
  todos: state.todos,
})

export default connect(mapStateToProps)(App)
