import { getBlogPostBySlug, getBlogPostSlugs } from "@/lib/blog";
import { notFound } from "next/navigation";
import BlogPostPage from "./blogPostPage";

export async function generateStaticParams() {
  const slugs = getBlogPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostPage post={post} />;
}
