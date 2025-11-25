"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownContentProps {
  content: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  return (
    <Box
      sx={{
        fontFamily: 'charter, Georgia, Cambria, "Times New Roman", Times, serif',
        "& h1": {
          fontSize: "2.75rem",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
          marginTop: "2rem",
          marginBottom: "0.5rem",
          fontFamily: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif',
        },
        "& h2": {
          fontSize: "2rem",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.3,
          marginTop: "2rem",
          marginBottom: "0.5rem",
          fontFamily: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif',
        },
        "& h3": {
          fontSize: "1.5rem",
          fontWeight: 700,
          letterSpacing: "-0.01em",
          lineHeight: 1.4,
          marginTop: "1.75rem",
          marginBottom: "0.5rem",
          fontFamily: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif',
        },
        "& p": {
          fontSize: "1.25rem",
          lineHeight: 1.58,
          marginBottom: "2rem",
          letterSpacing: "-0.003em",
        },
        "& a": {
          color: "inherit",
          textDecoration: "underline",
          textDecorationColor: (theme) => theme.palette.mode === 'dark' ? "rgba(255, 255, 255, 0.4)" : "rgba(41, 41, 41, 0.4)",
          textUnderlineOffset: "2px",
          "&:hover": {
            textDecorationColor: (theme) => theme.palette.mode === 'dark' ? "rgba(255, 255, 255, 1)" : "rgba(41, 41, 41, 1)",
          },
        },
        "& ul, & ol": {
          fontSize: "1.25rem",
          lineHeight: 1.58,
          marginBottom: "2rem",
          paddingLeft: "2rem",
        },
        "& li": {
          marginBottom: "0.875rem",
          lineHeight: 1.58,
          paddingLeft: "0.5rem",
        },
        "& code": {
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? "rgba(50, 50, 50, 1)" : "rgba(242, 242, 242, 1)",
          padding: "0.15rem 0.4rem",
          borderRadius: "3px",
          fontSize: "1.125rem",
          fontFamily: 'Menlo, Monaco, "Courier New", Courier, monospace',
        },
        "& pre": {
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? "rgba(30, 30, 30, 1)" : "rgba(242, 242, 242, 1)",
          padding: "1.25rem",
          marginBottom: "2rem",
          borderRadius: "4px",
          overflow: "auto",
          fontSize: "1rem",
        },
        "& blockquote": {
          borderLeft: (theme) => theme.palette.mode === 'dark' ? "3px solid rgba(255, 255, 255, 0.8)" : "3px solid rgba(41, 41, 41, 1)",
          paddingLeft: "1.5rem",
          marginLeft: 0,
          marginRight: 0,
          fontStyle: "italic",
          fontSize: "1.375rem",
          lineHeight: 1.58,
          marginBottom: "2rem",
        },
        "& img": {
          maxWidth: "100%",
          height: "auto",
          marginTop: "2rem",
          marginBottom: "2rem",
        },
        "& table": {
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "2rem",
          fontSize: "1.125rem",
        },
        "& th, & td": {
          border: "1px solid",
          borderColor: (theme) => theme.palette.mode === 'dark' ? "rgba(80, 80, 80, 1)" : "rgba(230, 230, 230, 1)",
          padding: "0.75rem",
          textAlign: "left",
        },
        "& th": {
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? "rgba(40, 40, 40, 1)" : "rgba(250, 250, 250, 1)",
          fontWeight: 600,
        },
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
};

export default MarkdownContent;
