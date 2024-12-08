import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import StarRating from "@/components/product/shared/StarRating";
import defaultImage from "@/assets/bestSellingAssets/droid.png";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const handleViewDetails = () => {
    if (category) {
      navigate(`/products/${category}/${product._id}`);
    } else {
      navigate(`/products/${product._id}`);
    }
  };

  // Calculate discounted price
  const discountedPrice =
    product?.price - (product?.price * (product?.discount || 0)) / 100;

  return (
    <motion.div
      className="bg-brand-gradient text-white border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product?.product_images?.[0]?.url || defaultImage}
          alt={product.product_name}
          className="w-full h-full aspect-square transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
        {product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md text-sm font-semibold">
            {product.discount}% OFF
          </div>
        )}
        <button
          onClick={handleViewDetails}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-6 py-2 rounded-md transition-all duration-300 ease-in-out"
        >
          View Details
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors mb-5 line-clamp-2">
          {product.product_name}
        </h3>

        {/* Pricing and Ratings */}
        <div className="mt-auto">
          <div className="flex flex-col gap-2">
            {/* Pricing */}
            <div className="flex items-baseline justify-between">
              <p className="text-red-500 font-semibold text-xl pb-2">
                ${discountedPrice.toFixed(2)}
              </p>
              {product.discount > 0 && (
                <p className="text-sm text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </p>
              )}
            </div>

            {/* Ratings and Stock */}
            <div className="flex items-center justify-between text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <StarRating rating={product.ratings} />
                <span>({product.ratings})</span>
              </div>
              {/* <span className="text-green-400 font-medium">In Stock</span> */}
              <span className="text-green-400 font-medium">
                {product?.product_category.map((category, index) => {
                  return (
                    <span key={index} className="capitalize mr-2">
                      {category.name}
                    </span>
                  );
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
