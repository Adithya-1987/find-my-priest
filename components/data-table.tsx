interface Column<T> {
  key: keyof T
  label: string
  render?: (value: T[keyof T], item: T) => React.ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  rowKey: keyof T
}

export function DataTable<T>({ columns, data, rowKey }: DataTableProps<T>) {
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <table className="w-full">
        <thead className="bg-secondary/30 border-b border-border">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-6 py-3 text-left text-sm font-semibold text-foreground"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={String(row[rowKey])}
              className="border-b border-border hover:bg-secondary/10 transition-colors last:border-0"
            >
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className="px-6 py-3 text-sm text-foreground"
                >
                  {col.render
                    ? col.render(row[col.key], row)
                    : String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
