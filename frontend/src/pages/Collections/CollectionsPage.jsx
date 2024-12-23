import React from "react";
import { Card, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import image1 from "@/assets/ImageTest/Collection_1.jpg";
import Metadata from "@/components/layout/Metadata/Metadata";
import { useGetCollectionQuery } from "@/redux/api/productApi";
import { useNavigate } from "react-router-dom";

const CollectionsPage = () => {
  const navigate = useNavigate();
  const { data } = useGetCollectionQuery();

  const handleCollectionClick = (collectionId) => {
    navigate(`/products?product_collection=${collectionId}`);
  };
  return (
    <>
      <Metadata title="All Collections" />
      <div className="min-h-screen bg-brand-gradient">
        <div className="mx-auto p-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl text-gray-300 font-extrabold mb-8 text-center pt-6 header-text"
          >
            All Collections
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {data?.collections?.map((collection) => (
              <motion.div
                key={collection._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onClick={() => handleCollectionClick(collection._id)}
                className="cursor-pointer"
              >
                <Card className="overflow-hidden bg-gradient-r border-none rounded-lg cursor-pointer">
                  <motion.div
                    className="relative w-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.img
                      src={collection.image || image1}
                      alt={collection.name}
                      className="w-full h-[30vh] object-fill"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-black"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.3 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>

                  <CardFooter className="p-4 bg-gradient-to-t from-black/60">
                    <motion.h3
                      className="text-lg font-semibold text-gray-200 text-center w-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {collection.name}
                    </motion.h3>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CollectionsPage;
