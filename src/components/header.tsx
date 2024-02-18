// components/Header.tsx
"use client";
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";

interface HeaderProps {
  toggleTheme: () => void; // Define the type for toggleTheme function
}

const Header: React.FC<HeaderProps> = ({ toggleTheme }) => {
  return (
    <AppBar
      position="static"
      elevation={0}
      style={{ backgroundColor: "transparent", boxShadow: "none" }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Ting-Yu Dai
        </Typography>
        <Link href="/media" passHref>
          <Button color="inherit">Media</Button>
        </Link>
        <Link href="/publications" passHref>
          <Button color="inherit">Publications</Button>
        </Link>
        <Link href="/repositories" passHref>
          <Button color="inherit">Repositories</Button>
        </Link>
        <Link href="/cv" passHref>
          <Button color="inherit">CV</Button>
        </Link>
        <Link href="/resume" passHref>
          <Button color="inherit">Resume</Button>
        </Link>
        <ThemeSwitcher toggleTheme={toggleTheme} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
