import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import FilterAccordion from "@/components/product/AllProduct/FilterAccordion";
import ProductSection from "@/components/product/AllProduct/ProductSection";
import Metadata from "@/components/layout/Metadata/Metadata";
import {
  useGetProductsQuery,
  useGetCategoryQuery,
  useGetCollectionQuery,
  useGetSkillLevelsQuery,
  useGetDesignersQuery,
} from "@/redux/api/productApi";
import { Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";
import { toast } from "react-toastify";
import CustomPagination from "@/components/product/shared/CustomPagination";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const currentPage = Number(searchParams.get("page")) || 1;

  // Fetch data for products and filters
  const {
    data: productData,
    isLoading: isProductLoading,
    isError: productError,
    error: productErrorMsg,
  } = useGetProductsQuery(searchParams.toString());

  const {
    data: categoriesData,
    isLoading: categoriesIsLoading,
    isError: categoriesIsError,
    error: categoriesError,
  } = useGetCategoryQuery();

  const {
    data: collectionsData,
    isLoading: collectionsIsLoading,
    isError: collectionsIsError,
    error: collectionsError,
  } = useGetCollectionQuery();

  const {
    data: skillLevelsData,
    isLoading: skillLevelsIsLoading,
    isError: skillLevelsIsError,
    error: skillLevelsError,
  } = useGetSkillLevelsQuery();

  const {
    data: designersData,
    isLoading: designersIsLoading,
    isError: designerIsError,
    error: designersError,
  } = useGetDesignersQuery();

  useEffect(() => {
    if (categoriesIsError) {
      toast.error(
        categoriesError?.data?.message || "Failed to load categories."
      );
    }
    if (collectionsIsError) {
      toast.error(
        collectionsError?.data?.message || "Failed to load collections."
      );
    }
    if (skillLevelsIsError) {
      toast.error(
        skillLevelsError?.data?.message || "Failed to load skill levels."
      );
    }
    if (designerIsError) {
      toast.error(designersError?.data?.message || "Failed to load designers.");
    }
    if (productError) {
      toast.error(
        productErrorMsg?.data?.message ||
          "An error occurred while fetching products."
      );
    }
  }, [
    categoriesIsError,
    categoriesError,
    collectionsIsError,
    collectionsError,
    skillLevelsIsError,
    skillLevelsError,
    designerIsError,
    designersError,
    productError,
    productErrorMsg,
  ]);

  const filterOptions = useMemo(
    () => ({
      price: [
        { label: "$0-$100", value: "0-100" },
        { label: "$101-$500", value: "101-500" },
        { label: "$501-$1000", value: "501-1000" },
        { label: "$1000+", value: "1000+" },
      ],
      Categories:
        categoriesData?.categories?.map((category) => ({
          label: category.name,
          value: category._id,
        })) || [],
      collection:
        collectionsData?.collections?.map((collection) => ({
          label: collection.name,
          value: collection._id,
        })) || [],
      skillLevel:
        skillLevelsData?.skillLevels?.map((level) => ({
          label: level.name,
          value: level._id,
        })) || [],
      designer:
        designersData?.designers?.map((designer) => ({
          label: designer.name,
          value: designer._id,
        })) || [],
    }),
    [categoriesData, collectionsData, skillLevelsData, designersData]
  );

  useEffect(() => {
    setOpenCategories(Object.keys(filterOptions));
    setSelectedFilters(
      Object.keys(filterOptions).reduce((acc, key) => {
        acc[key] = [];
        return acc;
      }, {})
    );
  }, [filterOptions]);

  const filteredProducts = useMemo(() => {
    if (!productData?.products) return [];
    
    return productData.products.filter((product) => {
      // If no filters are selected, show all products
      if (Object.values(selectedFilters).every((filters) => filters.length === 0)) {
        return true;
      }

      // Check each filter category
      for (const [key, selectedValues] of Object.entries(selectedFilters)) {
        if (selectedValues.length === 0) continue;

        switch (key) {
          case 'price':
            const price = product.price;
            const matchesPrice = selectedValues.some((range) => {
              const [min, max] = range.split("-").map(Number);
              return max ? price >= min && price <= max : price > min;
            });
            if (!matchesPrice) return false;
            break;

          case 'Categories':
            const hasCategory = product.product_category.some(cat => 
              selectedValues.includes(cat._id)
            );
            if (!hasCategory) return false;
            break;

          case 'collection':
            const hasCollection = product.product_collection?.some(col => 
              selectedValues.includes(col._id)
            );
            if (!hasCollection) return false;
            break;

          case 'skillLevel':
            if (!product.product_skill_level) return false;
            const skillLevelId = typeof product.product_skill_level === 'string'
              ? product.product_skill_level
              : product.product_skill_level._id;
            if (!selectedValues.includes(skillLevelId)) {
              return false;
            }
            break;

          case 'designer':
            if (!product.product_designer) return false;
            const designerId = typeof product.product_designer === 'string'
              ? product.product_designer
              : product.product_designer._id;
            if (!selectedValues.includes(designerId)) {
              return false;
            }
            break;
        }
      }
      return true;
    });
  }, [productData?.products, selectedFilters]);

  const handlePageChange = (page) => {
    if (page < 1 || page > productData?.totalPages) return;
    
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page);
    
    // Preserve existing filters when changing pages
    if (selectedFilters) {
      Object.entries(selectedFilters).forEach(([key, values]) => {
        if (values && values.length > 0) {
          newSearchParams.set(key, values.join(','));
        } else {
          newSearchParams.delete(key);
        }
      });
    }
    
    setSearchParams(newSearchParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isProductLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Metadata title="Products" />
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
                  categories={filterOptions}
                  openCategories={openCategories}
                  onCategoriesChange={setOpenCategories}
                  selectedFilters={selectedFilters}
                  onFilterChange={(category, value) => {
                    setSelectedFilters((prev) => ({
                      ...prev,
                      [category]: prev[category]?.includes(value)
                        ? prev[category].filter((v) => v !== value)
                        : [...(prev[category] || []), value],
                    }));
                  }}
                  products={productData?.products || []}
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
                categories={filterOptions}
                openCategories={openCategories}
                onCategoriesChange={setOpenCategories}
                selectedFilters={selectedFilters}
                onFilterChange={(category, value) => {
                  setSelectedFilters((prev) => ({
                    ...prev,
                    [category]: prev[category]?.includes(value)
                      ? prev[category].filter((v) => v !== value)
                      : [...(prev[category] || []), value],
                  }));
                }}
                products={productData?.products || []}
              />
            </div>
          </div>

          {/* Products Grid */}
          <ProductSection products={filteredProducts || []} />
        </div>

        {/* Add pagination at the bottom */}
        <div className="flex justify-center">
          <CustomPagination
            currentPage={currentPage}
            totalPages={productData?.totalPages || 1}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Products;
