"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/blog", label: "Blog" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    const response = await fetch("/api/logout", { method: "POST" });
    if (response.ok) {
      toast.success("Logged out");
      router.push("/admin/login");
      return;
    }
    toast.error("Logout failed");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 light:bg-zinc-50 light:text-zinc-900">
      <div className="mx-auto flex max-w-7xl">
        <aside className={`fixed inset-y-0 left-0 z-30 w-64 border-r border-zinc-800 bg-black p-4 transition-transform duration-300 light:border-zinc-200 light:bg-white md:static ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
          <div className="mb-6 text-sm font-semibold tracking-wide">Admin Panel</div>
          <nav className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block rounded px-3 py-2 text-sm transition ${pathname === link.href ? "bg-zinc-800 text-white light:bg-zinc-200 light:text-zinc-900" : "text-zinc-300 hover:bg-zinc-900 light:text-zinc-600 light:hover:bg-zinc-100"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button type="button" onClick={handleLogout} className="mt-8 rounded border border-zinc-700 px-3 py-2 text-sm light:border-zinc-300">
            Logout
          </button>
        </aside>

        <div className="min-h-screen flex-1 md:ml-0">
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-zinc-800 bg-zinc-950/90 px-4 py-3 backdrop-blur light:border-zinc-200 light:bg-white/90 md:px-6">
            <button onClick={() => setOpen((v) => !v)} className="rounded border border-zinc-700 px-2 py-1 text-xs md:hidden light:border-zinc-300" type="button">
              Menu
            </button>
            <Link href="/" className="text-sm text-zinc-400 light:text-zinc-600">View Portfolio</Link>
          </header>
          <main className="p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
