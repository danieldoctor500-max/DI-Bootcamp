import { useDispatch } from 'react-redux'
import { deleteTask } from '../redux/plannerSlice.js'

function DeleteTask({ date, taskId, taskTitle }) {
  const dispatch = useDispatch()

  return (
    <button
      className="delete-button"
      type="button"
      aria-label={`Delete ${taskTitle}`}
      onClick={() => dispatch(deleteTask({ date, id: taskId }))}
    >
      Delete
    </button>
  )
}

export default DeleteTask
