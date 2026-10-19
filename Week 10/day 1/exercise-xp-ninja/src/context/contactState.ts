import { createContext, type Dispatch } from 'react'

export interface Contact {
  id: number
  name: string
  email: string
}

export interface ContactState {
  contacts: Contact[]
}

export type ContactAction =
  | { type: 'addContact'; contact: Contact }
  | { type: 'removeContact'; id: number }

interface ContactContextValue {
  state: ContactState
  dispatch: Dispatch<ContactAction>
}

export const initialContactState: ContactState = { contacts: [] }

export function contactReducer(state: ContactState, action: ContactAction): ContactState {
  switch (action.type) {
    case 'addContact':
      return { contacts: [...state.contacts, action.contact] }
    case 'removeContact':
      return { contacts: state.contacts.filter((contact) => contact.id !== action.id) }
  }
}

export const ContactContext = createContext<ContactContextValue | undefined>(undefined)