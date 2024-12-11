import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useProductFilters = (filterData) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openCategories, setOpenCategories] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { 
    categoriesData, collectionsData, skillLevelsData, designersData,
    categoriesIsError, collectionsIsError, skillLevelsIsError, designerIsError,
    categoriesError, collectionsError, skillLevelsError, designersError 
  } = filterData;

  const filterOptions = {
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
    product_category: categoriesData?.categories?.map((category) => ({
      label: category.name,
      value: category._id,
    })) || [],
    product_collection: collectionsData?.collections?.map((collection) => ({
      label: collection.name,
      value: collection._id,
    })) || [],
    product_skill_level: skillLevelsData?.skillLevels?.map((level) => ({
      label: level.name,
      value: level._id,
    })) || [],
    product_designer: designersData?.designers?.map((designer) => ({
      label: designer.name,
      value: designer._id,
    })) || [],
  };

  useEffect(() => {
    setOpenCategories(Object.keys(filterOptions));
    setSelectedFilters(
      Object.keys(filterOptions).reduce((acc, key) => {
        acc[key] = [];
        return acc;
      }, {})
    );
  }, []);

  useEffect(() => {
    if (categoriesIsError) {
      toast.error(categoriesError?.data?.message || "Failed to load categories.");
    }
    if (collectionsIsError) {
      toast.error(collectionsError?.data?.message || "Failed to load collections.");
    }
    if (skillLevelsIsError) {
      toast.error(skillLevelsError?.data?.message || "Failed to load skill levels.");
    }
    if (designerIsError) {
      toast.error(designersError?.data?.message || "Failed to load designers.");
    }
  }, [categoriesIsError, collectionsIsError, skillLevelsIsError, designerIsError]);

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

  return {
    filterOptions,
    openCategories,
    selectedFilters,
    isFilterOpen,
    setOpenCategories,
    setIsFilterOpen,
    handleFilterChange,
  };
};