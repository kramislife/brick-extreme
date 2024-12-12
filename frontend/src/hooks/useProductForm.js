import { useCreateProductMutation } from "@/redux/api/productApi";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useProductForm = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [createProduct, { data, isLoading, isError, error, isSuccess }] =
    useCreateProductMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/products");
    }
    if (isError) {
      console.log(error?.data?.message);
    }
  }, [data, isError, error]);

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
    availability: "",
    preorder: false,
    images: [],
  });

  const handleChange = (e) => {
    const { id, value, type, name } = e.target;
    const fieldName = type === "radio" ? name : id;

    // Handle specification fields differently
    if (["length", "width", "height", "piece_count"].includes(fieldName)) {
      setFormData((prev) => ({
        ...prev,
        specifications: prev.specifications.map((spec) =>
          spec.name === fieldName ? { ...spec, value } : spec
        ),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    }
  };

  const handleCheckboxChange = (field, value, isChecked) => {
    setFormData((prev) => {
      if (isChecked) {
        return {
          ...prev,
          [field]: Array.isArray(prev[field])
            ? [...prev[field], value]
            : [value],
        };
      } else {
        return {
          ...prev,
          [field]: Array.isArray(prev[field])
            ? prev[field].filter((item) => item !== value)
            : [],
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      product_name: formData.name,
      price: parseFloat(formData.price),
      discount: parseFloat(formData.discount),
      stock: parseInt(formData.stock, 10),
      product_description_1: formData.description1,
      product_description_2: formData.description2 || "",
      product_description_3: formData.description3 || "",
      product_images: formData.images || [],
      product_category: formData.productCategories,
      product_collection: formData.productCollections,
      product_piece_count: parseInt(
        formData.specifications.find((spec) => spec.name === "piece_count")
          ?.value || 0,
        10
      ),
      product_availability:
        formData.availability === "In Stock"
          ? new Date().toISOString().split("T")[0] // Current date in YYYY-MM-DD format
          : "Unavailable",
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
      is_preorder: formData?.preorder[0],
      createdBy: user?._id,
    };

    createProduct(newProduct);
    console.log("Form submitted with data:", formData);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 10) {
      toast.error("Maximum 10 images allowed");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 10),
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return {
    formData,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
    handleImageChange,
    handleRemoveImage,
    isLoading,
  };
};

export default useProductForm;
