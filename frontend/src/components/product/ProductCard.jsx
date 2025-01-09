import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import StarRating from "@/components/product/shared/StarRating";
import ProductStatus from "@/components/product/shared/ProductStatus";
import PlaceholderImage from "@/components/product/shared/PlaceholderImage";
import default_product from "@/assets/default/default_product.jpg";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const handleViewDetails = () => {
    if (category) {
      navigate(`/products/${category}/${product?._id}`);
    } else {
      navigate(`/products/${product?._id}`);
    }
  };

  const discountedPrice = product?.discounted_price || 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
    >
      <Card
        onClick={handleViewDetails}
        className="group relative cursor-pointer overflow-hidden border-none bg-brand-gradient transition-all duration-300 hover:shadow-2xl"
      >
        {/* Discount Badge */}
        {product?.discount > 0 && (
          <div className="absolute right-4 top-4 z-10">
            <div className="rounded-full bg-gradient-to-r from-red-700 to-red-500 px-3 py-1.5 text-sm font-medium shadow-lg text-white">
              {product.discount}% OFF
            </div>
          </div>
        )}

        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          {product?.product_images && product?.product_images.length > 0 ? (
            <img
              src={product.product_images[0]?.url || default_product}
              alt={product.product_name || "Product Image"}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <PlaceholderImage />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <button
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-full transform rounded-full bg-gradient-to-r from-red-600 to-red-700 px-6 py-2.5 font-medium text-white opacity-0 shadow-lg transition-all duration-300 ease-out hover:from-red-700 hover:to-red-800 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none"
          >
            View Details
          </button>
        </div>

        {/* Product Info */}
        <CardContent className="flex flex-col gap-5 p-5">
          {/* Product Name */}
          <h3 className="line-clamp-1 text-lg font-semibold text-slate-100 transition-colors">
            {product?.product_name || "Unnamed Product"}
          </h3>

          {/* Categories */}
          {/* <div className="flex flex-wrap gap-1">
          {product?.product_category?.length > 0 ? (
            product.product_category.map((category, index) => (
              <span
                key={index}
                className="text-xs px-2.5 py-1 rounded-full border bg-blue-500/20 text-blue-400 border-blue-500/10 transition-colors duration-300"
              >
                {category.name}
              </span>
            ))
          ) : (
            <span className="text-xs px-2.5 py-1 rounded-full border text-gray-500 border-gray-500/20 capitalize transition-colors duration-300">
              No categories
            </span>
          )}
        </div> */}

          {/* Pricing and Ratings */}
          <div className="mt-auto flex flex-col gap-3">
            {/* Pricing */}
            <div className="flex items-baseline justify-between">
              {product?.price ? (
                <>
                  <p className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-2xl font-bold text-transparent">
                    ${discountedPrice.toFixed(2)}
                  </p>
                  {product?.discount > 0 && (
                    <p className="text-sm text-slate-500 line-through">
                      ${product.price.toFixed(2)}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm text-slate-500">$0.00</p>
              )}
            </div>

            {/* Ratings */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <StarRating rating={product?.ratings || 0} />
                <span className="text-sm text-slate-300/70">
                  ({product?.reviews?.length || 0})
                </span>
              </div>

              {/* Stock Status */}
              {/* <div className="flex items-center h-6">
              {product?.product_category?.length > 0 ? (
                <span className="text-sm bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
                  {product.product_category.map((col) => col.name).join(", ")}
                </span>
              ) : (
                <span className="text-sm text-slate-500">No collection</span>
              )}
              <ProductStatus stock={product?.stock} />
            </div> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
