import {
  ADD_TASK,
  CLEAR_STORAGE_ERROR,
  DELETE_TASK,
  EDIT_TASK,
  STORAGE_ERROR,
} from './actionTypes.js'

export const addTask = (date, details) => ({
  type: ADD_TASK,
  payload: {
    date,
    task: { id: crypto.randomUUID(), ...details },
  },
})

export const editTask = (date, id, details) => ({
  type: EDIT_TASK,
  payload: { date, id, details },
})

export const deleteTask = (date, id) => ({
  type: DELETE_TASK,
  payload: { date, id },
})

export const storageError = (message) => ({
  type: STORAGE_ERROR,
  payload: { message },
})

export const clearStorageError = () => ({ type: CLEAR_STORAGE_ERROR })
