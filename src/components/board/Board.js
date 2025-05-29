import { Box, Grid, Paper } from '@mui/material'
import React from 'react'
import AddCard from './task/AddCard'
import Task from './task/Task'

const Board = () => {
    return (

        <Paper elevation={6} sx={{
            padding: 3,
            minWidth: 900,
            minHeight: 500,
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
            backdropFilter: 'blur(20px)', 
            WebkitBackdropFilter: 'blur(20px)', 
            border: '2px solid rgba(255, 255, 255, 0.3)', 
            borderRadius: 10, 
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)' 
          }}
          >
            <Grid container spacing={3}>
            <Task title={"To Do"}/>
            <Task title={"Today"}/>
            <Task title={"This Week"}/>
            <Task title={"Later"}/>
            {/* <AddCard/>  */}
            </Grid>

        </Paper>

    )
}

export default Board
