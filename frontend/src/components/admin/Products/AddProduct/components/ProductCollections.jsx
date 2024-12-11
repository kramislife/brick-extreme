import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { useGetCollectionQuery } from "@/redux/api/productApi";
import { toast } from "react-toastify";

const COLLECTIONS = ["Limited Edition", "Classic", "Premium"];

const ACTIVE_COLORS = {
  0: "bg-purple-500 text-white",
};

const DEFAULT_COLOR =
  "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";

const ProductCollections = ({ formData, onChange }) => {
  const { data, isError, error, isLoading } = useGetCollectionQuery();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }

    if (data) {
      console.log(data);
    }
  }, [error, isError, data]);

  return (
    <section className="space-y-6">
      <Label className="text-lg font-semibold">Product Collections</Label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {data?.collections?.map((collection) => (
          <label
            key={collection._id}
            htmlFor={collection}
            className={`flex items-center justify-center p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
              formData.productCollections === collection._id
                ? ACTIVE_COLORS[0]
                : DEFAULT_COLOR
            }`}
          >
            <input
              type="radio"
              id={collection._id}
              name="productCollections"
              value={collection._id}
              checked={formData.productCollections === collection._id}
              onChange={onChange}
              className="hidden"
            />
            <span className="text-sm font-medium">{collection.name}</span>
          </label>
        ))}
      </div>
    </section>
  );
};

export default ProductCollections;
