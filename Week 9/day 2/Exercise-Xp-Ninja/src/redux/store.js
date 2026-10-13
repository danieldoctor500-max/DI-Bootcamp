import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux'
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from './actionTypes.js'
import { authFailed } from './actions.js'
import { authReducer, todosReducer } from './reducers.js'
import { restoreSession, saveUserTodos } from '../services/authService.js'

const rootReducer = combineReducers({
  auth: authReducer,
  todos: todosReducer,
})

function persistTodosMiddleware({ getState, dispatch }) {
  return (next) => (action) => {
    const result = next(action)
    if ([ADD_TODO, TOGGLE_TODO, REMOVE_TODO].includes(action.type)) {
      const { auth, todos } = getState()
      if (auth.status === 'authenticated') {
        try {
          saveUserTodos(auth.user.id, todos.categories)
        } catch (error) {
          dispatch(authFailed(
            error instanceof Error
              ? `Your task changed, but could not be saved: ${error.message}`
              : 'Your task changed, but could not be saved.',
          ))
        }
      }
    }
    return result
  }
}

let preloadedState
try {
  const session = restoreSession()
  if (session) {
    preloadedState = {
      auth: {
        status: 'authenticated',
        user: session.user,
        token: session.token,
        error: null,
      },
      todos: { categories: session.categories },
    }
  }
} catch (error) {
  preloadedState = {
    auth: {
      status: 'anonymous',
      user: null,
      token: null,
      error: error instanceof Error
        ? error.message
        : 'Could not restore your saved sign-in.',
    },
    todos: undefined,
  }
}

export const store = createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(persistTodosMiddleware),
)
