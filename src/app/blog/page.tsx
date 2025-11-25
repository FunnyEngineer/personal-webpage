import { getAllBlogPosts } from "@/lib/blog";
import BlogPage from "./blogPage";

export default function Blog() {
  const posts = getAllBlogPosts();
  return <BlogPage posts={posts} />;
}
