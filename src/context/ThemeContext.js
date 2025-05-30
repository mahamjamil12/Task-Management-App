import React, { createContext, useContext, useMemo, useState } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
    //use state to set initial value of mode
    const [mode, setMode] = useState('light');

    //theme toggle function to change light to dark mode
    const themeToggle = () => {
        setMode((prev) => prev === 'light' ? 'dark' : 'light')
    }

    const theme = useMemo(() =>
        createTheme({
            palette: {
                mode,
                ...(mode === 'light'
                    ? {
                        background: {
                            default: '#f5f5f5',
                            paper: '#ffffff',
                        },
                        primary: {
                            main: '#121212',
                        },
                        text: {
                            primary: '#000000',
                            secondary: '#555555',
                        },
                    }
                    : {
                        background: {
                            default: '#121212',
                            paper: '#1e1e1e',
                        },
                        primary: {
                            main: '#ffffff',
                        },
                        text: {
                            primary: '#ffffff',
                        },
                    }),
            },
            typography: {
                fontFamily: `'Segoe UI', 'Roboto', 'Arial', sans-serif`,
            },
            // shape: {
            //     borderRadius: 10,
            // },
        }), [mode]);

    return (
        //when we use use context we wrap component in a provider
        <ThemeContext.Provider value={{ mode, themeToggle }}>
            <MuiThemeProvider theme={theme}>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
