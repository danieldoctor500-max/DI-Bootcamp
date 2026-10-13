import { connect } from 'react-redux'
import { removeTodo, toggleTodo } from '../redux/actions.js'

function TodoCategory({ category, toggleTodo, removeTodo }) {
  const completedCount = category.todos.filter((todo) => todo.completed).length

  return (
    <article className="category-card" data-category={category.id}>
      <header className="category-heading">
        <div className="category-title-wrap">
          <span className="category-icon" aria-hidden="true">{category.name.slice(0, 1)}</span>
          <h2 className="category-title">{category.name}</h2>
        </div>
        <span className="category-count" aria-label={`${category.todos.length} tasks`}>
          {category.todos.length}
        </span>
      </header>

      {category.todos.length === 0 ? (
        <p className="empty-category">Nothing here just yet.</p>
      ) : (
        <ul className="todo-list" aria-label={`${category.name} todos`}>
          {category.todos.map((todo) => (
            <li
              className={`todo-row${todo.completed ? ' is-complete' : ''}`}
              key={todo.id}
            >
              <button
                className="toggle-button"
                type="button"
                aria-label={`${todo.completed ? 'Mark as not done' : 'Mark as done'}: ${todo.text}`}
                aria-pressed={todo.completed}
                onClick={() => toggleTodo(category.id, todo.id)}
              >
                {todo.completed ? '✓' : ''}
              </button>
              <span className="todo-text">{todo.text}</span>
              <button
                className="remove-button"
                type="button"
                aria-label={`Remove ${todo.text} from ${category.name}`}
                onClick={() => removeTodo(category.id, todo.id)}
              >
                <span aria-hidden="true">×</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <footer className="category-footer">
        <span>{category.todos.length - completedCount} left</span>
        <span className="done-count">{completedCount} done</span>
      </footer>
    </article>
  )
}

export default connect(null, { toggleTodo, removeTodo })(TodoCategory)
