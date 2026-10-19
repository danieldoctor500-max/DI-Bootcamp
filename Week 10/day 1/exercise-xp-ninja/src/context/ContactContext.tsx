import { useReducer, type ReactNode } from 'react'
import { ContactContext, initialContactState, contactReducer } from './contactState'

export function ContactProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(contactReducer, initialContactState)
  return <ContactContext.Provider value={{ state, dispatch }}>{children}</ContactContext.Provider>
}