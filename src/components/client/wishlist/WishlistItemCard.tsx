import React from 'react';
import { Heart, Trash2, Package } from 'lucide-react';

interface WishlistItemCardProps {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    stock: number;
  };
  onRemove: (id: string) => void;
  onMoveToCart: (id: string) => void;
}

const WishlistItemCard: React.FC<WishlistItemCardProps> = ({
  item,
  onRemove,
  onMoveToCart,
}) => {
  const isLowStock = item.stock <= 10;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-2 right-2 bg-white/90 text-sm px-2 py-1 rounded-full">
          {item.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-2 mb-2">{item.name}</h3>
        <div className="flex items-center justify-between mb-4">
          <p className="text-blue-600 font-bold text-xl">
            ${item.price.toFixed(2)}
          </p>
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            <span className={`text-sm ${isLowStock ? 'text-red-500' : 'text-green-500'}`}>
              {isLowStock ? `Only ${item.stock} left` : 'In Stock'}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onMoveToCart(item.id)}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4" /> Add to Cart
          </button>
          <button
            onClick={() => onRemove(item.id)}
            className="bg-red-100 text-red-600 px-3 py-2 rounded-md hover:bg-red-200 transition-colors"
            title="Remove from wishlist"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistItemCard;