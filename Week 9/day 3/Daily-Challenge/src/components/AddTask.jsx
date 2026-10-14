import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../redux/plannerSlice.js'

function AddTask({ date }) {
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const dispatch = useDispatch()

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    dispatch(addTask({ date, title: trimmedTitle, notes: notes.trim() }))
    setTitle('')
    setNotes('')
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="task-title">Task title</label>
      <input
        id="task-title"
        className="task-title-input"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="What do you need to do?"
        maxLength={120}
        required
      />
      <label className="sr-only" htmlFor="task-notes">Task notes (optional)</label>
      <input
        id="task-notes"
        className="task-notes-input"
        type="text"
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        placeholder="Add a note (optional)"
        maxLength={240}
      />
      <button className="primary-button" type="submit">
        <span aria-hidden="true">+</span> Add task
      </button>
    </form>
  )
}

export default AddTask
