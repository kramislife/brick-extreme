const TableLayout = ({ headerGroups, rows, flexRender }) => (
    <div className="overflow-x-auto">
      <table className="w-full caption-bottom text-sm">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr key={headerGroup.id} className="border-b border-gray-200/10">
              {headerGroup.headers.map(header => (
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
          {rows.map(row => (
            <tr 
              key={row.id}
              className="border-b border-gray-200/10 transition-colors hover:bg-blue-500/10 text-center"
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-6 py-5 text-sm text-light/80 text-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  export default TableLayout;