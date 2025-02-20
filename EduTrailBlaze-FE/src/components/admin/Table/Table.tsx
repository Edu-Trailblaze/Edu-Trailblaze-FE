import { Table as MuiTable, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

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
                {data.map((item) => (
                    <TableRow key={item.id}>
                        {columns.map((col) => (
                            <TableCell
                                key={col.accessor}
                                sx={{
                                    textAlign: "left",
                                    padding: "12px 16px",
                                }}
                            >
                                {col.accessor === "imageUrl" ? (
                                    <img
                                        src={item[col.accessor]}
                                        alt="news"
                                        style={{ width: "100px", height: "auto", borderRadius: "5px" }}
                                    />
                                ) : (
                                    item[col.accessor]
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </MuiTable>
    );
};

export default Table;
