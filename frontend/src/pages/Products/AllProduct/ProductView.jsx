import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "@/components/product/shared/ProductDetails";
import ProductRating from "@/components/product/shared/ProductRating";
import ProductSpecification from "@/components/product/shared/ProductSpecification";
import { Loader } from "lucide-react";
import Metadata from "@/components/layout/Metadata/Metadata";
import { useGetProductDetailsQuery } from "@/redux/api/productApi";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";

const ProductView = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetProductDetailsQuery(id);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [error, isError]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <>
      <Metadata title={data?.product?.product_name || "Product Details"} />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="min-h-screen bg-brand-gradient">
          <ProductDetails
            product={data?.product}
            containerVariants={containerVariants}
            itemVariants={itemVariants}
          />
          <ProductSpecification product={data?.product} />
          <ProductRating product={data?.product} />
        </div>
      )}
    </>
  );
};

export default ProductView;
