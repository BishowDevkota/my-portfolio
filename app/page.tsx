import { Navbar } from "@/components/navbar";
import { AnimatedSection } from "@/components/animated-section";
import Preloader from "../components/preloader";
import InfiniteTechSlider from "@/components/infinite-tech-slider";
import { HeroVideo } from "@/components/hero-video";
import Link from "next/link";
import { getFeaturedBlogs, getFeaturedProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [featuredProjects, featuredBlogs] = await Promise.all([
    getFeaturedProjects(3),
    getFeaturedBlogs(3),
  ]);

  return (
    <>
      <Preloader />
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navbar />

        <main>
          <div className="blob" style={{ top: "-10%", left: "-10%" }} />

          <section className="relative flex h-screen flex-col justify-center overflow-hidden px-10 md:px-24">
            <HeroVideo />
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/45 light:from-white/70 light:via-white/45 light:to-white/70" />
            <div className="absolute inset-0 bg-black/10 light:bg-white/10" />

            <div className="relative z-10">
              <AnimatedSection delay={0.05} direction="up">
                <span className="mb-4 block font-mono text-blue-500">Available for freelance — 2026</span>
              </AnimatedSection>

              <AnimatedSection delay={0.1} direction="up">
                <h1 className="text-5xl font-extrabold leading-none tracking-tighter md:text-8xl">
                  BISHOW <br /> <span className="text-zinc-500 light:text-zinc-700">DEVKOTA</span>
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={0.15} direction="up">
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-300 light:text-zinc-700">
                  NEXT.JS DEVELOPER — building ultra-fast web experiences with React, Server Components, and motion-driven UI.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.2} direction="up">
                <div className="mt-12">
                  <a href="#projects" className="rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition hover:scale-105">
                    VIEW PROJECTS
                  </a>
                </div>
              </AnimatedSection>
            </div>
          </section>

          <InfiniteTechSlider />

          <section id="about" className="px-10 py-32 md:px-24">
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-3">
              <AnimatedSection className="md:col-span-1" delay={0.05} direction="left">
                <div className="glass rounded-3xl p-2 rotate-3 transition duration-500 hover:rotate-0">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
                    className="h-auto w-full rounded-2xl grayscale transition duration-700 hover:grayscale-0"
                    alt="About Me"
                  />
                </div>
              </AnimatedSection>

              <AnimatedSection className="md:col-span-2" delay={0.1} direction="right">
                <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-blue-500">The Developer</h2>
                <h3 className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl">Engineering Scalable Web Solutions.</h3>
                <p className="mb-6 text-lg leading-relaxed text-zinc-400 light:text-zinc-600">
                  I am a Full-Stack developer based in NYC with a passion for the Next.js ecosystem. I bridge the gap between complex backend logic and fluid frontend motion to create products that scale.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="glass rounded-2xl p-6">
                    <h4 className="text-2xl font-bold">5+</h4>
                    <p className="text-xs uppercase text-zinc-500 light:text-zinc-600">Years Experience</p>
                  </div>
                  <div className="glass rounded-2xl p-6">
                    <h4 className="text-2xl font-bold">40+</h4>
                    <p className="text-xs uppercase text-zinc-500 light:text-zinc-600">Projects Completed</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>

          <section id="skills" className="border-y border-zinc-900 bg-zinc-950/40 px-10 py-24 light:border-zinc-200 light:bg-zinc-100/60 md:px-24">
            <AnimatedSection delay={0.05} direction="up">
              <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">Core Expertise</p>
                  <h3 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">Crafted for speed, scale, and elegant UX.</h3>
                </div>
                <p className="max-w-md text-sm text-zinc-400 light:text-zinc-600">
                  End-to-end product development across frontend, backend, cloud, and design systems.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <AnimatedSection className="glass rounded-3xl p-8 hover:-translate-y-1" delay={0.1} direction="up">
                <div className="mb-5 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                  </span>
                  <div className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-500">Frontend</div>
                </div>
                <h4 className="mb-2 text-2xl font-bold">Modern Interfaces</h4>
                <p className="mb-4 text-sm text-zinc-500 light:text-zinc-600">React, Next.js, Framer Motion, Tailwind CSS</p>
                <div className="h-1 w-full rounded-full bg-zinc-800/80 light:bg-zinc-300">
                  <div className="h-1 w-[88%] rounded-full bg-blue-500" />
                </div>
              </AnimatedSection>

              <AnimatedSection className="glass rounded-3xl p-8 hover:-translate-y-1" delay={0.15} direction="up">
                <div className="mb-5 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                  </span>
                  <div className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-500">Backend</div>
                </div>
                <h4 className="mb-2 text-2xl font-bold">Reliable APIs</h4>
                <p className="mb-4 text-sm text-zinc-500 light:text-zinc-600">Node.js, Go, PostgreSQL, Redis, Prisma</p>
                <div className="h-1 w-full rounded-full bg-zinc-800/80 light:bg-zinc-300">
                  <div className="h-1 w-[92%] rounded-full bg-blue-500" />
                </div>
              </AnimatedSection>

              <AnimatedSection className="glass rounded-3xl p-8 hover:-translate-y-1" delay={0.2} direction="up">
                <div className="mb-5 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                  </span>
                  <div className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-500">Cloud</div>
                </div>
                <h4 className="mb-2 text-2xl font-bold">Scalable Deployments</h4>
                <p className="mb-4 text-sm text-zinc-500 light:text-zinc-600">Vercel, AWS, Docker, Kubernetes</p>
                <div className="h-1 w-full rounded-full bg-zinc-800/80 light:bg-zinc-300">
                  <div className="h-1 w-[86%] rounded-full bg-blue-500" />
                </div>
              </AnimatedSection>

              <AnimatedSection className="glass rounded-3xl p-8 hover:-translate-y-1" delay={0.25} direction="up">
                <div className="mb-5 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                  </span>
                  <div className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-500">Design</div>
                </div>
                <h4 className="mb-2 text-2xl font-bold">UX & Motion</h4>
                <p className="mb-4 text-sm text-zinc-500 light:text-zinc-600">Figma, Adobe UI/UX, Motion Design</p>
                <div className="h-1 w-full rounded-full bg-zinc-800/80 light:bg-zinc-300">
                  <div className="h-1 w-[84%] rounded-full bg-blue-500" />
                </div>
              </AnimatedSection>
            </div>
          </section>

          <section id="projects" className="px-10 py-32 md:px-24">
            <AnimatedSection delay={0.05} direction="up">
              <h2 className="mb-12 text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">Selected Works</h2>
            </AnimatedSection>
            <div className="space-y-24">
              {featuredProjects.map((project, index) => (
                <AnimatedSection
                  key={project._id}
                  className="grid grid-cols-1 items-center gap-12 md:grid-cols-2"
                  delay={0.1 + index * 0.05}
                  direction="up"
                >
                  <div className={`glass overflow-hidden rounded-[2rem] p-2 ${index % 2 === 1 ? "md:order-last" : ""}`}>
                    <img
                      src={project.imagePath}
                      className="w-full rounded-[1.5rem] transition duration-700 hover:scale-105"
                      alt={project.title}
                    />
                  </div>
                  <div>
                    <div className="mb-4 flex gap-2 flex-wrap">
                      {project.techStack.slice(0, 2).map((tech) => (
                        <span key={tech} className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase text-blue-500">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <h3 className="mb-4 text-4xl font-extrabold">{project.title}</h3>
                    <p className="mb-8 text-lg text-zinc-400 light:text-zinc-600">{project.description}</p>
                    <div className="flex gap-6">
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="border-b border-blue-500 pb-1 text-sm font-bold">LIVE DEMO</a>
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="border-b border-zinc-500 pb-1 text-sm font-bold light:border-zinc-700">GITHUB REPO</a>
                    </div>
                  </div>
                </AnimatedSection>
              ))}

              <AnimatedSection delay={0.28} direction="up">
                <div className="flex justify-center">
                  <Link href="/projects" className="border-b border-blue-500 pb-1 text-sm font-bold uppercase tracking-widest text-blue-500">
                    Read More
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </section>

          <section id="blog" className="bg-zinc-950/20 px-10 py-32 light:bg-zinc-100/60 md:px-24">
            <AnimatedSection delay={0.05} direction="up">
              <h2 className="mb-12 text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">Latest Insights</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {featuredBlogs.map((blog, index) => (
                <AnimatedSection key={blog._id} className="glass group overflow-hidden rounded-3xl" delay={0.1 + index * 0.05} direction="up">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={blog.imagePath}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      alt={blog.title}
                    />
                  </div>
                  <div className="p-8">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-blue-500">{blog.slug.replace(/-/g, " ")}</p>
                    <h4 className="mb-4 text-xl font-bold">{blog.title}</h4>
                    <p className="mb-6 text-sm text-zinc-500 light:text-zinc-600">{blog.excerpt}</p>
                    <Link href={`/blog/${blog.slug}`} className="border-b border-white pb-1 text-xs font-bold uppercase light:border-zinc-800">Read Article</Link>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.28} direction="up">
              <div className="mt-12 flex justify-center">
                <Link href="/blog" className="border-b border-blue-500 pb-1 text-sm font-bold uppercase tracking-widest text-blue-500">
                  Read More
                </Link>
              </div>
            </AnimatedSection>
          </section>

          <footer id="contact" className="border-t border-zinc-900 px-10 py-32 text-center light:border-zinc-200 md:px-24">
            <div className="blob" style={{ bottom: "-10%", right: "-10%" }} />
            <AnimatedSection delay={0.05} direction="up">
              <h2 className="mb-12 text-5xl font-extrabold tracking-tighter md:text-8xl">LET'S CONNECT.</h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1} direction="up">
              <a href="mailto:bishow8848@gmail.com" className="inline-block border-b-2 border-zinc-800 pb-2 text-2xl italic font-light transition hover:border-white light:border-zinc-300 light:hover:border-zinc-700 md:text-4xl">
                bishow8848@gmail.com
              </a>
            </AnimatedSection>

            <div className="mt-32 rounded-2xl border border-zinc-900 bg-zinc-950/60 px-6 py-8 light:border-zinc-200 light:bg-white/80 md:px-10">
              <div className="flex flex-col items-center justify-between text-[10px] uppercase tracking-[0.3em] text-zinc-600 md:flex-row">
                <p>© 2026 BISHOW DEVKOTA — ALL RIGHTS RESERVED</p>
                <div className="mt-6 flex gap-8 md:mt-0">
                  <a href="#" className="transition hover:text-white light:hover:text-zinc-900">LinkedIn</a>
                  <a href="#" className="transition hover:text-white light:hover:text-zinc-900">GitHub</a>
                  <a href="#" className="transition hover:text-white light:hover:text-zinc-900">Twitter</a>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
