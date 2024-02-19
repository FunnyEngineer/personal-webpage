// components/Header.tsx
"use client";
import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import Image from "next/image";

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
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        {/* Rest of the code */}

        <Link href="/media" passHref>
          <Button>Media</Button>
        </Link>
        <Link href="/publications" passHref>
          <Button>Publications</Button>
        </Link>
        <Link href="/repositories" passHref>
          <Button>Repositories</Button>
        </Link>
        <Link href="/cv" passHref>
          <Button>CV</Button>
        </Link>
        <Link href="/resume" passHref>
          <Button>Resume</Button>
        </Link>
        <ThemeSwitcher toggleTheme={toggleTheme} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
