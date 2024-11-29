import React from "react";
import ProductGrid from "@/components/product/shared/ProductGrid";
import { bestSellingAnimations } from "@/hooks/animationConfig";
import { PRODUCTS } from "@/constant/productData";
import { useGetBestSellerProductsQuery } from "@/redux/api/productApi";

const BestSelling = () => {
  const { data } = useGetBestSellerProductsQuery();

  
  return (
    <ProductGrid
      title="Best Selling Products"
      products={PRODUCTS.bestSelling}
      baseUrl="/best-selling"
      animations={bestSellingAnimations}
    />
  );
};

export default BestSelling;
