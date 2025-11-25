# Blog System Documentation

This blog system allows you to write and manage blog posts using Markdown files with frontmatter metadata.

## Features

- ✍️ Write blog posts in Markdown
- 🏷️ Tag and categorize posts
- 🔍 Search and filter functionality
- 📱 Responsive design with Material-UI
- 🎨 Syntax highlighting for code blocks
- 🖼️ Support for cover images

## Quick Start

### Creating a New Blog Post

Use the blog manager script to create a new post:

```bash
npm run blog:new "Your Blog Title"
```

This will:
1. Prompt you for metadata (description, author, tags, cover image)
2. Create a new `.md` file in `content/blog/`
3. Generate a slug-based filename

### Manual Creation

Alternatively, create a new `.md` file in `content/blog/` with this structure:

```markdown
---
title: "Your Blog Title"
date: "2024-11-24"
description: "A short description of your post"
author: "Ting-Yu Dai"
tags: ["Machine Learning", "Climate Science"]
coverImage: "/blog/your-image.jpg"
---

# Your Blog Title

Your content goes here...
```

## Blog Manager Commands

```bash
# Create a new blog post
npm run blog:new "Post Title"

# List all blog posts
npm run blog:list

# Delete a blog post
npm run blog:delete post-slug
```

Or use the script directly:

```bash
node scripts/blog-manager.js new "Post Title"
node scripts/blog-manager.js list
node scripts/blog-manager.js delete post-slug
```

## File Structure

```
personal-webpage/
├── content/
│   └── blog/
│       ├── post-1.md
│       ├── post-2.md
│       └── post-3.md
├── src/
│   ├── app/
│   │   └── blog/
│   │       ├── page.tsx          # Blog listing page
│   │       ├── layout.tsx        # Blog layout wrapper
│   │       └── [slug]/
│   │           ├── page.tsx      # Individual post page
│   │           └── layout.tsx    # Post layout wrapper
│   ├── components/
│   │   ├── blogCard.tsx          # Blog post card component
│   │   └── markdownContent.tsx   # Markdown renderer
│   └── lib/
│       └── blog.ts               # Blog data utilities
└── scripts/
    └── blog-manager.js           # CLI tool for managing posts
```

## Markdown Features

The blog supports GitHub Flavored Markdown (GFM) including:

### Code Blocks

\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`

### Tables

| Feature | Supported |
|---------|-----------|
| Tables  | ✅        |
| Lists   | ✅        |

### Lists

- Unordered lists
- With multiple items
  - Nested items

1. Ordered lists
2. Also supported

### Links and Images

[Link text](https://example.com)

![Alt text](/path/to/image.jpg)

### Blockquotes

> This is a blockquote
> spanning multiple lines

## Frontmatter Options

| Field       | Required | Description                           |
|-------------|----------|---------------------------------------|
| title       | Yes      | Post title                            |
| date        | Yes      | Publication date (YYYY-MM-DD)         |
| description | Yes      | Short summary for cards and SEO       |
| author      | No       | Author name (defaults to "Ting-Yu Dai") |
| tags        | No       | Array of tags                         |
| coverImage  | No       | Path to cover image                   |

## Adding Images

1. Place images in `public/blog/` directory
2. Reference them in markdown or frontmatter:
   - Markdown: `![Alt text](/blog/image.jpg)`
   - Cover: `coverImage: "/blog/image.jpg"`

## Styling

The blog uses:
- **Material-UI** for components
- **Tailwind CSS** for utility classes
- **react-syntax-highlighter** for code highlighting
- Theme switching (light/dark mode)

## Navigation

The blog is accessible via:
- Homepage navigation: "Blog" button in header
- Direct URL: `/blog`
- Individual posts: `/blog/post-slug`

## Development

### Running the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000/blog` to see your blog.

### Building for Production

```bash
npm run build
npm start
```

## Tips for Writing

1. **Use descriptive titles** - They appear in search results and social shares
2. **Write good descriptions** - These show in blog cards and search results
3. **Tag appropriately** - Help readers find related content
4. **Add code examples** - Syntax highlighting makes them easy to read
5. **Use images** - Break up text and illustrate concepts
6. **Structure with headings** - Make content scannable

## Troubleshooting

### Post not showing up?
- Check that the file is in `content/blog/`
- Ensure it has `.md` extension
- Verify frontmatter is valid YAML
- Restart the dev server

### Images not loading?
- Place images in `public/` directory
- Use absolute paths starting with `/`
- Check file extensions match

### Code highlighting not working?
- Specify language: \`\`\`python
- Check language name is valid

## Future Enhancements

Possible additions:
- [ ] RSS feed
- [ ] Comments system
- [ ] Reading time estimation
- [ ] Related posts suggestions
- [ ] Categories in addition to tags
- [ ] Draft/published status
- [ ] SEO metadata generation
- [ ] Social media preview cards

## Questions?

For issues or questions about the blog system, reach out to the maintainer!
