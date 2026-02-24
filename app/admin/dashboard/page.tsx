import { AdminDashboardStats } from "@/components/admin-dashboard-stats";

export default function AdminDashboardPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-400 light:text-zinc-600">Overview of your portfolio content.</p>
      </header>
      <AdminDashboardStats />
    </section>
  );
}
