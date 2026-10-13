import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from './actionTypes.js'

const initialState = {
  todos: [],
}

export function todosReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          { ...action.payload, completed: false },
        ],
      }
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      }
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      }
    default:
      return state
  }
}
