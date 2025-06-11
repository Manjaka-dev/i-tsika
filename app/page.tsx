"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Check, ExternalLink, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import ServicesList from "@/components/sections/services-list";
import ProjectsGrid from "@/components/sections/projects-grid";
import ContactForm from "@/components/sections/contact-form";
import SocialButton from "@/components/ui/social-button";

export default function HomePage() {
  // Données pour les sections
  // Services
  const services = [
    {
      id: "site-vitrine",
      title: "Création de site vitrine",
      description: "Des sites élégants et personnalisés pour présenter votre entreprise et vos services à vos clients potentiels.",
      icon: "/icons/website.svg",
      link: "/services#site-vitrine",
    },
    {
      id: "e-commerce",
      title: "Création de site e-commerce",
      description: "Des boutiques en ligne performantes et sécurisées pour vendre vos produits ou services sur internet.",
      icon: "/icons/shopping-cart.svg",
      link: "/services#e-commerce",
    },
    {
      id: "refonte",
      title: "Refonte de site existant",
      description: "Modernisez votre présence en ligne avec une refonte complète de votre site pour améliorer son design et ses performances.",
      icon: "/icons/refresh.svg",
      link: "/services#refonte",
    },
    {
      id: "maintenance",
      title: "Maintenance et support technique",
      description: "Un accompagnement régulier pour garder votre site à jour, sécurisé et performant dans le temps.",
      icon: "/icons/settings.svg",
      link: "/services#maintenance",
    },

    {
      id: "hebergement",
      title: "Hébergement et nom de domaine",
      description: "Des solutions d'hébergement fiables et sécurisées, ainsi que la gestion de vos noms de domaine.",
      icon: "/icons/server.svg",
      link: "/services#hebergement",
    },
  ];

  // Projets (en attente)
  const projects = [
    {
      id: "project-future",
      title: "Votre projet pourrait figurer ici",
      description: "Faites-nous confiance pour réaliser votre site web ou application sur mesure. Contactez-nous dès aujourd'hui pour discuter de votre projet.",
      imageSrc: "/placeholder.jpg",
      category: "À venir",
      link: "/contact",
      featured: true,
    },
  ];

  // Valeurs de l'entreprise
  const values = [
    {
      title: "Qualité",
      description: "Nous nous engageons à fournir des solutions web de haute qualité, avec une attention particulière aux détails."
    },
    {
      title: "Innovation",
      description: "Nous restons à la pointe des technologies pour créer des sites modernes et innovants."
    },
    {
      title: "Accessibilité",
      description: "Nous créons des sites accessibles à tous, y compris aux personnes en situation de handicap."
    },
    {
      title: "Performance",
      description: "Nous optimisons chaque site pour garantir des temps de chargement rapides et une expérience utilisateur fluide."
    },
  ];

  // Questions fréquentes
  const faqs = [
    {
      question: "En combien de temps livrez-vous un site web ?",
      answer: "Le délai de livraison varie selon la complexité du projet. Pour un site vitrine standard, comptez environ 8 à 12 semaines. Pour un site e-commerce ou une application web plus complexe, le délai peut aller de 16 à 24 semaines. Nous définissons toujours un calendrier précis au début du projet."
    },
    {
      question: "Puis-je modifier mon site moi-même après livraison ?",
      answer: "Absolument ! Nous développons tous nos sites avec des systèmes de gestion de contenu (CMS) intuitifs qui vous permettent de modifier facilement vos textes, images et autres contenus. Nous vous fournissons également une formation complète pour vous familiariser avec l'administration de votre site."
    },
    {
      question: "Proposez-vous un service de maintenance ?",
      answer: "Oui, nous proposons différentes formules de maintenance pour garder votre site à jour, sécurisé et performant. Ces formules incluent les mises à jour techniques, les sauvegardes régulières, la surveillance de la sécurité et un support en cas de problème."
    },
    {
      question: "Comment améliorer le référencement de mon site ?",
      answer: "Nous intégrons des bonnes pratiques SEO dès la conception de votre site. Pour aller plus loin, nous proposons des prestations d'optimisation SEO spécifiques qui incluent l'analyse de mots-clés, l'optimisation du contenu, le netlinking et le suivi des performances via des rapports réguliers."
    },
  ];

  return (
    <main className="bg-[#070602] text-white">
      {/* Section Hero / Accueil */}
      <HeroSection
        title="Nous créons des sites web modernes, performants et sur mesure"
        subtitle="Agence web spécialisée"
        description="Transformez votre présence en ligne avec des solutions numériques innovantes qui reflètent l'identité unique de votre entreprise et maximisent votre impact sur le web."
        ctaText="Demander un devis gratuit"
        ctaLink="/devis"
        backgroundImage="/portfolio-hero.webp"
      />

      {/* Section Services */}
      <section id="services" className="py-24 bg-[#0c0c0a]">
        <ServicesList services={services} />
      </section>

      {/* Section À propos / Qui sommes-nous */}
      <section id="about" className="py-24">
        <AboutSection 
          values={values}
          imageSrc="/placeholder.jpg"
          description="I-Tsika est une agence web créative fondée par des passionnés du numérique en 2025. Notre mission est d'aider les entreprises à se démarquer sur internet grâce à des solutions web innovantes, accessibles et performantes. Nous croyons que chaque projet mérite une approche sur mesure pour répondre parfaitement aux besoins uniques de chaque client."
        />
      </section>

      {/* Section Réalisations / Portfolio */}
      <section id="portfolio" className="py-24 bg-[#0c0c0a]">
        <ProjectsGrid 
          projects={projects.filter(p => p.featured)} 
          maxItems={4}
          showFilters={false}
          description="Votre projet pourrait se trouver ici si vous nous faites confiance."
        />
      </section>

      {/* Section FAQ */}
      <section id="faq" className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span
              className="text-[#fbc63d] uppercase tracking-wider text-sm font-medium mb-3 block"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Foire aux questions
            </motion.span>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Questions fréquentes
            </motion.h2>
            <motion.p 
              className="text-[#d9d9d9]"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Vous avez des questions ? Nous avons les réponses.
            </motion.p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-[#201f1b] rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer">
                    <h3 className="text-lg font-medium">{faq.question}</h3>
                    <span className="relative flex-shrink-0 ml-4 w-5 h-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0 transition-opacity duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100 transition-opacity duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-[#d9d9d9]">{faq.answer}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="text-[#d9d9d9] mb-4">
              Vous ne trouvez pas la réponse à votre question ?
            </p>
            <Link href="/contact">
              <Button className="bg-[#fbc63d] text-[#070602] hover:bg-[#ffbb00] hover:scale-105 px-6 py-2 rounded-full transition-all duration-300">
                Contactez-nous
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="py-24 bg-[#0c0c0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <motion.span
                className="text-[#fbc63d] uppercase tracking-wider text-sm font-medium mb-3 block"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Contactez-nous
              </motion.span>
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Parlons de votre projet
              </motion.h2>
              <motion.p 
                className="text-[#d9d9d9] mb-12"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Que vous ayez des questions, besoin d'un devis précis ou simplement envie d'en savoir plus sur nos services, nous sommes là pour vous aider. Remplissez le formulaire ou utilisez les coordonnées ci-dessous pour nous contacter.
              </motion.p>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="w-12 h-12 bg-[#201f1b] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#fbc63d]" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <a href="mailto:contact@example.com" className="text-[#d9d9d9] hover:text-[#fbc63d] transition-colors">
                      contact@example.com
                    </a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="w-12 h-12 bg-[#201f1b] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#fbc63d]" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Téléphone</h4>
                    <a href="tel:+33612345678" className="text-[#d9d9d9] hover:text-[#fbc63d] transition-colors">
                      +33 6 12 34 56 78
                    </a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="w-12 h-12 bg-[#201f1b] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#fbc63d]" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Adresse</h4>
                    <p className="text-[#d9d9d9]">
                      123 Avenue des Développeurs<br />
                      75000 Paris, France
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
            
            <div>
              <div className="bg-[#201f1b] p-8 rounded-2xl">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Appel à l'action final */}
      <section className="py-20 bg-[#fbc63d] text-[#070602]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Prêt à transformer votre présence en ligne ?
          </motion.h2>
          <motion.p 
            className="text-lg mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Demandez un devis gratuit dès aujourd'hui et découvrez comment nous pouvons vous aider à atteindre vos objectifs.
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
