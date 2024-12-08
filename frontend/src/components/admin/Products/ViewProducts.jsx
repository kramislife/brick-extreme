import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SearchBar from '@/components/admin/table/SearchBar';
import ShowEntries from '@/components/admin/table/ShowEntries';
import TableLayout from '@/components/admin/table/TableLayout';
import Pagination from '@/components/admin/table/Pagination';

const ViewProducts = () => {
  // Sample data with added status
  const [data, setData] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 129.99,
      category: "Electronics",
      stock: 100,
      status: "Active",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.5,
      category: "Wearables",
      stock: 50,
      status: "Low Stock",
    },
    {
      id: 3,
      name: "Portable Speaker",
      price: 79.99,
      category: "Audio",
      stock: 0,
      status: "Out of Stock",
    },
    {
      id: 4,
      name: "Portable Speaker",
      price: 79.99,
      category: "Audio",
      stock: 0,
      status: "Out of Stock",
    },
    {
      id: 5,
      name: "Portable Speaker",
      price: 79.99,
      category: "Audio",
      stock: 0,
      status: "Out of Stock",
    },
  ]);

  const [globalFilter, setGlobalFilter] = useState("");

  // Handle delete product
  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((product) => product.id !== id));
  };

  // Handle edit product (placeholder)
  const handleEdit = (product) => {
    console.log("Edit product:", product);
  };

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Price",
        accessorKey: "price",
        cell: ({ row }) => `$${row.original.price.toFixed(2)}`,
      },
      {
        header: "Category",
        accessorKey: "category",
      },
      {
        header: "Stock",
        accessorKey: "stock",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => {
          const statusColors = {
            Active: "bg-green-500 text-black",
            "Low Stock": "bg-yellow-500 text-black",
            "Out of Stock": "bg-red-500 text-light",
          };
          return (
            <span
              className={`px-5 py-1 rounded-full text-xs ${
                statusColors[row.original.status]
              }`}
            >
              {row.original.status}
            </span>
          );
        },
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => handleEdit(row.original)}
              className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors"
              title="Edit Product"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors"
              title="Delete Product"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold text-light tracking-tight">
          Products Management
        </h1>
        <p className="text-gray-200/70 text-md">
          Manage your product inventory
        </p>
      </div>
      
      <Card className="bg-darkBrand border-none">
        <CardContent className="p-10">
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
            <ShowEntries 
              value={table.getState().pagination.pageSize}
              onChange={table.setPageSize}
            />
            <SearchBar 
              value={globalFilter}
              onChange={setGlobalFilter}
              placeholder="Search products..."
            />
          </div>

          <TableLayout 
            headerGroups={table.getHeaderGroups()}
            rows={table.getRowModel().rows}
            flexRender={flexRender}
          />

          <Pagination table={table} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewProducts;
