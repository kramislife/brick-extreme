import React, { useState, useMemo } from "react";
import FilterAccordion from "@/components/product/AllProduct/FilterAccordion";
import ProductSection from "@/components/product/AllProduct/ProductSection";
import { allProducts, FILTER_CATEGORIES } from "@/constant/productData";
import Metadata from "@/components/layout/Metadata/Metadata";

import { Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Products = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState(Object.keys(FILTER_CATEGORIES));
  const [selectedFilters, setSelectedFilters] = useState({
    price: [],
    theme: [],
    collection: [],
    availability: [],
    skillLevel: [],
    designer: []
  });

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // If no filters are selected, show all products
      if (Object.values(selectedFilters).every(filters => filters.length === 0)) {
        return true;
      }

      // Check price range
      if (selectedFilters.price.length > 0) {
        const price = product.price;
        const matchesPrice = selectedFilters.price.some(range => {
          const [min, max] = range.split('-').map(Number);
          if (max) {
            return price >= min && price <= max;
          }
          return price > min; // For "1000+" case
        });
        if (!matchesPrice) return false;
      }

      // Check theme
      if (selectedFilters.theme.length > 0) {
        const theme = product.details.find(detail => detail.label === "Theme")?.value.toLowerCase().replace(/\s+/g, '-');
        if (!theme || !selectedFilters.theme.includes(theme)) return false;
      }

      // Check collection
      if (selectedFilters.collection.length > 0) {
        const collection = product.details.find(detail => detail.label === "Collection")?.value.toLowerCase().replace(/\s+/g, '-');
        if (!collection || !selectedFilters.collection.includes(collection)) return false;
      }

      // Check availability
      if (selectedFilters.availability.length > 0) {
        const availability = product.availability?.text;
        const matchesAvailability = selectedFilters.availability.some(filter => {
          switch (filter) {
            case 'in-stock': return availability?.includes('In Stock');
            case 'pre-order': return availability?.includes('Pre-order');
            case 'coming-soon': return availability?.includes('Coming Soon');
            case 'limited': return availability?.includes('Limited');
            default: return false;
          }
        });
        if (!matchesAvailability) return false;
      }

      // Check skill level
      if (selectedFilters.skillLevel.length > 0) {
        const skillLevel = product.specifications?.find(spec => spec.type === "skillLevel")?.items[0]?.toLowerCase();
        if (!skillLevel || !selectedFilters.skillLevel.includes(skillLevel)) return false;
      }

      // Check designer
      if (selectedFilters.designer.length > 0) {
        const designer = product.specifications?.find(spec => spec.type === "designer")?.items[0]?.toLowerCase().replace(/\s+/g, '-');
        if (!designer || !selectedFilters.designer.includes(designer)) return false;
      }

      return true;
    });
  }, [selectedFilters]);

  const handleFilterChange = (category, value) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter(v => v !== value);
      } else {
        newFilters[category] = [...newFilters[category], value];
      }
      return newFilters;
    });
  };

  return (
    <>
    <Metadata title="All Products" />
    <div className="mx-auto p-4">
      {/* Mobile Filter */}
      <div className="lg:hidden mb-4">
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <button className="flex items-center space-x-2 bg-brand px-4 py-2 rounded-lg">
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[350px] bg-darkBrand border-gray-800">
            <SheetHeader>
              <SheetTitle className="text-white text-left">Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6 overflow-y-auto scrollbar-none h-full">
              <FilterAccordion 
                categories={FILTER_CATEGORIES}
                openCategories={openCategories}
                onCategoriesChange={setOpenCategories}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 py-2">
        {/* Desktop Filter */}
        <div className="hidden lg:block col-span-1 border border-gray-600 rounded-xl shadow-lg p-4 sticky top-24 h-[85vh]">
          <div className="flex items-center mb-4 space-x-2">
            <Filter className="h-6 w-6 text-white" />
            <h2 className="text-xl font-bold text-white">Filters</h2>
          </div>
          
          <div className="max-h-[75vh] overflow-y-auto pr-2">
            <FilterAccordion 
              categories={FILTER_CATEGORIES}
              openCategories={openCategories}
              onCategoriesChange={setOpenCategories}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>

        {/* Products Grid */}
        <ProductSection products={filteredProducts} />
      </div>
    </div>
    </>
  );
};

export default Products;