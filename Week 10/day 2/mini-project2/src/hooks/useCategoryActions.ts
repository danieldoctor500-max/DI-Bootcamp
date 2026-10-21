import { addCategory, removeCategory } from '../app/booksSlice'
import { useAppDispatch } from '../app/hooks'

export function useCategoryActions() {
  const dispatch = useAppDispatch()

  return {
    add: (name: string) => dispatch(addCategory(name)),
    remove: (name: string) => dispatch(removeCategory(name)),
  }
}