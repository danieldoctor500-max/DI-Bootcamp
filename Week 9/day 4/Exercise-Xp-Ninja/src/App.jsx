import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AuthForm from './components/AuthForm.jsx'
import ProductListing from './components/ProductListing.jsx'
import ShoppingCart from './components/ShoppingCart.jsx'
import { fetchProducts } from './features/products/productSlice.js'

function App() {
  const dispatch = useDispatch()
  const { items: products, status } = useSelector((state) => state.products)
  const itemCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  )

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts())
  }, [dispatch, status])

  return (
    <div className="site-shell">
      <div className="announcement">Thoughtful essentials, chosen to last.</div>
      <header className="site-header">
        <a className="brand" href="/" aria-label="Common Goods home">
          <span className="brand-symbol" aria-hidden="true">c.</span>
          common goods
        </a>
        <div className="header-actions">
          <AuthForm />
          <a className="bag-link" href="#shopping-bag">
            Bag <span>{itemCount}</span>
          </a>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <p className="eyebrow">THE EVERYDAY EDIT</p>
          <h1 id="hero-title">Better things.<br /><em>Less noise.</em></h1>
          <p>Useful, considered pieces for the rhythms of everyday life.</p>
          <a href="#collection" className="explore-link">Explore the collection <span aria-hidden="true">↓</span></a>
        </section>

        <div className="shop-layout">
          <section className="collection" id="collection" aria-labelledby="collection-title">
            <div className="section-heading">
              <div>
                <p className="eyebrow">CURATED FOR YOU</p>
                <h2 id="collection-title">The collection</h2>
              </div>
              <span className="product-count">
                {status === 'succeeded' ? `${products.length} pieces` : 'New finds'}
              </span>
            </div>
            <ProductListing />
          </section>
          <div id="shopping-bag">
            <ShoppingCart />
          </div>
        </div>
      </main>

      <footer className="site-footer">
        <span>common goods</span>
        <span>Made for the everyday.</span>
      </footer>
    </div>
  )
}

export default App
