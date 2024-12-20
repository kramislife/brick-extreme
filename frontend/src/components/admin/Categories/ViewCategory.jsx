import React, { useState, useMemo, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import {
  useGetCategoryQuery,
  useDeleteCategoryMutation,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";

const ViewCategories = () => {
  const { data: categoryData, isLoading, error } = useGetCategoryQuery();

  const [
    deleteCategory,
    {
      isSuccess: deleteCategorySuccess,
      isError: deleteCategoryError,
      error: deleteError,
    },
  ] = useDeleteCategoryMutation();

  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (deleteCategorySuccess) {
      toast.success("Category deleted successfully");
    }

    if (deleteCategoryError) {
      toast.error(deleteError?.data?.message || "Failed to delete category");
    }
  }, [deleteCategorySuccess, deleteCategoryError, deleteError]);

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
    deleteCategory(category._id);
  };

  return (
    <ViewLayout
      title="Category"
      description="Manage your product categories"
      addNewPath="/admin/new-category"
      isLoading={isLoading}
      error={error}
      table={table}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  );
};

export default ViewCategories;
