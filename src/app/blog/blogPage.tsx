"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  ThemeProvider,
  TextField,
  Chip,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Header from "@/components/header";
import BlogCard from "@/components/blogCard";
import { createLightTheme, createDarkTheme } from "@/theme";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
  tags: string[];
  coverImage?: string;
}

interface BlogPageProps {
  posts: BlogPost[];
}

const BlogPage: React.FC<BlogPageProps> = ({ posts }) => {
  const [theme, setTheme] = useState<string>("dark");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const currentTheme = theme === "light" ? createLightTheme() : createDarkTheme();

  // Get all unique tags
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).sort();

  // Filter posts based on search and tag
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

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
              md: "1200px",
              lg: "1400px",
              xl: "1600px",
            },
            padding: {
              xs: "80px 16px",
              sm: "80px 24px",
              md: "80px 32px",
              lg: "80px 40px",
            },
          }}
        >
          <Header toggleTheme={toggleTheme} />

          <Box sx={{ width: "100%", mt: 4 }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Blog
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Thoughts, ideas, and insights on machine learning, climate, and
              technology.
            </Typography>

            {/* Search Bar */}
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ mb: 3 }}
            />

            {/* Tag Filter */}
            <Box sx={{ mb: 4, display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Chip
                label="All"
                onClick={() => setSelectedTag(null)}
                color={selectedTag === null ? "primary" : "default"}
                clickable
              />
              {allTags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onClick={() => setSelectedTag(tag)}
                  color={selectedTag === tag ? "primary" : "default"}
                  clickable
                />
              ))}
            </Box>

            {/* Blog Posts Grid */}
            {filteredPosts.length > 0 ? (
              <Grid2 container spacing={3}>
                {filteredPosts.map((post) => (
                  <Grid2 key={post.slug} xs={12} sm={6} md={4}>
                    <BlogCard {...post} />
                  </Grid2>
                ))}
              </Grid2>
            ) : (
              <Typography variant="body1" color="text.secondary" sx={{ mt: 4 }}>
                No posts found matching your criteria.
              </Typography>
            )}
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default BlogPage;
