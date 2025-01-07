import React from "react";
import { motion, useInView } from "framer-motion";
import { featuredProductAnimations } from "@/hooks/Animation/animationConfig";
import { useGetCollectionQuery } from "@/redux/api/productApi";
import { useNavigate } from "react-router-dom";
import default_product from "@/assets/default/default_product.jpg";
import PlaceholderImage from "@/components/product/shared/PlaceholderImage";

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const { data: collectionsData } = useGetCollectionQuery();

  // Get top 2 collections
  const featuredCollections = collectionsData?.collections?.slice(0, 2) || [];

  const handleCollectionClick = (collectionId) => {
    navigate(`/products?product_collection=${collectionId}`);
  };

  return (
    <section ref={ref} className="px-4 pb-10 pt-5">
      <motion.h2
        variants={featuredProductAnimations.titleVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-3xl text-gray-300 font-extrabold mb-4 text-center pt-6 header-text"
      >
        Featured Collections
      </motion.h2>

      <motion.div
        variants={featuredProductAnimations.containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="space-y-3 pt-4 cursor-pointer"
      >
        {featuredCollections.map((collection) => (
          <motion.div
            key={collection._id}
            variants={featuredProductAnimations.imageVariants}
            className="relative overflow-hidden group"
            onClick={() => handleCollectionClick(collection._id)}
          >
            {collection?.image?.url ? (
              <motion.img
                src={collection.image.url || default_product}
                alt={collection.name}
                className="w-full lg:h-[80vh] h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
            ) : (
              <PlaceholderImage  />
            )}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {collection.name}
                </h3>
                <button className="bg-red-600 hover:bg-button/85 text-white px-6 py-2 rounded-md">
                  View Collection
                </button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturedProducts;
