import { Navbar } from "@/components/navbar";
import { SectionTitle } from "@/components/section-title";
import { AnimatedSection } from "@/components/animated-section";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 light:bg-zinc-50 light:text-zinc-900">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <AnimatedSection className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 light:border-zinc-200 light:bg-white">
          <SectionTitle title="Contact" subtitle="Let’s Build" />
          <p className="max-w-2xl text-zinc-400 light:text-zinc-600">
            I’m available for freelance and full-time opportunities. Reach out and let’s build something meaningful.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="mailto:hello@portfolio.dev" className="rounded border border-zinc-700 px-4 py-2 text-sm light:border-zinc-300">hello@portfolio.dev</a>
            <a href="https://github.com" target="_blank" className="rounded border border-zinc-700 px-4 py-2 text-sm light:border-zinc-300">GitHub</a>
            <a href="https://linkedin.com" target="_blank" className="rounded border border-zinc-700 px-4 py-2 text-sm light:border-zinc-300">LinkedIn</a>
          </div>
        </AnimatedSection>
      </main>
    </div>
  );
}
