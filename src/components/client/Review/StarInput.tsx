import React from 'react';
import { Star } from 'lucide-react';

interface StarInputProps {
  rating: number;
  setRating: (rating: number) => void;
  readOnly?: boolean;
}

const StarInput: React.FC<StarInputProps> = ({ rating, setRating, readOnly = false }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readOnly && setRating(star)}
          className={`focus:outline-none ${readOnly ? 'cursor-default' : 'cursor-pointer'}`}
        >
          <Star
            className={`w-5 h-5 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default StarInput;