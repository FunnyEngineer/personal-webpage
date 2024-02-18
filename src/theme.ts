// theme.ts

import { createTheme } from '@mui/material/styles';

// Define a function to create the light theme
const createLightTheme = () =>
    createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#fff', // Your primary color for light theme
            },
            text: {
              // black text color
                primary: '#000',
            },
        },
    });

// Define a function to create the dark theme
const createDarkTheme = () =>
  createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#000', // Your primary color for dark theme
      },
      text: {
        primary: '#000', // Your text color for dark theme
      },
    },
  });

// Export the functions
export { createLightTheme, createDarkTheme };
