import React from 'react';
import { Label } from "@/components/ui/label";

const DESIGNERS = ['John Doe', 'Jane Smith', 'Alex Johnson'];

const ProductDesigner = ({ formData, onChange }) => {
  return (
    <section className="space-y-6">
      <Label>Product Designer</Label>
      <div className="flex items-center space-x-4">
        {DESIGNERS.map((designer) => (
          <div key={designer} className="flex items-center space-x-2">
            <input 
              type="radio"
              id={designer} 
              name="productDesigner"
              value={designer}
              checked={formData.productDesigner === designer}
              onChange={onChange}
              className="form-radio text-blue-600 h-4 w-4"
            />
            <Label htmlFor={designer}>{designer}</Label>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductDesigner;