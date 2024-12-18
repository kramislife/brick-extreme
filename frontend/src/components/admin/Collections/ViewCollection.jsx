import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Edit2, PlusCircle, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SearchBar from "@/components/admin/table/SearchBar";
import ShowEntries from "@/components/admin/table/ShowEntries";
import TableLayout from "@/components/admin/table/TableLayout";
import Pagination from "@/components/admin/table/Pagination";
import { useGetCollectionQuery } from "@/redux/api/productApi";
import Metadata from "@/components/layout/Metadata/Metadata";
import { useNavigate } from "react-router-dom";

const ViewCollection = () => {
  const { data: collectionData, isLoading } = useGetCollectionQuery();
  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

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
        header: "Created By",
        accessorKey: "createdBy",
      },
      {
        header: "Updated By",
        accessorKey: "updatedBy",
      },
      //   {
      //     header: "Status",
      //     accessorKey: "status",
      //     cell: ({ row }) => (
      //       <span
      //         className={`px-3 py-1 rounded-full text-sm font-medium
      //         ${
      //           row.original.status
      //             ? "bg-green-100 text-green-800"
      //             : "bg-red-100 text-red-800"
      //         }
      //       `}
      //       >
      //         {row.original.status ? "Active" : "Inactive"}
      //       </span>
      //     ),
      //   },
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
        createdBy: new Date(collection.createdAt).toLocaleString(),
        updatedBy: collection.updatedAt
          ? new Date(collection.updatedAt).toLocaleString()
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
    console.log("Edit collection:", collection);
  };

  const handleDelete = (collection) => {
    console.log("Delete collection:", collection);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Metadata title="Collections" />
      <div className="container mx-auto py-6 px-4">
        <div className="mb-8 flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-light tracking-tight">
              Collection Management
            </h1>
            <p className="text-gray-200/70 text-md">
              Manage your product collections
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/new-collection")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center gap-2 hover:from-blue-700 hover:to-purple-700 px-4 py-2 rounded-md"
          >
            <PlusCircle className="w-5 h-5" />
            Add New Collection
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
                placeholder="Search collections..."
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

export default ViewCollection;
