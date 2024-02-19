// components/ThemeSwitcher.tsx

import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

interface ThemeSwitcherProps {
    toggleTheme: () => void; // Define the type for toggleTheme function
  }

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({toggleTheme}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);


  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme !== null) {
      applyTheme(storedTheme);
    }
  }, []);

  const applyTheme = (theme: string) => {
    
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    document.documentElement.setAttribute("data-theme", theme);
  };


  const triggerTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    applyTheme(newTheme);
    toggleTheme();
  };

  return (
    <IconButton onClick={triggerTheme}>
      {isDarkMode ? <Brightness4Icon /> : <Brightness7Icon />}
    </IconButton>
  );
};

export default ThemeSwitcher;
