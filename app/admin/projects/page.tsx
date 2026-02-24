import { AdminProjectManager } from "@/components/admin-project-manager";

export default function AdminProjectsPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Manage Projects</h1>
        <p className="mt-1 text-sm text-zinc-400 light:text-zinc-600">Create, update, and delete project entries.</p>
      </header>
      <AdminProjectManager />
    </section>
  );
}
