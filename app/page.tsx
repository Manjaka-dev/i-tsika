"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, ArrowRight, Users, Calendar, MapPinned, Sparkles, Quote } from "lucide-react";
import { motion } from "framer-motion";
import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import ServicesList from "@/components/sections/services-list";
import ContactForm from "@/components/sections/contact-form";
import { useIsMobile } from "@/hooks/use-mobile";

export default function HomePage() {
  const isMobile = useIsMobile();
  
  // Services — nouveau positionnement
  const services = [
    {
      id: "web-apps",
      title: "Applications web sur mesure",
      description: "SaaS, portails clients, dashboards et systèmes de gestion interne — des applications web robustes et scalables.",
      icon: "/icons/website.svg",
      link: "/services#web-apps",
    },
    {
      id: "desktop",
      title: "Logiciels desktop",
      description: "Applications desktop sur mesure pour Windows, Linux et macOS, sans dépendance à internet.",
      icon: "/icons/settings.svg",
      link: "/services#desktop",
    },
    {
      id: "mobile",
      title: "Applications mobiles",
      description: "Apps iOS et Android natives ou cross-platform centrées sur l'expérience utilisateur.",
      icon: "/icons/react.svg",
      link: "/services#mobile",
    },
    {
      id: "site-vitrine",
      title: "Sites vitrines & landing pages",
      description: "Des sites modernes, rapides et bien référencés pour convertir vos visiteurs en clients.",
      icon: "/icons/html5.svg",
      link: "/services#site-vitrine",
    },
    {
      id: "e-commerce",
      title: "E-commerce",
      description: "Boutiques en ligne performantes avec gestion de produits, paiement sécurisé et suivi des commandes.",
      icon: "/icons/shopping-cart.svg",
      link: "/services#e-commerce",
    },
    {
      id: "maintenance",
      title: "Maintenance & support",
      description: "Suivi technique, mises à jour, corrections de bugs et monitoring de vos applications en production.",
      icon: "/icons/server.svg",
      link: "/services#maintenance",
    },
  ];

  // Portfolio aperçu
  const portfolioPreview = [
    {
      id: "tsikapp",
      title: "TsikApp",
      type: "Web App",
      description: "Application web de gestion de stock et d'inventaire en temps réel pour les PME malgaches.",
      technologies: ["React", "Next.js", "PostgreSQL"],
      status: "Bientôt disponible",
    },
    {
      id: "madashop",
      title: "MadaShop",
      type: "E-commerce",
      description: "Plateforme e-commerce multi-vendeurs avec système de paiement mobile money intégré.",
      technologies: ["Laravel", "Vue.js", "MySQL"],
      status: "Bientôt disponible",
    },
    {
      id: "ofismanager",
      title: "OfisManager",
      type: "Desktop",
      description: "Logiciel desktop de gestion d'entreprise : comptabilité, RH et suivi de projets.",
      technologies: ["Electron", "React", "SQLite"],
      status: "Bientôt disponible",
    },
  ];

  // Valeurs de l'entreprise
  const values = [
    {
      title: "Qualité",
      description: "Nous nous engageons à fournir des solutions de haute qualité, avec une attention particulière aux détails."
    },
    {
      title: "Innovation",
      description: "Nous restons à la pointe des technologies pour créer des applications modernes et innovantes."
    },
    {
      title: "Accessibilité",
      description: "Nous créons des applications accessibles à tous, y compris aux personnes en situation de handicap."
    },
    {
      title: "Performance",
      description: "Nous optimisons chaque application pour garantir des temps de chargement rapides et une expérience utilisateur fluide."
    },
  ];

  // FAQ — nouvelles questions
  const faqs = [
    {
      question: "Quels types de projets développez-vous ?",
      answer: "Nous développons tout type d'application numérique : sites web, applications web métier, logiciels desktop, applications mobiles et plateformes e-commerce. Chaque projet est abordé sur mesure, en fonction de vos besoins réels."
    },
    {
      question: "Comment se déroule un projet avec I-Tsika ?",
      answer: "Nous suivons un processus en 5 étapes : analyse de vos besoins, conception des maquettes, développement, phase de tests, puis livraison avec formation. Vous êtes impliqué à chaque étape clé."
    },
    {
      question: "Combien de temps faut-il pour livrer un projet ?",
      answer: "Cela dépend de la complexité. Un site vitrine : 4 à 8 semaines. Une application web ou desktop : 2 à 6 mois. Nous définissons un calendrier précis dès le début du projet."
    },
    {
      question: "Quel est votre processus de tarification ?",
      answer: "Chaque projet est unique, donc chaque devis l'est aussi. Remplissez notre formulaire de devis en ligne pour obtenir une estimation personnalisée sous 48h, sans engagement."
    },
  ];

  // Stats
  const stats = [
    { icon: <Users className="w-6 h-6" />, value: "4", label: "Experts passionnés" },
    { icon: <Calendar className="w-6 h-6" />, value: "2025", label: "Année de fondation" },
    { icon: <MapPinned className="w-6 h-6" />, value: "Antananarivo", label: "Basée à Madagascar" },
    { icon: <Sparkles className="w-6 h-6" />, value: "100%", label: "Sur mesure" },
  ];

  return (
    <main className="bg-[#070602] text-white">
      {/* Section Hero / Accueil */}
      <HeroSection
        title="Des applications sur mesure pour transformer votre activité"
        subtitle="Agence de développement d'applications"
        description="Web, desktop, mobile — nous concevons des solutions numériques innovantes qui s'adaptent parfaitement à vos besoins métier et maximisent votre impact."
        ctaText="Demander un devis gratuit"
        ctaLink="/devis"
        backgroundImage="/hero.png"
      />

      {/* Section Services */}
      <section id="services" className="py-28 bg-[#0c0c0a]">
        <ServicesList services={services} />
      </section>

      {/* Section Chiffres clés */}
      <section id="stats" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 md:p-8 bg-[#201f1b]/40 rounded-2xl border border-[#fbc63d]/10 hover:border-[#fbc63d]/30 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4 text-[#fbc63d]">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-[#fbc63d] mb-2">
                  {stat.value}
                </div>
                <div className="text-[#d9d9d9] text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section À propos / Qui sommes-nous */}
      <section id="about" className="py-28">
        <AboutSection 
          values={values}
          imageSrc="/nous.webp"
          description="I-Tsika est une agence de développement numérique fondée en 2025 par des étudiants en informatique passionnés. Notre mission est d'aider les entreprises à se démarquer grâce à des applications sur mesure — web, desktop et mobiles — innovantes, accessibles et performantes."
        />
      </section>

      {/* Section Portfolio / Aperçu */}
      <section id="portfolio" className="py-28 bg-[#0c0c0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <motion.span
              className="text-[#fbc63d] uppercase tracking-wider text-sm font-medium mb-3 block"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Nos réalisations
            </motion.span>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Portfolio
            </motion.h2>
            <motion.p
              className="text-[#d9d9d9] text-base md:text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Découvrez nos projets en cours et à venir.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {portfolioPreview.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-[#201f1b]/60 rounded-2xl overflow-hidden border border-[#fbc63d]/5 hover:border-[#fbc63d]/20 transition-all duration-500 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Mockup placeholder */}
                <div className="h-48 bg-gradient-to-br from-[#fbc63d]/10 via-[#201f1b] to-[#070602] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/hero.png')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-[#fbc63d]/20 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-[#fbc63d] text-2xl font-bold">{project.title.charAt(0)}</span>
                    </div>
                    <span className="text-[#fbc63d]/60 text-sm font-medium">{project.type}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#fbc63d] transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#fbc63d]/10 text-[#fbc63d] border border-[#fbc63d]/20">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-[#d9d9d9] text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded-full bg-[#070602] text-[#d9d9d9] border border-[#7b7979]/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-10 md:mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/portfolio">
              <Button className="bg-transparent border border-[#fbc63d] text-white hover:bg-[#fbc63d]/10 hover:scale-105 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300">
                Voir tous les projets
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section Témoignages — structure prête */}
      <section id="testimonials" className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <motion.span
              className="text-[#fbc63d] uppercase tracking-wider text-sm font-medium mb-3 block"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ce qu&apos;ils disent de nous
            </motion.span>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Témoignages
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                className="bg-[#201f1b]/40 rounded-2xl p-8 border border-[#fbc63d]/5 relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Quote className="w-8 h-8 text-[#fbc63d]/20 mb-4" />
                <p className="text-[#7b7979] text-sm italic mb-6 leading-relaxed">
                  Témoignage à venir — cet espace est réservé pour un futur avis client.
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[#fbc63d]/10 rounded-full flex items-center justify-center mr-3">
                    <span className="text-[#fbc63d] text-sm font-bold">?</span>
                  </div>
                  <div>
                    <p className="text-[#7b7979] text-sm font-medium">Nom du client</p>
                    <p className="text-[#7b7979]/60 text-xs">Entreprise</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <section id="faq" className="py-20 md:py-28 bg-[#0c0c0a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 md:mb-16">
            <motion.span
              className="text-[#fbc63d] uppercase tracking-wider text-sm font-medium mb-2 md:mb-3 block"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Foire aux questions
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Questions fréquentes
            </motion.h2>
            <motion.p 
              className="text-[#d9d9d9] text-base md:text-lg"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Vous avez des questions ? Nous avons les réponses.
            </motion.p>
          </div>
          
          <div className="space-y-4 md:space-y-6">
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
                  <summary className={`flex justify-between items-center ${isMobile ? 'p-4 text-sm' : 'p-6'} cursor-pointer`} aria-expanded="false">
                    <span className={`${isMobile ? 'text-base' : 'text-lg'} font-medium pr-2`}>{faq.question}</span>
                    <span className="relative flex-shrink-0 ml-2 md:ml-4 w-5 h-5" aria-hidden="true">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0 transition-opacity duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100 transition-opacity duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                  </summary>
                  <div className={`${isMobile ? 'px-4 pb-4 pt-0 text-sm' : 'px-6 pb-6 pt-0'}`}>
                    <p className="text-[#d9d9d9] text-sm md:text-base">{faq.answer}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-8 md:mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="text-[#d9d9d9] mb-4 text-sm md:text-base">
              Vous ne trouvez pas la réponse à votre question ?
            </p>
            <Link href="/faq" aria-label="Voir toutes les questions fréquentes">
              <Button className={`bg-[#fbc63d] text-[#070602] hover:bg-[#ffbb00] hover:scale-105 ${isMobile ? 'w-full mx-auto max-w-xs' : ''} px-6 py-2.5 md:px-6 md:py-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#070602]`}>
                Voir toutes les FAQ
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="py-28">
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
                className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold mb-6`}
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
                Que vous ayez des questions, besoin d&apos;un devis précis ou simplement envie d&apos;en savoir plus sur nos services, nous sommes là pour vous aider. {isMobile ? '' : 'Remplissez le formulaire ou utilisez les coordonnées ci-dessous pour nous contacter.'}
              </motion.p>
              
              <div className={`${isMobile ? 'grid grid-cols-1 gap-6' : 'space-y-6'}`}>
                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="w-12 h-12 bg-[#201f1b] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#fbc63d]" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <a href="mailto:contact@i-tsika.site" className="text-[#d9d9d9] hover:text-[#fbc63d] transition-colors">
                      contact@i-tsika.site
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
                    <Phone className="w-5 h-5 text-[#fbc63d]" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Téléphone</h3>
                    <a href="tel:+261387939905" className="text-[#d9d9d9] hover:text-[#fbc63d] transition-colors">
                      +261 38 79 399 05
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
                    <MapPin className="w-5 h-5 text-[#fbc63d]" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Adresse</h3>
                    <p className="text-[#d9d9d9]">
                      Antananarivo, Madagascar
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
      <section className="py-16 md:py-20 bg-[#fbc63d] text-[#070602]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h2 
            className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold mb-6`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Prêt à donner vie à votre projet ?
          </motion.h2>
          <motion.p 
            className={`${isMobile ? 'text-base' : 'text-lg'} mb-8 md:mb-12 max-w-2xl mx-auto`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Demandez un devis gratuit dès aujourd&apos;hui et découvrez comment nous pouvons transformer votre idée en application.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/devis">
              <Button className={`bg-[#070602] text-white hover:bg-[#201f1b] hover:scale-105 ${isMobile ? 'w-full max-w-xs' : ''} px-6 py-4 md:px-8 md:py-6 rounded-full text-base font-medium transition-all duration-300`}>
                Demander un devis gratuit
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
