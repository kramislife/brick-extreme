import ProductDetails from "@/components/product/ProductDetails";
import ProductRating from "@/components/product/ProductRating";
import ProductSpecification from "@/components/product/ProductSpecification";
import React from "react";

const SingleProduct = () => {
  return (
    <>
      <ProductDetails />
      <ProductSpecification />
      <ProductRating />
    </>
  );
};

export default SingleProduct;
