import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateQuantity } from '../redux/inventorySlice.js'

function UpdateQuantity({ product }) {
  const [quantity, setQuantity] = useState(String(product.quantity))
  const dispatch = useDispatch()
  const parsedQuantity = Number(quantity)
  const isValidQuantity = Number.isInteger(parsedQuantity) && parsedQuantity >= 0

  function saveQuantity(event) {
    event.preventDefault()
    if (!isValidQuantity) return

    dispatch(updateQuantity({ id: product.id, quantity: parsedQuantity }))
  }

  function changeBy(amount) {
    const nextQuantity = Math.max(0, product.quantity + amount)
    dispatch(updateQuantity({ id: product.id, quantity: nextQuantity }))
    setQuantity(String(nextQuantity))
  }

  return (
    <form className="quantity-controls" onSubmit={saveQuantity}>
      <button
        className="step-button"
        type="button"
        aria-label={`Decrease ${product.name} quantity`}
        onClick={() => changeBy(-1)}
        disabled={product.quantity === 0}
      >
        −
      </button>
      <label className="sr-only" htmlFor={`quantity-${product.id}`}>
        {product.name} quantity
      </label>
      <input
        id={`quantity-${product.id}`}
        className="quantity-input"
        type="number"
        min="0"
        step="1"
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
        aria-label={`Quantity for ${product.name}`}
        required
      />
      <button
        className="step-button"
        type="button"
        aria-label={`Increase ${product.name} quantity`}
        onClick={() => changeBy(1)}
      >
        +
      </button>
      <button
        className="save-button"
        type="submit"
        disabled={!isValidQuantity || parsedQuantity === product.quantity}
      >
        Update
      </button>
    </form>
  )
}

export default UpdateQuantity
