import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../features/cart/cartSlice.js'
import { fetchProducts } from '../features/products/productSlice.js'

function ProductListing() {
  const dispatch = useDispatch()
  const { items: products, status, error } = useSelector((state) => state.products)

  if (status === 'loading' && products.length === 0) {
    return <p className="state-message" role="status">Loading the collection…</p>
  }

  if (status === 'failed' && products.length === 0) {
    return (
      <div className="error-panel" role="alert">
        <p>{error}</p>
        <button
          className="retry-button"
          type="button"
          onClick={() => dispatch(fetchProducts())}
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <article className="product-card" key={product.id}>
          <div className="product-image-wrap">
            <img className="product-image" src={product.image} alt="" loading="lazy" />
          </div>
          <div className="product-info">
            <span className="product-category">{product.category}</span>
            <h3>{product.title}</h3>
            <div className="product-bottom">
              <span className="price">${product.price.toFixed(2)}</span>
              <button
                className="add-cart-button"
                type="button"
                onClick={() => dispatch(addToCart(product))}
                aria-label={`Add ${product.title} to cart`}
              >
                Add to bag <span aria-hidden="true">+</span>
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export default ProductListing
