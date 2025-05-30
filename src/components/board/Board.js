import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper } from '@mui/material';
import Navbar from '../navbar/Navbar';
import Task from './task/Task';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const LOCAL_STORAGE_KEY = 'kanban_columns';

const Board = () => {
  // Load columns from localStorage or fallback to empty
  const [columns, setColumns] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored
      ? JSON.parse(stored)
      : [
          { id: 'todo', title: 'To Do', cards: [] ,label:'',priority:'',des:''},
          { id: 'today', title: 'Today', cards: [] ,label:'',priority:'',des:'' },
          { id: 'week', title: 'This Week', cards: [] ,label:'',priority:'',des:''},
          { id: 'later', title: 'Later', cards: [] ,label:'',priority:'',des:''},
        ];
  });

  
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  const onDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) return;

    if (type === 'COLUMN') {
      const reordered = Array.from(columns);
      const [moved] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, moved);
      setColumns(reordered);
    } else {
      const sourceColIndex = columns.findIndex((col) => col.id === source.droppableId);
      const destColIndex = columns.findIndex((col) => col.id === destination.droppableId);
      const sourceCol = columns[sourceColIndex];
      const destCol = columns[destColIndex];
      const card = sourceCol.cards[source.index];

      if (sourceCol === destCol) {
        const newCards = [...sourceCol.cards];
        newCards.splice(source.index, 1);
        newCards.splice(destination.index, 0, card);

        const updatedCol = { ...sourceCol, cards: newCards };
        const updatedCols = [...columns];
        updatedCols[sourceColIndex] = updatedCol;
        setColumns(updatedCols);
      } else {
        const newSourceCards = [...sourceCol.cards];
        const newDestCards = [...destCol.cards];

        newSourceCards.splice(source.index, 1);
        newDestCards.splice(destination.index, 0, card);

        const updatedCols = [...columns];
        updatedCols[sourceColIndex] = { ...sourceCol, cards: newSourceCards };
        updatedCols[destColIndex] = { ...destCol, cards: newDestCards };
        setColumns(updatedCols);
      }
    }
  };

  const handleAddCard = (columnId, cardTitle) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, cards: [...col.cards, cardTitle] } : col
      )
    );
  };

  const handleDeleteCard = (columnId, cardIndex) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter((_, i) => i !== cardIndex) }
          : col
      )
    );
  };

  const handleEditCard = (columnId, cardIndex, newTitle) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: col.cards.map((c, i) => (i === cardIndex ? newTitle : c)),
            }
          : col
      )
    );
  };

  return (
    <Paper
      elevation={6}
      sx={{
        padding: 3,
        minWidth: 900,
        minHeight: 500,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderRadius: 10,
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
      }}
    >
      <Navbar />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="columns" direction="horizontal" type="COLUMN">
          {(provided) => (
            <Grid
              container
              spacing={3}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columns.map((col, index) => (
                <Draggable draggableId={col.id} index={index} key={col.id}>
                  {(provided) => (
                    <Box
                      item
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Task
                        title={col.title}
                        columnId={col.id}
                        cards={col.cards}
                        onAddCard={handleAddCard}
                        onDeleteCard={handleDeleteCard}
                        onEditCard={handleEditCard}
                        
                      />
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
    </Paper>
  );
};

export default Board;
