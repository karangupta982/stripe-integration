import { useState } from 'react';
import { products } from '../utils/mockData';
import ProductCard from '../components/ProductCard';
import CartIcon from '../components/CartIcon';
import CartModal from '../components/CartModal';

/**
 * ProductsPage Component
 * Main shopping page displaying products and managing cart functionality
 */
export default function ProductsPage({ onNavigate }) {
  // Cart state management
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  /**
   * Add product to cart or increment quantity if already exists
   * @param {Object} product - Product object to add
   */
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // Increment quantity for existing item
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Add new item to cart
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  /**
   * Remove item from cart completely
   * @param {number} productId - ID of product to remove
   */
  const handleRemoveItem = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== productId)
    );
  };

  /**
   * Toggle cart modal visibility
   */
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  /**
   * Handle checkout navigation with cart data
   */
  const handleCheckout = () => {
    setIsCartOpen(false);
    const totalAmount = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    onNavigate('checkout', { items: cart, totalAmount });
  };

  // Calculate total items in cart for badge display
  const cartItemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      {/* Floating cart icon */}
      <CartIcon itemCount={cartItemCount} onClick={toggleCart} />

      <div className="max-w-7xl mx-auto">
        {/* Page header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Our Products</h1>
          <p className="text-gray-600 text-lg">Discover our amazing collection</p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

      {/* Cart modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={toggleCart}
        cartItems={cart}
        onCheckout={handleCheckout}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}