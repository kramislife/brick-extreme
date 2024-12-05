import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Eye, Edit2, Trash2, Search } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const ViewOrder = () => {
  // Sample data - replace with your actual order data
  const [data] = useState([
    {
      id: 1,
      orderNumber: "ORD-2024-001",
      customerName: "John Doe",
      date: "2024-03-20",
      total: 299.99,
      status: "Pending",
      paymentStatus: "Paid",
      items: [
        { name: "Product 1", quantity: 2, price: 149.99 }
      ]
    },
    {
      id: 2,
      orderNumber: "ORD-2024-002",
      customerName: "Jane Smith",
      date: "2024-03-19",
      total: 159.99,
      status: "Delivered",
      paymentStatus: "Paid",
      items: [
        { name: "Product 2", quantity: 1, price: 159.99 }
      ]
    },
    // Add more orders...
  ]);

  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo(
    () => [
      {
        header: "Order Number",
        accessorKey: "orderNumber",
      },
      {
        header: "Customer Name",
        accessorKey: "customerName",
      },
      {
        header: "Date",
        accessorKey: "date",
        cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
      },
      {
        header: "Total",
        accessorKey: "total",
        cell: ({ row }) => `$${row.original.total.toFixed(2)}`,
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <span className={`px-3 py-1 rounded-full text-sm font-medium
            ${row.original.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
            ${row.original.status === 'Delivered' ? 'bg-green-100 text-green-800' : ''}
            ${row.original.status === 'Cancelled' ? 'bg-red-100 text-red-800' : ''}
          `}>
            {row.original.status}
          </span>
        ),
      },
      {
        header: "Payment Status",
        accessorKey: "paymentStatus",
        cell: ({ row }) => (
          <span className={`px-3 py-1 rounded-full text-sm font-medium
            ${row.original.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : ''}
            ${row.original.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
            ${row.original.paymentStatus === 'Failed' ? 'bg-red-100 text-red-800' : ''}
          `}>
            {row.original.paymentStatus}
          </span>
        ),
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-3">
            <button
              onClick={() => handleViewDetails(row.original)}
              className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors"
              title="View Details"
            >
              <Eye size={18} />
            </button>

            <button
              onClick={() => handleUpdateStatus(row.original)}
              className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-100 transition-colors"
              title="Update Status"
            >
              <Edit2 size={18} />
            </button>

            <button
              onClick={() => handleDelete(row.original)}
              className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors"
              title="Delete Order"
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

  // Handle view details - implement as needed
  const handleViewDetails = (order) => {
    console.log("View details for order:", order);
    // Implement view details logic
  };

  // Handle status update - implement as needed
  const handleUpdateStatus = (order) => {
    console.log("Update status for order:", order);
    // Implement status update logic
  };

  // Add this new handler function with the existing handlers
  const handleDelete = (order) => {
    console.log("Delete order:", order);
    // Implement delete logic
  };

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Header */}
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold text-light tracking-tight">
          Order Management
        </h1>
        <p className="text-gray-200/70 text-md">
          Manage your customer orders
        </p>
      </div>

      <Card className="bg-darkBrand border-none">
        <CardContent className="p-10">
          {/* Search and Entries Section */}
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
            <div className="flex items-center text-light">
              <span className="text-gray-200/70 mr-2">Show</span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={e => table.setPageSize(Number(e.target.value))}
                className="border border-gray-600 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-darkBrand text-light"
              >
                {[10, 20, 30, 40, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
              <span className="text-gray-200/70 ml-2">entries</span>
            </div>
            
            <div className="relative flex-1 md:max-w-xs">
              <input
                value={globalFilter ?? ''}
                onChange={e => setGlobalFilter(e.target.value)}
                placeholder="Search orders..."
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

export default ViewOrder;
