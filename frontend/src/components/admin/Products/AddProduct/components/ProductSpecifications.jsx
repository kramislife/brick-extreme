import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ProductSpecifications = ({ formData, onChange }) => {
  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="length">Length</Label>
          <Input
            id="length"
            type="number"
            value={formData.length}
            onChange={onChange}
            placeholder="0"
            className="border-blue-300"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="width">Width</Label>
          <Input
            id="width"
            type="number"
            value={formData.width}
            onChange={onChange}
            placeholder="0"
            className="border-blue-300"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">Height</Label>
          <Input
            id="height"
            type="number"
            value={formData.height}
            onChange={onChange}
            placeholder="0"
            className="border-blue-300"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="piece_count">Piece Count</Label>
        <Input
          id="piece_count"
          type="number"
          value={formData.piece_count}
          onChange={onChange}
          placeholder="0"
          className="border-blue-300"
        />
      </div>
    </section>
  );
};

export default ProductSpecifications;