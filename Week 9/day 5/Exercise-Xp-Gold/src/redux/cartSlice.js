import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [
    { id: 1, name: 'Everyday ceramic mug', category: 'HOME GOODS', price: 24, color: 'clay', mark: '01' },
    { id: 2, name: 'Soft cotton market tote', category: 'ON THE GO', price: 32, color: 'sage', mark: '02' },
    { id: 3, name: 'Sunday morning candle', category: 'SLOW LIVING', price: 28, color: 'honey', mark: '03' },
    { id: 4, name: 'Pocket notebook set', category: 'PAPER GOODS', price: 18, color: 'blue', mark: '04' },
    { id: 5, name: 'Hand-thrown bud vase', category: 'HOME GOODS', price: 42, color: 'rose', mark: '05' },
    { id: 6, name: 'Little moments print', category: 'ART & PRINTS', price: 36, color: 'lavender', mark: '06' },
  ],
  items: [],
}

const cartSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingItem = state.items.find((item) => item.productId === action.payload)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ productId: action.payload, quantity: 1 })
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.productId !== action.payload)
    },
    updateQuantity(state, action) {
      const item = state.items.find((cartItem) => cartItem.productId === action.payload.productId)
      if (!item) return

      if (action.payload.quantity <= 0) {
        state.items = state.items.filter((cartItem) => cartItem.productId !== action.payload.productId)
      } else {
        item.quantity = action.payload.quantity
      }
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions
export default cartSlice.reducer
