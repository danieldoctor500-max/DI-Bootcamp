import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  tasksByDate: {},
}

const plannerSlice = createSlice({
  name: 'planner',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        const { date, task } = action.payload
        state.tasksByDate[date] ??= []
        state.tasksByDate[date].push(task)
      },
      prepare({ date, title, notes }) {
        return {
          payload: {
            date,
            task: {
              id: nanoid(),
              title,
              notes,
            },
          },
        }
      },
    },
    editTask(state, action) {
      const { date, id, title, notes } = action.payload
      const task = state.tasksByDate[date]?.find((item) => item.id === id)
      if (task) {
        task.title = title
        task.notes = notes
      }
    },
    deleteTask(state, action) {
      const { date, id } = action.payload
      const tasks = state.tasksByDate[date]
      if (!tasks) return

      state.tasksByDate[date] = tasks.filter((task) => task.id !== id)
      if (state.tasksByDate[date].length === 0) {
        delete state.tasksByDate[date]
      }
    },
  },
})

export const { addTask, editTask, deleteTask } = plannerSlice.actions
export default plannerSlice.reducer
