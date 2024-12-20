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
  useDeleteCollectionMutation,
  useGetCollectionQuery,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";

const ViewCollection = () => {
  const { data: collectionData, isLoading, error } = useGetCollectionQuery();

  const [
    deleteCollection,
    {
      isSuccess: deleteCollectionSuccess,
      isError: deleteCollectionError,
      error: deleteError,
    },
  ] = useDeleteCollectionMutation();

  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (deleteCollectionSuccess) {
      toast.success("Collection deleted successfully");
    }

    if (deleteCollectionError) {
      toast.error(deleteError?.data?.message || "Failed to delete collection");
    }
  }, [deleteCollectionSuccess, deleteCollectionError, deleteError]);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Product Collection",
        accessorKey: "name",
      },
      {
        header: "Description",
        accessorKey: "description",
      },
      {
        header: "Created At",
        accessorKey: "createdAt",
      },
      {
        header: "Updated At",
        accessorKey: "updatedAt",
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => handleEdit(row.original)}
              className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors"
              title="Edit Collection"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => handleDelete(row.original)}
              className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors"
              title="Delete Collection"
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
    if (!collectionData?.collections) return [];
    return [...collectionData.collections]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((collection, index) => ({
        id: index + 1,
        _id: collection._id,
        name: collection.name,
        description: collection.description,
        createdAt: new Date(collection.createdAt).toLocaleDateString(),
        updatedAt: collection.updatedAt
          ? new Date(collection.updatedAt).toLocaleDateString()
          : "Not Updated",
      }));
  }, [collectionData]);

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

  const handleEdit = (collection) => {
    navigate(`/admin/update-collection/${collection._id}`);
  };

  const handleDelete = (collection) => {
    deleteCollection(collection._id);
  };

  return (
    <ViewLayout
      title="Collections"
      description="Manage your product collections"
      addNewPath="/admin/new-collection"
      isLoading={isLoading}
      error={error}
      table={table}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  );
};

export default ViewCollection;
