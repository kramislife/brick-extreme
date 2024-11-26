import LatestSpecification from "@/components/product/LatestProduct/LatestSpecification";
import LatestDetails from "@/components/product/LatestProduct/LatestDetails";
import React from "react";
import LatestRating from "@/components/product/LatestProduct/LatestRating";

const LatestSingleProduct = () => {
  return (
    <>
      <LatestDetails />
      <LatestSpecification />
      <LatestRating />
    </>
  );
};

export default LatestSingleProduct;
    