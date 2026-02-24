"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ProjectItem } from "@/lib/types";

export function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <motion.article
      className="group glass rounded-3xl p-6 transition-all hover:bg-foreground/10"
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div className="relative overflow-hidden rounded-2xl mb-6">
        <img 
          src={project.imagePath} 
          alt={project.title} 
          className="h-56 w-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <h3 className="mb-3 text-2xl font-bold">{project.title}</h3>
      <p className="mb-4 text-foreground/70 leading-relaxed">{project.description}</p>
      
      <div className="mb-6 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span 
            key={tech} 
            className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
          >
            {tech}
          </span>
        ))}
      </div>
      
      <div className="flex gap-3">
        <Link 
          href={project.githubLink} 
          target="_blank" 
          className="flex-1 text-center px-4 py-3 rounded-full border border-foreground/20 hover:border-primary hover:text-primary transition-all font-medium"
        >
          GitHub
        </Link>
        <Link 
          href={project.liveLink} 
          target="_blank" 
          className="flex-1 text-center px-4 py-3 rounded-full bg-primary text-white hover:bg-secondary transition-all font-medium"
        >
          Live Demo
        </Link>
      </div>
    </motion.article>
  );
}
