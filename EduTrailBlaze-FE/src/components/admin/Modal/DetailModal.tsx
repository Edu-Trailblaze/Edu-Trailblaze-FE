import React from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FormatDateTime from "../Date/FormatDateTime";

type DetailProps<T> = {
  item: T | null
  onClose: () => void
  fields: { label: string; accessor: keyof T }[]
}

export default function DetailModal<T>({ item, onClose, fields }: DetailProps<T>) {
  return (
    <Modal
      open={Boolean(item)}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "rgba(0,0,0,0.5)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 550,
          bgcolor: "white",
          p: 4,
          borderRadius: 0,
          border: "1px solid #ccc",
          position: "relative",

        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 12, right: 12, color: "gray" }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant="h6"
          component="h2"
          align="center"
          fontWeight="bold"
          gutterBottom
          sx={{ mb: "30px" }}
        >
          DETAIL BOOKING
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, fontSize: "0.9rem" }}>
          {fields.map(({ label, accessor }) => {
            const value = item?.[accessor] || "";
            const isDateField = typeof value === 'string' && !isNaN(Date.parse(value));
            const isImageField = accessor === "imageUrl";


            const displayValue = isDateField
              ? FormatDateTime({ date: value as string })
              : String(value || "");

            return (
              <Box key={String(accessor)} sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    color: "black",
                    width: "40%",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  {label}
                </Typography>

                {isImageField ? (
                  <img
                    src={value as string}
                    alt="news image"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Typography sx={{ fontWeight: label === "STATUS" || label === "SERVICE TYPE" ? "bold" : "normal" }}>
                    {isDateField ? FormatDateTime({ date: value as string }) : String(value || "")}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>

        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            mt: 4,
            bgcolor: "#00B4D8",
            color: "white",
            display: "block",
            width: "100%",
            borderRadius: "0px",
            "&:hover": { bgcolor: "#0096D7" }
          }}
        >
          CANCEL
        </Button>
      </Box>
    </Modal >
  );
}
