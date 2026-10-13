import { useEffect, useId, useState } from 'react'

function TaskForm({ date, task, onSave, onClose }) {
  const titleId = useId()
  const timeId = useId()
  const notesId = useId()
  const [title, setTitle] = useState(task?.title ?? '')
  const [time, setTime] = useState(task?.time ?? '09:00')
  const [notes, setNotes] = useState(task?.notes ?? '')
  const [error, setError] = useState('')

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      setError('Add a short title for this task.')
      return
    }
    if (!time) {
      setError('Choose a time for this task.')
      return
    }
    onSave({ title: trimmedTitle, time, notes: notes.trim() })
  }

  return (
    <div
      className="dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        className="task-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <header className="dialog-heading">
          <div>
            <p className="eyebrow">{task ? 'MAKE A CHANGE' : 'PLAN YOUR DAY'}</p>
            <h2 id="dialog-title">{task ? 'Edit task' : 'Add a task'}</h2>
            <p className="dialog-date">{new Intl.DateTimeFormat('en', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            }).format(new Date(`${date}T12:00:00`))}</p>
          </div>
          <button
            className="dialog-close"
            type="button"
            aria-label="Close task form"
            onClick={onClose}
          >
            ×
          </button>
        </header>

        {error && <p className="form-message form-message-error" role="alert">{error}</p>}

        <form className="task-edit-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor={titleId}>Task title</label>
            <input
              id={titleId}
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="What would you like to do?"
              maxLength={100}
              autoFocus
              required
            />
          </div>
          <div className="field">
            <label htmlFor={timeId}>Time</label>
            <input
              id={timeId}
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor={notesId}>Notes <span>(optional)</span></label>
            <textarea
              id={notesId}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Add a few details..."
              rows={3}
              maxLength={500}
            />
          </div>
          <div className="dialog-actions">
            <button className="cancel-button" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="save-button" type="submit">
              {task ? 'Save changes' : 'Add to planner'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default TaskForm
