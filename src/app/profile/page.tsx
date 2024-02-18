// pages/index.tsx
"use client"
import { useEffect, useState } from "react";
import Header from "@/components/header";
import { createLightTheme, createDarkTheme } from "@/theme";
import { Container, ThemeProvider, Typography } from "@mui/material";
import Image from "next/image";

const HomePage: React.FC = () => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "light"
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  let currentTheme = theme === "light" ? createLightTheme() : createDarkTheme();


  return (
    <ThemeProvider theme={currentTheme}>
      <div className={`min-h-screen`}>
        <Header toggleTheme={toggleTheme}/>
        <Container className="py-20 flex flex-col items-center justify-center">
          <Typography variant="h3" component="h1" gutterBottom>
            Eat well, Sleep well, Think well, and Research.
          </Typography>
          <div className="flex items-center mt-8">
            <div className="flex-none">
              <div className="w-48">
                <Image
                  src="/profile.jpeg"
                  alt="Profile Picture"
                  width={200}
                  height={200}
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="flex-grow ml-8">
              <p>
                I am a PhD student at the University of Texas at Austin where I
                study machine learning, sustainable system, and climate change.
                My research interests include machine learning on urban energy
                systems and geospatial data. I am passionate to code and explore
                the real world data distribution.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default HomePage;
