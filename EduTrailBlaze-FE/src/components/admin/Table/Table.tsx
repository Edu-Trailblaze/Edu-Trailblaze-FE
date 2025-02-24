import { Table as MuiTable, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material"; // Import icon từ MUI


const Table = ({
    columns,
    renderRow,
    data,

}: {
    columns: { label: string; accessor: string; className?: string }[];
    renderRow: (item: any) => React.ReactNode;
    data: any[];
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

            <TableBody>
                {data.map((item) => renderRow(item))}
            </TableBody>
        </MuiTable>
    );
};

export default Table;
