// theme.ts

import { createTheme } from "@mui/material/styles";

// Define a function to create the light theme
const theme = createTheme({});
const createLightTheme = () =>
  createTheme(theme, {
    palette: {
      mode: "light",
      primary: {
        main: "#000", // Your primary color for light theme
      },
      text: {
        // black text color
        primary: "#000",
      },
    },
    typography: {
      fontFamily: "Inter, sans-serif",
      h1: {
        fontSize: "3rem",
        fontWeight: 700,
        "@media (min-width:600px)": {
          fontSize: "4rem",
        },
        [theme.breakpoints.up("md")]: {
          fontSize: "6rem",
        },
      },
      h2: {
        fontSize: "2.5rem",
        fontWeight: 700,
        "@media (min-width:600px)": {
          fontSize: "3rem",
        },
        [theme.breakpoints.up("md")]: {
          fontSize: "4rem",
        },
      },
      h3: {
        fontSize: "2rem",
        fontWeight: 700,
        "@media (min-width:600px)": {
          fontSize: "2.5rem",
        },
        [theme.breakpoints.up("md")]: {
          fontSize: "3rem",
        },
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: 700,
        "@media (min-width:600px)": {
          fontSize: "2rem",
        },
        [theme.breakpoints.up("md")]: {
          fontSize: "2.5rem",
        },
      },
      h5: {
        fontSize: "1.25rem",
        fontWeight: 700,
        "@media (min-width:600px)": {
          fontSize: "1.5rem",
        },
        [theme.breakpoints.up("md")]: {
          fontSize: "2rem",
        },
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 700,
        "@media (min-width:600px)": {
          fontSize: "1.25rem",
        },
        [theme.breakpoints.up("md")]: {
          fontSize: "1.5rem",
        },
      },
    },
  });

// Define a function to create the dark theme
const createDarkTheme = () =>
  createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff", // Your primary color for dark theme
      },
      text: {
        primary: "#fff", // Your text color for dark theme
      },
    },

    typography: {
      fontFamily: "Inter, sans-serif",
      h1: {
        fontSize: "3rem",
        fontWeight: 700,
        "@media (min-width:600px)": {
          fontSize: "4rem",
        },
        [theme.breakpoints.up("md")]: {
          fontSize: "6rem",
        },
      },
      h2: {
        fontSize: "2.5rem",
        fontWeight: 700,
        "@media (min-width:600px)": {
          fontSize: "3rem",
        },
        [theme.breakpoints.up("md")]: {
          fontSize: "4rem",
        },
      },
      h3: {
        fontSize: "2rem",
        fontWeight: 700,
        "@media (min-width:600px)": {
          fontSize: "2.5rem",
        },
        [theme.breakpoints.up("md")]: {
          fontSize: "3rem",
        },
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: 700,
        "@media (min-width:600px)": {
          fontSize: "2rem",
        },
        [theme.breakpoints.up("md")]: {
          fontSize: "2.5rem",
        },
      },
      h5: {
        fontSize: "1.25rem",
        fontWeight: 700,
        "@media (min-width:600px)": {
          fontSize: "1.5rem",
        },
        [theme.breakpoints.up("md")]: {
          fontSize: "2rem",
        },
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 700,
        "@media (min-width:600px)": {
          fontSize: "1.25rem",
        },
        [theme.breakpoints.up("md")]: {
          fontSize: "1.5rem",
        },
      },
    },
  });

// Export the functions
export { createLightTheme, createDarkTheme };
