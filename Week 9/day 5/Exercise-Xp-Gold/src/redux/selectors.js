import { createSelector } from '@reduxjs/toolkit'

export const selectProducts = (state) => state.shop.products
const selectCartLines = (state) => state.shop.items

export const selectCartItems = createSelector(
  [selectCartLines, selectProducts],
  (cartLines, products) =>
    cartLines
      .map((line) => {
        const product = products.find((item) => item.id === line.productId)
        return product ? { ...product, quantity: line.quantity } : null
      })
      .filter(Boolean),
)

export const calculateTotalPrice = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0),
)
