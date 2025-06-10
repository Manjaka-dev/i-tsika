"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

// Donnees des projets
const allProjects = [
  {
    id: "project-1",
    title: "Site web e-commerce pour une boutique de vêtements",
    description: "Création d'une boutique en ligne complète avec système de paiement sécurisé et gestion des stocks.",
    longDescription: "Nous avons développé une boutique en ligne moderne et intuitive pour cette marque de vêtements, avec une interface utilisateur épurée et une expérience d'achat optimisée. Le site intègre un système de paiement sécurisé, une gestion efficace des stocks et un tableau de bord administratif complet.",
    imageSrc: "/placeholder.jpg",
    category: "E-commerce",
    technologies: ["Next.js", "Tailwind CSS", "Stripe", "Node.js"],
    link: "https://example.com",
    challenge: "Le principal défi était de créer une expérience utilisateur fluide tout en gérant un catalogue de produits important avec de nombreuses variations (tailles, couleurs).",
    solution: "Nous avons mis en place une architecture robuste avec des filtres avancés et une navigation intuitive pour faciliter la recherche de produits. Le système de gestion des stocks a été spécifiquement conçu pour gérer les variations de produits et les ruptures de stock.",
    featured: true
  },
  {
    id: "project-2",
    title: "Refonte du site pour un cabinet d'avocats",
    description: "Modernisation complète de l'identité numérique avec un design élégant et professionnel.",
    longDescription: "Le cabinet d'avocats souhaitait moderniser sa présence en ligne avec un site reflétant son professionnalisme et facilitant la prise de contact. Nous avons conçu un site élégant mettant en valeur l'expertise du cabinet et facilitant la prise de rendez-vous en ligne.",
    imageSrc: "/placeholder.jpg",
    category: "Refonte",
    technologies: ["WordPress", "Elementor Pro", "Google Calendar API"],
    link: "https://example.com",
    challenge: "Le site devait conjuguer élégance et efficacité tout en respectant l'image sophistiquée et professionnelle du cabinet.",
    solution: "Nous avons opté pour un design épuré aux teintes sobres avec une navigation intuitive et une présentation claire des différentes expertises du cabinet. Un système de prise de rendez-vous intégré a été développé pour simplifier le contact client.",
    featured: true
  },
  {
    id: "project-3",
    title: "Application web pour une startup innovante",
    description: "Développement d'une application web sur mesure pour faciliter la gestion des tâches quotidiennes.",
    longDescription: "Cette startup avait besoin d'une solution personnalisée pour la gestion de ses projets et la coordination de son équipe. Nous avons développé une application web entièrement sur mesure intégrant la gestion de tâches, le suivi de temps et la génération de rapports.",
    imageSrc: "/placeholder.jpg",
    category: "Application Web",
    technologies: ["React", "Express.js", "MongoDB", "Socket.io"],
    link: "https://example.com",
    challenge: "Créer une application suffisamment flexible pour s'adapter aux processus spécifiques de l'entreprise tout en restant simple d'utilisation.",
    solution: "Nous avons adopté une approche modulaire avec des composants personnalisables et une architecture évolutive. L'interface utilisateur a été conçue avec une attention particulière à l'ergonomie et à l'expérience utilisateur.",
    featured: true
  },
  {
    id: "project-4",
    title: "Site vitrine pour un restaurant gastronomique",
    description: "Création d'un site attrayant pour mettre en valeur les plats et l'ambiance du restaurant.",
    longDescription: "Ce restaurant gastronomique souhaitait un site web reflétant l'excellence de sa cuisine et l'atmosphère unique de son établissement. Nous avons créé un site vitrine immersif avec de superbes visuels et une réservation de table en ligne.",
    imageSrc: "/placeholder.jpg",
    category: "Site Vitrine",
    technologies: ["Gatsby", "Contentful CMS", "Netlify"],
    link: "https://example.com",
    challenge: "Traduire l'expérience sensorielle du restaurant dans un format numérique et inciter les visiteurs à réserver.",
    solution: "Nous avons misé sur des visuels haute qualité et des animations subtiles pour créer une expérience immersive. Le menu a été présenté de manière élégante avec des descriptions détaillées et des photographies professionnelles.",
    featured: false
  },
  {
    id: "project-5",
    title: "Plateforme éducative pour une école de langues",
    description: "Développement d'une plateforme d'apprentissage en ligne avec suivi des progrès et exercices interactifs.",
    longDescription: "Cette école de langues cherchait à étendre son offre avec des cours en ligne. Nous avons développé une plateforme complète d'apprentissage avec des leçons interactives, un suivi des progrès et un système de communication entre enseignants et élèves.",
    imageSrc: "/placeholder.jpg",
    category: "Plateforme Web",
    technologies: ["Vue.js", "Laravel", "MySQL", "AWS"],
    link: "https://example.com",
    challenge: "Créer une expérience d'apprentissage engageante et efficace en ligne tout en permettant une interaction significative entre enseignants et élèves.",
    solution: "Nous avons intégré des outils d'apprentissage interactifs, un système de gamification pour maintenir la motivation des élèves et des fonctionnalités de vidéoconférence pour les cours particuliers.",
    featured: false
  }
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const categories = ["Tous", ...new Set(allProjects.map(project => project.category))];
  
  // Filtrer les projets selon la catégorie active
  const filteredProjects = activeFilter === "Tous" 
    ? allProjects 
    : allProjects.filter(project => project.category === activeFilter);

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
              Découvrez nos projets récents et comment nous avons aidé nos clients à atteindre leurs objectifs.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Portfolio filters */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? "bg-[#fbc63d] text-[#070602]"
                    : "bg-[#201f1b] text-white hover:bg-[#fbc63d]/20"
                }`}
                onClick={() => setActiveFilter(category)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-[#201f1b] rounded-xl overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <Image
                    src={project.imageSrc}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                    <div>
                      <span className="bg-[#fbc63d] text-[#070602] text-xs px-3 py-1 rounded-full inline-block mb-4 font-medium">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-semibold text-white">
                        {project.title}
                      </h3>
                    </div>
                    <Link href={`/portfolio/${project.id}`}>
                      <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[#fbc63d] transition-colors duration-300">
                        <ExternalLink className="w-5 h-5 text-white" />
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-[#fbc63d] text-[#070602] text-xs px-3 py-1 rounded-full inline-block font-medium">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="bg-[#201f1b] border border-[#fbc63d]/30 text-[#fbc63d] text-xs px-3 py-1 rounded-full inline-block font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{project.title}</h3>
                  <p className="text-[#d9d9d9] text-sm mb-6 line-clamp-2">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-[#0c0c0a] text-xs text-[#d9d9d9] px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <Link href={`/portfolio/${project.id}`}>
                    <Button className="w-full bg-[#201f1b] border border-[#fbc63d]/30 text-white hover:bg-[#fbc63d] hover:text-[#070602] transition-colors duration-300 mt-2">
                      Voir le projet
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-[#fbc63d] text-[#070602]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Vous avez un projet en tête ?
          </motion.h2>
          <motion.p
            className="text-lg mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Contactez-nous dès aujourd'hui pour discuter de votre projet et voir comment nous pouvons vous aider à le concrétiser.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/devis">
              <Button className="bg-[#070602] text-white hover:bg-[#201f1b] hover:scale-105 px-8 py-6 rounded-full text-base font-medium transition-all duration-300">
                Demander un devis gratuit
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
