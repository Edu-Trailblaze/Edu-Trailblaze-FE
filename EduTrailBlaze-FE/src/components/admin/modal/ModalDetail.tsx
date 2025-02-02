'use client';

import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    data?: Record<string, any>; // any type
    onEdit?: () => void;
    onDelete?: () => void;
    title?: string; //modal title
    children?: React.ReactNode; //content
}

const ModalDetail: React.FC<ModalProps> = ({
    open,
    onClose,
    data,
    onEdit,
    onDelete,
    title = 'Details',
    children,
}) => {
    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
            <Box
                className="bg-white p-6 rounded-lg shadow-md"
                style={{
                    width: '400px',
                    margin: '100px auto',
                    outline: 'none',
                }}
            >
                <Typography id=" modal-title" variant="h6" className="mb-4 font-bold">
                    {title}
                </Typography>
                {children || (
                    <div className="mb-4">
                        {data &&
                            Object.entries(data).map(([key, value]) => (
                                <Typography variant="body1" className="mb-2" key={key}>
                                    <strong>{key.toUpperCase()}:</strong> {value}
                                </Typography>
                            ))}
                    </div>
                )}
                <div className="flex justify-end gap-4">
                    {onEdit && (
                        <Button variant="contained" color="primary" onClick={onEdit}>
                            Edit
                        </Button>
                    )}
                    {onDelete && (
                        <Button variant="contained" color="error" onClick={onDelete}>
                            Delete
                        </Button>
                    )}
                </div>
            </Box>
        </Modal>
    );
};

export default ModalDetail;
