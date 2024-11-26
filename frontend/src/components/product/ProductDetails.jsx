import React from 'react';
import { Star, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import droid from "@/assets/bestSellingAssets/droid.png";

const AVAILABILITY_STATES = {
  IN_STOCK: {
    text: "In Stock, Ready to Ship",
    dotColor: "bg-green-500",
    textColor: "text-green-400"
  },
  LIMITED: {
    text: "Limited Stock",
    dotColor: "bg-yellow-500",
    textColor: "text-yellow-400"
  },
  OUT_OF_STOCK: {
    text: "Out of Stock",
    dotColor: "bg-red-500",
    textColor: "text-red-400"
  },
  PRE_ORDER: {
    text: "Pre-order Available",
    dotColor: "bg-blue-500",
    textColor: "text-blue-400"
  },
  COMING_SOON: {
    text: "Coming Soon",
    dotColor: "bg-purple-500",
    textColor: "text-purple-400"
  },
  UNAVAILABLE: {
    text: "Currently Unavailable",
    dotColor: "bg-gray-500",
    textColor: "text-gray-400"
  }
};

const ProductDetails = () => {
  const [quantity, setQuantity] = React.useState(1);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const product = {
    name: "Product Name",
    price: 800,
    originalPrice: 1000,
    rating: 5,
    reviews: 2,
    availability: AVAILABILITY_STATES.IN_STOCK,
    images: [
      droid, droid, droid, droid, droid, 
      droid, droid, droid, droid, droid
    ],
    details: [
      { label: "Category", value: "Space" },
      { label: "Collection", value: "Space Opera" },
      { label: "Includes", value: "User Manual and Ornaments" }
    ],
    description: "Ignite the force with this iconic red lightsaber, a symbol of the light side. Carefully crafted by our MOC Artisan, our invader saber is made with 957 authentic lego pieces. This saber is ready for recreational use, everything from the inside to its smooth blade finish."
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto px-4 py-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side - Image Gallery */}
        <motion.div variants={itemVariants} className="relative flex gap-4">
          <div className="w-[130px] max-h-[600px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <div className="flex flex-col gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => selectImage(index)}
                  className={`w-[130px] aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === index ? 'border-red-500' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 relative h-[600px] bg-blue-950 rounded-lg overflow-hidden">
            <AnimatePresence mode='wait'>
              <motion.img 
                key={currentImageIndex}
                src={product.images[currentImageIndex]} 
                alt={`Product view ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
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

        {/* Right side - Product Info */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h1 className="text-4xl font-bold text-white">{product.name}</h1>
          
          <div className="flex items-center space-x-2">
            {[...Array(product.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
            ))}
            <span className="text-gray-400">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-5xl font-bold text-white">${product.price}</span>
            <span className="text-2xl text-gray-400 line-through">${product.originalPrice}</span>
          </div>

          <div className="space-y-4">
            {/* Product Availability Indicator */}
            <div className="flex items-center space-x-2">
              <span className={`w-2 h-2 rounded-full ${product.availability.dotColor}`}></span>
              <span className={`${product.availability.textColor} font-medium`}>
                {product.availability.text}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                className="bg-slate-800/50 hover:bg-slate-800 border-slate-700"
              >
                Category: {product.details[0].value}
              </Button>
              <Button
                variant="outline"
                className="bg-slate-800/50 hover:bg-slate-800 border-slate-700"
              >
                Collection: {product.details[1].value}
              </Button>
            </div>
            <Button
              variant="outline"
              className="bg-slate-800/50 hover:bg-slate-800 border-slate-700"
            >
              Includes: {product.details[2].value}
            </Button>
          </div>

          <p className="text-gray-300">{product.description}</p>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button 
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
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={product.availability === AVAILABILITY_STATES.OUT_OF_STOCK || 
                         product.availability === AVAILABILITY_STATES.UNAVAILABLE}
              >
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                className="bg-slate-800/50 hover:bg-slate-800 border-slate-700 w-full"
                disabled={product.availability === AVAILABILITY_STATES.UNAVAILABLE}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;