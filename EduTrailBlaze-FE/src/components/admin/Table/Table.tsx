import { Table as MuiTable, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

const Table = ({
  columns,
  renderRow,
  data
}: {
  columns: { label: string; accessor: string; className?: string }[]
  renderRow: (item: any) => React.ReactNode
  data: any[]
}) => {
  return (
    <MuiTable sx={{ mt: 2, width: '100%' }}>
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell key={col.accessor} className={col.className} sx={{ fontWeight: 'bold', color: 'gray' }}>
              {col.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>{data.map((item) => renderRow(item))}</TableBody>
    </MuiTable>
  )
}

export default Table
