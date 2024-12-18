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
import { useGetSkillLevelsQuery } from "@/redux/api/productApi";
import Metadata from "@/components/layout/Metadata/Metadata";
import { useNavigate } from "react-router-dom";

const ViewSkillLevel = () => {
  const { data: skillLevelData, isLoading } = useGetSkillLevelsQuery();
  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Skill Level",
        accessorKey: "name",
      },
      {
        header: "Description",
        accessorKey: "description",
      },

      //   {
      //     header: "Status",
      //     accessorKey: "status",
      //     cell: ({ row }) => (
      //       <span className={`px-3 py-1 rounded-full text-sm font-medium
      //         ${row.original.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
      //       `}>
      //         {row.original.status ? 'Active' : 'Inactive'}
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
              title="Edit Skill Level"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => handleDelete(row.original)}
              className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors"
              title="Delete Skill Level"
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
    if (!skillLevelData?.skillLevels) return [];
    // Sort categories by creation date (newest first)
    return [...skillLevelData.skillLevels]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((skillLevel, index) => ({
        id: index + 1,
        _id: skillLevel._id,
        name: skillLevel.name,
        description: skillLevel.description,
        createdBy: new Date(skillLevel.createdAt).toLocaleString(),
        updatedBy: skillLevel.updatedAt
          ? new Date(skillLevel.updatedAt).toLocaleString()
          : "Not Updated",
      }));
  }, [skillLevelData]);

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

  const handleEdit = (skillLevel) => {
    console.log("Edit skill level:", skillLevel);
  };

  const handleDelete = (skillLevel) => {
    console.log("Delete skill level:", skillLevel);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Metadata title="Skill Levels" />
      <div className="container mx-auto py-6 px-4">
        <div className="mb-8 space-y-2 flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-light tracking-tight">
              Skill Level Management
            </h1>
            <p className="text-gray-200/70 text-md">
              Manage your product skill levels
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/new-skill-level")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center gap-2 hover:from-blue-700 hover:to-purple-700 px-4 py-2 rounded-md"
          >
            <PlusCircle className="w-5 h-5" />
            Add New Skill Level
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
                placeholder="Search skill levels..."
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

export default ViewSkillLevel;
