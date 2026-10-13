import { connect } from 'react-redux'
import TodoForm from './components/TodoForm.jsx'
import TodoCategory from './components/TodoCategory.jsx'

function App({ categories }) {
  const todos = categories.flatMap((category) => category.todos)
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

      <section className="page-heading" aria-labelledby="page-title">
        <div>
          <p className="eyebrow">YOUR PERSONAL SPACE</p>
          <h1 id="page-title">Room for it all<span>.</span></h1>
          <p className="intro">
            Keep each part of your day in its own place.
          </p>
        </div>
        <div className="progress-badge">
          <span className="progress-value">{completedCount}<span>/{todos.length}</span></span>
          <span className="progress-label">completed</span>
        </div>
      </section>

      <TodoForm categories={categories} />

      <section className="category-grid" aria-label="Todos by category">
        {categories.map((category) => (
          <TodoCategory category={category} key={category.id} />
        ))}
      </section>

      <p className="page-note">Make room for what matters.</p>
    </main>
  )
}

const mapStateToProps = (state) => ({
  categories: state.categories,
})

export default connect(mapStateToProps)(App)
