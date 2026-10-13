import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import { ADD_TASK, DELETE_TASK, EDIT_TASK } from './actionTypes.js'
import { storageError } from './actions.js'
import { plannerReducer } from './reducers.js'
import { savePlannerState } from './storage.js'

const persistPlanner = ({ getState, dispatch }) => (next) => (action) => {
  const result = next(action)
  if ([ADD_TASK, EDIT_TASK, DELETE_TASK].includes(action.type)) {
    try {
      savePlannerState(getState().tasksByDate)
    } catch (error) {
      dispatch(
        storageError(
          error instanceof Error
            ? `Your change was made, but could not be saved: ${error.message}`
            : 'Your change was made, but could not be saved.',
        ),
      )
    }
  }
  return result
}

export const store = createStore(
  plannerReducer,
  applyMiddleware(persistPlanner),
)
