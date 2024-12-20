import React, { useState, useMemo, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Edit2, Trash2, Image } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import ProductStatus from "@/components/product/shared/ProductStatus";

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

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Product Name",
        accessorKey: "name",
      },
      {
        header: "Price",
        accessorKey: "price",
        cell: ({ row }) => `$${row.original.price.toFixed(2)}`,
      },
      {
        header: "Category",
        accessorKey: "category",
      },
      {
        header: "Collection",
        accessorKey: "collection",
      },
      {
        header: "Stock",
        accessorKey: "stock",
      },
      {
        header: "Date Created",
        accessorKey: "createdAt",
        cell: ({ row }) =>
          new Date(row.original.createdAt).toLocaleDateString(),
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <div className="flex justify-center">
            <ProductStatus stock={row.original.stock} variant="pill" />
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
              title="Edit Product"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => handleViewGallery(row.original)}
              className="text-purple-600 hover:text-purple-800 p-1 rounded-full hover:bg-purple-100 transition-colors"
              title="View Image Gallery"
            >
              <Image size={18} />
            </button>
            <button
              onClick={() => handleDelete(row.original)}
              className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors"
              title="Delete Product"
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

  const handleEdit = (product) => {
    navigate(`/admin/update-product/${product._id}`);
  };

  const handleViewGallery = (product) => {
    navigate(`/admin/product-gallery/${product._id}`);
  };

  const handleDelete = (product) => {
    deleteProduct(product._id);
  };

  return (
    <ViewLayout
      title="Product"
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
