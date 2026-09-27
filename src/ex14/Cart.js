import { useCart } from './CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, clearCart, totalItems, totalValue } = useCart();

  return (
    <div className="stack">
      {cartItems.length === 0 ? (
        <p className="muted">Your cart is empty.</p>
      ) : (
        <ul className="list">
          {cartItems.map((item) => (
            <li key={item.id} className="list-item">
              <span>
                {item.name} × {item.quantity} — ${(parseFloat(item.price) * item.quantity).toFixed(2)}
              </span>
              <button className="danger small" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <p>
        Total items: <strong data-testid="total-items">{totalItems}</strong>
      </p>
      <p>
        Total value: <strong data-testid="total-value">${totalValue.toFixed(2)}</strong>
      </p>
      <button className="secondary" onClick={clearCart} disabled={cartItems.length === 0}>
        Clear Cart
      </button>
    </div>
  );
}
