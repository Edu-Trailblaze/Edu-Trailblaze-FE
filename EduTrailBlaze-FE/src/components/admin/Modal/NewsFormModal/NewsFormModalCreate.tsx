import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { z } from "zod";
import { News, NewsCreate } from "@/app/(Admin)/admin_dashboard/Dashboard/news/page";

const newsSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    imageUrl: z.string().url("Invalid URL format"),
});


type NewsFormModalCreateProps = {
    initialValues: NewsCreate;
    setNewNews: React.Dispatch<React.SetStateAction<NewsCreate>>;
    onSubmit: (formValues: NewsCreate) => void;
    onCancel: () => void;
    isOpen: boolean;
};

export default function NewsFormModalCreate({ initialValues, setNewNews, onSubmit, onCancel, isOpen }: NewsFormModalCreateProps) {
    const [formValues, setFormValues] = useState(initialValues);
    const [errors, setErrors] = useState<{ title?: string; content?: string; imageUrl?: string }>({});

    const handleChange = (field: keyof NewsCreate, value: any) => {
        setFormValues((prev) => ({
            ...prev,
            [field]: value,
        }));
        setNewNews((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        const result = newsSchema.safeParse(formValues);
        if (!result.success) {
            const newErrors: any = {};
            result.error.errors.forEach((err) => {
                newErrors[err.path[0]] = err.message;
            });
            setErrors(newErrors);
        } else {
            setErrors({});
            onSubmit(formValues);
            setFormValues(initialValues);
        }
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
                }}>

                <IconButton onClick={onCancel} sx={{ position: "absolute", top: 12, right: 12, color: "gray" }}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" component="h2" align="center" fontWeight="bold" gutterBottom sx={{ mb: "30px" }}>
                    ADD NEWS
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography sx={{ width: "40%", fontWeight: 600, textTransform: "uppercase" }}>Title</Typography>
                        <TextField
                            label="Title"
                            value={formValues.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            fullWidth
                            size="small"
                            error={!!errors.title}
                            helperText={errors.title}
                        />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography sx={{ width: "40%", fontWeight: 600, textTransform: "uppercase" }}>Content</Typography>
                        <TextField
                            label="Content"
                            value={formValues.content}
                            onChange={(e) => handleChange("content", e.target.value)}
                            fullWidth
                            size="small"
                            error={!!errors.content}
                            helperText={errors.content}
                        />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography sx={{ width: "40%", fontWeight: 600, textTransform: "uppercase" }}>Image URL</Typography>
                        <TextField
                            label="Image URL"
                            value={formValues.imageUrl}
                            onChange={(e) => handleChange("imageUrl", e.target.value)}
                            fullWidth
                            size="small"
                            error={!!errors.imageUrl}
                            helperText={errors.imageUrl}
                        />
                    </Box>
                </Box>

                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{ mt: 4, bgcolor: "#00B4D8", color: "white", display: "block", width: "100%", borderRadius: "0px", "&:hover": { bgcolor: "#0096D7" } }}
                >
                    ADD NEWS
                </Button>
            </Box>
        </Modal>
    );
}
