import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLazyLogoutQuery } from "@/redux/api/authApi";
import { User, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserDropdown = () => {
  //

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [logout, { data, isError, error, isSuccess, isLoading }] =
    useLazyLogoutQuery();

  const isAdminOrEmployee = ["admin", "employee", "superAdmin"].includes(
    user.role
  );

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "An error occoured during logout");
    }

    if (isSuccess) {
      toast.success(data?.message);
      setTimeout(() => {
        navigate(0);
      }, 2000);
    }
  }, [isError, error, isLoading, isSuccess, data]);

  const handleLogout = () => {
    logout();
  };

  return (
    <DropdownMenu modal={false}>
      {/* User Avatar */}
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-60 mt-2 mr-3 bg-darkBrand border-gray-800 text-white z-[1001]"
        sideOffset={5}
        align="end"
        forceMount
        style={{ position: "relative", zIndex: 1001 }}
      >
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
          <LogOut className="mr-2 h-4 w-4 " />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
