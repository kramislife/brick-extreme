import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

const StarRating = ({ rating }) => {
  return (
    <div className="flex text-yellow-400">
      {[1, 2, 3, 4, 5].map((index) => {
        const isHalf = rating - index + 1 < 1 && rating - index + 1 > 0;
        const isEmpty = rating - index + 1 <= 0;
        
        return (
          <Star
            key={index}
            className="w-4 h-4"
            fill={isEmpty ? 'none' : isHalf ? 'url(#half)' : 'currentColor'}
            strokeWidth={1.5}
          >
            {isHalf && (
              <defs>
                <linearGradient id="half">
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="transparent" />
                </linearGradient>
              </defs>
            )}
          </Star>
        );
      })}
    </div>
  );
};

const ProductGrid = ({
  title,
  products,
  baseUrl,
  animations,
}) => {
  const navigate = useNavigate();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.2,
  });

  const handleViewDetails = (productId) => {
    navigate(`${baseUrl}/${productId}`);
  };

  return (
    <section ref={ref} className="p-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-3xl text-gray-300 font-extrabold mb-4 text-center pt-6 header-text"
      >
        {title}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex items-center justify-center pb-10"
      >
        <Button className="bg-red-600 hover:bg-red-700">View All</Button>
      </motion.div>

      <motion.div
        variants={animations.containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 py-5"
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            variants={animations.cardVariants}
            custom={index}
          >
            <Card className="bg-brand-gradient text-white border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <button 
                  onClick={() => handleViewDetails(product.id)}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-6 py-2 rounded-md transition-all duration-300 ease-in-out"
                >
                  View Details
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                  {product.title}
                </h3>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-red-500 font-bold text-xl">${product.price}</p>
                  <div className="flex items-center space-x-2">
                    <StarRating rating={product.rating} />
                    <span className="text-sm text-gray-300">({product.reviewCount})</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ProductGrid;