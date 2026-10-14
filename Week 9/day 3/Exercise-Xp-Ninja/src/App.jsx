import { useSelector } from 'react-redux'
import AddProduct from './components/AddProduct.jsx'
import InventoryList from './components/InventoryList.jsx'

function App() {
  const products = useSelector((state) => state.inventory.products)
  const totalUnits = products.reduce((total, product) => total + product.quantity, 0)
  const lowStockCount = products.filter((product) => product.quantity <= 5).length

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Stockroom home">
          <span className="brand-mark" aria-hidden="true">S</span>
          stockroom
        </a>
        <span className="topbar-note">A clear view of what you have.</span>
      </header>

      <section className="inventory-card" aria-labelledby="page-title">
        <div className="page-heading">
          <div>
            <p className="eyebrow">INVENTORY MANAGEMENT</p>
            <h1 id="page-title">Your <span>stockroom.</span></h1>
            <p className="heading-copy">Keep your products organized and quantities up to date.</p>
          </div>
          <div className="summary-grid" aria-label="Inventory summary">
            <div className="summary-item">
              <span className="summary-value">{products.length}</span>
              <span className="summary-label">products</span>
            </div>
            <div className="summary-item">
              <span className="summary-value">{totalUnits}</span>
              <span className="summary-label">total units</span>
            </div>
          </div>
        </div>

        <section className="add-section" aria-labelledby="add-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CATALOG</p>
              <h2 id="add-heading">Add a product</h2>
            </div>
          </div>
          <AddProduct />
        </section>

        <section className="list-section" aria-labelledby="inventory-heading">
          <div className="section-heading inventory-heading">
            <div>
              <p className="eyebrow">YOUR ITEMS</p>
              <h2 id="inventory-heading">Inventory</h2>
            </div>
            <span className={`stock-summary${lowStockCount ? ' has-low-stock' : ''}`}>
              {lowStockCount > 0 ? `${lowStockCount} low stock` : 'All stock levels healthy'}
            </span>
          </div>
          <InventoryList />
        </section>
      </section>

      <p className="page-note">Good records make good decisions.</p>
    </main>
  )
}

export default App
