import React from "react";
import droid from "@/assets/bestSellingAssets/droid.png";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { bestSellingAnimations } from "@/hooks/animationConfig";

const sampleData = [
  { id: 1, title: "Nutcracker", price: 800, image: droid },
  { id: 2, title: "Nutcracker", price: 800, image: droid },
  { id: 3, title: "Nutcracker", price: 800, image: droid },
  { id: 4, title: "Nutcracker", price: 800, image: droid },
];

const BestSelling = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.2,
    margin: "0px 0px -100px 0px"
  });
 
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
            <Card className="w-[350px] mx-auto border rounded-md shadow-md bg-brand-gradient-r text-white relative group overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105">
              <CardHeader className="relative overflow-hidden p-0">
                <div className="relative w-full h-[320px]">
                  <img
                    src={item.image}
                    alt="Nutcracker"
                    className="h-full w-full object-fill rounded-t-md"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
                <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-6 py-2 rounded-md transition-all duration-300 ease-in-out">
                  View Details
                </button>
              </CardHeader>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-red-500 text-md">${item.price}</p>
              </CardContent>
              <CardFooter className="p-4">
                <div className="flex items-center justify-center">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                      >
                        <path d="M12 .587l3.668 7.431 8.332 1.209-6.045 5.891 1.428 8.329L12 18.896 4.617 23.447l1.428-8.329-6.045-5.891 8.332-1.209L12 .587z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-300 text-sm">(88)</span>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default BestSelling;