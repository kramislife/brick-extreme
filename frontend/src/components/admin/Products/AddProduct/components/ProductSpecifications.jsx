import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ProductSpecifications = ({ formData, onChange }) => {
  return (
    <section className="space-y-6">
      {/* Specification Inputs (Length, Width, Height) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-2">
          <Label htmlFor="length" className="text-lg font-semibold">
            Length
          </Label>
          <Input
            id="length"
            type="number"
            value={formData.length}
            onChange={onChange}
            placeholder="0"
            className="border-2 rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="width" className="text-lg font-semibold">
            Width
          </Label>
          <Input
            id="width"
            type="number"
            value={formData.width}
            onChange={onChange}
            placeholder="0"
            className="border-2 rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height" className="text-lg font-semibold">
            Height
          </Label>
          <Input
            id="height"
            type="number"
            value={formData.height}
            onChange={onChange}
            placeholder="0"
            className="border-2 rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300"
          />
        </div>

        {/* Piece Count */}
        <div className="space-y-2">
          <Label htmlFor="piece_count" className="text-lg font-semibold">
            Piece Count
          </Label>
          <Input
            id="piece_count"
            type="number"
            value={formData.piece_count}
            onChange={onChange}
            placeholder="0"
            className="border-2 rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300"
          />
        </div>
      </div>
    </section>
  );
};

export default ProductSpecifications;
