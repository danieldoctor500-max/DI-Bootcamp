import { useDispatch, useSelector } from 'react-redux'
import { removeTodo, toggleTodo } from '../redux/todosSlice.js'

function TodoList() {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todos.items)
  const status = useSelector((state) => state.todos.status)

  if (todos.length === 0 && status === 'succeeded') {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">✓</span>
        <p>Your list is clear. Add a todo to get started.</p>
      </div>
    )
  }

  return (
    <ul className="todo-list" aria-label="Todos">
      {todos.map((todo) => (
        <li className={`todo-row${todo.completed ? ' is-complete' : ''}`} key={todo.id}>
          <button
            className="toggle-button"
            type="button"
            aria-label={`${todo.completed ? 'Mark incomplete' : 'Mark complete'}: ${todo.title}`}
            aria-pressed={todo.completed}
            onClick={() => dispatch(toggleTodo(todo.id))}
          >
            {todo.completed ? '✓' : ''}
          </button>
          <span className="todo-text">{todo.title}</span>
          <button
            className="remove-button"
            type="button"
            aria-label={`Remove ${todo.title}`}
            onClick={() => dispatch(removeTodo(todo.id))}
          >
            ×
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TodoList
