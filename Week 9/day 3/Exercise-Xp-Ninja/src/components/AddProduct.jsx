import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct } from '../redux/inventorySlice.js'

function AddProduct() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [quantity, setQuantity] = useState('0')
  const dispatch = useDispatch()

  function handleSubmit(event) {
    event.preventDefault()
    if (!event.currentTarget.reportValidity()) return

    const trimmedName = name.trim()
    const trimmedCategory = category.trim()

    if (!trimmedName || !trimmedCategory) return

    dispatch(addProduct({
      name: trimmedName,
      category: trimmedCategory,
      quantity: Number(quantity),
    }))
    setName('')
    setCategory('')
    setQuantity('0')
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="field-group product-name-field">
        <label htmlFor="product-name">Product name</label>
        <input
          id="product-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Ceramic mug"
          pattern=".*\S.*"
          title="Enter at least one non-space character."
          maxLength={100}
          required
        />
      </div>
      <div className="field-group">
        <label htmlFor="product-category">Category</label>
        <input
          id="product-category"
          type="text"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          placeholder="e.g. Home"
          pattern=".*\S.*"
          title="Enter at least one non-space character."
          maxLength={60}
          required
        />
      </div>
      <div className="field-group quantity-field">
        <label htmlFor="starting-quantity">Starting stock</label>
        <input
          id="starting-quantity"
          type="number"
          min="0"
          step="1"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          required
        />
      </div>
      <button className="add-button" type="submit">
        <span aria-hidden="true">+</span>
        Add product
      </button>
    </form>
  )
}

export default AddProduct
