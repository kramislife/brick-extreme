import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const ACTIVE_COLOR = 'bg-blue-500 text-white';
const DEFAULT_COLOR = 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';

const ProductStatus = ({ formData, onChange, onCheckboxChange }) => {
  return (
    <div className="space-y-6">
      {/* Product Status Section */}
      <section>
        <Label className="text-lg font-semibold">Product Status</Label>
        <div className="grid grid-cols-3 gap-4">
          {/* Yes Option */}
          <label
            htmlFor="yes"
            className={`flex items-center justify-center p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
              formData.isActive === 'Yes' ? ACTIVE_COLOR : DEFAULT_COLOR
            }`}
          >
            <input
              type="radio"
              id="yes"
              name="isActive"
              value="Yes"
              checked={formData.isActive === 'Yes'}
              onChange={onChange}
              className="hidden"
            />
            <span className="text-sm font-medium">Yes</span>
          </label>

          {/* No Option */}
          <label
            htmlFor="no"
            className={`flex items-center justify-center p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
              formData.isActive === 'No' ? ACTIVE_COLOR : DEFAULT_COLOR
            }`}
          >
            <input
              type="radio"
              id="no"
              name="isActive"
              value="No"
              checked={formData.isActive === 'No'}
              onChange={onChange}
              className="hidden"
            />
            <span className="text-sm font-medium">No</span>
          </label>

          {/* Preorder Available Option */}
          <label
            htmlFor="preorder"
            className={`flex items-center justify-center p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
              formData.preorder ? ACTIVE_COLOR : DEFAULT_COLOR
            }`}
          >
            <Checkbox
              id="preorder"
              checked={formData.preorder}
              onCheckedChange={(checked) =>
                onCheckboxChange('preorder', checked, checked)
              }
              className="hidden"
            />
            <span className="text-sm font-medium">Preorder Available</span>
          </label>
        </div>
      </section>

      {/* Product Availability Section */}
      <section>
        <Label className="text-lg font-semibold">Product Availability</Label>
        <div className="grid grid-cols-2 gap-4">
          {['In Stock', 'Out of Stock'].map((availability) => (
            <label
              key={availability}
              htmlFor={availability}
              className={`flex items-center justify-center p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                formData.availability === availability
                  ? ACTIVE_COLOR
                  : DEFAULT_COLOR
              }`}
            >
              <input
                type="radio"
                id={availability}
                name="availability"
                value={availability}
                checked={formData.availability === availability}
                onChange={onChange}
                className="hidden"
              />
              <span className="text-sm font-medium">{availability}</span>
            </label>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductStatus;
