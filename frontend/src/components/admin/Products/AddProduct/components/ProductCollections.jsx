import React from 'react';
import { Label } from "@/components/ui/label";

const COLLECTIONS = ['Limited Edition', 'Classic', 'Premium'];

const ProductCollections = ({ formData, onChange }) => {
  return (
    <section className="space-y-6">
      <Label>Product Collections</Label>
      <div className="flex items-center space-x-4">
        {COLLECTIONS.map((collection) => (
          <div key={collection} className="flex items-center space-x-2">
            <input 
              type="radio"
              id={collection} 
              name="productCollections"
              value={collection}
              checked={formData.productCollections === collection}
              onChange={onChange}
              className="form-radio text-blue-600 h-4 w-4"
            />
            <Label htmlFor={collection}>{collection}</Label>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCollections;