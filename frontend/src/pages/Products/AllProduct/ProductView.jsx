import React from "react";
import { useParams } from "react-router-dom";
import AllDetails from "@/components/product/AllProduct/AllDetails";
import AllSpecification from "@/components/product/AllProduct/AllSpecification";
import AllRating from "@/components/product/AllProduct/AllRating";

const ProductView = () => {
  const { id } = useParams();

  return (
    <>
      <AllDetails productId={id} />
      <AllSpecification productId={id} />
      <AllRating productId={id} />
    </>
  );
};

export default ProductView;