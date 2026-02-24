import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const projectSchema = z.object({
  title: z.string().min(2).max(120),
  description: z.string().min(10).max(1000),
  techStack: z.array(z.string().min(1)).min(1),
  githubLink: z.url(),
  liveLink: z.url(),
  isFeatured: z.boolean().optional(),
});

export const blogSchema = z.object({
  title: z.string().min(2).max(150),
  content: z.string().min(20),
  excerpt: z.string().min(10).max(240),
  isFeatured: z.boolean().optional(),
});

export function makeSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
