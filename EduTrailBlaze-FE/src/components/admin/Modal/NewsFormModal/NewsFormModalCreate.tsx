import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

type News = {
    title: string;
    content: string;
    imageUrl: string;
}

type NewsFormModalCreateProps = {
    initialValues: News;
    setNewNews: React.Dispatch<React.SetStateAction<News>>;
    onSubmit: (formValues: News) => void;
    onCancel: () => void;
    isOpen: boolean;
};

export default function NewsFormModalCreate({ initialValues, setNewNews, onSubmit, onCancel, isOpen }: NewsFormModalCreateProps) {
    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = (field: keyof News, value: any) => {
        setFormValues((prev) => ({
            ...prev,
            [field]: value,
        }));
        setNewNews((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <Modal open={isOpen} onClose={onCancel} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 600,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    overflowY: "auto",
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Create News
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField label="Title" value={formValues.title} onChange={(e) => handleChange("title", e.target.value)} fullWidth />
                    <TextField label="Content" value={formValues.content} onChange={(e) => handleChange("content", e.target.value)} fullWidth />
                    <TextField label="Image URL" value={formValues.imageUrl} onChange={(e) => handleChange("imageUrl", e.target.value)} fullWidth />

                </Box>

                <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
                    <Button onClick={() => onSubmit(formValues)} variant="contained" color="primary">
                        Create
                    </Button>
                    <Button onClick={onCancel} variant="contained" color="secondary">
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
