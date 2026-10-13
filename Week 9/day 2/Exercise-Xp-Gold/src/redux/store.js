import { legacy_createStore as createStore } from 'redux'
import { todosReducer } from './reducers.js'

export const store = createStore(todosReducer)
