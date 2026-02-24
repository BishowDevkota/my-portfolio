import type { Metadata } from "next";
import { AdminShell } from "@/components/admin-shell";

export const metadata: Metadata = {
  title: "Admin | Developer Portfolio",
  description: "Admin area for managing projects and blogs.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
