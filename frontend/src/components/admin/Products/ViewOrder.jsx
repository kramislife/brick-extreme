import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Eye, Edit2, Trash2, Search } from 'lucide-react';

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
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Customer Orders</h1>
      
      {/* Search and Entries Info */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex items-center">
          <span className="text-gray-600 mr-2">Show</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <span className="text-gray-600 ml-2">entries</span>
        </div>
        
        <div className="relative">
          <input
            value={globalFilter ?? ''}
            onChange={e => setGlobalFilter(e.target.value)}
            placeholder="Search orders..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr 
                key={row.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4">
        <div className="text-sm text-gray-700">
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
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 
                     hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 
                     hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
