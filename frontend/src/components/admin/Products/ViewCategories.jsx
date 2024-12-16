import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Edit2, Trash2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import SearchBar from '@/components/admin/table/SearchBar';
import ShowEntries from '@/components/admin/table/ShowEntries';
import TableLayout from '@/components/admin/table/TableLayout';
import Pagination from '@/components/admin/table/Pagination';
import { useGetCategoryQuery } from '@/redux/api/productApi';

const ViewCategories = () => {
  const { data: categoryData, isLoading } = useGetCategoryQuery();
  const [globalFilter, setGlobalFilter] = useState('');

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
        header: "Created By",
        accessorKey: "createdBy",
      },
      {
        header: "Updated By",
        accessorKey: "updatedBy",
      },
      // {
      //   header: "Status",
      //   accessorKey: "status",
      //   cell: ({ row }) => (
      //     <span className={`px-3 py-1 rounded-full text-sm font-medium
      //       ${row.original.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
      //     `}>
      //       {row.original.status ? 'Active' : 'Inactive'}
      //     </span>
      //   ),
      // },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => handleEdit(row.original)}
              className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors"
              title="Edit Category"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => handleDelete(row.original)}
              className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors"
              title="Delete Category"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => {
    if (!categoryData?.categories) return [];
    return categoryData.categories.map((category, index) => ({
      id: index + 1,
      _id: category._id,
      name: category.name,
      status: category.is_active,
      createdBy: new Date(category.createdAt).toLocaleString(),
      updatedBy: category.updatedAt 
        ? new Date(category.updatedAt).toLocaleString()
        : 'Not Updated',
    }));
  }, [categoryData]);

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

  const handleEdit = (category) => {
    console.log("Edit category:", category);
  };

  const handleDelete = (category) => {
    console.log("Delete category:", category);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold text-light tracking-tight">
          Category Management
        </h1>
        <p className="text-gray-200/70 text-md">
          Manage your product categories
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
              placeholder="Search categories..."
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

export default ViewCategories;