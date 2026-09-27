import PropTypes from 'prop-types';
import { useCart } from './CartContext';

export default function DishesList({ dishes }) {
  const { addToCart, totalItems, totalValue } = useCart();

  return (
    <div className="stack">
      <div className="cart-summary" data-testid="cart-summary">
        🛒 {totalItems} item(s) · ${totalValue.toFixed(2)}
      </div>
      <div className="dishes">
        {dishes.map((dish) => (
          <article key={dish.id} className="dish">
            <img src={dish.image} alt={dish.name} width="96" height="96" />
            <div className="dish-body">
              <h4>
                {dish.name} {dish.label && <span className="badge">{dish.label}</span>}
              </h4>
              <p className="muted small-text">{dish.description}</p>
              <div className="row between">
                <strong>${dish.price}</strong>
                <button className="small" onClick={() => addToCart(dish)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

DishesList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      label: PropTypes.string,
      price: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
};
