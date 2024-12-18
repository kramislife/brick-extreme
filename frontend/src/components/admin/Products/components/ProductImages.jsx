import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

const ProductImages = ({ formData, onImageChange, onRemoveImage }) => {
  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <Label className="text-lg font-semibold">Product Images</Label>
        <span className="text-sm text-gray-500">
          {formData.images.length}/10 images
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Image Upload Button */}
        {formData.images.length < 10 && (
          <div className="relative h-40 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={onImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              aria-label="Upload images"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <Upload className="h-6 w-6 text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">Upload Images</span>
            </div>
          </div>
        )}

        {/* Preview Images */}
        {formData.images.map((image, index) => (
          <div
            key={index}
            className="relative h-40 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
          >
            <img
              src={URL.createObjectURL(image)}
              alt={`Product preview ${index + 1}`}
              className="w-full h-full object-cover rounded-lg border"
            />
            <Button
              type="button"
              onClick={() => onRemoveImage(index)}
              className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full bg-red-500 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4 text-white" />
            </Button>
          </div>
        ))}
      </div>

      <div className="text-sm text-red-600">
        * Upload up to 10 product images. Supported formats: JPG, PNG, WEBP
      </div>
    </section>
  );
};

export default ProductImages;