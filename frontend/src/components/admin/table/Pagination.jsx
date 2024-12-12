const Pagination = ({ table }) => (
  <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
    <div className="text-sm text-light/80">
      Showing{" "}
      {table.getState().pagination.pageIndex *
        table.getState().pagination.pageSize +
        1}{" "}
      to{" "}
      {Math.min(
        (table.getState().pagination.pageIndex + 1) *
          table.getState().pagination.pageSize,
        table.getFilteredRowModel().rows.length
      )}{" "}
      of {table.getFilteredRowModel().rows.length} entries
    </div>

    <div className="flex gap-2">
      <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className="px-4 py-2 border border-gray-600 rounded-md text-sm font-medium text-light 
                   hover:bg-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>
      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className="px-4 py-2 border border-gray-600 rounded-md text-sm font-medium text-light 
                   hover:bg-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  </div>
);

export default Pagination;
