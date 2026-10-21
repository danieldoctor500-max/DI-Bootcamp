import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './booksSlice'

export const store = configureStore({
  reducer: { books: booksReducer },
})

store.subscribe(() => {
  try {
    const { books, categories } = store.getState().books
    localStorage.setItem('reading-room-library', JSON.stringify({ books, categories }))
  } catch {
    // The app remains usable for the current session if storage is unavailable.
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch