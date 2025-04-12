import React from 'react';
import { ThumbsUp, CheckCircle } from 'lucide-react';
import StarInput from './StarInput';

interface ReviewCardProps {
  review: {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
    productName: string;
    helpful: number;
    verified: boolean;
  };
  onHelpful: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, onHelpful }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{review.productName}</h3>
            {review.verified && (
              <span className="flex items-center text-green-600 text-sm">
                <CheckCircle className="w-4 h-4 mr-1" /> Verified Purchase
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">{review.userName}</p>
        </div>
        <p className="text-sm text-gray-500">{review.date}</p>
      </div>
      <div className="mb-3">
        <StarInput rating={review.rating} setRating={() => {}} readOnly />
      </div>
      <p className="text-gray-700 mb-4">{review.comment}</p>
      <div className="flex items-center justify-between">
        <button
          onClick={onHelpful}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ThumbsUp className="w-4 h-4" />
          <span className="text-sm">Helpful ({review.helpful})</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;