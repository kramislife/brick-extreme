import React, { useEffect, useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

const getDisplayName = (key) => {
  const displayNames = {
    price: "Price Range",
    product_category: "Product Categories",
    product_collection: "Collections",
    product_skill_level: "Skill Level",
    product_designer: "Designers",
  };
  return displayNames[key] || key;
};

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

    // Initialize counts
    Object.entries(categories).forEach(([categoryKey, category]) => {
      counts[categoryKey] = {};
      category.forEach((option) => {
        counts[categoryKey][option.value] = 0;
      });
      // console.log(counts, " check ");
    });

    // Count products for each filter option
    products.forEach((product) => {
      // Price ranges
      const price = product.price;
      if (categories.price) {
        categories.price.forEach((range) => {
          const [min, max] = range.value.split("-").map(Number);
          if (max) {
            if (price >= min && price <= max) {
              counts.price[range.value]++;
            }
          } else {
            // Handle "1000+" case
            if (price > min) {
              counts.price[range.value]++;
            }
          }
        });
      }

      // Categories
      {
        console.log(categories.product_category);
      }
      if (categories.product_category && product.product_category) {
        product.product_category.forEach((category) => {
          if (counts.product_category[category._id] !== undefined) {
            counts.product_category[category._id]++;
          }
        });
      }

      // Collections
      if (categories.product_collection && product.product_collection) {
        product.product_collection.forEach((collection) => {
          if (counts.product_collection[collection._id] !== undefined) {
            counts.product_collection[collection._id]++;
          }
        });
      }
      // Skill Level
      if (categories.product_skill_level && product.product_skill_level) {
        const skillLevelId =
          product.product_skill_level?._id ?? product.product_skill_level;
        if (
          skillLevelId &&
          counts.product_skill_level[skillLevelId] !== undefined
        ) {
          counts.product_skill_level[skillLevelId]++;
        }
      }

      // Designer
      if (categories.product_designer && product.product_designer) {
        const designerId =
          product.product_designer?._id ?? product.product_designer;
        if (designerId && counts.product_designer[designerId] !== undefined) {
          counts.product_designer[designerId]++;
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
              {getDisplayName(key)}
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
