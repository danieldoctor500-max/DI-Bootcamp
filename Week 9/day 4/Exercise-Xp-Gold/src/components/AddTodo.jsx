import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../redux/todosSlice.js'

function AddTodo() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  function handleSubmit(event) {
    event.preventDefault()
    const title = text.trim()
    if (!title) return

    dispatch(addTodo(title))
    setText('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="todo-input">New todo</label>
      <input
        id="todo-input"
        className="todo-input"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="What needs doing?"
        maxLength={160}
        required
      />
      <button className="add-button" type="submit" aria-label="Add todo">
        +
      </button>
    </form>
  )
}

export default AddTodo
