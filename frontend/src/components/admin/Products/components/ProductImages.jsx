import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "@/redux/api/productApi";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X, ImagePlus, AlertCircle, Info } from "lucide-react";
import Metadata from "@/components/layout/Metadata/Metadata";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";

const ProductImages = () => {
  const { id } = useParams();
  const { data: productData, isLoading } = useGetProductDetailsQuery(id);

  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [thumbnailImages, setThumbnailImages] = useState([]);
  const [thumbnailPreviewUrls, setThumbnailPreviewUrls] = useState([]);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const supportedTypes = ["image/jpeg", "image/png", "image/webp"];
  const maxSize = 5 * 1024 * 1024;

  useEffect(() => {
    if (productData?.product) {
      // Set main image (index 0)
      setMainImage(productData.product.product_images?.[0] || null);
      setMainImagePreview(productData.product.product_images?.[0]?.url || null);

      // Set thumbnail images (index 1 onwards)
      setThumbnailImages(productData.product.product_images?.slice(1) || []);
      setThumbnailPreviewUrls(
        productData.product.product_images?.slice(1)?.map((img) => img.url) ||
          []
      );
    }
  }, [productData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <>
          <LoadingSpinner />
        </>
      </div>
    );
  }

  const validateFile = (file) => {
    if (!supportedTypes.includes(file.type)) {
      setError("Only JPG, PNG, and WEBP files are supported");
      return false;
    }
    if (file.size > maxSize) {
      setError("Files must be less than 5MB");
      return false;
    }
    return true;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e, isMain = false) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);

    if (isMain) {
      const file = files[0];
      if (file && validateFile(file)) {
        if (mainImagePreview) {
          URL.revokeObjectURL(mainImagePreview);
        }
        setMainImage(file);
        setMainImagePreview(URL.createObjectURL(file));
      }
    } else {
      handleThumbnailUpload({ target: { files } });
    }
  };

  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    setError("");

    if (!file) return;
    if (!validateFile(file)) return;

    if (mainImagePreview) {
      URL.revokeObjectURL(mainImagePreview);
    }

    setMainImage(file);
    setMainImagePreview(URL.createObjectURL(file));
  };

  const handleThumbnailUpload = (e) => {
    const files = Array.from(e.target.files);
    setError("");

    const validFiles = files.filter(validateFile);

    if (thumbnailImages.length + validFiles.length > 10) {
      setError("You can only upload up to 10 thumbnail images");
      return;
    }

    setThumbnailImages((prev) => [...prev, ...validFiles]);
    const newPreviewUrls = validFiles.map((file) => URL.createObjectURL(file));
    setThumbnailPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
  };

  const removeMainImage = () => {
    if (mainImagePreview) {
      URL.revokeObjectURL(mainImagePreview);
    }
    setMainImage(null);
    setMainImagePreview(null);
  };

  const removeThumbnail = (index) => {
    URL.revokeObjectURL(thumbnailPreviewUrls[index]);
    setThumbnailImages((prev) => prev.filter((_, i) => i !== index));
    setThumbnailPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!mainImage) {
      setError("Please upload a main product image");
      return;
    }

    // Combine main image and thumbnails in correct order
    const allImages = [mainImage, ...thumbnailImages];
    console.log("All Images in order:", allImages);
  };

  return (
    <>
      <Metadata title="Product Images" />
      <section className="mx-auto py-5">
        <div className="rounded-2xl border border-gray-700 shadow-xl">
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h2 className="text-3xl font-bold text-white">
                  Product Images
                </h2>
                <p className="text-gray-400">
                  Upload and manage your product images
                </p>
              </div>
              <span className="px-4 py-2 rounded-full text-sm font-medium">
                {thumbnailImages.length}/10 thumbnails
              </span>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 text-red-400 bg-red-950/50 border border-red-900/50 p-4 rounded-lg">
                <AlertCircle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            )}

            {/* Main Image Section */}
            <div className="space-y-4">
              {/* <Label className="text-lg font-semibold text-white">Main Product Image</Label> */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className={`relative aspect-square rounded-xl hover:border-blue-500 ${
                    isDragging
                      ? "border-2 border-blue-500"
                      : "border-2 border-dashed border-gray-600"
                  } transition-all duration-200`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, true)}
                >
                  {!mainImage ? (
                    <>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleMainImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <ImagePlus className="h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-lg font-medium text-gray-300">
                          Drop your main image here
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          or click to browse
                        </p>
                        <p className="text-xs text-gray-500 mt-4">
                          Supports JPG, PNG, WEBP (max 5MB)
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="relative h-full group">
                      <img
                        src={mainImagePreview}
                        alt="Main product"
                        className="w-full h-full object-fill rounded-xl"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity rounded-lg cursor-pointer" />
                      <Button
                        type="button"
                        onClick={removeMainImage}
                        className="absolute top-4 right-4 h-10 w-10 p-0 rounded-full bg-red-500 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        <X className="h-5 w-5 text-white" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Thumbnail Grid */}
                <div className="space-y-4">
                  {/* <Label className="text-lg font-semibold text-white">Thumbnail Images</Label> */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {thumbnailImages.length < 10 && (
                      <div
                        className={`relative aspect-square rounded-lg hover:border-blue-500 ${
                          isDragging
                            ? "border-2 border-blue-500"
                            : "border-2 border-dashed border-gray-600"
                        } transition-all duration-200`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        <input
                          type="file"
                          multiple
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleThumbnailUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <Upload className="h-6 w-6 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-400">
                            Add Thumbnails
                          </p>
                        </div>
                      </div>
                    )}

                    {thumbnailPreviewUrls.map((url, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden group border border-gray-600"
                      >
                        <img
                          src={url}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-fill"
                        />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity cursor-pointer" />
                        <Button
                          type="button"
                          onClick={() => removeThumbnail(index)}
                          className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full bg-red-500 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-all duration-200"
                        >
                          <X className="h-4 w-4 text-white" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-700">
              <div className="flex items-center gap-2">
                <Info />
                <p className="text-sm text-red-400 flex items-center gap-2">
                  Upload 1 main image and up to 10 thumbnail images
                </p>
              </div>
              <Button
                onClick={handleSubmit}
                disabled={!mainImage}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Images
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductImages;
