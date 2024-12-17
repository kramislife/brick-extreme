import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "@/redux/api/productApi";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BasicInformation from "./AddProduct/components/BasicInformation";
import { Separator } from "@/components/ui/separator"; // Correct the import for Separator

const UpdateProduct = () => {
  const { id } = useParams();
  const {
    data: currentProduct,
    isLoading: currentProductIsLoading,
    error: currentProductError,
  } = useGetProductDetailsQuery(id);

  const [updateProduct, { isLoading, isError, error }] =
    useUpdateProductMutation();

  const [formData, setFormData] = useState({
    // Basic Information
    name: "",
    price: "",
    discount: "",
    stock: "",

    // Descriptions
    description1: "",
    description2: "",
    description3: "",

    // Specifications as array of objects
    specifications: [
      { name: "length", value: "" },
      { name: "width", value: "" },
      { name: "height", value: "" },
      { name: "piece_count", value: "" },
    ],

    // Additional Information
    manufacturer: "",
    seller: "",
    tags: "",

    // New Fields
    productCategories: [],
    productCollections: "",
    productIncludes: [],
    skillLevel: "",
    productDesigner: "",
    isActive: "",
    availability: null,
    preorder: false,
    preorderDate: null,
  });

  // Set initial data once product details are fetched
  useEffect(() => {
    if (currentProduct?.product) {
      setFormData({
        name: currentProduct?.product?.product_name || "",
        price: currentProduct?.product?.price || "",
        discount: currentProduct?.product?.discount || "",
        stock: currentProduct?.product?.stock || "",

        description1: currentProduct?.product?.product_description_1 || "",
        description2: currentProduct?.product?.product_description_2 || "",
        description3: currentProduct?.product?.product_description_3 || "",

        specifications: [
          {
            name: "length",
            value: currentProduct?.product?.product_length || "",
          },
          {
            name: "width",
            value: currentProduct?.product?.product_width || "",
          },
          {
            name: "height",
            value: currentProduct?.product?.product_height || "",
          },
          {
            name: "piece_count",
            value: currentProduct?.product?.product_piece_count || "",
          },
        ],

        manufacturer: currentProduct?.product?.manufacturer || "",
        seller: currentProduct?.product?.seller || "",
        tags: currentProduct?.product?.tags || "",

        productCategories: currentProduct?.product?.product_category || [],
        productCollections: currentProduct?.product?.product_collection || "",
        productIncludes: currentProduct?.product?.product_includes || [],
        skillLevel: currentProduct?.product?.product_skill_level || "",
        productDesigner: currentProduct?.product?.product_designer || "",
        isActive: currentProduct?.product?.is_active || false,
        availability: currentProduct?.product?.product_availability || null,
        preorder: currentProduct?.product?.is_preorder || false,
        preorderDate: currentProduct?.product?.product_availability || null, // Optional
      });
    }
  }, [currentProduct]);

  // Handle changes in the form data
  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct({ id, ...formData });
  };

  if (currentProductIsLoading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  if (currentProductError) {
    return (
      <div className="text-red-500">
        Error fetching product details: {currentProductError.message}
      </div>
    );
  }

  return (
    <div className="mx-auto py-6 space-y-8">
      <Card className="shadow-xl border-t-4 border-t-blue-500">
        <CardHeader>
          <CardTitle className="text-2xl">Update Product</CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-8">
          <form onSubmit={handleSubmit}>
            <BasicInformation
              formData={formData}
              onChange={handleBasicInfoChange}
            />
            <Separator className="my-6" />
            <div className="flex justify-end gap-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Product"}
              </button>
            </div>
            {isError && (
              <div className="text-red-500 mt-2">
                Error: {error?.message || "Something went wrong!"}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateProduct;
