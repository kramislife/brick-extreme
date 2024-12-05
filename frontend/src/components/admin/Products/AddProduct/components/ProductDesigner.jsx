import React from 'react';
import { Label } from "@/components/ui/label";

const DESIGNERS = ['John Doe', 'Jane Smith', 'Alex Johnson'];

const ACTIVE_COLOR = 'bg-blue-500 text-white';
const DEFAULT_COLOR = 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';

const ProductDesigner = ({ formData, onChange }) => {
  return (
    <section className="space-y-6">
      <Label className="text-lg font-semibold">Product Designer</Label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {DESIGNERS.map((designer) => (
          <label
            key={designer}
            htmlFor={designer}
            className={`flex items-center justify-center p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
              formData.productDesigner === designer
                ? ACTIVE_COLOR
                : DEFAULT_COLOR
            }`}
          >
            <input
              type="radio"
              id={designer}
              name="productDesigner"
              value={designer}
              checked={formData.productDesigner === designer}
              onChange={onChange}
              className="hidden"
            />
            <span className="text-sm font-medium">{designer}</span>
          </label>
        ))}
      </div>
    </section>
  );
};

export default ProductDesigner;
