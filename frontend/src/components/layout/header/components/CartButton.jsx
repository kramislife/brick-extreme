import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CartButton = ({ itemCount = 0, showAnimation = false, onClick }) => {
  return (
    <button
      className="text-white hover:text-gray-200 relative"
      onClick={onClick}
    >
      <ShoppingCart size={24} />

      {/* Counter Badge - Always visible with conditional animation */}
      <motion.span
        key="cart-count"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 25,
          delay: 0.2,
        }}
        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
      >
        {itemCount}
      </motion.span>

      {/* Add to Cart Animation */}
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            key="cart-ping"
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute inset-0 rounded-full bg-red-500"
          />
        )}
      </AnimatePresence>
    </button>
  );
};

export default CartButton;
