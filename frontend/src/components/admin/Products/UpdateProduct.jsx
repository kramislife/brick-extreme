import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Save } from "lucide-react";
import BasicInformation from "./AddProduct/components/BasicInformation";
import ProductDescriptions from "./AddProduct/components/ProductDescriptions";
import ProductSpecifications from "./AddProduct/components/ProductSpecifications";
import AdditionalInformation from "./AddProduct/components/AdditionalInformation";
import ProductCategories from "./AddProduct/components/ProductCategories";
import ProductCollections from "./AddProduct/components/ProductCollections";
import ProductIncludes from "./AddProduct/components/ProductIncludes";
import SkillLevel from "./AddProduct/components/SkillLevel";
import ProductDesigner from "./AddProduct/components/ProductDesigner";
import ProductStatus from "./AddProduct/components/ProductStatus";
import { useParams } from "react-router-dom";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const { id } = useParams(); // Get product ID from route params

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
    preorderDate: null, // Add this for pre-order date
  });

  // Fetch product details
  const { data, isLoading, isError, error } = useGetProductDetailsQuery(id);

  // Mutation for updating the product
  const [
    updateProduct,
    {
      isLoading: updateProductIsLoading,
      isError: updateProductIsError,
      error: updateProductError,
    },
  ] = useUpdateProductMutation();

  // Populate product state when data is fetched
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Failed to fetch product details.");
    }

    if (data) {
      console.log(data);

      setFormData({
        // Map data from API to formData structure
        name: data?.product?.product_name || "",
        price: data?.product?.price || "",
        discount: data?.product?.discount || "",
        stock: data?.product?.stock || "",
        description1: data?.product?.product_description_1 || "",
        description2: data?.product?.product_description_2 || "",
        description3: data?.product?.product_description_3 || "",
        specifications: [
          { name: "length", value: data?.product?.product_length || "" },
          { name: "width", value: data?.product?.product_width || "" },
          { name: "height", value: data?.product?.product_height || "" },
          {
            name: "piece_count",
            value: data?.product?.product_piece_count || "",
          },
        ],
        manufacturer: data?.product?.manufacturer || "",
        seller: data?.product?.seller || "",
        tags: data?.product?.tags?.join(", ") || "",
        productCategories:
          data?.product?.product_category.map((cat) => cat._id) || [],
        productCollections:
          data?.product?.product_collection.map((col) => col._id) || [],

        productIncludes: data?.product?.product_includes?.split(", ") || [],
        skillLevel: data?.product?.product_skill_level?._id || "",
        productDesigner: data?.product?.product_designer?._id || "",
        isActive: data?.product?.is_active ? "yes" : "no",
        availability: data?.product?.product_availability || "In Stock",
        preorder: data?.product?.is_preorder || false,
        preorderDate: data?.product?.preorder_date
          ? new Date(data?.product?.preorder_date)
          : null,
      });
    }
  }, [isError, error, data]); // Dependency array

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle input changes for checkboxes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: checked,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateProduct = {
      product_name: formData.name,
      price: parseFloat(formData.price),
      discount: parseFloat(formData.discount),
      stock: parseInt(formData.stock, 10),
      product_description_1: formData.description1,
      product_description_2: formData.description2 || "",
      product_description_3: formData.description3 || "",
      product_category: formData.productCategories,
      product_collection: formData.productCollections,
      product_piece_count: parseInt(
        formData.specifications.find((spec) => spec.name === "piece_count")
          ?.value || 0,
        10
      ),
      product_availability:
        formData.availability === "In Stock"
          ? null
          : formData.preorder_availability_date ||
            new Date().toISOString().split("T")[0],

      product_length: parseFloat(
        formData.specifications.find((spec) => spec.name === "length")?.value ||
          0
      ),
      product_width: parseFloat(
        formData.specifications.find((spec) => spec.name === "width")?.value ||
          0
      ),
      product_height: parseFloat(
        formData.specifications.find((spec) => spec.name === "height")?.value ||
          0
      ),
      product_includes: formData.productIncludes.join(", "),
      product_skill_level: formData.skillLevel,
      product_designer: formData.productDesigner,
      ratings: 0, // Default value
      seller: formData.seller || "Brick Extreme",
      tags: formData.tags.split(",").map((tag) => tag.trim()) || [],
      is_active: formData.isActive === "yes" ? true : false,
      manufacturer: formData.manufacturer || "Unknown", // Fallback to "Unknown" if manufacturer is empty
      is_preorder: formData.preorder,
      preorder_date: formData.preorderDate
        ? formData.preorderDate.toISOString().split("T")[0]
        : null, // Format date for preorder
      createdBy: user?._id,
    };

    createProduct(newProduct);
    console.log("Form submitted with data:", formData);
  };

  // Loading state
  if (isLoading || !formData) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="mx-auto py-6 space-y-8">
      <form onSubmit={handleSubmit}>
        <Card className="shadow-xl border-t-4 border-t-blue-500">
          <CardHeader>
            <CardTitle className="text-2xl">Update Product</CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-8">
            {/* Pass individual fields to components */}
            <BasicInformation formData={formData} onChange={handleChange} />
            <Separator className="my-6" />

            <ProductDescriptions formData={formData} onChange={handleChange} />
            <Separator className="my-6" />

            <ProductSpecifications
              formData={formData}
              onChange={handleChange}
            />
            <Separator className="my-6" />

            <AdditionalInformation
              formData={formData}
              onChange={handleChange}
            />
            <Separator className="my-6" />

            <ProductCategories
              formData={formData}
              onCheckboxChange={handleCheckboxChange}
            />
            <Separator className="my-6" />

            <ProductCollections formData={formData} onChange={handleChange} />
            <Separator className="my-6" />

            <ProductIncludes
              formData={formData}
              onCheckboxChange={handleCheckboxChange}
            />
            <Separator className="my-6" />

            <SkillLevel formData={formData} onChange={handleChange} />
            <Separator className="my-6" />

            <ProductDesigner formData={formData} onChange={handleChange} />
            <Separator className="my-6" />

            <ProductStatus
              formData={formData}
              onChange={handleChange}
              onCheckboxChange={handleCheckboxChange}
            />

            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button
                type="submit"
                disabled={updateProductIsLoading}
                className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center gap-2 hover:from-blue-700 hover:to-purple-700 ${
                  updateProductIsLoading ? "opacity-50" : ""
                }`}
              >
                <Save className="h-4 w-4" />
                {updateProductIsLoading ? "Updating..." : "Update Product"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default UpdateProduct;
