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
import { getEmptyCategories } from '../services/authService.js'

const initialAuthState = {
  status: 'anonymous',
  user: null,
  token: null,
  error: null,
}

export function authReducer(state = initialAuthState, action) {
  switch (action.type) {
    case AUTH_REQUEST_STARTED:
      return { ...state, error: null }
    case AUTH_SUCCEEDED:
      return {
        status: 'authenticated',
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      }
    case AUTH_FAILED:
      return { ...state, error: action.payload.message }
    case AUTH_LOGGED_OUT:
      return initialAuthState
    case AUTH_ERROR_CLEARED:
      return { ...state, error: null }
    default:
      return state
  }
}

const initialTodoState = {
  categories: getEmptyCategories(),
}

export function todosReducer(state = initialTodoState, action) {
  switch (action.type) {
    case AUTH_SUCCEEDED:
      return { categories: action.payload.categories }
    case AUTH_LOGGED_OUT:
      return { categories: getEmptyCategories() }
    case ADD_TODO: {
      const categoryExists = state.categories.some(
        (category) => category.id === action.payload.categoryId,
      )
      if (!categoryExists || !action.payload.text.trim()) return state

      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.payload.categoryId
            ? {
                ...category,
                todos: [
                  ...category.todos,
                  {
                    id: action.payload.id,
                    text: action.payload.text.trim(),
                    completed: false,
                  },
                ],
              }
            : category,
        ),
      }
    }
    case TOGGLE_TODO: {
      const category = state.categories.find(
        (item) => item.id === action.payload.categoryId,
      )
      if (!category?.todos.some((todo) => todo.id === action.payload.todoId)) {
        return state
      }

      return {
        ...state,
        categories: state.categories.map((item) =>
          item.id === action.payload.categoryId
            ? {
                ...item,
                todos: item.todos.map((todo) =>
                  todo.id === action.payload.todoId
                    ? { ...todo, completed: !todo.completed }
                    : todo,
                ),
              }
            : item,
        ),
      }
    }
    case REMOVE_TODO: {
      const category = state.categories.find(
        (item) => item.id === action.payload.categoryId,
      )
      if (!category?.todos.some((todo) => todo.id === action.payload.todoId)) {
        return state
      }

      return {
        ...state,
        categories: state.categories.map((item) =>
          item.id === action.payload.categoryId
            ? {
                ...item,
                todos: item.todos.filter(
                  (todo) => todo.id !== action.payload.todoId,
                ),
              }
            : item,
        ),
      }
    }
    default:
      return state
  }
}
