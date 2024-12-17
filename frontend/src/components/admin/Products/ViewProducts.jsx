import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Edit2, Trash2, Image, PlusCircle } from "lucide-react";
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
  const [sorting, setSorting] = useState([{ id: "createdAt", desc: true }]);

  const navigate = useNavigate();

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
        cell: ({ row }) => {
          const statusColors = {
            Active: "bg-green-500 text-black",
            Low: "bg-yellow-500 text-black",
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
              onClick={() => handleViewGallery(row.original.product_id)}
              className="text-purple-600 hover:text-purple-800 p-1 rounded-full hover:bg-purple-100 transition-colors"
              title="View Image Gallery"
            >
              <Image size={18} />
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

  // Sort products by creation date (newest first)
  const products = useMemo(() => {
    if (!productData?.allProducts) return [];

    return [...productData.allProducts]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((product, index) => ({
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
        createdAt: product?.createdAt,
        status:
          product?.stock > 50
            ? "Active"
            : product?.stock > 0
            ? "Low"
            : "Out of Stock",
      }));
  }, [productData]);

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter,
      pagination: {
        pageSize,
        pageIndex,
      },
      sorting,
    },
    onSortingChange: setSorting,
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

  // Handle edit product
  const handleEdit = (product) => {
    navigate(`/admin/update-product/${product.product_id}`);
  };

  // Handle view gallery
  const handleViewGallery = (product_id) => {
    navigate(`/admin/product-gallery/${product_id}`);
  };

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

  // Handle loading and error states
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-light tracking-tight">
            Products Management
          </h1>
          <p className="text-gray-200/70 text-md">
            Manage your product inventory
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/new-product")}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center gap-2 hover:from-blue-700 hover:to-purple-700 px-4 py-2 rounded-md"
        >
          <PlusCircle className="w-5 h-5" />
          Add New Product
        </button>
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
