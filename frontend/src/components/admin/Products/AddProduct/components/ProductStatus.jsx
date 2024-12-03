import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const ProductStatus = ({ formData, onChange, onCheckboxChange }) => {
  return (
    <>
      <section className="space-y-6">
        <Label>Is Active</Label>
        <div className="flex items-center space-x-4">
          {['Yes', 'No'].map((status) => (
            <div key={status} className="flex items-center space-x-2">
              <input 
                type="radio"
                id={status} 
                name="isActive"
                value={status}
                checked={formData.isActive === status}
                onChange={onChange}
                className="form-radio text-blue-600 h-4 w-4"
              />
              <Label htmlFor={status}>{status}</Label>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <Label>Product Availability</Label>
        <div className="flex items-center space-x-4">
          {['In Stock', 'Out of Stock'].map((availability) => (
            <div key={availability} className="flex items-center space-x-2">
              <input 
                type="radio"
                id={availability} 
                name="availability"
                value={availability}
                checked={formData.availability === availability}
                onChange={onChange}
                className="form-radio text-blue-600 h-4 w-4"
              />
              <Label htmlFor={availability}>{availability}</Label>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="preorder" 
            checked={formData.preorder}
            onCheckedChange={(checked) => 
              onCheckboxChange('preorder', checked, checked)
            }
          />
          <Label htmlFor="preorder">Preorder Available</Label>
        </div>
      </section>
    </>
  );
};

export default ProductStatus;