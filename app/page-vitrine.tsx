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
import PricingTable from "@/components/sections/pricing-table";
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
      id: "seo",
      title: "Optimisation SEO / performance",
      description: "Améliorez votre visibilité sur les moteurs de recherche et optimisez les performances de votre site.",
      icon: "/icons/search.svg",
      link: "/services#seo",
    },
    {
      id: "hebergement",
      title: "Hébergement et nom de domaine",
      description: "Des solutions d'hébergement fiables et sécurisées, ainsi que la gestion de vos noms de domaine.",
      icon: "/icons/server.svg",
      link: "/services#hebergement",
    },
  ];

  // Projets
  const projects = [
    {
      id: "project-1",
      title: "Site web e-commerce pour une boutique de vêtements",
      description: "Création d'une boutique en ligne complète avec système de paiement sécurisé et gestion des stocks.",
      imageSrc: "/placeholder.jpg",
      category: "E-commerce",
      link: "https://example.com",
      featured: true,
    },
    {
      id: "project-2",
      title: "Refonte du site pour un cabinet d'avocats",
      description: "Modernisation complète de l'identité numérique avec un design élégant et professionnel.",
      imageSrc: "/placeholder.jpg",
      category: "Refonte",
      link: "https://example.com",
      featured: true,
    },
    {
      id: "project-3",
      title: "Application web pour une startup innovante",
      description: "Développement d'une application web sur mesure pour faciliter la gestion des tâches quotidiennes.",
      imageSrc: "/placeholder.jpg",
      category: "Application Web",
      link: "https://example.com",
      featured: true,
    },
    {
      id: "project-4",
      title: "Site vitrine pour un restaurant gastronomique",
      description: "Création d'un site attrayant pour mettre en valeur les plats et l'ambiance du restaurant.",
      imageSrc: "/placeholder.jpg",
      category: "Site Vitrine",
      link: "https://example.com",
      featured: false,
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

  // Offres de prix
  const pricingPlans = [
    {
      id: "basic",
      name: "Site Vitrine Standard",
      description: "Parfait pour les petites entreprises qui débutent",
      price: "À partir de 900€",
      period: "",
      features: [
        { name: "Site responsive (mobile-first)", included: true },
        { name: "Jusqu'à 5 pages", included: true },
        { name: "Formulaire de contact", included: true },
        { name: "Optimisation SEO de base", included: true },
        { name: "Hébergement pour 1 an", included: true },
        { name: "Maintenance régulière", included: false },
        { name: "Intégration e-commerce", included: false },
      ],
      isFeatured: false,
      ctaText: "Demander un devis",
      ctaLink: "/devis",
    },
    {
      id: "pro",
      name: "Site Professionnel",
      description: "Idéal pour les PME et professions libérales",
      price: "À partir de 1700€",
      period: "",
      features: [
        { name: "Site responsive (mobile-first)", included: true },
        { name: "Jusqu'à 10 pages", included: true },
        { name: "Formulaires avancés", included: true },
        { name: "Optimisation SEO complète", included: true },
        { name: "Hébergement pour 1 an", included: true },
        { name: "Maintenance trimestrielle", included: true },
        { name: "Intégration e-commerce", included: false },
      ],
      isFeatured: true,
      ctaText: "Demander un devis",
      ctaLink: "/devis",
    },
    {
      id: "enterprise",
      name: "Solution E-commerce",
      description: "Pour les entreprises souhaitant vendre en ligne",
      price: "À partir de 2500€",
      period: "",
      features: [
        { name: "Site responsive (mobile-first)", included: true },
        { name: "Pages illimitées", included: true },
        { name: "Catalogue produits", included: true },
        { name: "Panier et paiement sécurisé", included: true },
        { name: "Gestion des stocks", included: true },
        { name: "Maintenance mensuelle", included: true },
        { name: "Intégration e-commerce complète", included: true },
      ],
      isFeatured: false,
      ctaText: "Demander un devis",
      ctaLink: "/devis",
    },
  ];

  // Témoignages clients
  const testimonials = [
    {
      id: "testimonial-1",
      name: "Marie Dupont",
      company: "Boutique Élégance",
      image: "/placeholder-user.jpg",
      content: "Une équipe professionnelle et à l'écoute. Notre boutique en ligne a dépassé nos attentes et les ventes ont augmenté de 40% dès le premier mois !",
      rating: 5,
    },
    {
      id: "testimonial-2",
      name: "Jean Martin",
      company: "Cabinet Martin & Associés",
      image: "/placeholder-user.jpg",
      content: "La refonte de notre site a complètement transformé notre image digitale. Nous recevons maintenant des demandes de clients de toute la France.",
      rating: 5,
    },
    {
      id: "testimonial-3",
      name: "Sophie Leclerc",
      company: "Restaurant Le Gourmet",
      image: "/placeholder-user.jpg",
      content: "Un travail remarquable! Notre site attire de nouveaux clients chaque jour et les réservations en ligne ont simplifié notre gestion.",
      rating: 5,
    },
  ];

  // Questions fréquentes
  const faqs = [
    {
      question: "En combien de temps livrez-vous un site web ?",
      answer: "Le délai de livraison varie selon la complexité du projet. Pour un site vitrine standard, comptez environ 3 à 4 semaines. Pour un site e-commerce ou une application web plus complexe, le délai peut aller de 6 à 12 semaines. Nous définissons toujours un calendrier précis au début du projet."
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
          description="I-Tsika est une agence web créative fondée par des passionnés du numérique. Notre mission est d'aider les entreprises à se démarquer sur internet grâce à des solutions web innovantes, accessibles et performantes. Nous croyons que chaque projet mérite une approche sur mesure pour répondre parfaitement aux besoins uniques de chaque client."
        />
      </section>

      {/* Section Réalisations / Portfolio */}
      <section id="portfolio" className="py-24 bg-[#0c0c0a]">
        <ProjectsGrid 
          projects={projects.filter(p => p.featured)} 
          maxItems={4}
          showFilters={false}
        />
      </section>

      {/* Section Témoignages */}
      <section id="testimonials" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span
              className="text-[#fbc63d] uppercase tracking-wider text-sm font-medium mb-3 block"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ce que disent nos clients
            </motion.span>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Témoignages
            </motion.h2>
            <motion.p 
              className="text-[#d9d9d9] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Découvrez les avis de nos clients satisfaits et comment nos solutions ont transformé leur présence en ligne.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="bg-[#201f1b] p-8 rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-[#d9d9d9]">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-[#d9d9d9] italic mb-4">"{testimonial.content}"</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating ? "text-[#fbc63d]" : "text-[#7b7979]"
                      }`}
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Tarifs */}
      <section id="pricing" className="py-24 bg-[#0c0c0a]">
        <PricingTable plans={pricingPlans} />
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
