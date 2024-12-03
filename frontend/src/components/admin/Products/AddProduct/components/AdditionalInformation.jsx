import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const AdditionalInformation = ({ formData, onChange }) => {
  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="seller">Seller</Label>
          <Input
            id="seller"
            value={formData.seller}
            onChange={onChange}
            placeholder="Enter seller name"
            className="border-blue-300"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="manufacturer">Manufacturer</Label>
          <Input
            id="manufacturer"
            value={formData.manufacturer}
            onChange={onChange}
            placeholder="Enter manufacturer"
            className="border-blue-300"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={onChange}
          placeholder="Enter tags separated by commas"
          className="border-blue-300"
        />
      </div>
    </section>
  );
};

export default AdditionalInformation;