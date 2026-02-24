"use client";

import { motion } from "framer-motion";

const techStack = [
  "NEXT.JS",
  "TYPESCRIPT",
  "TAILWIND CSS",
  "PRISMA",
  "NODE.JS",
  "POSTGRESQL",
];

export default function InfiniteTechSlider() {
  return (
    <div className="py-10 border-y border-zinc-900 overflow-hidden bg-black/50">
      <motion.div className="logos-slide flex w-max items-center gap-20 whitespace-nowrap grayscale opacity-50">
        {[...techStack, ...techStack, ...techStack].map((tech, index) => (
          <span key={`${tech}-${index}`} className="text-2xl font-bold">
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
