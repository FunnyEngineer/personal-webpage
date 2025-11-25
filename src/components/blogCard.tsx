import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  CardActionArea,
} from "@mui/material";
import Link from "next/link";

interface BlogCardProps {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  coverImage?: string;
  author: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  slug,
  title,
  date,
  description,
  tags,
  coverImage,
  author,
}) => {
  return (
    <Link href={`/blog/${slug}`} passHref style={{ textDecoration: "none" }}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardActionArea sx={{ flexGrow: 1 }}>
          {coverImage && (
            <CardMedia
              component="img"
              sx={{
                height: 200,
                objectFit: "cover",
                objectPosition: "center",
              }}
              image={coverImage}
              alt={title}
            />
          )}
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              {title}
            </Typography>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="caption" color="text.secondary">
                {author}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              paragraph
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {description}
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap" mt={2}>
              {tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" />
              ))}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default BlogCard;
