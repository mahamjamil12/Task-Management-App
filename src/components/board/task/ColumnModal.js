import React, { useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    TextField,
    MenuItem,
    Button,
    Select
} from '@mui/material';

const labels = ['High Priority', 'Bug', 'Feature', 'Low Priority'];

const priorities = ['High', 'Low', 'Medium']

const ColumnModal = ({ open, column, handleUpdate }) => {
    const [priority, setPriority] = useState(column.priority || '');
    const [anchorEl, setAnchorEl] = useState(null);
    const [description, setDescription] = React.useState(column.description || '');
    const [label, setLabel] = useState(column.label || '');

    const handleSave = () => {
        handleUpdate(column.id, description, label,priority);
        handleClose();
    };
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        // setCardTitle('');
    };
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                p: 4,
                borderRadius: 2,
                width: 400,
                boxShadow: 24
            }}>
                <Typography variant="h6">{column.title}</Typography>

                <TextField
                    label="Description"
                    multiline
                    rows={4}
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{ mt: 2 }}
                />

                <TextField
                    select
                    label="Label"
                    fullWidth
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    sx={{ mt: 2 }}
                >
                    {labels.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    label="Priority"
                    fullWidth
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    sx={{ mt: 2 }}
                >
                    {priorities.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

               


                <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 3 }}
                    onClick={handleSave}
                >
                    Save
                </Button>
            </Box>
        </Modal>
    );
};

export default ColumnModal;
