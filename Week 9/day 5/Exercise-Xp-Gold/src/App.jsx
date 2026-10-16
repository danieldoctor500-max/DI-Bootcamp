import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart, updateQuantity } from './redux/cartSlice.js'
import {
  calculateTotalPrice,
  selectCartItems,
  selectProducts,
} from './redux/selectors.js'

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <div className={`product-art art-${product.color}`} aria-hidden="true">
        <span className="art-mark">{product.mark}</span>
        <span className="art-shape">{product.name.charAt(0)}</span>
        <span className="art-caption">GOOD THINGS, DAILY</span>
      </div>
      <div className="product-details">
        <div>
          <span className="category">{product.category}</span>
          <h3>{product.name}</h3>
        </div>
        <div className="product-buy">
          <span className="price">{currency.format(product.price)}</span>
          <button className="add-button" type="button" onClick={() => onAdd(product.id)}>
            Add <span aria-hidden="true">+</span>
          </button>
        </div>
      </div>
    </article>
  )
}

function ShoppingCart() {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const cartItems = useSelector(selectCartItems)
  const totalPrice = useSelector(calculateTotalPrice)
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  const handleAddToCart = useCallback((productId) => {
    dispatch(addToCart(productId))
  }, [dispatch])

  const handleQuantityChange = useCallback((productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity }))
  }, [dispatch])

  return (
    <main className="page">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Good Things home">
          <span className="brand-symbol" aria-hidden="true">g.</span>
          <span>good things</span>
        </a>
        <a className="cart-link" href="#cart">
          Your bag <span className="cart-count">{itemCount}</span>
        </a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">SMALL-BATCH FINDS FOR EVERYDAY LIFE</p>
          <h1>A few good<br /><em>things.</em></h1>
          <p className="hero-description">
            Useful, lovely, and made to be lived with. Find a new favorite for your everyday.
          </p>
          <a className="browse-link" href="#products">Explore the collection <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="sun" />
          <div className="hero-vase vase-back" />
          <div className="hero-vase vase-front" />
          <div className="hero-stem stem-one" />
          <div className="hero-stem stem-two" />
          <span className="hero-art-caption">OBJECTS FOR<br />A SLOWER DAY</span>
        </div>
      </section>

      <div className="shop-layout">
        <section className="collection" id="products" aria-labelledby="collection-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE GOOD STUFF</p>
              <h2 id="collection-title">The collection</h2>
            </div>
            <span className="collection-count">0{products.length} pieces</span>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={handleAddToCart} />
            ))}
          </div>
        </section>

        <aside className="cart-panel" id="cart" aria-labelledby="cart-title">
          <div className="cart-heading">
            <div>
              <p className="eyebrow">YOUR PICKS</p>
              <h2 id="cart-title">Your bag <span>({itemCount})</span></h2>
            </div>
            <span className="bag-icon" aria-hidden="true">↗</span>
          </div>

          {cartItems.length > 0 ? (
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li className="cart-item" key={item.id}>
                  <div className={`cart-thumbnail art-${item.color}`} aria-hidden="true">
                    <span>{item.mark}</span>
                  </div>
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <span>{currency.format(item.price)}</span>
                    <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="remove-button"
                    type="button"
                    aria-label={`Remove ${item.name} from bag`}
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-cart">
              <span className="empty-cart-icon" aria-hidden="true">♡</span>
              <p>Your bag is taking a little break.</p>
              <span>Add something lovely to get started.</span>
            </div>
          )}

          <div className="cart-summary">
            <div className="subtotal"><span>Subtotal</span><strong>{currency.format(totalPrice)}</strong></div>
            <p>Shipping and taxes calculated at checkout.</p>
            <button className="checkout-button" type="button" disabled={cartItems.length === 0}>
              Continue to checkout <span aria-hidden="true">↗</span>
            </button>
            <div className="shipping-note"><span aria-hidden="true">✳</span> Complimentary shipping on orders over $75</div>
          </div>
        </aside>
      </div>

      <footer className="footer">
        <span className="brand-symbol" aria-hidden="true">g.</span>
        <span>Good things, chosen with care.</span>
        <span className="footer-note">REDUX TOOLKIT · MEMOIZED CART SELECTORS</span>
      </footer>
    </main>
  )
}

function App() {
  return <ShoppingCart />
}

export default App
