import { Checkbox, Table as MuiTable, TableHead, TableRow, TableCell, TableBody } from "@mui/material";


const Table = ({
    columns,
    renderRow,
    data,
    // selectedRows,
    // onSelectRow

}: {
    columns: { label: string; accessor: string; className?: string }[];
    renderRow: (item: any) => React.ReactNode;
    data: any[];
    // selectedRows: Set<string>;  
    // onSelectRow: (id: string) => void;
}) => {
    return (
        <MuiTable sx={{ mt: 3, width: "100%" }}>
            <TableHead>
                <TableRow>
                    {columns.map((col) => (
                        <TableCell
                            key={col.accessor}
                            className={col.className}
                            sx={{
                                fontWeight: 700,
                                color: "black",
                                padding: "12px 16px",
                                textTransform: "uppercase",
                                fontSize: "0.9rem",
                                textAlign: "left",

                            }}
                        >
                            {col.label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            {/* <TableHead>
                <TableRow>
                    <TableCell sx={{ padding: "12px 16px", width: "50px" }}>
                        <Checkbox
                            indeterminate={selectedRows.size > 0 && selectedRows.size < data.length}
                            checked={selectedRows.size === data.length}
                            onChange={() => {
                                if (selectedRows.size === data.length) {
                                    onSelectRow("all");
                                } else {
                                    onSelectRow("none");
                                }
                            }}
                        />
                    </TableCell>
                    {columns.map((col) => (
                        <TableCell
                            key={col.accessor}
                            className={col.className}
                            sx={{
                                fontWeight: 700,
                                color: "black",
                                padding: "12px 16px",
                                textTransform: "uppercase",
                                fontSize: "0.9rem",
                                textAlign: "left",
                            }}
                        >
                            {col.label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead> */}

            <TableBody>
                {data.map((item) => renderRow(item))}
            </TableBody>
        </MuiTable>
    );
};

export default Table;
