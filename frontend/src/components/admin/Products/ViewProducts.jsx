import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SearchBar from "@/components/admin/table/SearchBar";
import ShowEntries from "@/components/admin/table/ShowEntries";
import TableLayout from "@/components/admin/table/TableLayout";
import Pagination from "@/components/admin/table/Pagination";
import { useGetProductsQuery } from "@/redux/api/productApi";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const ViewProducts = () => {
  const { data: productData, isLoading, error } = useGetProductsQuery();
  const [globalFilter, setGlobalFilter] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);

  const navigate = useNavigate();

  // Extract product data or fallback to an empty array if not available
  const products = useMemo(
    () =>
      productData?.allProducts?.map((product, index) => ({
        product_id: product?._id,
        id: index + 1,
        name: product?.product_name,
        price: product?.price,
        category: product?.product_category
          .map((category) => category?.name)
          .join(", "),
        collection: product?.product_collection
          .map((collection) => collection.name)
          .join(", "),
        stock: product?.stock,
        status:
          product?.stock > 50
            ? "Active"
            : product?.stock > 0
            ? "Low Stock"
            : "Out of Stock",
      })) || [],
    [productData]
  );

  // Handle edit product (placeholder)
  const handleEdit = (product) => {
    navigate(`/admin/update-product/${product.product_id}`);
    // Add your edit logic here
  };

  // Table columns
  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Name",
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
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => {
          const statusColors = {
            Active: "bg-green-500 text-black",
            "Low Stock": "bg-yellow-500 text-black",
            "Out of Stock": "bg-red-500 text-light",
          };
          return (
            <span
              className={`px-5 py-1 rounded-full text-xs ${
                statusColors[row.original.status]
              }`}
            >
              {row.original.status}
            </span>
          );
        },
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
              onClick={() => handleDelete(row.original.product_id)}
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

  // Table configuration
  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
      pagination: {
        pageSize,
        pageIndex,
      },
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater({
          pageIndex,
          pageSize,
        });
        setPageIndex(newState.pageIndex);
        setPageSize(newState.pageSize);
      } else {
        setPageIndex(updater.pageIndex);
        setPageSize(updater.pageSize);
      }
    },
    pageCount: Math.ceil(products.length / pageSize),
    manualPagination: false,
  });

  // Handle loading and error states
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error loading products</div>;
  }

  // Handle delete product
  const handleDelete = async (product_id) => {
    try {
      const response = await fetch(`/api/products/${product_id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log(`Deleted product with ID: ${product_id}`);
      } else {
        console.error("Failed to delete product.");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold text-light tracking-tight">
          Products Management
        </h1>
        <p className="text-gray-200/70 text-md">
          Manage your product inventory
        </p>
      </div>

      <Card className="bg-darkBrand border-none">
        <CardContent className="p-10">
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
            <ShowEntries value={pageSize} onChange={setPageSize} />
            <SearchBar
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              placeholder="Search products..."
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
  );
};

export default ViewProducts;
