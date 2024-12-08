import React, { useState } from "react";
import { Minus, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Metadata from "@/components/layout/Metadata/Metadata";
import StarRating from "@/components/product/shared/StarRating";

const ProductDetails = ({ product, containerVariants, itemVariants }) => {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Only render image gallery if there are images
  const hasImages =
    product?.product_images && product.product_images.length > 0;

  const nextImage = () => {
    if (!hasImages) return;
    setCurrentImageIndex((prev) =>
      prev === product.product_images.length - 1 ? 0 : prev + 1
    );
    document
      .getElementById(
        `thumbnail-${(currentImageIndex + 1) % product.product_images.length}`
      )
      ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const prevImage = () => {
    if (!hasImages) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.product_images.length - 1 : prev - 1
    );
    document
      .getElementById(
        `thumbnail-${
          currentImageIndex === 0
            ? product.product_images.length - 1
            : currentImageIndex - 1
        }`
      )
      ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const selectImage = (index) => {
    if (!hasImages) return;
    setCurrentImageIndex(index);
  };

  return (
    <>
      <Metadata title={product.product_name} />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto px-4 py-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          {hasImages && (
            <motion.div
              variants={itemVariants}
              className="relative flex flex-col-reverse md:flex-row gap-4"
            >
              {/* Thumbnails */}
              <div className="w-full md:w-[130px] h-[130px] md:h-[640px] overflow-x-auto md:overflow-y-auto overflow-y-hidden scrollbar-none">
                <div className="flex flex-row md:flex-col gap-2">
                  {product.product_images.map((image, index) => (
                    <button
                      id={`thumbnail-${index}`}
                      key={index}
                      onClick={() => selectImage(index)}
                      className={`min-w-[130px] md:min-w-0 h-[130px] rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? "border-red-600 border-4"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full aspect-square hover:scale-110 transition-transform duration-300"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Image Display */}
              <div className="flex-1 relative h-[640px] bg-blue-950 rounded-lg overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={product.product_images[currentImageIndex].url}
                    alt={`Product view ${currentImageIndex + 1}`}
                    className="w-full h-full aspect-square"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Product Info */}
          <motion.div variants={itemVariants} className="flex flex-col h-full">
            {/* Basic Info Section - Always visible */}
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-white mb-2">
                {product?.product_name}
              </h1>

              <div className="flex items-center gap-1 mb-8">
                <StarRating rating={product?.ratings} />
                <span className="text-gray-400 ml-2 text-sm">
                  ({product?.ratings})
                </span>
              </div>

              {/* Updated Price Display */}
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-semibold ">
                  $
                  {(
                    (product?.price || 0) -
                    ((product?.price || 0) * (product?.discount || 0)) / 100
                  ).toFixed(2)}
                </span>
                {product?.discount > 0 && (
                  <span className="text-md text-gray-400 line-through">
                    ${product?.price?.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Availability Section */}
            {product?.product_availability && (
              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <span
                    className={`w-2 h-2 rounded-full ${product?.product_availability?.dotColor}`}
                  ></span>
                  <span
                    className={`${product?.product_availability?.textColor} text-sm font-medium`}
                  >
                    {new Date(product?.product_availability).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        year: "numeric",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>
              </div>
            )}

            {/* Details Section */}
            <div className="mb-6">
              {/* Category and Collection row */}
              <div className="flex flex-wrap gap-2 mb-2">
                <div className="flex-1">
                  {/* Category Button */}
                  {product?.product_category &&
                    product?.product_category.map((cat, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="bg-slate-800/50 hover:bg-slate-800 hover:text-white hover:scale-105 transition-all duration-300 border-slate-700 inline-flex w-full text-left justify-start mb-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="whitespace-nowrap">Category:</span>
                          <span className="text-gray-400">{cat?.name}</span>
                        </div>
                      </Button>
                    ))}

                  {/* Includes Button */}
                  {product?.product_includes && (
                    <Button
                      variant="outline"
                      className="bg-slate-800/50 hover:bg-slate-800 hover:text-white hover:scale-105 transition-all duration-300 border-slate-700 inline-flex w-full text-left justify-start"
                    >
                      <div className="flex items-center gap-2">
                        <span className="whitespace-nowrap">Includes:</span>
                        <span className="text-gray-400">
                          {product.product_includes}
                        </span>
                      </div>
                    </Button>
                  )}
                </div>

                {/* Collection Button */}
                {product?.product_collection &&
                  product?.product_collection.map((collection, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="bg-slate-800/50 hover:bg-slate-800 hover:text-white hover:scale-105 transition-all duration-300 border-slate-700 inline-flex w-auto text-left justify-start flex-1"
                    >
                      <div className="flex items-center gap-2">
                        <span className="whitespace-nowrap">Collection:</span>
                        <span className="text-gray-400">
                          {collection?.name}
                        </span>
                      </div>
                    </Button>
                  ))}
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-6">
              {product?.product_description_1 && (
                <p className="text-gray-300 mb-3 leading-loose">
                  {product.product_description_1}
                </p>
              )}
              {product?.product_description_1 && (
                <p className="text-gray-300 mb-3 leading-loose">
                  {product.product_description_1}
                </p>
              )}
              {product?.product_description_1 && (
                <p className="text-gray-300 leading-loose">
                  {product.product_description_1}
                </p>
              )}
            </div>

            {/* Quantity and Cart Section - Always at bottom */}
            <div className="mt-auto">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center border rounded-md">
                  <Button
                    className="rounded-r-none"
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    className="rounded-l-none"
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex space-x-4">
                <Button
                  className="w-full bg-red-600 hover:bg-red-700 hover:scale-105 transition-all duration-300"
                  disabled={!product?.stock || product?.stock <= 0}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="bg-slate-800/50 hover:bg-slate-800 hover:text-white hover:scale-105 transition-all duration-300 border-slate-700 w-full"
                  disabled={!product?.stock || product?.stock <= 0}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default ProductDetails;
