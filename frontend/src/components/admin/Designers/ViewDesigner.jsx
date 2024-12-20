import React, { useState, useMemo, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Edit2, Trash2, Link as LinkIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import {
  useDeleteDesignerMutation,
  useGetDesignersQuery,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";

const ViewDesigner = () => {
  const { data: designerData, isLoading, error } = useGetDesignersQuery();

  const [
    deleteDesigner,
    {
      isSuccess: deleteDesignerSuccess,
      isError: deleteDesignerError,
      error: deleteError,
    },
  ] = useDeleteDesignerMutation();

  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (deleteDesignerSuccess) {
      toast.success("Designer deleted successfully");
    }

    if (deleteDesignerError) {
      toast.error(deleteError?.data?.message || "Failed to delete designer");
    }
  }, [deleteDesignerSuccess, deleteDesignerError, deleteError]);

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

  return (
    <ViewLayout
      title="Designers"
      description="Manage your product designers"
      addNewPath="/admin/new-designer"
      isLoading={isLoading}
      error={error}
      table={table}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  );
};

export default ViewDesigner;
