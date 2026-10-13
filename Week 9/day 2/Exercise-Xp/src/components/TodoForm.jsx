import { useState } from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../redux/actions.js'

function TodoForm({ addTodo }) {
  const [text, setText] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedText = text.trim()

    if (!trimmedText) return

    addTodo(trimmedText)
    setText('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="new-todo">Add a task</label>
      <input
        id="new-todo"
        className="todo-input"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="What needs your attention?"
        autoComplete="off"
        maxLength={160}
      />
      <button className="add-button" type="submit" aria-label="Add task">
        <span aria-hidden="true">+</span>
      </button>
    </form>
  )
}

export default connect(null, { addTodo })(TodoForm)
