import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '@/components/product/shared/ProductDetails';
import ProductRating from '@/components/product/shared/ProductRating';
import ProductSpecification from '@/components/product/shared/ProductSpecification';
import { useGetBestSellerProductsQuery } from "@/redux/api/productApi";
import { Loader } from "lucide-react";
import Metadata from "@/components/layout/Metadata/Metadata";

const ProductView = () => {
  const { id } = useParams();
  
  // Fetch all products and find the specific one
  const { data, isLoading } = useGetBestSellerProductsQuery();
  
  // Find the specific product from the data
  const product = data?.products?.find(p => p._id === id);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Metadata title={product?.product_name || 'Product Details'} />
      <div className="min-h-screen bg-brand-gradient">
        <ProductDetails 
          product={product} 
          containerVariants={containerVariants}
          itemVariants={itemVariants}
        />
        <ProductSpecification product={product} />
        <ProductRating product={product} />
      </div>
    </>
  );
};

export default ProductView;