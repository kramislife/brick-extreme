const TableLayout = ({ headerGroups, rows, flexRender }) => (
  <div className="overflow-x-auto">
    <table className="w-full caption-bottom text-sm">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr key={headerGroup.id} className="border-b border-gray-200/10">
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="h-14 px-6 align-middle font-semibold text-light/90 text-center"
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.length > 0 ? (
          rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-gray-200/10 transition-colors hover:bg-blue-500/10 text-center"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="py-5 text-sm text-light/80 text-center max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={headerGroups[0].headers.length}
              className="px-6 py-8 text-center text-light/80"
            >
              No products found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default TableLayout;
