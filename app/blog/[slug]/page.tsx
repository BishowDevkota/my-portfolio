import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Navbar } from "@/components/navbar";
import { getBlogBySlug } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: `${blog.title} | Blog`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.imagePath],
    },
  };
}

export default async function BlogDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 light:bg-zinc-50 light:text-zinc-900">
      <Navbar />
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-500">{formatDate(blog.createdAt)}</p>
        <h1 className="mb-6 text-4xl font-semibold leading-tight">{blog.title}</h1>
        <img src={blog.imagePath} alt={blog.title} className="mb-8 h-64 w-full rounded-xl object-cover" />
        <div className="prose prose-invert max-w-none light:prose-zinc">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
