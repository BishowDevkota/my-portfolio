import { Navbar } from "@/components/navbar";
import { SectionTitle } from "@/components/section-title";
import { AnimatedSection } from "@/components/animated-section";

const skills = [
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "MongoDB",
  "Mongoose",
  "Tailwind CSS",
  "JWT Authentication",
  "REST APIs",
  "Git & GitHub",
  "Framer Motion",
  "Vercel Deployment",
];

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 light:bg-zinc-50 light:text-zinc-900">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <AnimatedSection>
          <SectionTitle title="Skills" subtitle="Stack & Tools" />
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span key={skill} className="rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-300 light:border-zinc-300 light:text-zinc-700">
                {skill}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </main>
    </div>
  );
}
