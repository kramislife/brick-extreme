import React from "react";
import { Card, CardFooter } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { categoryAnimations } from "@/hooks/animationConfig";
import { useNavigate } from "react-router-dom";
import { categories } from "@/pages/Categories/CategoriesPage";

const Categories = () => {
  const navigate = useNavigate();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.2,
  });

  const displayedCategories = categories.slice(0, 6);

  return (
    <div ref={ref} className="p-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-3xl text-gray-300 font-extrabold mb-4 text-center pt-6 header-text"
      >
        Browse by Collections
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center justify-center pb-10"
      >
        <button
          className="py-2 px-6 rounded-md text-white font-semibold bg-red-600 hover:bg-red-700"
          onClick={() => navigate('/categories')}
        >
          View All 
        </button>
      </motion.div>

      <motion.div
        variants={categoryAnimations.containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mx-auto mb-8"
      >
        {displayedCategories.map((category, index) => (
          <motion.div
            key={category.id}
            variants={categoryAnimations.cardVariants}
            custom={index}
          >
            <Card className="overflow-hidden bg-gradient-r border-none rounded-lg cursor-pointer">
              <motion.div 
                className="relative w-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-[450px] object-fill"
                  {...categoryAnimations.imageVariants}
                />
                <motion.div
                  className="absolute inset-0 bg-black"
                  initial="initial"
                  whileHover="hover"
                  variants={categoryAnimations.overlayVariants}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <CardFooter className="p-4 bg-gradient-to-t from-black/60">
                  <motion.h3
                    className="text-base sm:text-lg font-semibold text-gray-200 text-center w-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {category.title}
                  </motion.h3>
                </CardFooter>
              </motion.div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Categories;