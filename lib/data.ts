import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import Project from "@/models/Project";
import type { BlogItem, ProjectItem } from "@/lib/types";

export async function getProjects(limit?: number): Promise<ProjectItem[]> {
  await connectDB();
  const query = Project.find().sort({ createdAt: -1 });
  if (limit) {
    query.limit(limit);
  }
  const items = await query.lean();
  return JSON.parse(JSON.stringify(items));
}

export async function getFeaturedProjects(limit = 3): Promise<ProjectItem[]> {
  await connectDB();
  const featured = await Project.find({ isFeatured: true }).sort({ updatedAt: -1, createdAt: -1 }).limit(limit).lean();

  if (featured.length >= limit) {
    return JSON.parse(JSON.stringify(featured));
  }

  const excludedIds = featured.map((item) => item._id);
  const fallback = await Project.find({ _id: { $nin: excludedIds } })
    .sort({ createdAt: -1 })
    .limit(limit - featured.length)
    .lean();

  return JSON.parse(JSON.stringify([...featured, ...fallback]));
}

export async function getBlogs(limit?: number): Promise<BlogItem[]> {
  await connectDB();
  const query = Blog.find().sort({ createdAt: -1 });
  if (limit) {
    query.limit(limit);
  }
  const items = await query.lean();
  return JSON.parse(JSON.stringify(items));
}

export async function getFeaturedBlogs(limit = 3): Promise<BlogItem[]> {
  await connectDB();
  const featured = await Blog.find({ isFeatured: true }).sort({ updatedAt: -1, createdAt: -1 }).limit(limit).lean();

  if (featured.length >= limit) {
    return JSON.parse(JSON.stringify(featured));
  }

  const excludedIds = featured.map((item) => item._id);
  const fallback = await Blog.find({ _id: { $nin: excludedIds } })
    .sort({ createdAt: -1 })
    .limit(limit - featured.length)
    .lean();

  return JSON.parse(JSON.stringify([...featured, ...fallback]));
}

export async function getBlogBySlug(slug: string): Promise<BlogItem | null> {
  await connectDB();
  const item = await Blog.findOne({ slug }).lean();
  return item ? JSON.parse(JSON.stringify(item)) : null;
}
