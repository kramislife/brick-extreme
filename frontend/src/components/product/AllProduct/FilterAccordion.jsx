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
    Categories: "Product Categories",
    collection: "Collections",
    skillLevel: "Skill Level",
    designer: "Designers"
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
      if (categories.Categories) {
        product.product_category.forEach((category) => {
          const matchingOption = categories.Categories.find(
            (opt) => opt.value === category._id
          );
          if (matchingOption) {
            counts.Categories[matchingOption.value]++;
          }
        });
      }

      // Collection
      if (categories.collection && product.collection) {
        const matchingCollection = categories.collection.find(
          (opt) => opt.value === product.collection
        );
        if (matchingCollection) {
          counts.collection[matchingCollection.value]++;
        }
      }

      // Skill Level
      if (categories.skillLevel && product.skillLevel) {
        const matchingSkillLevel = categories.skillLevel.find(
          (opt) => opt.value === product.skillLevel
        );
        if (matchingSkillLevel) {
          counts.skillLevel[matchingSkillLevel.value]++;
        }
      }

      // Designer
      if (categories.designer && product.designer) {
        const matchingDesigner = categories.designer.find(
          (opt) => opt.value === product.designer
        );
        if (matchingDesigner) {
          counts.designer[matchingDesigner.value]++;
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
