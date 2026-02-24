"use client";

import { useEffect, useState } from "react";

export function AdminDashboardStats() {
  const [stats, setStats] = useState({ projects: 0, blogs: 0 });

  useEffect(() => {
    async function load() {
      const [projectsRes, blogsRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/blog"),
      ]);

      const projects = projectsRes.ok ? await projectsRes.json() : [];
      const blogs = blogsRes.ok ? await blogsRes.json() : [];

      setStats({
        projects: Array.isArray(projects) ? projects.length : 0,
        blogs: Array.isArray(blogs) ? blogs.length : 0,
      });
    }

    load();
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <article className="rounded-xl border border-zinc-800 bg-black p-5 light:border-zinc-200 light:bg-white">
        <p className="text-sm text-zinc-400 light:text-zinc-600">Total Projects</p>
        <p className="mt-2 text-3xl font-semibold">{stats.projects}</p>
      </article>
      <article className="rounded-xl border border-zinc-800 bg-black p-5 light:border-zinc-200 light:bg-white">
        <p className="text-sm text-zinc-400 light:text-zinc-600">Total Blogs</p>
        <p className="mt-2 text-3xl font-semibold">{stats.blogs}</p>
      </article>
    </div>
  );
}
