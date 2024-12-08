import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";

const ProductDescriptions = ({ formData, onChange }) => {
  return (
    <section className="space-y-6">
      {/* Product Description 1 */}
      <div className="space-y-2">
        <Label htmlFor="description1" className="flex items-center gap-2 text-lg font-semibold">
          <FileText className="h-5 w-5 text-blue-600" />
          Product Description 1
        </Label>
        <Textarea
          id="description1"
          value={formData.description1}
          onChange={onChange}
          placeholder="Main product description"
          className="resize-none h-24 w-full border-2 rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300"
        />
      </div>

      {/* Product Description 2 */}
      <div className="space-y-2">
        <Label htmlFor="description2" className="flex items-center gap-2 text-lg font-semibold">
          <FileText className="h-5 w-5 text-blue-600" />
          Product Description 2
        </Label>
        <Textarea
          id="description2"
          value={formData.description2}
          onChange={onChange}
          placeholder="Additional description"
          className="resize-none h-24 w-full border-2 rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300"
        />
      </div>

      {/* Product Description 3 */}
      <div className="space-y-2">
        <Label htmlFor="description3" className="flex items-center gap-2 text-lg font-semibold">
          <FileText className="h-5 w-5 text-blue-600" />
          Product Description 3
        </Label>
        <Textarea
          id="description3"
          value={formData.description3}
          onChange={onChange}
          placeholder="Extra details"
          className="resize-none h-24 w-full border-2 rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300"
        />
      </div>
    </section>
  );
};

export default ProductDescriptions;
