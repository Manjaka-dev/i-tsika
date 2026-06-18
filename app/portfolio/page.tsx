"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Projets portfolio
const projects = [
  {
    id: "tsikapp",
    title: "TsikApp",
    type: "Web App",
    typeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    description: "Application web de gestion de stock et d'inventaire en temps réel pour les PME malgaches. Interface intuitive avec tableau de bord analytique.",
    technologies: ["React", "Next.js", "PostgreSQL", "Tailwind CSS"],
    status: "Bientôt disponible",
    statusColor: "bg-[#fbc63d]/10 text-[#fbc63d] border-[#fbc63d]/20",
  },
  {
    id: "madashop",
    title: "MadaShop",
    type: "E-commerce",
    typeColor: "bg-green-500/10 text-green-400 border-green-500/20",
    description: "Plateforme e-commerce multi-vendeurs avec système de paiement mobile money intégré, conçue pour le marché malgache.",
    technologies: ["Laravel", "Vue.js", "MySQL", "Stripe"],
    status: "Bientôt disponible",
    statusColor: "bg-[#fbc63d]/10 text-[#fbc63d] border-[#fbc63d]/20",
  },
  {
    id: "ofismanager",
    title: "OfisManager",
    type: "Desktop",
    typeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    description: "Logiciel desktop de gestion d'entreprise intégrant la comptabilité, les ressources humaines et le suivi de projets.",
    technologies: ["Electron", "React", "SQLite", "TypeScript"],
    status: "Bientôt disponible",
    statusColor: "bg-[#fbc63d]/10 text-[#fbc63d] border-[#fbc63d]/20",
  },
];

export default function PortfolioPage() {
  return (
    <main className="bg-[#070602] text-white">
      {/* Hero section */}
      <section className="relative py-24 bg-[#0c0c0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <motion.span
              className="text-[#fbc63d] uppercase tracking-wider text-sm font-medium mb-3 block"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Nos réalisations
            </motion.span>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Portfolio
            </motion.h1>
            <motion.p
              className="text-[#d9d9d9] text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Découvrez nos projets en cours de développement. Chaque réalisation reflète notre engagement envers la qualité et l&apos;innovation.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-[#201f1b]/60 rounded-2xl overflow-hidden border border-[#fbc63d]/5 hover:border-[#fbc63d]/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#fbc63d]/5 group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                {/* Project mockup */}
                <div className="h-56 bg-gradient-to-br from-[#fbc63d]/10 via-[#201f1b] to-[#070602] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/hero.webp')] bg-cover bg-center opacity-5 group-hover:opacity-15 transition-opacity duration-700" />
                  
                  {/* Decorative code lines */}
                  <div className="absolute top-4 left-4 right-4 space-y-2 opacity-20 group-hover:opacity-30 transition-opacity">
                    <div className="h-2 bg-[#fbc63d]/30 rounded w-3/4" />
                    <div className="h-2 bg-white/20 rounded w-1/2" />
                    <div className="h-2 bg-white/10 rounded w-2/3" />
                  </div>

                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 bg-[#fbc63d]/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-[#fbc63d]/30 transition-all duration-300 backdrop-blur-sm">
                      <span className="text-[#fbc63d] text-3xl font-bold">{project.title.charAt(0)}</span>
                    </div>
                    <span className={`text-xs font-medium px-3 py-1.5 rounded-full border ${project.typeColor}`}>
                      {project.type}
                    </span>
                  </div>

                  {/* Corner decoration */}
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#fbc63d]/10 rounded-full blur-xl group-hover:opacity-80 transition-opacity" />
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#fbc63d] transition-colors">
                      {project.title}
                    </h3>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full border flex-shrink-0 ml-3 ${project.statusColor}`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <p className="text-[#d9d9d9] text-sm mb-5 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded-full bg-[#070602] text-[#d9d9d9] border border-[#7b7979]/30 hover:border-[#fbc63d]/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[#fbc63d]/10">
                    <span className="text-[#7b7979] text-sm flex items-center">
                      Détails disponibles prochainement
                      <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Votre projet */}
      <section className="py-24 bg-[#0c0c0a]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="bg-gradient-to-br from-[#201f1b] to-[#0c0c0a] rounded-3xl p-10 md:p-16 border border-[#fbc63d]/10 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#fbc63d]/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#fbc63d]/5 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Votre projet pourrait figurer ici
              </h2>
              <p className="text-[#d9d9d9] text-lg mb-8 max-w-xl mx-auto">
                Faites-nous confiance pour réaliser votre application sur mesure. Contactez-nous pour discuter de votre projet.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/devis">
                  <Button className="bg-[#fbc63d] text-[#070602] hover:bg-[#ffbb00] hover:scale-105 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300">
                    Demander un devis gratuit
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button className="bg-transparent border border-[#fbc63d] text-white hover:bg-[#fbc63d]/10 hover:scale-105 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300">
                    Nous contacter
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
