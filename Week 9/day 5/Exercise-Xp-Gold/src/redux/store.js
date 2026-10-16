import { configureStore } from '@reduxjs/toolkit'
import shopReducer from './cartSlice.js'

export const store = configureStore({
  reducer: {
    shop: shopReducer,
  },
})
