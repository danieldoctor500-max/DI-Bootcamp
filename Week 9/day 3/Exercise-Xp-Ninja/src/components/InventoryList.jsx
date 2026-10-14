import { useSelector } from 'react-redux'
import RemoveProduct from './RemoveProduct.jsx'
import UpdateQuantity from './UpdateQuantity.jsx'

function InventoryList() {
  const products = useSelector((state) => state.inventory.products)

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">□</span>
        <p>Your inventory is empty. Add a product to get started.</p>
      </div>
    )
  }

  return (
    <div className="table-scroll">
      <table className="inventory-table">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Category</th>
            <th scope="col">In stock</th>
            <th scope="col"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <span className="product-name">{product.name}</span>
                {product.quantity === 0 && <span className="stock-warning">Out of stock</span>}
                {product.quantity > 0 && product.quantity <= 5 && (
                  <span className="stock-warning">Low stock</span>
                )}
              </td>
              <td><span className="category-badge">{product.category}</span></td>
              <td><UpdateQuantity product={product} /></td>
              <td><RemoveProduct product={product} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default InventoryList
