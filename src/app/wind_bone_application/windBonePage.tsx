"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  ThemeProvider,
} from "@mui/material";
import Header from "@/components/header";
import MarkdownContent from "@/components/markdownContent";
import { createLightTheme, createDarkTheme } from "@/theme";

interface WindBonePageProps {
  content: string;
}

const WindBonePage: React.FC<WindBonePageProps> = ({ content }) => {
  const [theme, setTheme] = useState<string>("dark");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const currentTheme =
    theme === "light" ? createLightTheme() : createDarkTheme();

  return (
    <ThemeProvider theme={currentTheme}>
      <div className="min-h-screen">
        <Container
          className="py-20 flex flex-col items-center justify-center"
          maxWidth={false}
          sx={{
            maxWidth: {
              xs: "100%",
              sm: "100%",
              md: "680px",
              lg: "728px",
            },
            padding: {
              xs: "80px 24px",
              sm: "80px 32px",
              md: "80px 24px",
              lg: "80px 24px",
            },
          }}
        >
          <Header toggleTheme={toggleTheme} />

          <Box sx={{ width: "100%", mt: 6 }}>
            <MarkdownContent content={content} />
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default WindBonePage;
