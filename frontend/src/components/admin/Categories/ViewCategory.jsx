import React, { useState, useMemo, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Edit2, Trash2, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import SearchBar from "@/components/admin/table/SearchBar";
import ShowEntries from "@/components/admin/table/ShowEntries";
import TableLayout from "@/components/admin/table/TableLayout";
import Pagination from "@/components/admin/table/Pagination";
import {
  useGetCategoryQuery,
  useDeleteCategoryMutation,
} from "@/redux/api/productApi";
import Metadata from "@/components/layout/Metadata/Metadata";
import { toast } from "react-toastify";

const ViewCategories = () => {
  const {
    data: categoryData,
    isLoading,
    refetch,
  } = useGetCategoryQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();
  const [
    deleteCategory,
    {
      data: deleteCategoryData,
      isLoading: deleteCategoryLoading,
      error: deleteCategoryError,
      isSuccess: deleteCategorySuccess,
    },
  ] = useDeleteCategoryMutation();

  useEffect(() => {
    if (deleteCategorySuccess) {
      refetch();
    }

    if (deleteCategoryError) {
      toast.error("Failed to delete category");
    }
  }, [deleteCategoryError, deleteCategorySuccess]);

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

    // Sort categories by creation date (newest first)
    return [...categoryData.categories]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((category, index) => ({
        id: index + 1,
        _id: category._id,
        name: category.name,
        createdBy: new Date(category.createdAt).toLocaleString(),
        updatedBy: category.updatedAt
          ? new Date(category.updatedAt).toLocaleString()
          : "Not Updated",
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
    navigate(`/admin/update-category/${category._id}`);
  };

  const handleDelete = (category) => {
    // console.log("DELETE ", category._id);
    deleteCategory(category._id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Metadata title="Categories" />
      <div className="container mx-auto py-6 px-4">
        <div className="mb-8 flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-light tracking-tight">
              Category Management
            </h1>
            <p className="text-gray-200/70 text-md">
              Manage your product categories
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/new-category")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center gap-2 hover:from-blue-700 hover:to-purple-700 px-4 py-2 rounded-md"
          >
            <PlusCircle className="w-5 h-5" />
            Add New Category
          </button>
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
    </>
  );
};

export default ViewCategories;
