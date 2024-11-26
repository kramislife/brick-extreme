import ProductDetails from "@/components/product/BestSelling/ProductDetails";
import ProductRating from "@/components/product/BestSelling/ProductRating";
import ProductSpecification from "@/components/product/BestSelling/ProductSpecification";
import React from "react";

const BestSellingProduct = () => {
  return (
    <>
      <ProductDetails />
      <ProductSpecification />
      <ProductRating />
    </>
  );
};

export default BestSellingProduct;
