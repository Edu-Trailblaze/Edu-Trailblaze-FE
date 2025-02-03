import React, { useState } from "react";
import { Modal, Box, Typography, Button, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface FieldConfig {
    key: string;
    label: string;
    type?: "text" | "number" | "textarea";
}

interface ModalEditProps {
    open: boolean;
    onClose: () => void;
    initialData: ICourse;
    fields: FieldConfig[];
    title?: string;
    onSave: (updatedData: ICourse) => void; // Callback to handle saving 
    onDelete?: () => void; // Callback to handle deleting
}

const ModalEdit: React.FC<ModalEditProps> = ({
    open,
    onClose,
    initialData,
    fields,
    title = "Edit Details",
    onSave,
    onDelete,
}) => {
    const [formData, setFormData] = useState(initialData);

    const handleInputChange = <K extends keyof ICourse>(key: K, value: ICourse[K]) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="edit-modal-title">
            <Box
                className="bg-white p-6 rounded-lg shadow-md relative"
                style={{
                    width: "400px",
                    margin: "100px auto",
                    outline: "none",
                }}
            >

                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    style={{ position: "absolute", top: "10px", right: "10px" }}
                >
                    <CloseIcon />
                </IconButton>

                <Typography id="edit-modal-title" variant="h6" className="mb-4 font-bold">
                    {title}
                </Typography>

                <div className="flex flex-col gap-4 mb-4">
                    {fields.map((field) => (
                        <div key={field.key}>
                            {field.type === "textarea" ? (
                                <TextField
                                    label={field.label}
                                    multiline
                                    rows={4}
                                    value={formData[field.key as keyof ICourse]}
                                    onChange={(e) => handleInputChange(field.key as keyof ICourse, e.target.value)}
                                    fullWidth
                                />
                            ) : (
                                <TextField
                                    label={field.label}
                                    type={field.type || "text"}
                                    value={formData[field.key as keyof ICourse]} // Ensures key is valid
                                    onChange={(e) =>
                                        handleInputChange(
                                            field.key as keyof ICourse,
                                            field.type === "number" ? Number(e.target.value) : e.target.value
                                        )
                                    }
                                    fullWidth
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4">
                    {onDelete && (
                        <Button variant="contained" color="error" onClick={onDelete}>
                            Delete
                        </Button>
                    )}
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Save
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default ModalEdit;
