import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export const orderColumns = ({ onViewDetails }) => [
  {
    header: "Order ID",
    accessorKey: "id",
  },
  {
    header: "Customer",
    accessorKey: "user",
    cell: ({ row }) => row.original.user?.name || "N/A",
  },
  {
    header: "Total Items",
    accessorKey: "totalItems",
    cell: ({ row }) => row.original.orderItems?.length || 0,
  },
  {
    header: "Total Amount",
    accessorKey: "totalPrice",
    cell: ({ row }) => `$${row.original.totalPrice?.toFixed(2) || "0.00"}`,
  },
  {
    header: "Order Status",
    accessorKey: "orderStatus",
    cell: ({ row }) => (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium
          ${row.original.orderStatus === "Pending" ? "bg-yellow-100 text-yellow-800" : ""}
          ${row.original.orderStatus === "Processing" ? "bg-blue-100 text-blue-800" : ""}
          ${row.original.orderStatus === "Shipped" ? "bg-indigo-100 text-indigo-800" : ""}
          ${row.original.orderStatus === "Delivered" ? "bg-green-100 text-green-800" : ""}
          ${row.original.orderStatus === "Cancelled" ? "bg-red-100 text-red-800" : ""}
        `}
      >
        {row.original.orderStatus}
      </span>
    ),
  },
  {
    header: "Payment Status",
    accessorKey: "paymentInfo.status",
    cell: ({ row }) => (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium
          ${row.original.paymentInfo?.status === "Success" ? "bg-green-100 text-green-800" : ""}
          ${row.original.paymentInfo?.status === "Pending" ? "bg-yellow-100 text-yellow-800" : ""}
          ${row.original.paymentInfo?.status === "Failed" ? "bg-red-100 text-red-800" : ""}
        `}
      >
        {row.original.paymentInfo?.status || "N/A"}
      </span>
    ),
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onViewDetails(row.original)}
          className="hover:text-primary"
        >
          <Eye className="h-5 w-5" />
        </Button>
      </div>
    ),
  },
];