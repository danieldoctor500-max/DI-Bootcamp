import { useDispatch, useSelector } from 'react-redux'
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../features/cart/cartSlice.js'

function ShoppingCart() {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart.items)
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <aside className="cart-panel" aria-labelledby="cart-title">
      <div className="cart-heading">
        <div>
          <p className="eyebrow">YOUR SELECTION</p>
          <h2 id="cart-title">Shopping bag</h2>
        </div>
        <span className="cart-count" aria-label={`${itemCount} items`}>{itemCount}</span>
      </div>

      {items.length === 0 ? (
        <p className="cart-empty">Your bag is empty. Find something you love.</p>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item) => (
              <li className="cart-item" key={item.id}>
                <img src={item.image} alt="" className="cart-image" />
                <div className="cart-item-content">
                  <h3>{item.title}</h3>
                  <span className="cart-price">${item.price.toFixed(2)}</span>
                  <div className="quantity-controls" aria-label={`Quantity for ${item.title}`}>
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${item.title}`}
                      onClick={() => dispatch(decrementQuantity(item.id))}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${item.title}`}
                      onClick={() => dispatch(incrementQuantity(item.id))}
                    >
                      +
                    </button>
                    <button
                      className="remove-item"
                      type="button"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <span>Subtotal</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <p className="cart-disclaimer">Shipping and taxes calculated at checkout.</p>
          <button className="checkout-button" type="button" disabled>
            Checkout · coming soon
          </button>
        </>
      )}
    </aside>
  )
}

export default ShoppingCart
