import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Package, DollarSign, Percent, Box } from "lucide-react";

const BasicInformation = ({ formData, onChange }) => {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="flex items-center gap-2">
          <Package className="h-4 w-4 text-blue-600" />
          Product Name
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Enter product name"
          className="border-blue-300 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="price" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            Price
          </Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={onChange}
            placeholder="0.00"
            className="border-green-300 focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="discount" className="flex items-center gap-2">
            <Percent className="h-4 w-4 text-orange-600" />
            Discount
          </Label>
          <Input
            id="discount"
            type="number"
            value={formData.discount}
            onChange={onChange}
            placeholder="0.00"
            className="border-orange-300 focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock" className="flex items-center gap-2">
            <Box className="h-4 w-4 text-purple-600" />
            Stock
          </Label>
          <Input
            id="stock"
            type="number"
            value={formData.stock}
            onChange={onChange}
            placeholder="0"
            className="border-purple-300 focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
    </section>
  );
};

export default BasicInformation;