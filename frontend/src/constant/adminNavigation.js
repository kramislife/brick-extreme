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
  // {
  //   icon: PackagePlus,
  //   label: "New Product",
  //   path: "",
  // },
  {
    icon: Package,
    label: "Products",
    path: "/admin/products",
  },
  {
    icon: Package,
    label: "Categories",
    path: "/admin/categories",
  },
  {
    icon: Package,
    label: "Collections",
    path: "/admin/collections",
  },
  {
    icon: Package,
    label: "Skills",
    path: "/admin/skills",
  },
  {
    icon: Package,
    label: "Designers",
    path: "/admin/designers",
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
