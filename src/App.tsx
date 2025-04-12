import React, { useState } from 'react';
import WishlistPage from './components/client/wishlist/WishlistPage';
import ReviewForm from './components/client/Review/ReviewForm';
import ReviewCard from './components/client/Review/ReviewCard';

// Enhanced mock reviews data
const initialReviews = [
  {
    id: '1',
    userName: 'John Doe',
    rating: 5,
    comment: 'Excellent product! The noise cancellation is outstanding and the battery life exceeds expectations. Highly recommend for anyone looking for premium wireless headphones.',
    date: '2024-04-10',
    productName: 'Sony WH-1000XM4 Wireless Headphones',
    helpful: 24,
    verified: true,
  },
  {
    id: '2',
    userName: 'Jane Smith',
    rating: 4,
    comment: 'Great quality and features, though a bit pricey. The fitness tracking is accurate and the battery life is impressive. Would recommend waiting for a sale.',
    date: '2024-04-09',
    productName: 'Apple Watch Series 7',
    helpful: 15,
    verified: true,
  },
  // Adding more detailed reviews
  {
    id: '3',
    userName: 'Mike Johnson',
    rating: 5,
    comment: 'Perfect for my home office setup. The adjustable height and sturdy construction make it worth every penny. My posture has improved significantly.',
    date: '2024-04-08',
    productName: 'Adjustable Laptop Stand',
    helpful: 32,
    verified: true,
  },
  {
    id: '4',
    userName: 'Sarah Williams',
    rating: 3,
    comment: 'Good build quality but takes up more desk space than expected. The cooling effect is noticeable though.',
    date: '2024-04-07',
    productName: 'Adjustable Laptop Stand',
    helpful: 8,
    verified: true,
  },
].concat(
  Array.from({ length: 16 }, (_, i) => ({
    id: (i + 5).toString(),
    userName: `User ${i + 5}`,
    rating: Math.floor(Math.random() * 3) + 3, // Ratings between 3-5
    comment: `Detailed review ${i + 5} with comprehensive feedback about the product quality, features, and overall experience. ${
      Math.random() > 0.5 ? 'Highly recommended!' : 'Good value for money.'
    }`,
    date: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
    productName: ['Sony WH-1000XM4 Wireless Headphones', 'Apple Watch Series 7', 'Adjustable Laptop Stand'][
      Math.floor(Math.random() * 3)
    ],
    helpful: Math.floor(Math.random() * 50),
    verified: Math.random() > 0.2,
  }))
);

function App() {
  const [reviews, setReviews] = useState(initialReviews);
  const [activeTab, setActiveTab] = useState<'wishlist' | 'reviews'>('wishlist');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleReviewSubmit = (review: {
    rating: number;
    comment: string;
    productId: string;
  }) => {
    const newReview = {
      id: Math.random().toString(),
      userName: 'Current User',
      rating: review.rating,
      comment: review.comment,
      date: new Date().toISOString().split('T')[0],
      productName: selectedProduct || 'Product Name',
      helpful: 0,
      verified: true,
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  const handleHelpful = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? { ...review, helpful: review.helpful + 1 }
          : review
      )
    );
  };

  const filteredReviews = selectedProduct
    ? reviews.filter((review) => review.productName === selectedProduct)
    : reviews;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            <button
              className={`py-4 px-2 border-b-2 ${
                activeTab === 'wishlist'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('wishlist')}
            >
              Wishlist
            </button>
            <button
              className={`py-4 px-2 border-b-2 ${
                activeTab === 'reviews'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'wishlist' ? (
          <WishlistPage />
        ) : (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Write a Review</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Product
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedProduct || ''}
                  onChange={(e) => setSelectedProduct(e.target.value || null)}
                >
                  <option value="">All Products</option>
                  {Array.from(new Set(reviews.map((r) => r.productName))).map(
                    (name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    )
                  )}
                </select>
              </div>
              <ReviewForm
                productId="1"
                productName={selectedProduct || 'Select a product'}
                onSubmit={handleReviewSubmit}
              />
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {selectedProduct ? `Reviews for ${selectedProduct}` : 'All Reviews'}
                </h2>
                <span className="text-gray-500">
                  {filteredReviews.length} reviews
                </span>
              </div>
              <div className="space-y-4">
                {filteredReviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    onHelpful={() => handleHelpful(review.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;