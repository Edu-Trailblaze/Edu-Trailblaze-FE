import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button, Select, MenuItem } from "@mui/material";

type Course = {
    id?: number;
    title: string;
    imageURL: string;
    introURL: string;
    description: string;
    price: number;
    difficultyLevel: string;
    createdBy: string;
    prerequisites: string;
    learningOutcomes: string[];
};

type CourseFormModalEditProps = {
    initialValues: Course;
    setEditCourse: React.Dispatch<React.SetStateAction<Course>>;
    onSubmit: (formValues: Course) => void;
    onCancel: () => void;
    isOpen: boolean;
};

export default function CourseFormModalEdit({ initialValues, setEditCourse, onSubmit, onCancel, isOpen }: CourseFormModalEditProps) {
    const [formValues, setFormValues] = useState(initialValues);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formValues);
    };


    useEffect(() => {
        if (initialValues) {
            setFormValues(initialValues);
        }
    }, [initialValues]);

    const handleChange = (field: keyof Course, value: any) => {
        setFormValues((prev) => ({
            ...prev,
            [field]: value,
        }));
        setEditCourse((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <Modal open={isOpen} onClose={onCancel} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 700,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    overflowY: "auto",
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Edit Course
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        label="Title"
                        value={formValues.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Image URL"
                        value={formValues.imageURL}
                        onChange={(e) => handleChange("imageURL", e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Intro URL"
                        value={formValues.introURL}
                        onChange={(e) => handleChange("introURL", e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Description"
                        value={formValues.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        fullWidth
                        multiline
                    />
                    <TextField
                        label="Price"
                        type="number"
                        value={formValues.price}
                        onChange={(e) => handleChange("price", Number(e.target.value))}
                        fullWidth
                    />
                    <Select
                        value={formValues.difficultyLevel}
                        onChange={(e) => handleChange("difficultyLevel", e.target.value)}
                        fullWidth
                        displayEmpty
                    >
                        <MenuItem value="" disabled>
                            Select Difficulty
                        </MenuItem>
                        <MenuItem value="Beginner">Beginner</MenuItem>
                        <MenuItem value="Intermediate">Intermediate</MenuItem>
                        <MenuItem value="Advanced">Advanced</MenuItem>
                    </Select>
                    <TextField
                        label="Created By"
                        value={formValues.createdBy}
                        onChange={(e) => handleChange("createdBy", e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Prerequisites"
                        value={formValues.prerequisites}
                        onChange={(e) => handleChange("prerequisites", e.target.value)}
                        fullWidth
                        multiline
                    />
                    <TextField
                        label="Learning Outcomes"
                        value={formValues.learningOutcomes.join(', ')}
                        onChange={(e) => handleChange("learningOutcomes", e.target.value.split(',').map(item => item.trim()))}
                        fullWidth
                        multiline
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
