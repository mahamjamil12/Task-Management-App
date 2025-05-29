import React, { useEffect, useState, useRef } from 'react';
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

const Task = ({ title }) => {
    const [cards, setCards] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const saveTimeoutRef = useRef(null);

    // const storageKey = `cards_${title}`;

   
    // useEffect(() => {
    //     const stored = localStorage.getItem(storageKey);
    //     if (stored) {
    //         try {
    //             setCards(JSON.parse(stored));
    //         } catch (e) {
    //             console.error("Failed to parse stored cards:", e);
    //         }
    //     }
    // }, [storageKey]);

   
    // useEffect(() => {
    //     if (saveTimeoutRef.current) {
    //         clearTimeout(saveTimeoutRef.current);
    //     }

    //     saveTimeoutRef.current = setTimeout(() => {
    //         localStorage.setItem(storageKey, JSON.stringify(cards));
    //     }, 300); 
    // }, [cards, storageKey]);

    const handleAddCard = (cardTitle) => {
        setCards((prevCards) => [...prevCards, cardTitle]);
    };

    const handleEditClick = (index) => {
        setEditingIndex(index);
        setEditedTitle(cards[index]);
    };

    const handleSaveEdit = () => {
        setCards((prevCards) =>
            prevCards.map((card, i) =>
                i === editingIndex ? editedTitle : card
            )
        );
        setEditingIndex(null);
        setEditedTitle('');
    };

    return (
        <Box sx={{ width: 300 }}>
            <Card sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 2,
                height: 'auto',
                minHeight: 100,
                maxHeight: 500,
                borderRadius: 5,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography fontWeight="bold">{title}</Typography>
                    <IconButton>
                        <MoreHorizIcon />
                    </IconButton>
                </Box>

                <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 1, pr: 1 }}>
                    {cards.map((card, index) => (
                        <Box key={index} sx={{
                            p: 1,
                            borderRadius: 1,
                            mb: 1,
                            boxShadow: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            border: '1px solid grey'
                        }}>
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
                                <IconButton onClick={() =>
                                    setCards(prev => prev.filter((_, i) => i !== index))
                                } size="small">
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
                    ))}
                </Box>

                <Box sx={{ pt: 1 }}>
                    <AddCard onAddCard={handleAddCard} />
                </Box>
            </Card>
        </Box>
    );
};

export default Task;
