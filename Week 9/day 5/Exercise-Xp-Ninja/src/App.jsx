import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addTodo,
  clearCompleted,
  removeTodo,
  setVisibilityFilter,
  toggleTodo,
} from './redux/todosSlice.js'
import {
  selectCompletedTodosCount,
  selectFilteredTodosCount,
  selectRemainingTodosCount,
  selectTodos,
  selectVisibilityFilter,
} from './redux/selectors.js'

const filters = ['All', 'Active', 'Completed']

function TodoList() {
  const [newTodo, setNewTodo] = useState('')
  const dispatch = useDispatch()
  const todos = useSelector(selectTodos)
  const visibilityFilter = useSelector(selectVisibilityFilter)
  const filteredCount = useSelector(selectFilteredTodosCount)
  const remainingCount = useSelector(selectRemainingTodosCount)
  const completedCount = useSelector(selectCompletedTodosCount)

  const handleToggle = useCallback((todoId) => {
    dispatch(toggleTodo(todoId))
  }, [dispatch])

  const handleDelete = useCallback((todoId) => {
    dispatch(removeTodo(todoId))
  }, [dispatch])

  function handleSubmit(event) {
    event.preventDefault()
    const text = newTodo.trim()
    if (!text) return

    dispatch(addTodo(text))
    setNewTodo('')
  }

  return (
    <section className="todo-card" aria-labelledby="todo-title">
      <div className="card-heading">
        <div>
          <p className="eyebrow">A CLEARER KIND OF TO-DO</p>
          <h2 id="todo-title">Today, gently.</h2>
        </div>
        <span className="heading-sparkle" aria-hidden="true">✳</span>
      </div>

      <form className="add-form" onSubmit={handleSubmit}>
        <label className="visually-hidden" htmlFor="new-todo">Add a task</label>
        <input
          id="new-todo"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
          placeholder="What would you like to do?"
          maxLength={120}
        />
        <button type="submit" disabled={!newTodo.trim()}>Add task <span aria-hidden="true">+</span></button>
      </form>

      <div className="list-toolbar">
        <div className="filter-tabs" role="group" aria-label="Filter tasks">
          {filters.map((filter) => (
            <button
              className={`filter-tab${visibilityFilter === filter ? ' active' : ''}`}
              type="button"
              key={filter}
              aria-pressed={visibilityFilter === filter}
              onClick={() => dispatch(setVisibilityFilter(filter))}
            >
              {filter}
            </button>
          ))}
        </div>
        <span className="task-count">
          {filteredCount} {filteredCount === 1 ? 'task' : 'tasks'}
        </span>
      </div>

      {todos.length > 0 ? (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li className={`todo-item${todo.completed ? ' completed' : ''}`} key={todo.id}>
              <button
                className="todo-check"
                type="button"
                role="checkbox"
                aria-checked={todo.completed}
                aria-label={`${todo.completed ? 'Mark as active' : 'Complete'}: ${todo.text}`}
                onClick={() => handleToggle(todo.id)}
              >
                {todo.completed && <span aria-hidden="true">✓</span>}
              </button>
              <span className="todo-text">{todo.text}</span>
              <button
                className="delete-button"
                type="button"
                aria-label={`Delete ${todo.text}`}
                onClick={() => handleDelete(todo.id)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <span aria-hidden="true">{visibilityFilter === 'Completed' ? '○' : '✳'}</span>
          <p>
            {visibilityFilter === 'Completed'
              ? 'Nothing checked off just yet.'
              : visibilityFilter === 'Active'
                ? 'You’re all caught up. Enjoy the breathing room.'
                : 'A fresh page. Add a task whenever you’re ready.'}
          </p>
        </div>
      )}

      <footer className="list-footer">
        <span><strong>{remainingCount}</strong> left to do</span>
        <button
          className="clear-button"
          type="button"
          disabled={completedCount === 0}
          onClick={() => dispatch(clearCompleted())}
        >
          Clear completed
        </button>
      </footer>
    </section>
  )
}

function App() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Small Steps home">
          <span className="brand-mark" aria-hidden="true">s</span>
          small steps
        </a>
        <span className="topbar-note">A LITTLE SPACE TO GET THINGS DONE</span>
      </header>

      <section className="intro">
        <p className="eyebrow">MAKE ROOM FOR WHAT MATTERS</p>
        <h1>One thing<br /><em>at a time.</em></h1>
        <p>Keep your day in view, without making it feel too full.</p>
      </section>

      <TodoList />
      <p className="page-note">Progress is progress, however small.</p>
    </main>
  )
}

export default App
