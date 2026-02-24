"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import type { BlogItem } from "@/lib/types";

type FormState = {
  title: string;
  excerpt: string;
  content: string;
  isFeatured: boolean;
  image: File | null;
};

const initialForm: FormState = {
  title: "",
  excerpt: "",
  content: "",
  isFeatured: false,
  image: null,
};

export function AdminBlogManager() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [form, setForm] = useState<FormState>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

  const fetchBlogs = async () => {
    const response = await fetch("/api/blog");
    if (response.ok) {
      setBlogs(await response.json());
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const payload = new FormData();
    payload.append("title", form.title);
    payload.append("excerpt", form.excerpt);
    payload.append("content", form.content);
    payload.append("isFeatured", String(form.isFeatured));

    if (form.image) {
      payload.append("image", form.image);
    }

    const endpoint = isEditing ? `/api/blog/${editingId}` : "/api/blog";
    const method = isEditing ? "PUT" : "POST";

    const response = await fetch(endpoint, {
      method,
      body: payload,
    });

    if (response.ok) {
      toast.success(isEditing ? "Blog updated" : "Blog created");
      setForm(initialForm);
      setEditingId(null);
      await fetchBlogs();
    } else {
      const err = await response.json().catch(() => ({ message: "Action failed" }));
      toast.error(err.message || "Action failed");
    }

    setLoading(false);
  };

  const startEdit = (blog: BlogItem) => {
    setEditingId(blog._id);
    setForm({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      isFeatured: Boolean(blog.isFeatured),
      image: null,
    });
  };

  const remove = async (id: string) => {
    const response = await fetch(`/api/blog/${id}`, { method: "DELETE" });
    if (response.ok) {
      toast.success("Blog deleted");
      await fetchBlogs();
      return;
    }
    toast.error("Delete failed");
  };

  const toggleFeatured = async (blog: BlogItem) => {
    const response = await fetch(`/api/blog/${blog._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFeatured: !blog.isFeatured }),
    });

    if (response.ok) {
      toast.success(!blog.isFeatured ? "Marked as featured" : "Removed from featured");
      await fetchBlogs();
      return;
    }

    const err = await response.json().catch(() => ({ message: "Could not update featured status" }));
    toast.error(err.message || "Could not update featured status");
  };

  return (
    <div className="space-y-8">
      <form onSubmit={submit} className="grid gap-4 rounded-xl border border-zinc-800 bg-black p-4 light:border-zinc-200 light:bg-white">
        <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Title" className="rounded border border-zinc-700 bg-zinc-950 p-2 text-sm light:border-zinc-300 light:bg-zinc-50" required />
        <input value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} placeholder="Excerpt" className="rounded border border-zinc-700 bg-zinc-950 p-2 text-sm light:border-zinc-300 light:bg-zinc-50" required />
        <textarea value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} placeholder="Markdown content" className="rounded border border-zinc-700 bg-zinc-950 p-2 text-sm light:border-zinc-300 light:bg-zinc-50" rows={8} required />
        <input type="file" accept="image/*" onChange={(e) => setForm((f) => ({ ...f, image: e.target.files?.[0] || null }))} />
        <div className="flex gap-2">
          <button disabled={loading} type="submit" className="rounded bg-zinc-100 px-4 py-2 text-sm text-zinc-900 light:bg-zinc-900 light:text-zinc-100">
            {loading ? "Saving..." : isEditing ? "Update Blog" : "Add Blog"}
          </button>
          {isEditing && (
            <button type="button" onClick={() => { setEditingId(null); setForm(initialForm); }} className="rounded border border-zinc-700 px-4 py-2 text-sm light:border-zinc-300">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid gap-4 lg:grid-cols-2">
        {blogs.map((blog) => (
          <article key={blog._id} className="relative rounded-xl border border-zinc-800 bg-black p-4 light:border-zinc-200 light:bg-white">
            <button
              type="button"
              onClick={() => toggleFeatured(blog)}
              className={`absolute right-3 top-3 h-6 w-6 rounded border transition ${
                blog.isFeatured
                  ? "border-emerald-500 bg-emerald-500"
                  : "border-zinc-500 bg-transparent"
              }`}
              aria-label={blog.isFeatured ? "Unfeature blog" : "Feature blog"}
              title={blog.isFeatured ? "Click to remove from featured" : "Click to mark as featured"}
            >
              {blog.isFeatured && <span className="block text-xs font-bold text-white">✓</span>}
            </button>
            <img src={blog.imagePath} alt={blog.title} className="mb-3 h-36 w-full rounded object-cover" />
            <h3 className="text-lg font-semibold">{blog.title}</h3>
            <p className="mt-2 text-sm text-zinc-400 light:text-zinc-600">{blog.excerpt}</p>
            {blog.isFeatured && (
              <p className="mt-2 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-500">
                Featured on Home
              </p>
            )}
            <div className="mt-4 flex gap-2">
              <button onClick={() => startEdit(blog)} className="rounded border border-zinc-700 px-3 py-1 text-xs light:border-zinc-300" type="button">Edit</button>
              <button onClick={() => remove(blog._id)} className="rounded border border-zinc-700 px-3 py-1 text-xs light:border-zinc-300" type="button">Delete</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
