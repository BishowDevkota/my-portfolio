"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogItem } from "@/lib/types";
import { formatDate } from "@/lib/format";

export function BlogCard({ blog }: { blog: BlogItem }) {
  return (
    <Link href={`/blog/${blog.slug}`}>
      <motion.article
        className="group glass rounded-3xl p-6 transition-all hover:bg-foreground/10 h-full cursor-pointer"
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
      >
        <div className="relative overflow-hidden rounded-2xl mb-6">
          <img 
            src={blog.imagePath} 
            alt={blog.title} 
            className="h-56 w-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-foreground/60 font-medium">
          {formatDate(blog.createdAt)}
        </p>
        <h3 className="mb-3 text-2xl font-bold group-hover:text-primary transition-colors">{blog.title}</h3>
        <p className="mb-4 text-foreground/70 leading-relaxed line-clamp-3">{blog.excerpt}</p>
        
        <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
          Read article
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </motion.article>
    </Link>
  );
}
