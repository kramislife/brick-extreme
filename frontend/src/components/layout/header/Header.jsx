import { navItems } from "@/constant/navigation";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import logo from "@/assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-brand-gradient sticky top-0 z-50 py-3">
      <div className="mx-auto flex items-center justify-between px-6">
        <div className="flex items-center flex-shrink-0">
          <NavLink to="/">
            <img className="h-16 w-auto scale-110" src={logo} alt="logo" />
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-12 text-lg">
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
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-gray-200">
            <Search size={24} />
          </button>
          <button className="text-white hover:text-gray-200 relative">
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </button>

          {/* User Dropdown - Only visible on desktop */}
          <div className="relative hidden md:block">
            <button
              onClick={() => navigate('/login')}
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
                        onClick={() => navigate('/login')} 
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
