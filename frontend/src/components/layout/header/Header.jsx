import { navItems } from "@/constant/navigation";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Clock,
  Sparkles,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import logo from "@/assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useGetMeQuery } from "@/redux/api/userApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const { isError, error, isLoading } = useGetMeQuery();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  if (isLoading) {
    return;
  }

  // Mock data - Replace with actual data from your backend
  const recentSearches = [
    "Knitting Needles",
    "Wool Yarn",
    "Crochet Hooks",
    "Pattern Books",
  ];
  const popularCategories = ["Yarns", "Tools", "Patterns", "Accessories"];
  const trendingProducts = [
    { id: 1, name: "Merino Wool Bundle", price: "$24.99" },
    { id: 2, name: "Bamboo Needles Set", price: "$19.99" },
    { id: 3, name: "Beginner's Kit", price: "$39.99" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleLoginClick = () => {
    if (user) {
      toast.success("User Logged in ");
      if (user.role === "admin" || user.role === "employee") {
        toast.success(`Welcome ${user.name}`);
        navigate("/admin");
      } else {
        navigate("/products");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="bg-brand-gradient sticky top-0 z-50 py-3">
      <div className="mx-auto flex items-center justify-between px-6">
        <div className="flex items-center flex-shrink-0">
          <NavLink to="/">
            <img className="h-16 w-auto scale-110" src={logo} alt="logo" />
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-12 text-md">
          {navItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-red-500 font-medium underline underline-offset-8"
                    : "text-light hover:text-gray-300 transition-colors duration-200"
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          {/* Search Sheet */}
          <Sheet>
            <SheetTrigger className="text-white hover:text-gray-200">
              <Search size={24} />
            </SheetTrigger>
            <SheetContent className="bg-brand-gradient p-0 overflow-y-auto border-none">
              <div className="h-full px-6 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-semibold text-white bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Search
                  </h2>
                </div>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="relative mb-8">
                  <div className="relative">
                    <Input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="What are you looking for?"
                      className="w-full bg-darkBrand/40 border-white/10 text-white placeholder:text-gray-400 h-14 rounded-2xl focus:ring-2 focus:ring-light/40 focus:border-light/40 transition-all duration-300 pl-14 pr-4 text-lg shadow-lg backdrop-blur-xl"
                    />
                    <Search
                      size={22}
                      className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </form>

                {/* Search Content */}
                <div className="space-y-6 pb-10">
                  {/* Recent Searches */}
                  <div className="bg-darkBrand/20 rounded-2xl p-6 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-3 text-white mb-6">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Clock size={20} className="text-blue-400" />
                      </div>
                      <h3 className="text-xl font-semibold">Recent Searches</h3>
                    </div>
                    <ul className="space-y-4">
                      {recentSearches.map((search, index) => (
                        <li key={index}>
                          <button
                            onClick={() => setSearchQuery(search)}
                            className="text-gray-300 hover:text-white transition-all duration-200 text-base flex items-center gap-2 w-full p-2 rounded-lg hover:bg-white/5 group"
                          >
                            <Search size={14} className="text-gray-400" />
                            <span className="flex-1 text-left">{search}</span>
                            <ArrowRight
                              size={14}
                              className="opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1"
                            />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Popular Categories */}
                  <div className="bg-darkBrand/20 rounded-2xl p-6 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-3 text-white mb-6">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Sparkles size={20} className="text-purple-400" />
                      </div>
                      <h3 className="text-xl font-semibold">
                        Popular Categories
                      </h3>
                    </div>
                    <ul className="space-y-4">
                      {popularCategories.map((category, index) => (
                        <li key={index}>
                          <button
                            onClick={() =>
                              navigate(`/category/${category.toLowerCase()}`)
                            }
                            className="w-full p-2 rounded-lg hover:bg-white/5 transition-all duration-200 group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                                {category}
                              </span>
                              <ArrowRight
                                size={16}
                                className="text-gray-400 transform transition-all duration-200 group-hover:translate-x-1 group-hover:text-white"
                              />
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Trending Products */}
                  <div className="bg-darkBrand/20 rounded-2xl p-6 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-3 text-white mb-6">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <TrendingUp size={20} className="text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold">Trending Now</h3>
                    </div>
                    <ul className="space-y-4">
                      {trendingProducts.map((product) => (
                        <li key={product.id}>
                          <button
                            onClick={() => navigate(`/product/${product.id}`)}
                            className="w-full group"
                          >
                            <div className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5 transition-all duration-200">
                              <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                                {product.name}
                              </span>
                              <span className="text-emerald-400 font-medium px-3 py-1 rounded-full bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors duration-200">
                                {product.price}
                              </span>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <button className="text-white hover:text-gray-200 relative">
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </button>

          {/* User Dropdown - Only visible on desktop */}
          <div className="relative hidden md:block">
            <button
              onClick={handleLoginClick}
              className="text-white hover:text-gray-200"
            >
              <User size={24} />
            </button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger className="md:hidden text-white hover:text-gray-200">
              <Menu size={24} />
            </SheetTrigger>
            <SheetContent className="w-[300px] bg-brand-gradient p-0">
              <div className="flex flex-col h-full">
                <div className="px-6 py-10">
                  <div className="flex items-center mb-6">
                    <User size={24} className="text-white mr-2" />
                    <span className="text-white font-medium">Account</span>
                  </div>
                  <nav className="space-y-4">
                    {navItems.map((item) => (
                      <NavLink
                        key={item.id}
                        to={item.path}
                        className={({ isActive }) =>
                          isActive
                            ? "block text-red-500 font-medium underline underline-offset-8"
                            : "block text-light hover:text-gray-300 transition-colors duration-200"
                        }
                      >
                        <SheetClose>{item.label}</SheetClose>
                      </NavLink>
                    ))}
                    <div className="pt-4 border-t border-white/20">
                      <button
                        onClick={() => navigate("/login")}
                        className="text-white hover:text-gray-300 transition-colors duration-200"
                      >
                        Login
                      </button>
                    </div>
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Header;
