"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  ThemeProvider,
  Chip,
  Divider,
  Button,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Header from "@/components/header";
import MarkdownContent from "@/components/markdownContent";
import { createLightTheme, createDarkTheme } from "@/theme";
import Link from "next/link";

interface BlogPostPageProps {
  post: {
    slug: string;
    title: string;
    date: string;
    description: string;
    author: string;
    tags: string[];
    coverImage?: string;
    content: string;
  };
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post }) => {
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
            <Link href="/blog" passHref style={{ textDecoration: "none" }}>
              <Button startIcon={<ArrowBack />} sx={{ mb: 3 }}>
                Back to Blog
              </Button>
            </Link>

            {post.coverImage && (
              <Box
                component="img"
                src={post.coverImage}
                alt={post.title}
                sx={{
                  width: "100%",
                  maxHeight: "460px",
                  objectFit: "cover",
                  mb: 4,
                }}
              />
            )}

            <Typography 
              variant="h2" 
              component="h1" 
              sx={{
                fontSize: { xs: "2rem", md: "2.75rem" },
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                mb: 2,
                fontFamily: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif',
              }}
            >
              {post.title}
            </Typography>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 3 }}
            >
              <Typography variant="body2" sx={{ fontSize: "1rem" }} color="text.secondary">
                {post.author}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "0.875rem" }} color="text.secondary">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </Box>

            <Box sx={{ mb: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
              {post.tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" />
              ))}
            </Box>

            <Typography
              variant="h6"
              paragraph
              sx={{ 
                fontStyle: "italic",
                fontSize: "1.25rem",
                lineHeight: 1.58,
                color: "text.secondary",
                mb: 4,
                mt: 3,
              }}
            >
              {post.description}
            </Typography>

            <Divider sx={{ mb: 5 }} />

            <MarkdownContent content={post.content} />
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default BlogPostPage;
