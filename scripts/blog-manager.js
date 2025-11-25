#!/usr/bin/env node

/**
 * Blog Management Tool
 * 
 * This script helps you create, list, and manage blog posts.
 * 
 * Usage:
 *   node scripts/blog-manager.js new "My Blog Title"
 *   node scripts/blog-manager.js list
 *   node scripts/blog-manager.js delete <slug>
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

// Ensure blog directory exists
if (!fs.existsSync(BLOG_DIR)) {
  fs.mkdirSync(BLOG_DIR, { recursive: true });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

async function createNewBlogPost(title) {
  console.log('\n📝 Creating new blog post...\n');

  const slug = slugify(title || (await prompt('Blog post title: ')));
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  if (fs.existsSync(filePath)) {
    console.error(`❌ Error: Blog post with slug "${slug}" already exists!`);
    rl.close();
    return;
  }

  const description = await prompt('Description (short summary): ');
  const author = (await prompt('Author [Ting-Yu Dai]: ')) || 'Ting-Yu Dai';
  const tagsInput = await prompt('Tags (comma-separated): ');
  const tags = tagsInput.split(',').map((tag) => tag.trim());
  const coverImage = await prompt('Cover image URL (optional): ');

  const frontMatter = `---
title: "${title || slug}"
date: "${formatDate(new Date())}"
description: "${description}"
author: "${author}"
tags: [${tags.map((tag) => `"${tag}"`).join(', ')}]${
    coverImage ? `\ncoverImage: "${coverImage}"` : ''
  }
---

# ${title || slug}

Start writing your blog post here...

## Section 1

Your content goes here.

## Section 2

More content...

## Conclusion

Wrap up your thoughts.
`;

  fs.writeFileSync(filePath, frontMatter);
  console.log(`\n✅ Blog post created successfully!`);
  console.log(`📄 File: ${filePath}`);
  console.log(`🔗 URL: /blog/${slug}`);

  rl.close();
}

function listBlogPosts() {
  console.log('\n📚 Blog Posts:\n');

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.md'));

  if (files.length === 0) {
    console.log('No blog posts found.');
    rl.close();
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(BLOG_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const titleMatch = content.match(/title:\s*"([^"]+)"/);
    const dateMatch = content.match(/date:\s*"([^"]+)"/);

    const slug = file.replace('.md', '');
    const title = titleMatch ? titleMatch[1] : slug;
    const date = dateMatch ? dateMatch[1] : 'Unknown';

    console.log(`• ${title}`);
    console.log(`  Slug: ${slug}`);
    console.log(`  Date: ${date}`);
    console.log(`  File: ${file}\n`);
  });

  rl.close();
}

async function deleteBlogPost(slug) {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    console.error(`❌ Error: Blog post "${slug}" not found!`);
    rl.close();
    return;
  }

  const confirm = await prompt(
    `Are you sure you want to delete "${slug}"? (yes/no): `
  );

  if (confirm.toLowerCase() === 'yes' || confirm.toLowerCase() === 'y') {
    fs.unlinkSync(filePath);
    console.log(`✅ Blog post "${slug}" deleted successfully!`);
  } else {
    console.log('❌ Deletion cancelled.');
  }

  rl.close();
}

// Main execution
const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  console.log(`
📝 Blog Management Tool

Usage:
  node scripts/blog-manager.js new ["Title"]     - Create a new blog post
  node scripts/blog-manager.js list              - List all blog posts
  node scripts/blog-manager.js delete <slug>     - Delete a blog post

Examples:
  node scripts/blog-manager.js new "My First Post"
  node scripts/blog-manager.js list
  node scripts/blog-manager.js delete my-first-post
`);
  process.exit(0);
}

switch (command) {
  case 'new':
  case 'create':
    createNewBlogPost(args.slice(1).join(' '));
    break;
  case 'list':
  case 'ls':
    listBlogPosts();
    break;
  case 'delete':
  case 'remove':
  case 'rm':
    if (!args[1]) {
      console.error('❌ Error: Please provide a slug to delete.');
      process.exit(1);
    }
    deleteBlogPost(args[1]);
    break;
  default:
    console.error(`❌ Unknown command: ${command}`);
    process.exit(1);
}
