import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { BookItem, isBookRecord, type Book, type NewBook } from '../model/Book'

export type BookFilter = 'all' | 'unread' | 'read'
export type BookSort = 'title' | 'author' | 'addedAt'

export interface BooksState {
  books: Book[]
  categories: string[]
  filter: BookFilter
  category: string
  sortBy: BookSort
  sortDirection: 'asc' | 'desc'
}

const defaultCategories = ['Fiction', 'Nonfiction', 'Fantasy', 'Mystery', 'Biography', 'History']
const STORAGE_KEY = 'reading-room-library'

function loadSavedLibrary(): Pick<BooksState, 'books' | 'categories'> {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null')
    if (typeof saved !== 'object' || saved === null) {
      return { books: [], categories: defaultCategories }
    }

    const data = saved as { books?: unknown; categories?: unknown }
    const books = Array.isArray(data.books) ? data.books.filter(isBookRecord) : []
    const categories = Array.isArray(data.categories)
      ? data.categories.filter((category): category is string => typeof category === 'string')
      : defaultCategories

    return { books, categories: categories.length ? categories : defaultCategories }
  } catch {
    return { books: [], categories: defaultCategories }
  }
}

const savedLibrary = loadSavedLibrary()
const initialState: BooksState = {
  ...savedLibrary,
  filter: 'all',
  category: 'all',
  sortBy: 'addedAt',
  sortDirection: 'desc',
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook(state, action: PayloadAction<NewBook>) {
      state.books.unshift(new BookItem(action.payload).serialize())
    },
    removeBook(state, action: PayloadAction<string>) {
      state.books = state.books.filter((book) => book.id !== action.payload)
    },
    toggleReadStatus(state, action: PayloadAction<string>) {
      const book = state.books.find((item) => item.id === action.payload)
      if (book) book.isRead = !book.isRead
    },
    setFilter(state, action: PayloadAction<BookFilter>) {
      state.filter = action.payload
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload
    },
    setSortBy(state, action: PayloadAction<BookSort>) {
      state.sortBy = action.payload
    },
    toggleSortDirection(state) {
      state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc'
    },
    addCategory(state, action: PayloadAction<string>) {
      const name = action.payload.trim()
      if (name && !state.categories.some((category) => category.toLowerCase() === name.toLowerCase())) {
        state.categories.push(name)
      }
    },
    removeCategory(state, action: PayloadAction<string>) {
      state.categories = state.categories.filter((category) => category !== action.payload)
      state.books.forEach((book) => {
        if (book.category === action.payload) book.category = 'Uncategorized'
      })
      if (state.category === action.payload) state.category = 'all'
    },
    importBooks(state, action: PayloadAction<Book[]>) {
      const existingIds = new Set(state.books.map((book) => book.id))
      action.payload.forEach((book) => {
        if (!existingIds.has(book.id)) state.books.push(BookItem.fromJSON(book).serialize())
        if (!state.categories.includes(book.category) && book.category !== 'Uncategorized') {
          state.categories.push(book.category)
        }
      })
    },
  },
})

export const {
  addBook,
  removeBook,
  toggleReadStatus,
  setFilter,
  setCategory,
  setSortBy,
  toggleSortDirection,
  addCategory,
  removeCategory,
  importBooks,
} = booksSlice.actions

export default booksSlice.reducer