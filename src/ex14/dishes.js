// Ảnh gốc trong đề là .png; project dùng ảnh SVG minh hoạ đặt trong public/images.
const dishes = [
  {
    id: 0,
    name: 'Uthappizza',
    image: 'images/uthappizza.svg',
    category: 'mains',
    label: 'Hot',
    price: '4.99',
    featured: true,
    description:
      'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
  },
  {
    id: 1,
    name: 'Zucchipakoda',
    image: 'images/zucchipakoda.svg',
    category: 'appetizer',
    label: '',
    price: '1.99',
    featured: false,
    description:
      'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
  },
  {
    id: 2,
    name: 'Vadonut',
    image: 'images/vadonut.svg',
    category: 'appetizer',
    label: 'New',
    price: '1.99',
    featured: false,
    description: 'A quintessential ConFusion experience, is it a vada or is it a donut?',
  },
  {
    id: 3,
    name: 'ElaiCheese Cake',
    image: 'images/elaicheesecake.svg',
    category: 'dessert',
    label: '',
    price: '2.99',
    featured: false,
    description:
      'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
  },
];

export default dishes;
