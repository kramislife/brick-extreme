import React from 'react';
import { Box, Ruler, User, Dices } from 'lucide-react';

const ProductSpecification = () => {
  const specifications = [
    {
      title: "Piece Count",
      items: ["Gingerbread: 27 LEGO® bricks"],
      icon: <Box className="w-8 h-8 text-orange-400" />,
      description: "A small but delightful set perfect for creative builders",
    },
    {
      title: "Skill Level",
      items: ["Beginner"],
      icon: <Dices className="w-8 h-8 text-green-400" />,
      description: "Ideal for those just starting their LEGO journey",
    },
    {
      title: "Dimensions",
      items: [
        "Height: 4.5\" (114.3 mm)",
        "Width: 4.3\" (109.22 mm)",
        "Weight: 8.66 oz | .245 kg",
      ],
      icon: <Ruler className="w-8 h-8 text-blue-400" />,
    },
    {
      title: "Designed By",
      items: ["John Brickson"],
      icon: <User className="w-8 h-8 text-purple-400" />,
      description: "Crafted by a passionate LEGO designer with years of experience",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-brand-start to-brand-end py-20 px-4">
      <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {specifications.map((spec, index) => (
          <div
            key={index}
            className="bg-darkBrand/50 backdrop-blur-lg rounded-3xl p-6 shadow-lg 
            transform transition-transform duration-300 
            hover:scale-105 hover:bg-darkBrand/70 border border-white/10 
            hover:border-white/30 group"
          >
            <div className="flex items-center justify-center mb-6 relative">
              <div
                className="absolute left-0 bg-brand/50 p-4 rounded-xl transition-all duration-300 
                group-hover:bg-brand group-hover:scale-110 shadow-md"
              >
                {spec.icon}
              </div>
              <h2 className="text-2xl font-semibold tracking-wide text-white drop-shadow-md pl-5">
                {spec.title}
              </h2>
            </div>
            <ul className="space-y-3 mb-4 pt-5">
              {spec.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="text-gray-300/90 text-md font-medium 
                  transition-colors hover:text-white text-center"
                >
                  {item}
                </li>
              ))}
            </ul>
            {spec.description && (
              <div className="text-sm text-gray-400/80 italic pl-4 border-l-2 border-gray-500/20">
                {spec.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSpecification;
