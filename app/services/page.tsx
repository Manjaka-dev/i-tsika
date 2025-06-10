"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Données des services
const services = [
  {
    id: "site-vitrine",
    title: "Création de site vitrine",
    description: "Des sites élégants et personnalisés pour présenter votre entreprise et vos services à vos clients potentiels.",
    icon: "/icons/website.svg",
    longDescription: "Nous créons des sites vitrines sur mesure qui reflètent parfaitement l'identité et les valeurs de votre entreprise. Chaque site est conçu avec une attention particulière à l'expérience utilisateur, au design et à la performance pour garantir une présence en ligne professionnelle qui convertit les visiteurs en clients.",
    features: [
      "Design responsive adapté à tous les appareils",
      "Optimisation pour les moteurs de recherche (SEO)",
      "Intégration avec les réseaux sociaux",
      "Formulaires de contact personnalisés",
      "Analytics pour suivre les performances",
      "Hébergement et maintenance"
    ],
    process: [
      "Analyse des besoins et benchmarking",
      "Conception de maquettes et prototypes",
      "Développement du site",
      "Tests et optimisations",
      "Mise en ligne et formation"
    ]
  },
  {
    id: "e-commerce",
    title: "Création de site e-commerce",
    description: "Des boutiques en ligne performantes et sécurisées pour vendre vos produits ou services sur internet.",
    icon: "/icons/shopping-cart.svg",
    longDescription: "Nous développons des boutiques en ligne complètes et sécurisées qui permettent à votre entreprise de vendre efficacement en ligne. Nos solutions e-commerce sont conçues pour offrir une expérience d'achat fluide, avec une gestion facile des produits et une optimisation des taux de conversion.",
    features: [
      "Catalogue produits personnalisable",
      "Système de paiement sécurisé",
      "Gestion des stocks et commandes",
      "Paniers abandonnés et emails automatisés",
      "Optimisation pour la conversion",
      "Compatible mobile et tablette"
    ],
    process: [
      "Analyse de vos besoins e-commerce",
      "Architecture de la boutique et parcours d'achat",
      "Développement de la plateforme",
      "Intégration des méthodes de paiement",
      "Tests de sécurité et performance",
      "Formation à la gestion de la boutique"
    ]
  },
  {
    id: "refonte",
    title: "Refonte de site existant",
    description: "Modernisez votre présence en ligne avec une refonte complète de votre site pour améliorer son design et ses performances.",
    icon: "/icons/refresh.svg",
    longDescription: "Une refonte de site web va bien au-delà d'un simple changement d'apparence. Nous analysons les forces et faiblesses de votre site actuel pour créer une version améliorée qui répond mieux aux attentes de vos utilisateurs et aux objectifs de votre entreprise.",
    features: [
      "Audit complet de votre site existant",
      "Amélioration de l'expérience utilisateur",
      "Modernisation du design",
      "Optimisation des performances",
      "Mise à niveau technique et sécuritaire",
      "Migration de contenu"
    ],
    process: [
      "Audit et analyse de l'existant",
      "Définition des objectifs d'amélioration",
      "Conception de la nouvelle version",
      "Développement et migrations",
      "Tests et optimisations",
      "Formation et lancement"
    ]
  },
  {
    id: "maintenance",
    title: "Maintenance et support technique",
    description: "Un accompagnement régulier pour garder votre site à jour, sécurisé et performant dans le temps.",
    icon: "/icons/settings.svg",
    longDescription: "La maintenance régulière d'un site web est essentielle pour garantir sa sécurité, ses performances et sa pérennité. Nous proposons différentes formules de maintenance pour vous accompagner dans la durée et assurer le bon fonctionnement de votre site.",
    features: [
      "Mises à jour régulières des logiciels",
      "Sauvegardes automatiques",
      "Monitoring de sécurité",
      "Correctifs de bugs",
      "Support technique réactif",
      "Rapports de performance mensuels"
    ],
    process: [
      "Audit initial de votre site",
      "Mise en place des outils de monitoring",
      "Planning de maintenance préventive",
      "Interventions techniques selon besoins",
      "Rapports réguliers",
      "Recommandations d'améliorations"
    ]
  },
  {
    id: "seo",
    title: "Optimisation SEO / performance",
    description: "Améliorez votre visibilité sur les moteurs de recherche et optimisez les performances de votre site.",
    icon: "/icons/search.svg",
    longDescription: "Le référencement naturel (SEO) est crucial pour assurer la visibilité de votre site sur les moteurs de recherche. Nous mettons en œuvre des stratégies d'optimisation complètes pour améliorer votre positionnement et attirer un trafic qualifié vers votre site.",
    features: [
      "Audit SEO complet",
      "Optimisation du contenu",
      "Optimisation technique",
      "Amélioration de la vitesse de chargement",
      "Stratégie de mots-clés",
      "Suivi des performances"
    ],
    process: [
      "Analyse de votre positionnement actuel",
      "Recherche de mots-clés stratégiques",
      "Optimisations techniques on-page",
      "Création de contenu optimisé",
      "Mise en place de la stratégie de netlinking",
      "Suivi et ajustements"
    ]
  },
  {
    id: "hebergement",
    title: "Hébergement et nom de domaine",
    description: "Des solutions d'hébergement fiables et sécurisées, ainsi que la gestion de vos noms de domaine.",
    icon: "/icons/server.svg",
    longDescription: "Nous proposons des solutions d'hébergement web performantes et sécurisées, adaptées aux besoins spécifiques de votre site. Notre service inclut également la gestion de vos noms de domaine et la configuration des services associés.",
    features: [
      "Hébergement haute disponibilité",
      "Certificats SSL inclus",
      "Protection contre les attaques DDoS",
      "Sauvegardes quotidiennes",
      "Monitoring 24/7",
      "Gestion DNS professionnelle"
    ],
    process: [
      "Évaluation des besoins techniques",
      "Configuration du serveur",
      "Migration ou mise en place",
      "Tests de performance et sécurité",
      "Configuration des emails et services annexes",
      "Support continu"
    ]
  },
];

