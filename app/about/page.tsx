import { Navbar } from "@/components/navbar";
import { SectionTitle } from "@/components/section-title";
import { AnimatedSection } from "@/components/animated-section";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 light:bg-zinc-50 light:text-zinc-900">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <AnimatedSection className="space-y-4 border-b border-zinc-900 pb-10 light:border-zinc-200">
          <SectionTitle title="About" subtitle="Developer Profile" />
          <p className="max-w-3xl text-zinc-400 light:text-zinc-600">
            I am a full-stack developer focused on performance, clean architecture, and practical product delivery.
            I build reliable APIs, scalable databases, and modern frontend experiences.
          </p>
        </AnimatedSection>

        <AnimatedSection className="grid gap-6 py-10 md:grid-cols-3" delay={0.1}>
          <article className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 light:border-zinc-200 light:bg-white">
            <h3 className="text-lg font-semibold">Experience</h3>
            <p className="mt-3 text-sm text-zinc-400 light:text-zinc-600">Building production-ready web products with Next.js and TypeScript.</p>
          </article>
          <article className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 light:border-zinc-200 light:bg-white">
            <h3 className="text-lg font-semibold">Architecture</h3>
            <p className="mt-3 text-sm text-zinc-400 light:text-zinc-600">Clean module boundaries, secure APIs, and maintainable codebases.</p>
          </article>
          <article className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 light:border-zinc-200 light:bg-white">
            <h3 className="text-lg font-semibold">UI Craft</h3>
            <p className="mt-3 text-sm text-zinc-400 light:text-zinc-600">Minimal interfaces with thoughtful motion and responsive behavior.</p>
          </article>
        </AnimatedSection>
      </main>
    </div>
  );
}
