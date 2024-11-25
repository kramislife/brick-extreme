import Banner from "@/components/home/Banner";
import BestSelling from "@/components/home/BestSelling";
import Categories from "@/components/home/Categories";
import FeaturedProduct from "@/components/home/FeaturedProduct";
import LatestProduct from "@/components/home/LatestProduct";
import Subscribe from "@/components/home/Subscribe";
import React from "react";

const Home = () => {
  return (
    <div>
      <div className="lg:min-h-[90vh] bg-brand-gradient">
        <Banner />
      </div>
      <div className="lg:min-h-[90vh] bg-brand-gradient">
        <BestSelling />
      </div>
      <div className="lg:min-h-[90vh] bg-brand-gradient-r">
        <LatestProduct />
      </div>
      <div className="lg:min-h-[90vh] bg-brand-gradient">
        <FeaturedProduct />
      </div>
      <div className="lg:min-h-[90vh] bg-brand-gradient-r">
        <Categories />
      </div>
      <div className="lg:min-h-[90vh] bg-brand-gradient">
        <Subscribe />
      </div>
    </div>
  );
};

export default Home;
