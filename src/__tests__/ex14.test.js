import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, themes } from '../ex14/ThemeContext';
import Theme from '../ex14/Theme';
import { CartProvider, addItem, removeItem, getTotals } from '../ex14/CartContext';
import DishesList from '../ex14/DishesList';
import Cart from '../ex14/Cart';
import dishes from '../ex14/dishes.js';

const renderCart = () =>
  render(
    <CartProvider>
      <DishesList dishes={dishes} />
      <Cart />
    </CartProvider>
  );

describe('Exercise 14 – useContext', () => {
  afterEach(() => jest.restoreAllMocks());

  test('Theme toggles between light and dark background', async () => {
    render(
      <ThemeProvider>
        <Theme />
      </ThemeProvider>
    );
    const box = screen.getByTestId('theme-box');
    expect(box).toHaveStyle({ background: themes.light.background });

    await userEvent.click(screen.getByRole('button', { name: /toggle theme/i }));
    expect(box).toHaveStyle({ background: themes.dark.background });
    expect(screen.getByText('dark')).toBeInTheDocument();
  });

  test('Theme throws a helpful error outside ThemeProvider', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Theme />)).toThrow(/ThemeProvider/);
  });

  test('cart helpers are immutable and compute totals in cents', () => {
    const empty = [];
    const once = addItem(empty, dishes[0]);
    const twice = addItem(once, dishes[0]);
    const withSecond = addItem(twice, dishes[1]);

    expect(empty).toEqual([]);
    expect(once[0].quantity).toBe(1);
    expect(twice[0].quantity).toBe(2);
    expect(getTotals(withSecond)).toEqual({ totalItems: 3, totalValue: 11.97 });
    expect(removeItem(withSecond, dishes[0].id)).toHaveLength(1);
  });

  test('adding, removing and clearing updates count and value in real time', async () => {
    renderCart();
    const addButtons = screen.getAllByRole('button', { name: /add to cart/i });

    await userEvent.click(addButtons[0]); // 4.99
    await userEvent.click(addButtons[0]); // 4.99
    await userEvent.click(addButtons[3]); // 2.99

    expect(screen.getByTestId('total-items')).toHaveTextContent('3');
    expect(screen.getByTestId('total-value')).toHaveTextContent('$12.97');
    expect(screen.getByTestId('cart-summary')).toHaveTextContent('3 item(s) · $12.97');

    await userEvent.click(screen.getAllByRole('button', { name: /remove/i })[0]);
    expect(screen.getByTestId('total-items')).toHaveTextContent('1');
    expect(screen.getByTestId('total-value')).toHaveTextContent('$2.99');

    await userEvent.click(screen.getByRole('button', { name: /clear cart/i }));
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.getByTestId('cart-summary')).toHaveTextContent('0 item(s) · $0.00');
  });
});
