import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editTask } from '../redux/plannerSlice.js'

function EditTask({ date, task, onCancel }) {
  const [title, setTitle] = useState(task.title)
  const [notes, setNotes] = useState(task.notes)
  const dispatch = useDispatch()

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    dispatch(editTask({
      date,
      id: task.id,
      title: trimmedTitle,
      notes: notes.trim(),
    }))
    onCancel()
  }

  return (
    <form className="edit-task-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor={`edit-title-${task.id}`}>Edit task title</label>
      <input
        id={`edit-title-${task.id}`}
        className="task-title-input"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        maxLength={120}
        required
        autoFocus
      />
      <label className="sr-only" htmlFor={`edit-notes-${task.id}`}>Edit task notes</label>
      <input
        id={`edit-notes-${task.id}`}
        className="task-notes-input"
        type="text"
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        placeholder="Add a note (optional)"
        maxLength={240}
      />
      <div className="edit-actions">
        <button className="primary-button compact-button" type="submit">Save</button>
        <button className="cancel-button" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}

export default EditTask
