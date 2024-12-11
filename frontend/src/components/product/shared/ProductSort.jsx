import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductSort = ({ totalProducts, currentProducts, currentSort, onSortChange }) => {
  const sortOptions = [
    { value: "name_asc", label: "Name: A to Z" },
    { value: "name_desc", label: "Name: Z to A" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "date_asc", label: "Date: Oldest to Newest" },
    { value: "date_desc", label: "Date: Newest to Oldest" },
  ];

  return (
    // Showing number of products
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="text-gray-300">
        Showing{" "}
        <span className="font-semibold text-white">{currentProducts}</span>
        {" of "}
        <span className="font-semibold text-white">{totalProducts}</span>
        {" products"}
      </div>
    
       {/* Sorting a products */}
      <div className="flex items-center gap-2">
        <span className="text-gray-300">Sort by:</span>
        <Select value={currentSort} onValueChange={onSortChange}>
          <SelectTrigger className="w-[220px] bg-darkBrand border-gray-700 text-gray-300">
            <SelectValue placeholder="Select sorting" />
          </SelectTrigger>
          <SelectContent className="bg-darkBrand border-gray-700">
            {sortOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="text-gray-300 hover:text-white cursor-pointer"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProductSort;
