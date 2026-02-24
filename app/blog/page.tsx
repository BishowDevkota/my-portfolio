import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { BlogCard } from "@/components/blog-card";
import { SectionTitle } from "@/components/section-title";
import { getBlogs } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Developer Portfolio",
  description: "Technical articles, notes, and engineering write-ups.",
};

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-black text-zinc-100 light:bg-zinc-50 light:text-zinc-900">
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionTitle title="Blog" subtitle="Articles" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </section>
    </div>
  );
}
