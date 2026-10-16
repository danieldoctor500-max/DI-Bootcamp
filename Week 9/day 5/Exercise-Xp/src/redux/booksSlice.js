import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: 1, title: 'The Haunting of Hill House', author: 'Shirley Jackson', genre: 'Horror' },
  { id: 2, title: 'Frankenstein', author: 'Mary Shelley', genre: 'Horror' },
  { id: 3, title: 'Mexican Gothic', author: 'Silvia Moreno-Garcia', genre: 'Horror' },
  { id: 4, title: 'The Hobbit', author: 'J. R. R. Tolkien', genre: 'Fantasy' },
  { id: 5, title: 'A Wizard of Earthsea', author: 'Ursula K. Le Guin', genre: 'Fantasy' },
  { id: 6, title: 'The Name of the Wind', author: 'Patrick Rothfuss', genre: 'Fantasy' },
  { id: 7, title: 'Dune', author: 'Frank Herbert', genre: 'Science Fiction' },
  { id: 8, title: 'Kindred', author: 'Octavia E. Butler', genre: 'Science Fiction' },
  { id: 9, title: 'Project Hail Mary', author: 'Andy Weir', genre: 'Science Fiction' },
]

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook(state, action) {
      const id = Math.max(0, ...state.map((book) => book.id)) + 1
      state.push({ ...action.payload, id })
    },
    removeBook(state, action) {
      return state.filter((book) => book.id !== action.payload)
    },
  },
})

export const { addBook, removeBook } = booksSlice.actions
export default booksSlice.reducer
