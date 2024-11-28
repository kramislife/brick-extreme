import React, { useMemo } from 'react';
import { Star, Quote, User } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

const ProductRating = ({ product }) => {
  // Calculate ratings dynamically based on product reviews
  const ratings = useMemo(() => {
    const total = product.reviews?.length || 0;
    const sum = product.reviews?.reduce((acc, review) => acc + review.rating, 0) || 0;
    const average = total > 0 ? (sum / total).toFixed(1) : product.rating?.toFixed(1) || "0.0";

    // Initialize distribution array
    const distribution = [
      { stars: 5, count: 0 },
      { stars: 4, count: 0 },
      { stars: 3, count: 0 },
      { stars: 2, count: 0 },
      { stars: 1, count: 0 },
    ];

    // Count ratings from reviews if available
    if (product.reviews) {
      product.reviews.forEach(review => {
        const index = distribution.findIndex(d => d.stars === review.rating);
        if (index !== -1) {
          distribution[index].count++;
        }
      });
    }

    return {
      average: parseFloat(average),
      total: product.reviewCount || total,
      distribution
    };
  }, [product]);

  return (
    <div className="bg-brand-gradient py-12 px-6">
      <div>
        <h2 className="text-3xl font-semibold mb-8 flex items-center gap-4">
          <div className="w-1 h-8 bg-red-500 rounded" />
          <span>Ratings & Reviews</span>
        </h2>

        <div className="flex flex-col md:flex-row justify-between mb-16 px-10 pt-10">
          {/* Average Rating Display */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-5xl font-semibold mb-4">
              {ratings.average}<span className="text-3xl text-gray-400">/5.0</span>
            </div>
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.round(ratings.average) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} 
                />
              ))}
            </div>
            <div className="text-sm text-gray-400">
              {ratings.total} reviews
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1 w-full max-w-2xl space-y-3">
            {ratings.distribution.map((rating) => (
              <div key={rating.stars} className="flex items-center gap-4">
                <span className="w-4 text-gray-400">{rating.stars}</span>
                <div className="flex gap-2 items-center flex-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-4 h-4 ${
                        rating.count > 0 && i < rating.stars 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                  <Progress 
                    value={ratings.total > 0 ? (rating.count / ratings.total * 100) : 0} 
                    className="h-2 flex-1 bg-gray-700/50"
                    indicatorClassName={`${
                      rating.count > 0 
                        ? 'bg-yellow-400' 
                        : 'bg-gray-600'
                    }`}
                  />
                  <span className="text-sm text-gray-400 w-8">
                    ({rating.count})
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Write Review Button */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold mb-4">Share your Experience</h3>
            <Button 
              variant="default" 
              size="lg" 
              className="bg-[#1a2c4d] hover:bg-[#243a61] text-white border border-gray-600"
            >
              Write a Review
            </Button>
          </div>
        </div>

        {/* Reviews List */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-16 space-y-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <Quote className="w-6 h-6 text-red-500" />
              Customer Reviews
            </h3>
            {product.reviews.map((review) => (
              <Card 
                key={review.id} 
                className="bg-brand/70 border-none text-white p-8 rounded-xl shadow-lg hover:bg-gray-800/70 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gray-700 text-gray-300">
                      <User className="w-6 h-6" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-semibold text-lg">{review.author}</div>
                        <div className="flex items-center gap-3">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-400">
                            {review.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {review.content}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductRating;