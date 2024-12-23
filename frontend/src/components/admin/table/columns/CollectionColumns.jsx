import { Edit2, ImagePlus, Trash2 } from "lucide-react";

export const createCollectionColumns = (
  handleEdit,
  handleDelete,
  handleUploadImage
) => [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Product Collection",
    accessorKey: "name",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
  },
  {
    header: "Updated At",
    accessorKey: "updatedAt",
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex justify-center gap-2">
        <button
          onClick={() => handleEdit(row.original)}
          className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors"
          title="Edit Collection"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={() => handleUploadImage(row.original)}
          className="text-purple-600 hover:text-purple-800 p-1 rounded-full hover:bg-purple-100 transition-colors"
          title="Upload Image "
        >
          <ImagePlus size={18} />
        </button>
        <button
          onClick={() => handleDelete(row.original)}
          className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors"
          title="Delete Collection"
        >
          <Trash2 size={18} />
        </button>
      </div>
    ),
  },
];
