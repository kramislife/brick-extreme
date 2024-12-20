import React, { useState, useMemo, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { createProductColumns } from "@/components/admin/table/columns/ProductColumns";

const ViewProducts = () => {
  const { data: productData, isLoading, error } = useGetProductsQuery();

  const [
    deleteProduct,
    {
      isSuccess: deleteProductSuccess,
      isError: deleteProductError,
      error: deleteError,
    },
  ] = useDeleteProductMutation();

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([{ id: "createdAt", desc: true }]);
  const navigate = useNavigate();

  useEffect(() => {
    if (deleteProductSuccess) {
      toast.success("Product deleted successfully");
    }

    if (deleteProductError) {
      toast.error(deleteError?.data?.message || "Failed to delete product");
    }
  }, [deleteProductSuccess, deleteProductError, deleteError]);

  const handleEdit = (product) => {
    navigate(`/admin/update-product/${product._id}`);
  };

  const handleViewGallery = (product) => {
    navigate(`/admin/product-gallery/${product._id}`);
  };

  const handleDelete = (product) => {
    deleteProduct(product._id);
  };

  // column component for table
  const columns = useMemo(
    () => createProductColumns(handleEdit, handleDelete, handleViewGallery)
  );

  const data = useMemo(() => {
    if (!productData?.allProducts) return [];
    return [...productData.allProducts]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((product, index) => ({
        id: index + 1,
        _id: product._id,
        name: product.product_name,
        price: product.price,
        category: product.product_category
          .map((category) => category?.name)
          .join(", "),
        collection: product.product_collection
          .map((collection) => collection.name)
          .join(", "),
        stock: product.stock,
        createdAt: product.createdAt,
      }));
  }, [productData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter,
      sorting,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <ViewLayout
      title="Products"
      description="Manage your product inventory"
      addNewPath="/admin/new-product"
      isLoading={isLoading}
      error={error}
      table={table}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  );
};

export default ViewProducts;
