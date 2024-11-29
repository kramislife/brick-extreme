import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const handleViewDetails = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <motion.div
      className="bg-brand-gradient text-white border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
        <button 
          onClick={handleViewDetails}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-6 py-2 rounded-md transition-all duration-300 ease-in-out"
        >
          View Details
        </button>
      </div>
      <div className="p-4 flex flex-col h-[120px]">
        <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors mb-auto">
          {product.title}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <p className="text-red-500 font-bold text-xl">${product.price}</p>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-300">
              ({product.reviewCount})
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;