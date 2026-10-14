import { useState } from 'react'
import { useSelector } from 'react-redux'
import DeleteTask from './DeleteTask.jsx'
import EditTask from './EditTask.jsx'

function TaskList({ date }) {
  const tasks = useSelector((state) => state.planner.tasksByDate[date] ?? [])
  const [editingTaskId, setEditingTaskId] = useState(null)

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">✳</span>
        <p>Your day is still open. Add a task to make a plan.</p>
      </div>
    )
  }

  return (
    <ul className="task-list" aria-label="Tasks for selected date">
      {tasks.map((task, index) => (
        <li className="task-row" key={task.id}>
          <span className="task-number">{String(index + 1).padStart(2, '0')}</span>
          {editingTaskId === task.id ? (
            <EditTask
              date={date}
              task={task}
              onCancel={() => setEditingTaskId(null)}
            />
          ) : (
            <>
              <div className="task-content">
                <span className="task-title">{task.title}</span>
                {task.notes && <span className="task-notes">{task.notes}</span>}
              </div>
              <div className="task-actions">
                <button
                  className="edit-button"
                  type="button"
                  onClick={() => setEditingTaskId(task.id)}
                  aria-label={`Edit ${task.title}`}
                >
                  Edit
                </button>
                <DeleteTask date={date} taskId={task.id} taskTitle={task.title} />
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  )
}

export default TaskList
