import React from 'react';
import { Label } from "@/components/ui/label";

const COLLECTIONS = ['Limited Edition', 'Classic', 'Premium'];

const ACTIVE_COLORS = {
  'Limited Edition': 'bg-purple-500 text-white',
  Classic: 'bg-gray-500 text-white',
  Premium: 'bg-yellow-500 text-white',
};

const DEFAULT_COLOR = 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';

const ProductCollections = ({ formData, onChange }) => {
  return (
    <section className="space-y-6">
      <Label className="text-lg font-semibold">Product Collections</Label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {COLLECTIONS.map((collection) => (
          <label
            key={collection}
            htmlFor={collection}
            className={`flex items-center justify-center p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
              formData.productCollections === collection
                ? ACTIVE_COLORS[collection]
                : DEFAULT_COLOR
            }`}
          >
            <input
              type="radio"
              id={collection}
              name="productCollections"
              value={collection}
              checked={formData.productCollections === collection}
              onChange={onChange}
              className="hidden"
            />
            <span className="text-sm font-medium">{collection}</span>
          </label>
        ))}
      </div>
    </section>
  );
};

export default ProductCollections;
