"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  category: string;
  link: string;
  featured?: boolean;
}

interface ProjectsGridProps {
  title?: string;
  subtitle?: string;
  description?: string;
  projects: Project[];
  categories?: string[];
  showFilters?: boolean;
  maxItems?: number;
  showCTA?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

export default function ProjectsGrid({
  title = "Nos réalisations",
  subtitle = "Projets récents",
  description = "Découvrez nos derniers projets et les solutions que nous avons créées pour nos clients.",
  projects,
  categories = [],
  showFilters = false,
  maxItems = 6,
  showCTA = true,
  ctaText = "Voir tous nos projets",
  ctaLink = "/portfolio",
}: ProjectsGridProps) {
  // State for filtering
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Get all categories if not provided
  const allCategories = categories.length > 0
    ? categories
    : ["all", ...new Set(projects.map(project => project.category))];
  
  // Filter projects based on active category
  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter(project => project.category === activeFilter);
  
  // Limit the number of projects to show if maxItems is provided
  const displayProjects = maxItems ? filteredProjects.slice(0, maxItems) : filteredProjects;

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            className="text-[#fbc63d] uppercase tracking-wider text-sm font-medium mb-3 inline-block"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {subtitle}
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-[#d9d9d9] text-lg"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>

        {/* Filter buttons */}
        {showFilters && allCategories.length > 0 && (
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {allCategories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? "bg-[#fbc63d] text-[#070602]"
                    : "bg-[#201f1b] text-white hover:bg-[#fbc63d]/20"
                }`}
                onClick={() => setActiveFilter(category)}
              >
                {category === "all" ? "Tous" : category}
              </button>
            ))}
          </motion.div>
        )}

        {/* Projects grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`bg-[#201f1b] rounded-3xl overflow-hidden hover:bg-[#2a2621] transition-all duration-300 hover:shadow-lg hover:shadow-[#fbc63d]/5 hover:-translate-y-1 ${
                project.featured ? "md:col-span-2" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="relative overflow-hidden aspect-[16/9]">
                <Image
                  src={project.imageSrc}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                
                <Link
                  href={project.link}
                  className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-[#fbc63d] hover:text-[#070602] transition-colors duration-300"
                >
                  <ExternalLink className="w-5 h-5" />
                </Link>
              </div>
              
              <div className="p-6">
                <div className="bg-[#fbc63d] text-[#070602] text-xs px-3 py-1 rounded-full inline-block mb-4 font-medium">
                  {project.category}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{project.title}</h3>
                <p className="text-[#d9d9d9] text-sm line-clamp-2">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA button */}
        {showCTA && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href={ctaLink || "/portfolio"}>
              <Button className="bg-[#fbc63d] text-[#070602] hover:bg-[#ffbb00] hover:scale-105 px-6 py-2 rounded-full transition-all duration-300">
                {ctaText || "Voir tous nos projets"}
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
