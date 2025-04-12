import React, { useState } from 'react';
import WishlistItemCard from './WishlistItemCard';

// Product name generators for variety
const productPrefixes = ['Premium', 'Ultra', 'Pro', 'Elite', 'Smart', 'Advanced', 'Digital', 'Next-Gen', 'Modern', 'Classic'];
const productTypes = [
  'Laptop', 'Smartphone', 'Tablet', 'Smartwatch', 'Headphones', 'Speaker', 'Camera', 'Monitor', 
  'Keyboard', 'Mouse', 'Microphone', 'Webcam', 'Charger', 'Power Bank', 'Storage Drive',
  'Gaming Console', 'Router', 'Smart Light', 'Fitness Tracker', 'Earbuds'
];

// Enhanced mock data with 1000 diverse items
const initialWishlistItems = [
  {
    id: '1',
    name: 'Sony WH-1000XM4 Wireless Headphones',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    category: 'Electronics',
    stock: 15,
  },
  {
    id: '2',
    name: 'Apple Watch Series 7',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80',
    category: 'Wearables',
    stock: 20,
  },
  {
    id: '3',
    name: 'Adjustable Laptop Stand',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?auto=format&fit=crop&w=800&q=80',
    category: 'Accessories',
    stock: 30,
  },
  {
    id: '4',
    name: 'MacBook Pro 16"',
    price: 2399.99,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    category: 'Computers',
    stock: 8,
  },
  {
    id: '5',
    name: 'iPad Pro 12.9"',
    price: 1099.99,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    category: 'Tablets',
    stock: 12,
  },
  {
    id: '6',
    name: 'Mechanical Keyboard',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907199b?auto=format&fit=crop&w=800&q=80',
    category: 'Accessories',
    stock: 25,
  }
].concat(
  Array.from({ length: 994 }, (_, i) => {
    const prefix = productPrefixes[Math.floor(Math.random() * productPrefixes.length)];
    const type = productTypes[Math.floor(Math.random() * productTypes.length)];
    const brand = ['Samsung', 'Apple', 'Sony', 'LG', 'Dell', 'HP', 'Asus', 'Lenovo', 'Logitech', 'JBL'][Math.floor(Math.random() * 10)];
    
    return {
      id: (i + 7).toString(),
      name: `${brand} ${prefix} ${type} ${Math.floor(Math.random() * 1000)}`,
      price: (Math.floor(Math.random() * 200000) + 999) / 100, // Prices from 9.99 to 2009.99
      image: [
        'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80', // Laptop
        'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80', // Smart Watch
        'https://images.unsplash.com/photo-1585298723682-7115561c51b7?auto=format&fit=crop&w=800&q=80', // Headphones
        'https://images.unsplash.com/photo-1593642634443-44adaa06623a?auto=format&fit=crop&w=800&q=80', // Desktop Setup
        'https://images.unsplash.com/photo-1625480862498-3e76a30b0c0e?auto=format&fit=crop&w=800&q=80', // Keyboard
        'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80', // Mouse
        'https://images.unsplash.com/photo-1587303876752-91efb6315705?auto=format&fit=crop&w=800&q=80', // Speaker
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', // Headphones 2
        'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80', // iPad
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80', // MacBook
      ][Math.floor(Math.random() * 10)],
      category: ['Electronics', 'Accessories', 'Gadgets', 'Smart Home', 'Wearables', 'Audio', 'Computing', 'Mobile', 'Gaming', 'Photography'][Math.floor(Math.random() * 10)],
      stock: Math.floor(Math.random() * 100) + 1, // Stock from 1 to 100
    };
  })
);

const WishlistPage: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const [cartItems, setCartItems] = useState<typeof initialWishlistItems>([]);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  const categories = ['All', ...new Set(wishlistItems.map(item => item.category))].sort();

  const handleRemoveItem = (id: string) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id));
  };

  const handleMoveToCart = (id: string) => {
    const itemToMove = wishlistItems.find((item) => item.id === id);
    if (itemToMove) {
      setCartItems((prev) => [...prev, itemToMove]);
      setShowCartNotification(true);
      setTimeout(() => setShowCartNotification(false), 3000);
      handleRemoveItem(id);
    }
  };

  const filteredItems = selectedCategory === 'All' 
    ? wishlistItems
    : wishlistItems.filter(item => item.category === selectedCategory);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">My Wishlist ({wishlistItems.length} items)</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {showCartNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-50 animate-fade-in-out">
          Item added to cart successfully!
        </div>
      )}

      {wishlistItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-500">Start adding items to your wishlist to keep track of products you love!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedItems.map((item) => (
            <WishlistItemCard
              key={item.id}
              item={item}
              onRemove={handleRemoveItem}
              onMoveToCart={handleMoveToCart}
            />
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-md shadow-lg">
          Cart Items: {cartItems.length}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;