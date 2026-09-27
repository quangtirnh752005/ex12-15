import Section from '../components/Section';
import { ThemeProvider } from './ThemeContext';
import Theme from './Theme';
import { CartProvider } from './CartContext';
import DishesList from './DishesList';
import Cart from './Cart';
import dishes from './dishes.js';

export default function Exercise14() {
  return (
    <div className="grid">
      <Section
        index={1}
        title="Theme với useContext"
        description="ThemeContext + ThemeProvider + Theme: bấm nút để đổi light / dark."
      >
        <ThemeProvider>
          <Theme />
        </ThemeProvider>
      </Section>

      {/* DishesList và Cart là 2 component riêng, dùng chung state qua CartContext. */}
      <CartProvider>
        <Section
          index={2}
          title="Cart – DishesList"
          description="Bấm Add to Cart; số món và tổng tiền trên thanh giỏ hàng cập nhật real-time (ý 3)."
        >
          <DishesList dishes={dishes} />
        </Section>
        <Section index={3} title="Cart" description="Xoá từng món, xem tổng số món, tổng tiền, hoặc Clear Cart.">
          <Cart />
        </Section>
      </CartProvider>
    </div>
  );
}
