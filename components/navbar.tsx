"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useThemeMode } from "@/components/theme-provider";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/#blog" },
  { label: "Contact", href: "/#contact" },
];

function ThemeSwitch({ mode, onToggle }: { mode: "dark" | "light"; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      type="button"
      aria-label="Toggle theme"
      className={`relative h-9 w-[68px] rounded-full border p-1 transition-colors duration-300 ${
        mode === "dark"
          ? "border-[#4b4742] bg-[#3a3835]"
          : "border-[#cdc2b2] bg-[#c8bfb0]"
      }`}
    >
      <span
        className={`absolute left-1 top-1 inline-flex h-7 w-7 items-center justify-center rounded-full shadow-sm transition-all duration-300 ${
          mode === "dark"
            ? "translate-x-8 bg-[#121111] text-zinc-100"
            : "translate-x-0 bg-white text-amber-500"
        }`}
      >
        <span className={mode === "dark" ? "hidden" : "block"} aria-hidden>
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75Zm0 16.5a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75ZM21.75 12a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM5.25 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75Zm12.114 6.114a.75.75 0 0 1 1.06 1.06l-1.061 1.061a.75.75 0 1 1-1.06-1.06l1.06-1.061Zm-9.728-9.728a.75.75 0 0 1 1.06 1.06L7.636 10.51a.75.75 0 1 1-1.06-1.06l1.06-1.061Zm10.788 0 1.061 1.06a.75.75 0 0 1-1.06 1.061l-1.061-1.06a.75.75 0 1 1 1.06-1.061Zm-10.788 10.788 1.06 1.061a.75.75 0 1 1-1.06 1.06l-1.061-1.06a.75.75 0 0 1 1.06-1.061ZM12 7.5A4.5 4.5 0 1 1 7.5 12 4.505 4.505 0 0 1 12 7.5Z" />
          </svg>
        </span>
        <span className={mode === "dark" ? "block" : "hidden"} aria-hidden>
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.75 15.5A9.75 9.75 0 1 1 8.5 2.25a.75.75 0 0 1 .86.98A8.25 8.25 0 0 0 20.77 14.64a.75.75 0 0 1 .98.86Z" />
          </svg>
        </span>
      </span>
    </button>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { mode, toggleMode } = useThemeMode();

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 box-border w-full px-4 py-4 md:p-6">
      <nav className="mx-auto flex w-full min-w-0 items-center justify-between rounded-2xl border border-white/15 bg-black/35 px-4 py-3 text-white backdrop-blur-xl light:border-zinc-300/70 light:bg-white/80 light:text-zinc-900 md:max-w-7xl md:rounded-none md:border-0 md:bg-transparent md:light:border-0 md:light:bg-transparent md:px-0 md:py-0 md:backdrop-blur-0 md:light:backdrop-blur-none md:light:shadow-none md:mix-blend-difference md:light:mix-blend-normal">
        <Link href="/" className="inline-flex items-center rounded-md light:bg-black">
          <Image src="/logo.png" alt="Logo" width={44} height={44} priority className="h-11 w-11" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition light:text-zinc-600 light:hover:text-zinc-900">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <ThemeSwitch mode={mode} onToggle={toggleMode} />

          <a
            href="mailto:bishow8848@gmail.com"
            className="rounded-full border border-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition hover:bg-white hover:text-black light:border-zinc-900 light:hover:bg-zinc-900 light:hover:text-white"
          >
            Hire Me
          </a>
        </div>

        <button
          className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/30 transition hover:border-white/50 hover:bg-black/45 md:hidden light:border-zinc-300 light:bg-white light:hover:bg-zinc-50"
          onClick={() => setOpen((v) => !v)}
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-nav-drawer"
        >
          <span className="relative h-4 w-4" aria-hidden>
            <span
              className={`absolute left-0 top-0 block h-0.5 w-4 rounded-full bg-current transition-transform duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-0.5 w-4 rounded-full bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] block h-0.5 w-4 rounded-full bg-current transition-transform duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      <button
        onClick={() => setOpen(false)}
        aria-label="Close navigation menu"
        className={`fixed inset-0 z-40 bg-black/65 backdrop-blur-[2px] transition-opacity duration-300 md:hidden light:bg-black/20 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        id="mobile-nav-drawer"
        className={`fixed inset-y-2 inset-x-2 z-50 overflow-x-hidden overflow-y-auto rounded-3xl border border-white/15 bg-black/95 p-4 text-white shadow-2xl backdrop-blur-xl transition-all duration-300 md:hidden light:border-zinc-200 light:bg-white/95 light:text-zinc-900 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="inline-flex items-center rounded-md light:bg-black"
            >
              <Image src="/logo.png" alt="Logo" width={40} height={40} className="h-10 w-10" />
            </Link>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close navigation drawer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 transition hover:bg-white/10 light:border-zinc-300 light:bg-zinc-100 light:hover:bg-zinc-200"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-1.5">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-lg font-semibold tracking-tight text-zinc-100 transition hover:bg-white/10 hover:pl-5 light:text-zinc-800 light:hover:bg-zinc-100"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-3 light:border-zinc-200 light:bg-zinc-50">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 light:text-zinc-500">
                Appearance
              </p>
              <ThemeSwitch mode={mode} onToggle={toggleMode} />
            </div>
            <a
              href="mailto:bishow8848@gmail.com"
              className="inline-flex w-full items-center justify-center rounded-full border border-zinc-300 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-zinc-100 transition hover:bg-white hover:text-black light:border-zinc-700 light:text-zinc-700 light:hover:bg-zinc-900 light:hover:text-white"
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
