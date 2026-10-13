import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from './actionTypes.js'

export const addTodo = (text, categoryId) => ({
  type: ADD_TODO,
  payload: {
    id: crypto.randomUUID(),
    text,
    categoryId,
  },
})

export const toggleTodo = (categoryId, todoId) => ({
  type: TOGGLE_TODO,
  payload: { categoryId, todoId },
})

export const removeTodo = (categoryId, todoId) => ({
  type: REMOVE_TODO,
  payload: { categoryId, todoId },
})
