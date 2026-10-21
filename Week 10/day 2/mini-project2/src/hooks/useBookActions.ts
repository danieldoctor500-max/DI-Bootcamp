import {
  addBook,
  importBooks,
  removeBook,
  toggleReadStatus,
} from '../app/booksSlice'
import { useAppDispatch } from '../app/hooks'
import type { Book, NewBook } from '../model/Book'

export function useBookActions() {
  const dispatch = useAppDispatch()

  return {
    add: (book: NewBook) => dispatch(addBook(book)),
    remove: (id: string) => dispatch(removeBook(id)),
    toggleRead: (id: string) => dispatch(toggleReadStatus(id)),
    import: (books: Book[]) => dispatch(importBooks(books)),
  }
}