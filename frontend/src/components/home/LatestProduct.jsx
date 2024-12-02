import React from "react";
import ProductGrid from "@/components/product/shared/ProductGrid";
import { latestProductAnimations } from "@/hooks/animationConfig";
// import { PRODUCTS } from "@/constant/productData";

const LatestProduct = () => {
  return (
    <ProductGrid
      title="Latest Products"
      // products={PRODUCTS.latestProducts}
      baseUrl="/latest-product"
      animations={latestProductAnimations}
    />
  );
};

export default LatestProduct;