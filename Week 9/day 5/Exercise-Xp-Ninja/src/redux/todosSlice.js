import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  items: [
    { id: 'todo-1', text: 'Water the windowsill plants', completed: true },
    { id: 'todo-2', text: 'Send the project notes', completed: false },
    { id: 'todo-3', text: 'Take a proper lunch break', completed: false },
    { id: 'todo-4', text: 'Pick up a few groceries', completed: false },
  ],
  visibilityFilter: 'All',
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.items.push(action.payload)
      },
      prepare(text) {
        return { payload: { id: nanoid(), text, completed: false } }
      },
    },
    toggleTodo(state, action) {
      const todo = state.items.find((item) => item.id === action.payload)
      if (todo) todo.completed = !todo.completed
    },
    removeTodo(state, action) {
      state.items = state.items.filter((todo) => todo.id !== action.payload)
    },
    setVisibilityFilter(state, action) {
      state.visibilityFilter = action.payload
    },
    clearCompleted(state) {
      state.items = state.items.filter((todo) => !todo.completed)
    },
  },
})

export const {
  addTodo,
  toggleTodo,
  removeTodo,
  setVisibilityFilter,
  clearCompleted,
} = todosSlice.actions

export default todosSlice.reducer
