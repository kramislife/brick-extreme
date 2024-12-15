import {
  LayoutDashboard,
  Package,
  PackagePlus,
  ShoppingCart,
  Users,
  Star,
} from "lucide-react";

export const adminNavigation = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/admin",
  },
  {
    icon: PackagePlus,
    label: "New Product",
    path: "/admin/new-product",
  },
  {
    icon: Package,
    label: "Products",
    path: "/admin/products",
  },
  {
    icon: ShoppingCart,
    label: "Orders",
    path: "/admin/orders",
  },
  {
    icon: Users,
    label: "Users",
    path: "/admin/users",
  },
  {
    icon: Star,
    label: "Reviews",
    path: "/admin/reviews",
  },
];
