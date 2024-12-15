import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { adminNavigation } from "@/constant/adminNavigation";
import { useLocation } from "react-router-dom";
import NavigationItem from "./NavigationItem";

const DesktopSidebar = ({ isMinimized, toggleMinimize }) => {
  const location = useLocation();

  return (
    <div
      className={`
        bg-darkBrand/30 border-r border-white/20 hidden lg:block h-screen shadow-sm 
        transition-all duration-300 ease-in-out
        ${isMinimized ? "w-24" : "w-72"}
      `}
    >
      <div className="sticky top-0 h-full">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMinimize}
          className="absolute top-4 -right-5 z-10"
        >
          {isMinimized ? (
            <ChevronsRight className="w-10 h-10" />
          ) : (
            <ChevronsLeft className="w-10 h-10" />
          )}
        </Button>

        {!isMinimized && (
          <div className="p-6">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </div>
        )}

        <nav
          className={`
            p-4 space-y-3 overflow-y-auto h-full
            ${isMinimized ? "flex flex-col items-center" : ""}
          `}
        >
          {adminNavigation.map((item, index) => (
            <NavigationItem
              key={index}
              item={item}
              isActive={location.pathname === item.path}
              isMinimized={isMinimized}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default DesktopSidebar;
