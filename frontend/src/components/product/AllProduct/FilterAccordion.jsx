import React, { useEffect, useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

const FilterAccordion = ({
  categories,
  openCategories,
  onCategoriesChange,
  selectedFilters,
  onFilterChange,
  products,
}) => {
  const filterCounts = useMemo(() => {
    const counts = {};

    // Initialize counts for each category and option
    Object.entries(categories).forEach(([categoryKey, category]) => {
      console.log(categoryKey, "  category ", category);

      counts[categoryKey] = {};
      category.forEach((option) => {
        counts[categoryKey][option.label] = 0;
      });

      console.log(counts[categoryKey], " CODE AFTER ");
    });

    // Count products for each filter option
    products.forEach((product) => {
      // Price ranges
      const price = product.price;
      if (categories.price) {
        if (price >= 0 && price <= 100) {
          counts.price["0-100"]++;
        } else if (price > 100 && price <= 500) {
          counts.price["101-500"]++;
        } else if (price > 500 && price <= 1000) {
          counts.price["501-1000"]++;
        } else if (price > 1000) {
          counts.price["1000+"]++;
        }
      }

      // Categories (from product categories)
      const productCategories = product.product_category || [];
      productCategories.forEach((category) => {
        if (
          categories.categories &&
          counts.categories?.hasOwnProperty(category.name)
        ) {
          counts.categories[category.name]++;
        }
      });

      // Collection (from details)
      const collectionDetail = product.product_collection?.find(
        (detail) => detail.label === "Collection"
      );
      if (collectionDetail && categories.collection) {
        const collectionValue = collectionDetail.value
          .toLowerCase()
          .replace(/\s+/g, "-");
        if (counts.collection?.hasOwnProperty(collectionValue)) {
          counts.collection[collectionValue]++;
        }
      }

      // Skill Level (from specifications)
      const skillLevelSpec = product.specifications?.find(
        (spec) => spec.type === "skillLevel"
      );
      if (
        skillLevelSpec &&
        skillLevelSpec.items.length > 0 &&
        categories.skillLevel
      ) {
        const skillLevel = skillLevelSpec.items[0].toLowerCase();
        if (counts.skillLevel?.hasOwnProperty(skillLevel)) {
          counts.skillLevel[skillLevel]++;
        }
      }

      // Designer (from specifications)
      console.log("PRODUCT SPECIFICATION:", product);

      const designerSpec = product.specifications?.find(
        (spec) => spec.type === "designer"
      );
      if (
        designerSpec &&
        designerSpec.items.length > 0 &&
        categories.designer
      ) {
        const designer = designerSpec.items[0]
          .toLowerCase()
          .replace(/\s+/g, "-");
        if (counts.designer?.hasOwnProperty(designer)) {
          counts.designer[designer]++;
        }
      }
    });

    return counts;
  }, [categories, products]);

  return (
    <Accordion
      type="multiple"
      value={openCategories}
      onValueChange={onCategoriesChange}
      className="space-y-2"
    >
      {Object.entries(categories).map(([key, category]) => (
        <AccordionItem
          key={key}
          value={key}
          className="border border-gray-700 rounded-md my-2 bg-brand"
        >
          <AccordionTrigger className="px-4 py-3 transition-colors group hover:no-underline rounded-md">
            <span className="font-semibold text-white group-hover:text-red-400">
              {key}
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3 bg-darkBrand rounded-b-md">
            {category.map((option) => {
              const count = filterCounts[key]?.[option.value] || 0;
              const isDisabled = count === 0;

              return (
                <label
                  key={option.value}
                  htmlFor={`${key}-${option.value}`}
                  className={`flex items-center justify-between py-2 px-2 rounded-md ${
                    isDisabled
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-brand group cursor-pointer"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`${key}-${option.value}`}
                      checked={selectedFilters[key]?.includes(option.value)}
                      onCheckedChange={(checked) =>
                        !isDisabled && onFilterChange(key, option.value)
                      }
                      disabled={isDisabled}
                      className="border-gray-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 disabled:opacity-50"
                    />
                    <span
                      className={`text-sm ${
                        isDisabled
                          ? "text-gray-500"
                          : "text-gray-300 group-hover:text-red-400"
                      } py-2`}
                    >
                      {option.label}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">({count})</span>
                </label>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FilterAccordion;
