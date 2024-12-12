import { useState } from "react";

const useProductForm = () => {
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
      { name: 'length', value: '' },
      { name: 'width', value: '' },
      { name: 'height', value: '' },
      { name: 'piece_count', value: '' }
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
  });

  const handleChange = (e) => {
    const { id, value, type, name } = e.target;
    const fieldName = type === "radio" ? name : id;
    
    // Handle specification fields differently
    if (['length', 'width', 'height', 'piece_count'].includes(fieldName)) {
      setFormData(prev => ({
        ...prev,
        specifications: prev.specifications.map(spec => 
          spec.name === fieldName ? { ...spec, value } : spec
        )
      }));
    } else {
      setFormData(prev => ({
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
    console.log("Form submitted with data:", formData);
    const [createProduct, { isLoading, isError, error }] =
      useCreateProductsMutation(formData);
  };

  return {
    formData,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
  };
};

export default useProductForm;
