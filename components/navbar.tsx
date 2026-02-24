"use client";

import Link from "next/link";
import { useState } from "react";
import { useThemeMode } from "@/components/theme-provider";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/#blog" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { mode, toggleMode } = useThemeMode();

  return (
    <header className="fixed top-0 w-full z-50 p-6">
      <nav className="mx-auto flex max-w-7xl items-center justify-between mix-blend-difference text-white">
        <Link href="/" className="text-xl font-extrabold tracking-tighter">
          NP.
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition">
              {item.label}
            </Link>
          ))}
          <button onClick={toggleMode} type="button" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition">
            {mode === "dark" ? "Light" : "Dark"}
          </button>
        </div>

        <Link href="/#contact" className="hidden md:block text-xs font-bold border-b border-white pb-1">
          CONTACT
        </Link>

        <button className="md:hidden text-xs font-bold uppercase tracking-widest" onClick={() => setOpen((v) => !v)} type="button">
          Menu
        </button>
      </nav>

      {open && (
        <div className="mt-4 bg-black/90 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setOpen(false)} className="text-xs font-bold uppercase tracking-widest text-zinc-300">
                {item.label}
              </Link>
            ))}
            <Link href="/#contact" onClick={() => setOpen(false)} className="text-xs font-bold uppercase tracking-widest text-zinc-300">
              Contact
            </Link>
            <button onClick={() => { toggleMode(); setOpen(false); }} type="button" className="text-left text-xs font-bold uppercase tracking-widest text-zinc-300">
              {mode === "dark" ? "Light" : "Dark"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
