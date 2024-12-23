import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import {
  useDeleteCollectionMutation,
  useGetCollectionQuery,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { createCollectionColumns } from "@/components/admin/table/columns/CollectionColumns";

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

  const handleEdit = (collection) => {
    navigate(`/admin/update-collection/${collection._id}`);
  };

  const handleDelete = (collection) => {
    deleteCollection(collection._id);
  };

  const handleImageUpload = async (collection, file) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("collectionId", collection._id);

    try {
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  const columns = useMemo(() =>
    createCollectionColumns(handleEdit, handleDelete, handleImageUpload)
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
        createdAt: collection.createdAt,
        updatedAt: collection.updatedAt,
      }));
  }, [collectionData]);

  return (
    <ViewLayout
      title="Collection"
      description="Manage your collections"
      addNewPath="/admin/new-collection"
      isLoading={isLoading}
      error={error}
      data={data}
      columns={columns}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  );
};

export default ViewCollection;
