import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  categories: [
    { id: 'cat-focus', name: 'Deep work', color: 'sage' },
    { id: 'cat-life', name: 'Life admin', color: 'clay' },
    { id: 'cat-wellbeing', name: 'Wellbeing', color: 'blue' },
  ],
  tasks: [
    { id: 'task-1', title: 'Draft the project outline', categoryId: 'cat-focus', completed: true },
    { id: 'task-2', title: 'Review the design notes', categoryId: 'cat-focus', completed: false },
    { id: 'task-3', title: 'Reply to two important emails', categoryId: 'cat-life', completed: false },
    { id: 'task-4', title: 'Take a walk outside', categoryId: 'cat-wellbeing', completed: false },
  ],
}

const productivitySlice = createSlice({
  name: 'productivity',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.tasks.push(action.payload)
      },
      prepare({ title, categoryId }) {
        return {
          payload: {
            id: nanoid(),
            title,
            categoryId,
            completed: false,
          },
        }
      },
    },
    editTask(state, action) {
      const task = state.tasks.find(({ id }) => id === action.payload.id)
      if (task) {
        task.title = action.payload.title
        task.categoryId = action.payload.categoryId
      }
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter(({ id }) => id !== action.payload)
    },
    updateTaskProgress(state, action) {
      const task = state.tasks.find(({ id }) => id === action.payload)
      if (task) task.completed = !task.completed
    },
    addCategory: {
      reducer(state, action) {
        state.categories.push(action.payload)
      },
      prepare(name) {
        return {
          payload: {
            id: nanoid(),
            name,
            color: 'lavender',
          },
        }
      },
    },
    editCategory(state, action) {
      const category = state.categories.find(({ id }) => id === action.payload.id)
      if (category) category.name = action.payload.name
    },
    deleteCategory(state, action) {
      const categoryStillUsed = state.tasks.some((task) => task.categoryId === action.payload)
      if (categoryStillUsed) return

      state.categories = state.categories.filter(({ id }) => id !== action.payload)
    },
  },
})

export const {
  addTask,
  editTask,
  deleteTask,
  updateTaskProgress,
  addCategory,
  editCategory,
  deleteCategory,
} = productivitySlice.actions

export default productivitySlice.reducer
