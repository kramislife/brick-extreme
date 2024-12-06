import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterAccordion from "@/components/product/AllProduct/FilterAccordion";
import ProductSection from "@/components/product/AllProduct/ProductSection";
import { FILTER_CATEGORIES } from "@/constant/productData";
import Metadata from "@/components/layout/Metadata/Metadata";
import { useGetProductsQuery } from "@/redux/api/productApi";
import { Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";

const Products = () => {
  const [searchParams] = useSearchParams();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState(
    Object.keys(FILTER_CATEGORIES)
  );
  const [selectedFilters, setSelectedFilters] = useState({
    price: [],
    theme: [],
    collection: [],
    availability: [],
    skillLevel: [],
    designer: [],
  });

  // Only fetch best seller products
  const { data, isLoading } = useGetProductsQuery(searchParams);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner className="animate-spin" />
      </div>
    );
  }

  const handleFilterChange = (category, value) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter((v) => v !== value);
      } else {
        newFilters[category] = [...newFilters[category], value];
      }
      return newFilters;
    });
  };

  // Filter the best seller products
  const filteredProducts = data?.products.filter((product) => {
    // If no filters are selected, show all products
    if (
      Object.values(selectedFilters).every((filters) => filters.length === 0)
    ) {
      return true;
    }

    // Price filter
    if (selectedFilters.price.length > 0) {
      const price = product.price;
      const matchesPrice = selectedFilters.price.some((range) => {
        const [min, max] = range.split("-").map(Number);
        if (max) {
          return price >= min && price <= max;
        }
        return price > min;
      });
      if (!matchesPrice) return false;
    }

    return true;
  });

  return (
    <>
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
            <SheetContent
              side="left"
              className="w-[350px] bg-darkBrand border-gray-800"
            >
              <SheetHeader>
                <SheetTitle className="text-white text-left">
                  Filters
                </SheetTitle>
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
          <ProductSection products={filteredProducts || []} />
        </div>
      </div>
    </>
  );
};

export default Products;
