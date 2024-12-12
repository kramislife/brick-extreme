import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setisAuthenticated } from "@/redux/features/userSlice";
import { toast } from "react-toastify";

const UserDropdown = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setUser(null));
    dispatch(setisAuthenticated(false));
    toast.success("Logged out successfully");
    navigate("/login");
  };

  // Check if the user is an admin or employee
  const isAdminOrEmployee = user?.role === "admin" || user?.role === "employee";

  return (
    <DropdownMenu>
      {/* User Avatar */}
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-60 mt-2 mr-3 bg-darkBrand border-gray-800 text-white z-[101]">
        {/* User Name and Email */}
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-600" />

        {/* Profile, Dashboard and Settings */}
        <div className="flex flex-col gap-2">
          <DropdownMenuItem
            className="focus:bg-white cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>

          {/* Show Dashboard only for admin/employee */}
          {isAdminOrEmployee && (
            <DropdownMenuItem
              className="focus:bg-white cursor-pointer"
              onClick={() => navigate("/admin")}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            className="focus:bg-white cursor-pointer"
            onClick={() => navigate("/settings")}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator className="bg-gray-600" />

        {/* Logout */}
        <DropdownMenuItem
          className="focus:bg-white cursor-pointer text-red-500 focus:text-red-500"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
