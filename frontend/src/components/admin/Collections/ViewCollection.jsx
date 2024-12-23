import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import {
  useDeleteCollectionMutation,
  useGetCollectionQuery,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { createCollectionColumns } from "../table/columns/CollectionColumns";

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

  const handleViewGallery = (collection) => {
    navigate(`/admin/collection-gallery/${collection._id}`);
  };

  // column component for table
  const columns = useMemo(() =>
    createCollectionColumns(handleEdit, handleDelete, handleViewGallery)
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

  return (
    <ViewLayout
      title="Collections"
      description="Manage your product collections"
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
