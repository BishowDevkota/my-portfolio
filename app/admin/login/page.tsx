"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      toast.success("Login successful");
      router.push("/admin/dashboard");
    } else {
      const error = await response.json().catch(() => ({ message: "Login failed" }));
      toast.error(error.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 light:bg-zinc-50">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 light:border-zinc-200 light:bg-white">
        <h1 className="text-2xl font-semibold text-zinc-100 light:text-zinc-900">Admin Login</h1>
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" className="w-full rounded border border-zinc-700 bg-black p-3 text-sm text-zinc-100 light:border-zinc-300 light:bg-zinc-50 light:text-zinc-900" required />
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" className="w-full rounded border border-zinc-700 bg-black p-3 text-sm text-zinc-100 light:border-zinc-300 light:bg-zinc-50 light:text-zinc-900" required />
        <button disabled={loading} type="submit" className="w-full rounded bg-zinc-100 px-4 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-300 disabled:opacity-60 light:bg-zinc-900 light:text-zinc-100 light:hover:bg-zinc-700">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
