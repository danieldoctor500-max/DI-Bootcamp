import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart(state, action) {
      const product = state.items.find((item) => item.id === action.payload.id)
      if (product) {
        product.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    incrementQuantity(state, action) {
      const product = state.items.find((item) => item.id === action.payload)
      if (product) product.quantity += 1
    },
    decrementQuantity(state, action) {
      const product = state.items.find((item) => item.id === action.payload)
      if (!product) return
      if (product.quantity > 1) {
        product.quantity -= 1
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload)
      }
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions
export default cartSlice.reducer
