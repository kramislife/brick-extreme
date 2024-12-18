import React, { useState, useMemo, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Edit2, Trash2, Link as LinkIcon, PlusCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SearchBar from "@/components/admin/table/SearchBar";
import ShowEntries from "@/components/admin/table/ShowEntries";
import TableLayout from "@/components/admin/table/TableLayout";
import Pagination from "@/components/admin/table/Pagination";
import {
  useDeleteDesignerMutation,
  useGetDesignersQuery,
} from "@/redux/api/productApi";
import Metadata from "@/components/layout/Metadata/Metadata";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";

const ViewDesigner = () => {
  const { data: designerData, isLoading, error } = useGetDesignersQuery();

  const [
    deleteDesigner,
    { isSuccess, isError, data: deleteDesignerData },
  ] = useDeleteDesignerMutation();

  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success(deleteDesignerData?.message);
    }
  }, [isError, error, deleteDesignerData, isSuccess]);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Designer Name",
        accessorKey: "name",
      },
      {
        header: "Bio",
        accessorKey: "bio",
      },
      {
        header: "Social Links",
        accessorKey: "links",
        cell: ({ row }) => (
          <div>
            {row.original.links &&
              Object.entries(row.original.links).map(
                ([platform, url]) =>
                  url && (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 text-blue-500 hover:text-blue-600 mb-1"
                    >
                      <LinkIcon size={14} />
                      <span className="capitalize">{platform}</span>
                    </a>
                  )
              )}
          </div>
        ),
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
              title="Edit Designer"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => handleDelete(row.original)}
              className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors"
              title="Delete Designer"
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
    if (!designerData?.designers) return [];
    return [...designerData.designers]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((designer, index) => ({
        id: index + 1,
        _id: designer._id,
        name: designer.name,
        bio: designer.bio,
        links: designer.social_links || {},
        createdBy: new Date(designer.createdAt).toLocaleString(),
        updatedBy: designer.updatedAt
          ? new Date(designer.updatedAt).toLocaleString()
          : "Not Updated",
      }));
  }, [designerData]);

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

  const handleEdit = (designer) => {
    navigate(`/admin/update-designer/${designer._id}`);
  };

  const handleDelete = (designer) => {
    deleteDesigner(designer._id);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error loading designers</div>;
  }

  return (
    <>
      <Metadata title="Designers" />
      <div className="container mx-auto py-6 px-4">
        <div className="mb-8 space-y-2 flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-light tracking-tight">
              Designer Management
            </h1>
            <p className="text-gray-200/70 text-md">
              Manage your product designers
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/new-designer")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center gap-2 hover:from-blue-700 hover:to-purple-700 px-4 py-2 rounded-md"
          >
            <PlusCircle className="w-5 h-5" />
            Add New Designer
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
                placeholder="Search designers..."
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

export default ViewDesigner;
