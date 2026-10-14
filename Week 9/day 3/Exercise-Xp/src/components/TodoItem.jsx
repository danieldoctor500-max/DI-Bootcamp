import { useDispatch } from 'react-redux'
import { removeTodo, toggleTodo } from '../redux/todosSlice.js'

function TodoItem({ todo }) {
  const dispatch = useDispatch()

  return (
    <li className={`todo-row${todo.completed ? ' is-complete' : ''}`}>
      <button
        className="toggle-button"
        type="button"
        aria-label={`${todo.completed ? 'Mark as not done' : 'Mark as done'}: ${todo.text}`}
        aria-pressed={todo.completed}
        onClick={() => dispatch(toggleTodo(todo.id))}
      >
        {todo.completed ? '✓' : ''}
      </button>
      <span className="todo-text">{todo.text}</span>
      <button
        className="remove-button"
        type="button"
        aria-label={`Remove ${todo.text}`}
        onClick={() => dispatch(removeTodo(todo.id))}
      >
        <span aria-hidden="true">×</span>
      </button>
    </li>
  )
}

export default TodoItem
