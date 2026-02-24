import { AdminBlogManager } from "@/components/admin-blog-manager";

export default function AdminBlogPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Manage Blog</h1>
        <p className="mt-1 text-sm text-zinc-400 light:text-zinc-600">Create, edit, and delete blog posts.</p>
      </header>
      <AdminBlogManager />
    </section>
  );
}
