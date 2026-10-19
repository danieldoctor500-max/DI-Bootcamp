import { useContext } from 'react'
import { ContactContext } from './contactState'

export function useContacts() {
  const context = useContext(ContactContext)
  if (!context) throw new Error('useContacts must be used inside ContactProvider.')
  return context
}