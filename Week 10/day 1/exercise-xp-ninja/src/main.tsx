import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ContactProvider } from './context/ContactContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContactProvider>
      <App />
    </ContactProvider>
  </StrictMode>,
)
