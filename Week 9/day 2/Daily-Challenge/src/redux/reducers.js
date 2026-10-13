import {
  ADD_TASK,
  CLEAR_STORAGE_ERROR,
  DELETE_TASK,
  EDIT_TASK,
  STORAGE_ERROR,
} from './actionTypes.js'
import { isDateKey } from '../utils/dates.js'
import { loadPlannerState } from './storage.js'

const initialState = loadPlannerState()

export function plannerReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK: {
      const { date, task } = action.payload
      if (!isDateKey(date) || !task.title.trim() || !task.time) return state

      return {
        ...state,
        tasksByDate: {
          ...state.tasksByDate,
          [date]: [...(state.tasksByDate[date] ?? []), task],
        },
      }
    }
    case EDIT_TASK: {
      const { date, id, details } = action.payload
      const tasks = state.tasksByDate[date]
      if (
        !isDateKey(date) ||
        !Array.isArray(tasks) ||
        !tasks.some((task) => task.id === id) ||
        !details.title.trim() ||
        !details.time
      ) {
        return state
      }

      return {
        ...state,
        tasksByDate: {
          ...state.tasksByDate,
          [date]: tasks.map((task) =>
            task.id === id ? { ...task, ...details, title: details.title.trim() } : task,
          ),
        },
      }
    }
    case DELETE_TASK: {
      const { date, id } = action.payload
      const tasks = state.tasksByDate[date]
      if (!Array.isArray(tasks) || !tasks.some((task) => task.id === id)) {
        return state
      }

      const remainingTasks = tasks.filter((task) => task.id !== id)
      const tasksByDate = { ...state.tasksByDate }
      if (remainingTasks.length === 0) {
        delete tasksByDate[date]
      } else {
        tasksByDate[date] = remainingTasks
      }
      return { ...state, tasksByDate }
    }
    case STORAGE_ERROR:
      return { ...state, storageError: action.payload.message }
    case CLEAR_STORAGE_ERROR:
      return { ...state, storageError: null }
    default:
      return state
  }
}
