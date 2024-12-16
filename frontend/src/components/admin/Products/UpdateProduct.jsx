import React, { useEffect } from "react";
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
import ProductImages from "./AddProduct/components/ProductImages";
import { useParams } from "react-router-dom";
import useProductForm from "@/hooks/useProductForm";

const UpdateProduct = () => {
  const { id } = useParams();
  const {
    formData,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
    handleImageChange,
    handleRemoveImage,
    isLoading,
  } = useProductForm();

  useEffect(() => {
    console.log("Product ID: ", id);
  }, []);

  return (
    <div className="mx-auto py-6 space-y-8">
      <form onSubmit={handleSubmit}>
        <Card className="shadow-xl border-t-4 border-t-blue-500">
          <CardHeader>
            <CardTitle className="text-2xl">Update Product</CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-8">
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

            <ProductImages
              formData={formData}
              onImageChange={handleImageChange}
              onRemoveImage={handleRemoveImage}
            />
            <Separator className="my-6" />

            <ProductStatus
              formData={formData}
              onChange={handleChange}
              onCheckboxChange={handleCheckboxChange}
            />

            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center gap-2 hover:from-blue-700 hover:to-purple-700"
              >
                <Save className="h-4 w-4" />
                {"Update Product"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default UpdateProduct;
