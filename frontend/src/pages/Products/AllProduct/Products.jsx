import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Filter, Star } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import defaultProductImage from "@/assets/bestSellingAssets/droid.png";
import { useGetProductsQuery } from "@/redux/api/productApi";

// This is the main Products component
const Products = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetProductsQuery();
  // console.log("PRODUCT:", data, isLoading);

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
      designer: "John Doe"
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [filters, setFilters] = useState({
    priceRange: [],
    category: [],
    availability: [],
    skillLevel: [],
    pieceCount: [],
    Designers: []
  });

  // Move getInitialCounts and filterCounts state here
  const getInitialCounts = () => {
    const counts = {
      priceRange: {},
      category: {},
      availability: {},
      skillLevel: {},
      pieceCount: {},
      Designers: {}
    };

    initialProducts.forEach(product => {
      counts.priceRange[product.priceRange] = (counts.priceRange[product.priceRange] || 0) + 1;
      counts.category[product.category] = (counts.category[product.category] || 0) + 1;
      counts.availability[product.availability] = (counts.availability[product.availability] || 0) + 1;
      counts.skillLevel[product.skillLevel] = (counts.skillLevel[product.skillLevel] || 0) + 1;
      counts.pieceCount[product.pieceCount] = (counts.pieceCount[product.pieceCount] || 0) + 1;
      counts.Designers[product.designer] = (counts.Designers[product.designer] || 0) + 1;
    });

    return counts;
  };

  const [filterCounts, setFilterCounts] = useState(getInitialCounts());

  // Define filterCategories before using it in openCategories
  const filterCategories = {
    priceRange: {
      title: "Price Range",
      options: [
        { value: "Under $100", count: filterCounts.priceRange["Under $100"] || 0 },
        { value: "$100-$500", count: filterCounts.priceRange["$100-$500"] || 0 },
        { value: "$500-$1000", count: filterCounts.priceRange["$500-$1000"] || 0 },
        { value: "Over $1000", count: filterCounts.priceRange["Over $1000"] || 0 }
      ]
    },
    category: {
      title: "Category",
      options: [
        { value: "Collectibles", count: filterCounts.category["Collectibles"] || 0 },
        { value: "Star Wars", count: filterCounts.category["Star Wars"] || 0 },
        { value: "Holiday Themes", count: filterCounts.category["Holiday Themes"] || 0 },
        { value: "Movies Memorabilia", count: filterCounts.category["Movies Memorabilia"] || 0 }
      ]
    },
    availability: {
      title: "Availability",
      options: [
        { value: "In Stock", count: filterCounts.availability["In Stock"] || 0 },
        { value: "Limited Edition", count: filterCounts.availability["Limited Edition"] || 0 },
        { value: "Pre-order", count: filterCounts.availability["Pre-order"] || 0 }
      ]
    },
    skillLevel: {
      title: "Skill Level",
      options: [
        { value: "Beginner", count: filterCounts.skillLevel["Beginner"] || 0 },
        { value: "Intermediate", count: filterCounts.skillLevel["Intermediate"] || 0 },
        { value: "Expert", count: filterCounts.skillLevel["Expert"] || 0 }
      ]
    },
    pieceCount: {
      title: "Piece Count",
      options: [
        { value: "100-249", count: filterCounts.pieceCount["100-249"] || 0 },
        { value: "250-499", count: filterCounts.pieceCount["250-499"] || 0 },
        { value: "500-999", count: filterCounts.pieceCount["500-999"] || 0 },
        { value: "1000+", count: filterCounts.pieceCount["1000+"] || 0 }
      ]
    },
    Designers: {
      title: "Designers",
      options: [
        { value: "John Doe", count: filterCounts.Designers["John Doe"] || 0 },
        { value: "Jane Smith", count: filterCounts.Designers["Jane Smith"] || 0 },
        { value: "Emily Johnson", count: filterCounts.Designers["Emily Johnson"] || 0 },
        { value: "Michael Brown", count: filterCounts.Designers["Michael Brown"] || 0 }
      ]
    }
  };

  // Now we can safely initialize openCategories
  const [openCategories, setOpenCategories] = useState(Object.keys(filterCategories));
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
        const designerMatch =
          newFilters.Designers.length === 0 ||
          newFilters.Designers.includes(product.designer);

        return (
          priceMatch &&
          categoryMatch &&
          availabilityMatch &&
          skillMatch &&
          pieceMatch &&
          designerMatch
        );
      });

      // Remove the dynamic count recalculation
      setProducts(filteredProducts);
      return newFilters;
    });
    
    setIsFilterOpen(false);
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

  const handleViewDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
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
          <SheetContent side="left" className="w-[400px] bg-darkBrand border-gray-800">
            <SheetHeader>
              <SheetTitle className="text-white text-left">Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6 overflow-y-auto scrollbar-none h-full">
              <Accordion 
                type="multiple" 
                value={openCategories}
                onValueChange={handleAccordionValueChange}
                className="space-y-2 mb-10"
              >
                {Object.entries(filterCategories).map(([key, category]) => (
                  <AccordionItem 
                    key={key} 
                    value={key} 
                    className="border border-gray-700 rounded-md my-2 bg-brand"
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
                              onCheckedChange={() => handleFilterChange(key, option.value)}
                              className="border-gray-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                            />
                            <label 
                              htmlFor={`${key}-${option.value}`}
                              className="text-sm text-gray-300 cursor-pointer group-hover:text-red-400 py-2"
                            >
                              {option.value}
                            </label>
                          </div>
                          {option.count && <span className="text-sm text-gray-400">({option.count})</span>}
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </SheetContent>
        </Sheet>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Desktop Filter */}
        <div className="hidden lg:block col-span-1 border border-gray-600 rounded-xl shadow-lg p-4 sticky top-24 h-[85vh]">
          <div className="flex items-center mb-4 space-x-2">
            <Filter className="h-6 w-6 text-white" />
            <h2 className="text-xl font-bold text-white">Filters</h2>
          </div>
          
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
                        {option.count && <span className="text-sm text-gray-400">({option.count})</span>}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Products */}
        <div className="col-span-1 lg:col-span-3 pb-8">
          {data?.products?.length > 0 && !isLoading ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
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
                    <button 
                      onClick={() => handleViewDetails(product.id)}
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-6 py-2 rounded-md transition-all duration-300 ease-in-out"
                    >
                      View Details
                    </button>
                  </div>
                  <div className="p-4 flex flex-col h-[120px]">
                    <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors mb-auto">
                      {product?.product_name}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-red-500 font-bold text-xl">${product?.price}</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {renderStars(product.rating)}
                        </div>
                        <span className="text-sm text-gray-300">
                          ({product.reviews})
                        </span>
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
