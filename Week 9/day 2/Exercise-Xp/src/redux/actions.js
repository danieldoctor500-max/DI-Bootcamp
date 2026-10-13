import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from './actionTypes.js'

export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: {
    id: crypto.randomUUID(),
    text,
  },
})

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: { id },
})

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: { id },
})
