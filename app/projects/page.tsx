import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { ProjectCard } from "@/components/project-card";
import { SectionTitle } from "@/components/section-title";
import { getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects | Developer Portfolio",
  description: "A full listing of development projects and case studies.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-black text-zinc-100 light:bg-zinc-50 light:text-zinc-900">
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionTitle title="Projects" subtitle="Portfolio" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
