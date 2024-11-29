import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '@/components/product/shared/ProductDetails';
import ProductRating from '@/components/product/shared/ProductRating';
import ProductSpecification from '@/components/product/shared/ProductSpecification';
import { allProducts } from '@/constant/productData';
import Metadata from "@/components/layout/Metadata/Metadata";

const ProductView = () => {
  const { id } = useParams();
  console.log('URL ID:', id);
  
  const product = allProducts.find(p => String(p.id) === String(id));
  console.log('Found Product:', product);
  
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

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }

  return (
    <>
      <Metadata title={product.title} />
      <div className="min-h-screen bg-brand-gradient">
        <ProductDetails 
        product={product} 
        containerVariants={containerVariants}
        itemVariants={itemVariants}
      />
      <ProductRating product={product} />
      <ProductSpecification product={product} />
      </div>
    </>
  );
};

export default ProductView;