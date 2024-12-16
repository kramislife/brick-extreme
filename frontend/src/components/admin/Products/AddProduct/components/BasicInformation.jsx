import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Package, DollarSign, Percent, Box } from "lucide-react";

const ACTIVE_COLOR = "bg-blue-500 text-white";

const BasicInformation = ({ formData, onChange }) => {
  useEffect(() => {
    console.log("BASIC INFO :", formData);
  }, []);
  return (
    <section className="space-y-6">
      {/* Product Name */}
      <div className="space-y-2">
        <Label
          htmlFor="name"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <Package className="h-5 w-5 text-blue-600" />
          Product Name
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Enter product name"
          className="border-2 rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300"
        />
      </div>

      {/* Product Price, Discount, and Stock */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Price */}
        <div className="space-y-2">
          <Label
            htmlFor="price"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <DollarSign className="h-5 w-5 text-green-600" />
            Price
          </Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={onChange}
            placeholder="0.00"
            className="border-2 rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300"
          />
        </div>

        {/* Discount */}
        <div className="space-y-2">
          <Label
            htmlFor="discount"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Percent className="h-5 w-5 text-orange-600" />
            Discount
          </Label>
          <Input
            id="discount"
            type="number"
            value={formData.discount}
            onChange={onChange}
            placeholder="0.00"
            className="border-2 rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300"
          />
        </div>

        {/* Stock */}
        <div className="space-y-2">
          <Label
            htmlFor="stock"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Box className="h-5 w-5 text-purple-600" />
            Stock
          </Label>
          <Input
            id="stock"
            type="number"
            value={formData.stock}
            onChange={onChange}
            placeholder="0"
            className="border-2 rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300"
          />
        </div>
      </div>
    </section>
  );
};

export default BasicInformation;
