import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const CATEGORIES = ['Electronics', 'Toys', 'Home Decor'];

const ProductCategories = ({ formData, onCheckboxChange }) => {
  return (
    <section className="space-y-6">
      <Label>Product Categories</Label>
      <div className="flex items-center space-x-4">
        {CATEGORIES.map((category) => (
          <div key={category} className="flex items-center space-x-2">
            <Checkbox 
              id={category} 
              checked={formData.productCategories.includes(category)}
              onCheckedChange={(checked) => 
                onCheckboxChange('productCategories', category, checked)
              }
            />
            <Label htmlFor={category}>{category}</Label>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCategories;