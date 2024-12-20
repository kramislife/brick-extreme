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
  useDeleteSkillLevelMutation,
  useGetSkillLevelsQuery,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { createSkillLevelColumns } from "../table/columns/SkillLevelColumns";

const ViewSkillLevel = () => {
  const { data: skillLevelData, isLoading, error } = useGetSkillLevelsQuery();

  const [
    deleteSkillLevel,
    {
      isSuccess: deleteSkillSuccess,
      isError: deleteSkillError,
      error: deleteError,
    },
  ] = useDeleteSkillLevelMutation();

  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (deleteSkillSuccess) {
      toast.success("Skill level deleted successfully");
    }

    if (deleteSkillError) {
      toast.error(deleteError?.data?.message || "Failed to delete skill level");
    }
  }, [deleteSkillSuccess, deleteSkillError, deleteError]);

  const handleEdit = (skillLevel) => {
    navigate(`/admin/update-skill-level/${skillLevel._id}`);
  };

  const handleDelete = (skillLevel) => {
    deleteSkillLevel(skillLevel._id);
  };

  // column component for table
  const columns = useMemo(() =>
    createSkillLevelColumns(handleEdit, handleDelete)
  );

  const data = useMemo(() => {
    if (!skillLevelData?.skillLevels) return [];
    return [...skillLevelData.skillLevels]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((skillLevel, index) => ({
        id: index + 1,
        _id: skillLevel._id,
        name: skillLevel.name,
        description: skillLevel.description,
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

  return (
    <ViewLayout
      title="Skill Level"
      description="Manage your product skill levels"
      addNewPath="/admin/new-skill-level"
      isLoading={isLoading}
      error={error}
      table={table}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  );
};

export default ViewSkillLevel;