export default function ServicesPage() {
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
              Nos expertises
            </motion.span>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Nos services
            </motion.h1>
            <motion.p
              className="text-[#d9d9d9] text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Des solutions web sur mesure pour répondre à tous vos besoins numériques,
              de la création de site vitrine à l'optimisation SEO.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services details */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-32">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className="scroll-mt-24"
              >
                <motion.div
                  className={`grid md:grid-cols-2 gap-16 items-center ${
                    index % 2 === 1 ? "md:grid-flow-row-dense" : ""
                  }`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={index % 2 === 1 ? "md:order-1" : ""}>
                    <div className="bg-[#201f1b]/40 p-12 rounded-3xl relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#fbc63d]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10">
                        <div className="bg-[#fbc63d]/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-8">
                          <Image
                            src={service.icon}
                            alt={service.title}
                            width={40}
                            height={40}
                            className="group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <h2 className="text-3xl font-bold mb-6 text-white">
                          {service.title}
                        </h2>
                        <p className="text-[#d9d9d9] mb-6">
                          {service.description}
                        </p>
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#fbc63d]/10 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-6">Notre approche</h3>
                    <p className="text-[#d9d9d9] mb-8 leading-relaxed">
                      {service.longDescription}
                    </p>

                    <h4 className="text-xl font-medium mb-4">Ce que nous offrons</h4>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="text-[#fbc63d] mr-3 mt-1 flex-shrink-0" size={18} />
                          <span className="text-[#d9d9d9]">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <h4 className="text-xl font-medium mb-4">Notre processus</h4>
                    <ol className="space-y-4 mb-8">
                      {service.process.map((step, i) => (
                        <li key={i} className="flex items-start">
                          <div className="bg-[#fbc63d] text-[#070602] w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-medium">
                            {i + 1}
                          </div>
                          <span className="text-[#d9d9d9]">{step}</span>
                        </li>
                      ))}
                    </ol>

                    <Link href="/devis">
                      <Button className="bg-[#fbc63d] text-[#070602] hover:bg-[#ffbb00] hover:scale-105 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 mt-4">
                        Demander un devis
                      </Button>
                    </Link>
                  </div>
                </motion.div>

                {/* Divider */}
                {index < services.length - 1 && (
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-[#fbc63d]/20 to-transparent my-16"></div>
                )}
              </div>
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
            Prêt à démarrer votre projet ?
          </motion.h2>
          <motion.p
            className="text-lg mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Contactez-nous dès aujourd'hui pour discuter de votre projet et obtenir un devis personnalisé.
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
