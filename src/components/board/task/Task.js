import React, { useState } from 'react';
import {
    Card,
    IconButton,
    Typography,
    Box,
    TextField
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddCard from './AddCard';
import { Delete, Edit, Check } from '@mui/icons-material';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ColumnModal from './ColumnModal';

const Task = ({ title, columnId, cards, onAddCard, onDeleteCard, onEditCard, label, priority, handleColumnUpdate }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');


    const handleEditClick = (index) => {
        setEditingIndex(index);
        setEditedTitle(cards[index]);
    };

    const handleSaveEdit = () => {
        if (editedTitle.trim() !== '') {
            onEditCard(columnId, editingIndex, editedTitle);
            setEditingIndex(null);
            setEditedTitle('');
        }
    };

    const handleAddCard = (cardTitle) => {
        if (cardTitle.trim() !== '') {
            onAddCard(columnId, cardTitle);
        }
    };
    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedCardIndex(null);
    };


    return (
        <Box sx={{ width: 300 }}>
            <Droppable droppableId={columnId}>
                {(provided) => (
                    <Card
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            p: 2,
                            minHeight: 100,
                            maxHeight: 500,
                            borderRadius: 5,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                        }}
                    >

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography fontWeight="bold">{title}</Typography>
                            {label && <Typography variant="caption" sx={{ color: 'blue' }}>Label: {label}</Typography>}
                            {priority && <Typography variant="caption" sx={{ color: 'red' }}>Priority: {priority}</Typography>}
                            <IconButton>
                                <MoreHorizIcon />
                            </IconButton>
                        </Box>

                        {/* Card List */}
                        <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 1, pr: 1 }}>
                            {cards.map((card, index) => (
                                <Draggable draggableId={`${columnId}-${index}`} index={index} key={`${columnId}-${index}`}>
                                    {(provided) => (
                                        <Box
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            sx={{
                                                p: 1,
                                                borderRadius: 1,
                                                mb: 1,
                                                boxShadow: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                border: '1px solid grey'
                                            }}
                                        >
                                            {editingIndex === index ? (
                                                <TextField
                                                    value={editedTitle}
                                                    onChange={(e) => setEditedTitle(e.target.value)}
                                                    onBlur={handleSaveEdit}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') handleSaveEdit();
                                                    }}
                                                    size="small"
                                                    fullWidth
                                                    autoFocus
                                                />
                                            ) : (
                                                <Typography variant="body2">{card}</Typography>
                                            )}

                                            <Box sx={{ ml: 1 }}>
                                                <IconButton>
                                                    <MenuOpenIcon onClick={() => {
                                                        setSelectedCardIndex(index);
                                                        setModalOpen(true);
                                                    }} sx={{ width: 18, height: 18 }}
                                                    />
                                                </IconButton>

                                                <IconButton onClick={() => onDeleteCard(columnId, index)} size="small">
                                                    <Delete sx={{ width: 18, height: 18 }} />
                                                </IconButton>

                                                {editingIndex === index ? (
                                                    <IconButton onClick={handleSaveEdit} size="small">
                                                        <Check sx={{ width: 18, height: 18 }} />
                                                    </IconButton>
                                                ) : (
                                                    <IconButton onClick={() => handleEditClick(index)} size="small">
                                                        <Edit sx={{ width: 18, height: 18 }} />
                                                    </IconButton>
                                                )}
                                            </Box>
                                        </Box>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </Box>


                        <Box sx={{ pt: 1 }}>
                            <AddCard onAddCard={handleAddCard} />
                        </Box>
                    </Card>
                )}
            </Droppable>
            {modalOpen && selectedCardIndex !== null && (
                <ColumnModal
                    open={modalOpen}
                    handleClose={handleCloseModal}
                    column={{
                        id: columnId,
                        title,
                        description: '',
                        label,
                        priority
                    }}
                    handleUpdate={(id, description, label, priority) => {
                        console.log('Updated:', id, description, label, priority);
                        handleCloseModal();
                    }}
                />
            )}

        </Box>
    );
};

export default Task;
