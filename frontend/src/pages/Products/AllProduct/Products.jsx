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
import ProductSort from "@/components/product/shared/ProductSort";
import useScrollToTop from "@/hooks/useScrollToTop";

const sortProducts = (products, sortType) => {
  const sortedProducts = [...products];
  
  // Helper function to calculate discounted price
  const getDiscountedPrice = (product) => {
    return product.price - (product.price * (product.discount || 0)) / 100;
  };

  switch (sortType) {
    case 'name_asc':
      return sortedProducts.sort((a, b) => a.product_name.localeCompare(b.product_name));
    case 'name_desc':
      return sortedProducts.sort((a, b) => b.product_name.localeCompare(a.product_name));
    case 'price_asc':
      return sortedProducts.sort((a, b) => getDiscountedPrice(a) - getDiscountedPrice(b));
    case 'price_desc':
      return sortedProducts.sort((a, b) => getDiscountedPrice(b) - getDiscountedPrice(a));
    case 'date_asc':
      return sortedProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    case 'date_desc':
      return sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    default:
      return sortedProducts;
  }
};

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const currentPage = Number(searchParams.get("page")) || 1;
  const [currentSort, setCurrentSort] = useState("date_desc");
  const scrollToTop = useScrollToTop();

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
      rating: [
        { label: "5 Stars", value: "5", stars: 5 },
        { label: "4 to 4.9 Stars", value: "4", stars: 4 },
        { label: "3 to 3.9 Stars", value: "3", stars: 3 },
        { label: "2 to 2.9 Stars", value: "2", stars: 2 },
        { label: "1 to 1.9 Stars", value: "1", stars: 1 },
      ],
      product_category:
        categoriesData?.categories?.map((category) => ({
          label: category.name,
          value: category._id,
        })) || [],
      product_collection:
        collectionsData?.collections?.map((collection) => ({
          label: collection.name,
          value: collection._id,
        })) || [],
      product_skill_level:
        skillLevelsData?.skillLevels?.map((level) => ({
          label: level.name,
          value: level._id,
        })) || [],
      product_designer:
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

  // Create a memoized sorted products array
  const sortedProducts = useMemo(() => {
    return sortProducts(productData?.allProducts || [], currentSort);
  }, [productData?.allProducts, currentSort]);

  // Calculate paginated products
  const paginatedProducts = useMemo(() => {
    const itemsPerPage = 9; 
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, currentPage]);

  // Separated page change handler
  const handlePageChange = (page) => {
    if (page < 1 || page > productData?.totalPages) return;

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page);
    setSearchParams(newSearchParams);
    scrollToTop();
  };

  // Update handleSortChange to just update the sort state
  const handleSortChange = (value) => {
    setCurrentSort(value);
    // Reset to first page when sorting changes
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", "1");
    setSearchParams(newSearchParams);
    scrollToTop();
  };

  // Handle filter changes by updating URL search params and selected filters state
  const handleFilterChange = (category, value) => {
    const newSearchParams = new URLSearchParams(searchParams);

    setSelectedFilters((prev) => {
      const updated = {
        ...prev,
        [category]: prev[category]?.includes(value)
          ? prev[category].filter((v) => v !== value)
          : [...(prev[category] || []), value],
      };

      Object.entries(updated).forEach(([key, values]) => {
        if (values && values.length > 0) {
          newSearchParams.set(key, values.join(","));
        } else {
          newSearchParams.delete(key);
        }
      });

      newSearchParams.delete("page");
      setSearchParams(newSearchParams);

      return updated;
    });
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
      <div className="mx-auto px-4 py-8">
        {/* Mobile Filter and Sort */}
        <div className="lg:hidden mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <button className="flex items-center gap-2 bg-transparent">
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
                    onFilterChange={handleFilterChange}
                    products={productData?.allProducts || []}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm">Sort by:</span>
            <ProductSort
              totalProducts={productData?.filteredProductCount || 0}
              currentProducts={productData?.products?.length || 0}
              currentSort={currentSort}
              onSortChange={handleSortChange}
              className="!mb-0"
              hideProductCount={true}
              minimal={true}
            />
          </div>
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
                onFilterChange={handleFilterChange}
                products={productData?.allProducts || []}
              />
            </div>
          </div>

          {/* Products Grid with Sort */}
          <div className="col-span-1 lg:col-span-3">
            {/* Desktop Sort - hidden on mobile */}
            <div className="hidden lg:block">
              <ProductSort
                totalProducts={productData?.filteredProductCount || 0}
                currentProducts={productData?.products?.length || 0}
                currentSort={currentSort}
                onSortChange={handleSortChange}
              />
            </div>
            <ProductSection products={paginatedProducts} />
          </div>
        </div>

        {/* Pagination */}
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
