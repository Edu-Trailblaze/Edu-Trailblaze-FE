import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { News } from "@/app/(Admin)/admin_dashboard/Dashboard/news/page";



type NewsFormModalEditProps = {
    initialValues: News;
    setEditNews: React.Dispatch<React.SetStateAction<News | null>>;
    onSubmit: (formValues: News) => void;
    onCancel: () => void;
    isOpen: boolean;
};

export default function NewsFormModalEdit({ initialValues, setEditNews, onSubmit, onCancel, isOpen }: NewsFormModalEditProps) {
    const [formValues, setFormValues] = useState(initialValues);

    useEffect(() => {
        setFormValues(initialValues);
    }, [initialValues]);

    const handleChange = (field: keyof News, value: any) => {
        setFormValues((prev) => {
            const updatedValues = { ...prev, [field]: value };
            setEditNews(updatedValues);
            return updatedValues;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formValues);
    };

    return (
        <Modal open={isOpen} onClose={onCancel} sx={{ display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "rgba(0,0,0,0.5)" }}>
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
                <IconButton onClick={onCancel} sx={{ position: "absolute", top: 12, right: 12, color: "gray" }}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" component="h2" align="center" fontWeight="bold" gutterBottom sx={{ mb: "30px" }}>
                    EDIT NEWS
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography sx={{ width: "40%", fontWeight: 600, textTransform: "uppercase" }}>Title</Typography>
                        <TextField value={formValues.title} onChange={(e) => handleChange("title", e.target.value)} fullWidth size="small" />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography sx={{ width: "40%", fontWeight: 600, textTransform: "uppercase" }}>Content</Typography>
                        <TextField value={formValues.content} onChange={(e) => handleChange("content", e.target.value)} fullWidth size="small" />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography sx={{ width: "40%", fontWeight: 600, textTransform: "uppercase" }}>Image URL</Typography>
                        <TextField value={formValues.imageUrl} onChange={(e) => handleChange("imageUrl", e.target.value)} fullWidth size="small" />
                    </Box>
                </Box>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{
                        mt: 4,
                        bgcolor: "#00B4D8",
                        color: "white",
                        display: "block",
                        width: "100%",
                        borderRadius: "0px",
                        "&:hover": { bgcolor: "#0096D7" },
                    }}
                >
                    SAVE CHANGES
                </Button>
            </Box>
        </Modal>
    );
}
