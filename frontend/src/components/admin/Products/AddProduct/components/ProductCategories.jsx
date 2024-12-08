import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const CATEGORIES = ['Electronics', 'Toys', 'Home Decor'];

const CATEGORY_COLORS = {
  Electronics: 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300',
  Toys: 'bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300',
  HomeDecor: 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300',
};

const DEFAULT_COLOR = 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';

const ProductCategories = ({ formData, onCheckboxChange }) => {
  return (
    <section className="space-y-6">
      <Label className="text-lg font-semibold">Product Categories</Label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {CATEGORIES.map((category) => {
          const isChecked = formData.productCategories.includes(category);
          return (
            <div 
              key={category} 
              className={`flex items-center space-x-3 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                isChecked ? (CATEGORY_COLORS[category.replace(' ', '')] || DEFAULT_COLOR) : DEFAULT_COLOR
              }`}
            >
              <Checkbox
                id={category}
                checked={isChecked}
                onCheckedChange={(checked) =>
                  onCheckboxChange('productCategories', category, checked)
                }
                className="w-5 h-5 border-gray-300 rounded focus:ring focus:ring-opacity-50"
              />
              <Label 
                htmlFor={category} 
                className="text-sm font-medium"
              >
                {category}
              </Label>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductCategories;
