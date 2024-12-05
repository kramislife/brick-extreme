import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Edit2, Trash2, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
    // Implement edit logic or open edit modal
  };

  // Define columns with added status and actions
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
      {/* Header */}
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold text-light tracking-tight">
          Products Management
        </h1>
        <p className="text-gray-200/70 text-md">
          Manage your product inventory
        </p>
      </div>
      
      {/* Single Card containing all content */}
      <Card className="bg-darkBrand border-none">
        <CardContent className="p-10">
          {/* Search and Entries Section */}
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
            <div className="flex items-center text-light">
              <span className="mr-3 text-md">Show</span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={e => table.setPageSize(Number(e.target.value))}
                className="bg-darkBrand border border-gray-600 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-light text-md"
              >
                {[10, 20, 30, 40, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
              <span className="ml-3 text-md">entries</span>
            </div>
            
            <div className="relative flex-1 md:max-w-xs">
              <input
                value={globalFilter ?? ''}
                onChange={e => setGlobalFilter(e.target.value)}
                placeholder="Search products..."
                className="pl-10 pr-4 py-3 bg-darkBrand border border-gray-600 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-light placeholder-gray-400 text-sm"
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto">
            <table className="w-full caption-bottom text-sm">
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id} className="border-b border-gray-200/10">
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className="h-14 px-6 align-middle font-semibold text-light/90 text-center"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map(row => (
                  <tr 
                    key={row.id}
                    className="border-b border-gray-200/10 transition-colors hover:bg-blue-500/10 text-center"
                  >
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="px-6 py-5 text-sm text-light/80 text-center">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Section */}
          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-light/80">
              Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}{' '}
              of {table.getFilteredRowModel().rows.length} entries
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-4 py-2 border border-gray-600 rounded-md text-sm font-medium text-light 
                         hover:bg-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-4 py-2 border border-gray-600 rounded-md text-sm font-medium text-light 
                         hover:bg-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewProducts;
