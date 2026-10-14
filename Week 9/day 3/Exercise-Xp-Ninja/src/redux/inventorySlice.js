import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  products: [],
}

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addProduct: {
      reducer(state, action) {
        state.products.push(action.payload)
      },
      prepare(product) {
        return {
          payload: {
            id: nanoid(),
            name: product.name,
            category: product.category,
            quantity: product.quantity,
          },
        }
      },
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload
      const product = state.products.find((item) => item.id === id)
      if (product) product.quantity = quantity
    },
    removeProduct(state, action) {
      state.products = state.products.filter((product) => product.id !== action.payload)
    },
  },
})

export const { addProduct, updateQuantity, removeProduct } = inventorySlice.actions
export default inventorySlice.reducer
