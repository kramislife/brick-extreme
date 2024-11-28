import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Filter, Star } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import defaultProductImage from "@/assets/bestSellingAssets/droid.png";
import { useGetProductsQuery } from "@/redux/api/productApi";

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();

  console.log("PRODUCT:", data, isLoading);

  const filterCategories = {
    priceRange: {
      title: "Price Range",
      options: [
        { value: "Under $100", count: 15 },
        { value: "$100-$500", count: 25 },
        { value: "$500-$1000", count: 10 },
        { value: "Over $1000", count: 5 },
      ],
    },
    category: {
      title: "Category",
      options: [
        { value: "Collectibles", count: 20 },
        { value: "Star Wars", count: 15 },
        { value: "Holiday Themes", count: 10 },
        { value: "Movies Memorabilia", count: 12 },
      ],
    },
    availability: {
      title: "Availability",
      options: [
        { value: "In Stock", count: 45 },
        { value: "Limited Edition", count: 8 },
        { value: "Pre-order", count: 7 },
      ],
    },
    skillLevel: {
      title: "Skill Level",
      options: [
        { value: "Beginner", count: 25 },
        { value: "Intermediate", count: 18 },
        { value: "Expert", count: 12 },
      ],
    },
    pieceCount: {
      title: "Piece Count",
      options: [
        { value: "100-249", count: 20 },
        { value: "250-499", count: 15 },
        { value: "500-999", count: 10 },
        { value: "1000+", count: 5 },
      ],
    },
  };

  const initialProducts = [
    {
      id: 1,
      name: "Classic Nutcracker",
      price: 800,
      category: "Collectibles",
      availability: "In Stock",
      skillLevel: "Expert",
      pieceCount: "500-999",
      rating: 4.5,
      reviews: 88,
      priceRange: "$500-$1000",
      image: defaultProductImage,
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [filters, setFilters] = useState({
    priceRange: [],
    category: [],
    availability: [],
    skillLevel: [],
    pieceCount: [],
  });
  const [openCategories, setOpenCategories] = useState(
    Object.keys(filterCategories)
  );

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const newFilters = {
        ...prev,
        [type]: prev[type].includes(value)
          ? prev[type].filter((item) => item !== value)
          : [...prev[type], value],
      };

      // Apply all filters
      const filteredProducts = initialProducts.filter((product) => {
        const priceMatch =
          newFilters.priceRange.length === 0 ||
          newFilters.priceRange.includes(product.priceRange);
        const categoryMatch =
          newFilters.category.length === 0 ||
          newFilters.category.includes(product.category);
        const availabilityMatch =
          newFilters.availability.length === 0 ||
          newFilters.availability.includes(product.availability);
        const skillMatch =
          newFilters.skillLevel.length === 0 ||
          newFilters.skillLevel.includes(product.skillLevel);
        const pieceMatch =
          newFilters.pieceCount.length === 0 ||
          newFilters.pieceCount.includes(product.pieceCount);

        return (
          priceMatch &&
          categoryMatch &&
          availabilityMatch &&
          skillMatch &&
          pieceMatch
        );
      });

      setProducts(filteredProducts);
      return newFilters;
    });
  };

  const handleAccordionValueChange = (value) => {
    setOpenCategories(value);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="mx-auto p-4">
      <div className="grid grid-cols-4 gap-6">
        {/* Filters Section - Add height and sticky positioning */}
        <div className="col-span-1 border border-gray-600 rounded-xl shadow-lg p-4 sticky top-24 h-[85vh]">
          <div className="flex items-center mb-4 space-x-2">
            <Filter className="h-6 w-6 text-white" />
            <h2 className="text-xl font-bold text-white">Filters</h2>
          </div>

          {/* Adjust max-height to account for the header */}
          <div className="max-h-[75vh] overflow-y-auto pr-2">
            <Accordion
              type="multiple"
              value={openCategories}
              onValueChange={handleAccordionValueChange}
              className="space-y-2"
            >
              {Object.entries(filterCategories).map(([key, category]) => (
                <AccordionItem
                  key={key}
                  value={key}
                  className="border border-gray-700 rounded-md my-2"
                >
                  <AccordionTrigger className="px-4 py-3 transition-colors group hover:no-underline rounded-md">
                    <span className="font-semibold text-white group-hover:text-red-400">
                      {category.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 bg-darkBrand rounded-b-md">
                    {category.options.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center justify-between py-2 hover:bg-brand rounded-md px-2 group"
                      >
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`${key}-${option.value}`}
                            checked={filters[key].includes(option.value)}
                            onCheckedChange={() =>
                              handleFilterChange(key, option.value)
                            }
                            className="border-gray-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                          />
                          <label
                            htmlFor={`${key}-${option.value}`}
                            className="text-sm text-gray-300 cursor-pointer group-hover:text-red-400 py-2"
                          >
                            {option.value}
                          </label>
                        </div>
                        <span className="text-sm text-gray-400">
                          ({option.count})
                        </span>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Products Grid  */}
        <div className="col-span-3 pb-8">
          {data?.products?.length > 0 && !isLoading ? (
            <motion.div
              className="grid grid-cols-3 gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {data?.products?.map((product) => (
                <motion.div
                  key={product._id}
                  className="bg-brand-gradient text-white border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={defaultProductImage} // NEED TO UPDATE THE URL LATER
                      alt={product?.product_name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-6 py-2 rounded-md transition-all duration-300 ease-in-out">
                      View Details
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                      {product?.product_name}
                    </h3>
                    <div className="flex items-center justify-between mt-5">
                      <p className="text-red-500 font-bold text-xl">
                        ${product?.price}
                      </p>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {renderStars(product.ratings)}
                        </div>
                        <span className="text-sm text-gray-300">
                          ({product.reviews.length})
                        </span>
                        <span> {product?.ratings}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10 bg-brand rounded-xl shadow-md"
            >
              <p className="text-xl text-gray-300">
                No products match your filters
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
