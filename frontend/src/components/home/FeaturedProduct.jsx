import React from "react";
import { Button } from "@/components/ui/button";
import image1 from "@/assets/bannerAssets/Banner-1.png";
import image2 from "@/assets/bannerAssets/Banner-3.png";
import { motion, useInView } from "framer-motion";
import { featuredProductAnimations } from "@/hooks/animationConfig";

const FeaturedProducts = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
  });

  return (
    <section ref={ref} className="p-4">
      <motion.h2
        variants={featuredProductAnimations.titleVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-3xl text-gray-300 font-extrabold mb-4 text-center pt-6 header-text"
      >
        Featured Products
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex items-center justify-center pb-10"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button className="bg-red-600 hover:bg-red-700">View All</Button>
        </motion.div>
      </motion.div>

      <motion.div
        variants={featuredProductAnimations.containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="space-y-3"
      >
        {[image1, image2].map((image, index) => (
          <motion.div
            key={index}
            variants={featuredProductAnimations.imageVariants}
            className="relative overflow-hidden group"
          >
            <motion.img
              src={image}
              alt={`Featured Product ${index + 1}`}
              className="w-full lg:h-[80vh] h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100"
            >
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-red-600 hover:bg-button/85 text-white px-6 py-2 rounded-md"
              >
                View Details
              </motion.button>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturedProducts;
