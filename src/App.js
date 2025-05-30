import { Box } from '@mui/system'
import React from 'react'
import './App.css';
import Board from './components/board/Board';
import Navbar from './components/navbar/Navbar'
import ThemeProvider from './context/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
    <Box className="app-background">
      <Box className="background-image"></Box>
      <Box className="overlay"></Box>
      <Box className="app-content">
        {/* <Navbar/> */}
        <Board />
      </Box>

    </Box>
    </ThemeProvider>
  )
}

export default App
