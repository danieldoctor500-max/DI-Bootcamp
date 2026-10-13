import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from './actionTypes.js'

const initialState = {
  categories: [
    { id: 'personal', name: 'Personal', todos: [] },
    { id: 'work', name: 'Work', todos: [] },
    { id: 'learning', name: 'Learning', todos: [] },
  ],
}

export function todosReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const categoryExists = state.categories.some(
        (category) => category.id === action.payload.categoryId,
      )
      if (!categoryExists) return state

      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.payload.categoryId
            ? {
                ...category,
                todos: [
                  ...category.todos,
                  { ...action.payload, completed: false },
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
