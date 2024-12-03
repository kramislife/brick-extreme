import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const INCLUDES = ['Instructions', 'Minifigures'];

const ProductIncludes = ({ formData, onCheckboxChange }) => {
  return (
    <section className="space-y-6">
      <Label>Product Includes</Label>
      <div className="flex items-center space-x-4">
        {INCLUDES.map((item) => (
          <div key={item} className="flex items-center space-x-2">
            <Checkbox 
              id={item} 
              checked={formData.productIncludes.includes(item)}
              onCheckedChange={(checked) => 
                onCheckboxChange('productIncludes', item, checked)
              }
            />
            <Label htmlFor={item}>{item}</Label>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductIncludes;