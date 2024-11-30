import React, { useEffect } from "react";
import ProductGrid from "@/components/product/shared/ProductGrid";
import { bestSellingAnimations } from "@/hooks/animationConfig";
import { PRODUCTS } from "@/constant/productData";
import { useGetBestSellerProductsQuery } from "@/redux/api/productApi";
import { Loader } from "lucide-react";

const BestSelling = () => {
  const { data, isLoading, isError, error } = useGetBestSellerProductsQuery();

  useEffect(() => {
    if (isError) {
      toast(error?.data?.message);
    }
  }, [error]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : !isLoading && data.products.length <= 0 ? (
        <p> No products found </p>
      ) : (
        <ProductGrid
          title="Best Selling Products"
          products={data.products}
          baseUrl="/best-selling"
          animations={bestSellingAnimations}
        />
      )}
    </>
  );
};

export default BestSelling;
