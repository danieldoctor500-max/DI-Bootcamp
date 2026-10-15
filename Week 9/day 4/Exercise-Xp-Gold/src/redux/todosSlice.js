import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos?_limit=6',
    )

    if (!response.ok) {
      return rejectWithValue(`The todo request failed (${response.status}).`)
    }

    return response.json()
  },
  {
    condition: (_, { getState }) => getState().todos.status !== 'loading',
  },
)

const initialState = {
  items: [],
  status: 'idle',
  error: null,
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.items.unshift(action.payload)
      },
      prepare(text) {
        return {
          payload: {
            id: nanoid(),
            title: text,
            completed: false,
            isLocal: true,
          },
        }
      },
    },
    removeTodo(state, action) {
      state.items = state.items.filter((todo) => todo.id !== action.payload)
    },
    toggleTodo(state, action) {
      const todo = state.items.find((item) => item.id === action.payload)
      if (todo) todo.completed = !todo.completed
    },
    setTodos(state, action) {
      state.items = action.payload
      state.status = 'succeeded'
      state.error = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        const localTodos = state.items.filter((todo) => todo.isLocal)
        state.items = [...localTodos, ...action.payload]
        state.status = 'succeeded'
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed'
        state.error =
          action.payload ?? action.error.message ?? 'Unable to load todos.'
      })
  },
})

export const { addTodo, removeTodo, toggleTodo, setTodos } = todosSlice.actions
export default todosSlice.reducer
