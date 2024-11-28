import React from "react";
import droid from "@/assets/bestSellingAssets/droid.png";
import { Button } from "@/components/ui/button";
import {
  Card,
} from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { bestSellingAnimations } from "@/hooks/animationConfig";
import { useNavigate } from "react-router-dom";

const sampleData = [
  { id: 1, title: "Nutcracker", price: 800, image: droid },
  { id: 2, title: "Nutcracker", price: 800, image: droid },
  { id: 3, title: "Nutcracker", price: 800, image: droid },
  { id: 4, title: "Nutcracker", price: 800, image: droid },
];

const BestSelling = () => {
  const navigate = useNavigate();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.1,
  });
 
  const handleViewDetails = (productId) => {
    navigate(`/best-selling/${productId}`);
  };
  
  return (
    <section ref={ref} className="p-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-3xl text-gray-300 font-extrabold mb-4 text-center pt-6 header-text"
      >
        Best Selling Products
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
        variants={bestSellingAnimations.containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 py-5"
      >
        {sampleData.map((item) => (
          <motion.div
            key={item.id}
            variants={bestSellingAnimations.itemVariants}
          >
            <Card className="bg-brand-gradient text-white border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <button 
                  onClick={() => handleViewDetails(item.id)}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-6 py-2 rounded-md transition-all duration-300 ease-in-out"
                >
                  View Details
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-red-500 font-bold text-xl">${item.price}</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.209-6.045 5.891 1.428 8.329L12 18.896 4.617 23.447l1.428-8.329-6.045-5.891 8.332-1.209L12 .587z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-300">(88)</span>
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

export default BestSelling;