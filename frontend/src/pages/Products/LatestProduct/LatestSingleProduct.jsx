import React from "react";
import ProductDetails from "@/components/product/shared/ProductDetails";
import ProductRating from "@/components/product/shared/ProductRating";
import ProductSpecification from "@/components/product/shared/ProductSpecification";
import { PRODUCTS } from "@/constant/productData";
import { useParams } from "react-router-dom";

const LatestSingleProduct = () => {
  const { id } = useParams();
  const product = PRODUCTS.latestProducts?.find(p => p.id === parseInt(id));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <ProductDetails 
        product={product}
        containerVariants={containerVariants}
        itemVariants={itemVariants}
      />
      <ProductSpecification product={product} />
      <ProductRating product={product} />
    </>
  );
};

export default LatestSingleProduct;