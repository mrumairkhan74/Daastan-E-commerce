"use client";

import { useState } from "react";
import { Star, ThumbsUp, ChevronDown, ChevronUp } from "lucide-react";

const MOCK_REVIEWS = {
  "chapter-1": [
    {
      id: "1",
      author: "Ali K.",
      date: "2024-01-15",
      rating: 5,
      title: "Perfect fit and quality",
      text: "The fabric is amazing, so soft and comfortable. The oversized fit is exactly as described. Love the Urdu calligraphy on the back!",
      helpful: 12,
    },
    {
      id: "2",
      author: "Sara M.",
      date: "2024-01-10",
      rating: 4,
      title: "Great design",
      text: "Beautiful shirt, the ivory color is elegant. Size runs slightly large as expected.",
      helpful: 8,
    },
  ],
  "chapter-3": [
    {
      id: "3",
      author: "Ahmed R.",
      date: "2024-01-20",
      rating: 5,
      title: "Best seller for a reason",
      text: "The grey color is perfect for everyday wear. Premium quality cotton. Highly recommend!",
      helpful: 15,
    },
  ],
};

export default function ProductReviews({ productId, productName }) {
  const [showAll, setShowAll] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: "", text: "" });
  const [reviews, setReviews] = useState(MOCK_REVIEWS[productId] || []);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 2);
  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const newReview = {
      id: Date.now().toString(),
      author: "You",
      date: new Date().toISOString().split("T")[0],
      rating: reviewForm.rating,
      title: reviewForm.title,
      text: reviewForm.text,
      helpful: 0,
    };
    setReviews([newReview, ...reviews]);
    setReviewForm({ rating: 5, title: "", text: "" });
    setShowForm(false);
  };

  const renderStars = (rating, interactive = false, onSelect = () => {}) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => interactive && onSelect(star)}
          className={`${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-transform`}
          disabled={!interactive}
        >
          <Star
            className={`w-4 h-4 ${
              star <= rating ? "fill-charcoal text-charcoal" : "text-neutral-300"
            }`}
          />
        </button>
      ))}
    </div>
  );

  return (
    <div className="mt-16 pt-12 border-t border-neutral-200">
      <h2 className="font-display text-2xl mb-6">Customer Reviews</h2>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-1">
          <div className="bg-neutral-50 p-6 text-center">
            <div className="text-5xl font-display">{averageRating}</div>
            <div className="flex justify-center my-2">{renderStars(Math.round(parseFloat(averageRating)))}</div>
            <p className="text-sm text-neutral-500">{reviews.length} reviews</p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = reviews.filter((r) => r.rating === stars).length;
            const percent = reviews.length ? (count / reviews.length) * 100 : 0;
            return (
              <div key={stars} className="flex items-center gap-2 text-sm">
                <span className="w-8">{stars} ★</span>
                <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div className="h-full bg-charcoal rounded-full" style={{ width: `${percent}%` }} />
                </div>
                <span className="w-8 text-neutral-500 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full md:w-auto px-6 py-3 border border-charcoal text-charcoal font-medium hover:bg-charcoal hover:text-white transition-colors mb-6"
      >
        Write a Review
      </button>

      {showForm && (
        <form onSubmit={handleSubmitReview} className="bg-neutral-50 p-6 mb-8 max-w-2xl">
          <h3 className="font-medium mb-4">Write Your Review</h3>

          <div className="mb-4">
            <label className="block text-sm mb-2">Rating</label>
            {renderStars(reviewForm.rating, true, (r) => setReviewForm({ ...reviewForm, rating: r }))}
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Review Title</label>
            <input
              type="text"
              required
              value={reviewForm.title}
              onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 focus:border-charcoal focus:outline-none"
              placeholder="Summarize your experience"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Your Review</label>
            <textarea
              required
              rows={4}
              value={reviewForm.text}
              onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 focus:border-charcoal focus:outline-none resize-none"
              placeholder="Share your thoughts about this product..."
            />
          </div>

          <div className="flex gap-2">
            <button type="submit" className="px-6 py-2 bg-charcoal text-white font-medium hover:bg-charcoal/90">
              Submit Review
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-6 py-2 border border-neutral-300 hover:bg-neutral-100"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {displayedReviews.length === 0 ? (
          <p className="text-neutral-500 py-8 text-center">
            No reviews yet. Be the first to review this product!
          </p>
        ) : (
          displayedReviews.map((review) => (
            <div key={review.id} className="border-b border-neutral-100 pb-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{review.author}</span>
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">{review.date}</p>
                </div>
              </div>
              <h4 className="font-medium mb-1">{review.title}</h4>
              <p className="text-neutral-600 text-sm">{review.text}</p>
              <button className="flex items-center gap-1 text-xs text-neutral-500 mt-3 hover:text-charcoal">
                <ThumbsUp className="w-3 h-3" /> Helpful ({review.helpful})
              </button>
            </div>
          ))
        )}
      </div>

      {reviews.length > 2 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-6 flex items-center gap-1 text-sm text-charcoal hover:underline"
        >
          {showAll ? (
            <>
              Show less <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Show all {reviews.length} reviews <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
