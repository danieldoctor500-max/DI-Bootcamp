import { connect } from 'react-redux'
import { removeTodo, toggleTodo } from '../redux/actions.js'

function TodoList({ todos, toggleTodo, removeTodo }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">✳</span>
        <p>Your list is clear. Add a task to get started.</p>
      </div>
    )
  }

  return (
    <ul className="todo-list" aria-label="Todo list">
      {todos.map((todo) => (
        <li
          className={`todo-row${todo.completed ? ' is-complete' : ''}`}
          key={todo.id}
        >
          <button
            className="toggle-button"
            type="button"
            aria-label={`${todo.completed ? 'Mark as not done' : 'Mark as done'}: ${todo.text}`}
            aria-pressed={todo.completed}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.completed ? '✓' : ''}
          </button>
          <span className="todo-text">{todo.text}</span>
          <button
            className="remove-button"
            type="button"
            aria-label={`Remove ${todo.text}`}
            onClick={() => removeTodo(todo.id)}
          >
            <span aria-hidden="true">×</span>
          </button>
        </li>
      ))}
    </ul>
  )
}

const mapStateToProps = (state) => ({
  todos: state.todos,
})

export default connect(mapStateToProps, { toggleTodo, removeTodo })(TodoList)
