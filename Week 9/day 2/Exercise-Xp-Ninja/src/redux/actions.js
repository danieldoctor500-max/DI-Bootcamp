import {
  ADD_TODO,
  AUTH_ERROR_CLEARED,
  AUTH_FAILED,
  AUTH_LOGGED_OUT,
  AUTH_REQUEST_STARTED,
  AUTH_SUCCEEDED,
  REMOVE_TODO,
  TOGGLE_TODO,
} from './actionTypes.js'

export const authRequestStarted = () => ({ type: AUTH_REQUEST_STARTED })

export const authSucceeded = ({ user, token, categories }) => ({
  type: AUTH_SUCCEEDED,
  payload: { user, token, categories },
})

export const authFailed = (message) => ({
  type: AUTH_FAILED,
  payload: { message },
})

export const authLoggedOut = () => ({ type: AUTH_LOGGED_OUT })

export const authErrorCleared = () => ({ type: AUTH_ERROR_CLEARED })

export const addTodo = (text, categoryId) => ({
  type: ADD_TODO,
  payload: { id: crypto.randomUUID(), text, categoryId },
})

export const toggleTodo = (categoryId, todoId) => ({
  type: TOGGLE_TODO,
  payload: { categoryId, todoId },
})

export const removeTodo = (categoryId, todoId) => ({
  type: REMOVE_TODO,
  payload: { categoryId, todoId },
})
