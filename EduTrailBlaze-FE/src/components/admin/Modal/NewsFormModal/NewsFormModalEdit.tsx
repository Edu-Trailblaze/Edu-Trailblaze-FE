import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button, MenuItem, FormControl, InputLabel, Select } from "@mui/material";

type News = {
    newsId?: number;
    title: string;
    content: string;
    imageUrl: string;

};

type NewsFormModalEditProps = {
    initialValues: News;
    setEditNews: React.Dispatch<React.SetStateAction<News>>;
    onSubmit: (formValues: News) => void;
    onCancel: () => void;
    isOpen: boolean;
};

export default function NewsFormModalEdit({ initialValues, setEditNews, onSubmit, onCancel, isOpen }: NewsFormModalEditProps) {
    const [formValues, setFormValues] = useState<News>(initialValues);

    useEffect(() => {
        if (initialValues) {
            setFormValues(initialValues);
        }
    }, [initialValues]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formValues);
    };

    const handleChange = (field: keyof News, value: any) => {
        setFormValues((prev) => ({
            ...prev,
            [field]: value,
        }));
        setEditNews((prev) => ({
            ...prev!,
            [field]: value,
        }));
    };

    return (
        <Modal open={isOpen} onClose={onCancel} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 500,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    overflowY: "auto",
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Edit Voucher
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>

                    <TextField
                        label="Title"
                        value={formValues.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Content"
                        value={formValues.content}
                        onChange={(e) => handleChange("content", e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Image URL"
                        value={formValues.imageUrl}
                        onChange={(e) => handleChange("imageUrl", e.target.value)}
                        fullWidth
                    />

                </Box>

                <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Save Changes
                    </Button>
                    <Button onClick={onCancel} variant="contained" color="secondary">
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
