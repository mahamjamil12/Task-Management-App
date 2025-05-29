
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
    IconButton,
    Box,
    Button,
    Popover,
    TextField
} from '@mui/material';

const AddCard = ({onAddCard}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [cardTitle, setCardTitle] = useState('');

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setCardTitle('');
    };
    const handleAddCard = () => {
        if (cardTitle.trim() !== '') {
            onAddCard(cardTitle.trim());
            handleClose();
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? 'add-card-popover' : undefined;
    

  return (
   <>
   <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleOpen}>
                    <AddIcon />
                </IconButton>
                <Button onClick={handleOpen} >Add a Card</Button>
            </Box>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
            >
                <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1, width: 250 }}>
                    <TextField
                        multiline
                        placeholder="Enter card title"
                        value={cardTitle}
                        onChange={(e) => setCardTitle(e.target.value)}
                        fullWidth
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button variant="contained" onClick={handleAddCard}>
                            Add Card
                        </Button>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Popover>
   </>
  )
}

export default AddCard
