import { Box } from '@mui/system'
import React from 'react'
import './App.css';
import Board from './components/board/Board';
import Navbar from './components/navbar/Navbar'

const App = () => {
  return (
    <Box className="app-background">
      <Box className="background-image"></Box>
      <Box className="overlay"></Box>
      <Box className="app-content">
        <Board />
      </Box>

    </Box>
  )
}

export default App
