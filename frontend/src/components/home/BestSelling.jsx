import React from "react";
import ProductGrid from "@/components/product/shared/ProductGrid";
import { bestSellingAnimations } from "@/hooks/animationConfig";
import { sampleData } from "@/constant/productData";



const BestSelling = () => {
  return (
    <ProductGrid
      title="Best Selling Products"
      products={sampleData}
      baseUrl="/best-selling"
      animations={bestSellingAnimations}
    />
  );
};

export default BestSelling;