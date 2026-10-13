import { connect } from 'react-redux'
import { useState } from 'react'
import { addTask, deleteTask, editTask } from '../redux/actions.js'
import { formatLongDate } from '../utils/dates.js'
import TaskForm from './TaskForm.jsx'

function DayTasks({ date, tasks, addTask, editTask, deleteTask }) {
  const [editingTask, setEditingTask] = useState(undefined)
  const sortedTasks = [...tasks].sort((first, second) =>
    first.time.localeCompare(second.time),
  )

  const openNewTask = () => setEditingTask(null)
  const closeForm = () => setEditingTask(undefined)

  const saveTask = (details) => {
    if (editingTask) {
      editTask(date, editingTask.id, details)
    } else {
      addTask(date, details)
    }
    closeForm()
  }

  return (
    <section className="tasks-panel" aria-labelledby="tasks-title">
      <header className="tasks-heading">
        <div>
          <p className="eyebrow">YOUR DAY AT A GLANCE</p>
          <h2 id="tasks-title">{formatLongDate(date)}</h2>
          <p className="task-summary">
            {tasks.length === 0
              ? 'A fresh page is waiting.'
              : `${tasks.length} ${tasks.length === 1 ? 'plan' : 'plans'} on the list`}
          </p>
        </div>
        <button className="add-task-button" type="button" onClick={openNewTask}>
          <span aria-hidden="true">+</span>
          <span>Add task</span>
        </button>
      </header>

      {sortedTasks.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">✳</span>
          <h3>Nothing planned yet</h3>
          <p>Add a task and give your day some shape.</p>
          <button className="empty-add-button" type="button" onClick={openNewTask}>
            Plan something
          </button>
        </div>
      ) : (
        <ol className="task-list">
          {sortedTasks.map((task, index) => (
            <li className="task-item" key={task.id}>
              <div className="task-time">
                <span>{task.time}</span>
                {index < sortedTasks.length - 1 && <span className="timeline-line" />}
              </div>
              <article className="task-card">
                <span className="task-marker" aria-hidden="true" />
                <div className="task-details">
                  <h3>{task.title}</h3>
                  {task.notes && <p>{task.notes}</p>}
                </div>
                <div className="task-actions">
                  <button
                    className="icon-button"
                    type="button"
                    aria-label={`Edit ${task.title}`}
                    onClick={() => setEditingTask(task)}
                  >
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M13.6 3.4a1.8 1.8 0 0 1 2.5 2.5L8 14l-3.4.9.9-3.4 8.1-8.1Z" />
                      <path d="m12.3 4.7 3 3" />
                    </svg>
                  </button>
                  <button
                    className="icon-button delete-button"
                    type="button"
                    aria-label={`Delete ${task.title}`}
                    onClick={() => deleteTask(date, task.id)}
                  >
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M4.5 6h11M8 6V4.5h4V6m2.5 0-.7 9h-7l-.8-9M8.5 8.5v4m3-4v4" />
                    </svg>
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ol>
      )}

      {editingTask !== undefined && (
        <TaskForm
          date={date}
          task={editingTask}
          onSave={saveTask}
          onClose={closeForm}
        />
      )}
    </section>
  )
}

const mapStateToProps = (state, ownProps) => ({
  tasks: state.tasksByDate[ownProps.date] ?? [],
})

export default connect(mapStateToProps, { addTask, editTask, deleteTask })(DayTasks)
