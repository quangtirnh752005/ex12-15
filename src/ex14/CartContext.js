import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext(null);

export const addItem = (items, dish) => {
  const existing = items.find((item) => item.id === dish.id);
  if (existing) {
    return items.map((item) => (item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item));
  }
  return [...items, { ...dish, quantity: 1 }];
};

export const removeItem = (items, id) => items.filter((item) => item.id !== id);

export const getTotals = (items) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  // Sum in cents to avoid floating point drift (0.1 + 0.2 problem).
  const totalCents = items.reduce((sum, item) => sum + Math.round(parseFloat(item.price) * 100) * item.quantity, 0);
  return { totalItems, totalValue: totalCents / 100 };
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (dish) => setCartItems((prev) => addItem(prev, dish));
  const removeFromCart = (id) => setCartItems((prev) => removeItem(prev, id));
  const clearCart = () => setCartItems([]);

  // Derived on every render, so every consumer sees the new count/value immediately.
  const { totalItems, totalValue } = getTotals(cartItems);

  const value = { cartItems, addToCart, removeFromCart, clearCart, totalItems, totalValue };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
  children: PropTypes.node,
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside <CartProvider>');
  }
  return context;
}
