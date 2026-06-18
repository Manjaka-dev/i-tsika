"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Globe, Monitor, Smartphone, Layout, ShoppingCart, Wrench } from "lucide-react";

// Nouveaux services
const services = [
  {
    id: "web-apps",
    title: "Applications web sur mesure",
    description: "Développement de SaaS, portails clients, dashboards, systèmes de gestion interne — des applications web robustes et scalables adaptées à vos processus métier.",
    icon: <Globe className="w-10 h-10 text-[#fbc63d]" />,
    longDescription: "Nous concevons et développons des applications web complètes qui répondent précisément à vos besoins métier. Qu'il s'agisse d'un SaaS, d'un portail client, d'un tableau de bord analytique ou d'un système de gestion interne, chaque application est pensée pour être intuitive, performante et évolutive.",
    features: [
      "Architecture scalable et performante",
      "Interface utilisateur intuitive et responsive",
      "API RESTful et intégrations tierces",
      "Authentification et gestion des rôles",
      "Tableau de bord et analytics embarqués",
      "Déploiement et hébergement cloud"
    ],
    process: [
      "Analyse approfondie de vos processus métier",
      "Conception UX/UI et prototypage interactif",
      "Développement agile avec sprints itératifs",
      "Tests fonctionnels et de performance",
      "Déploiement progressif et formation"
    ]
  },
  {
    id: "desktop",
    title: "Logiciels desktop personnalisés",
    description: "Des applications desktop (Windows, Linux, macOS) sur mesure pour automatiser, gérer et optimiser vos opérations internes, sans dépendance à internet.",
    icon: <Monitor className="w-10 h-10 text-[#fbc63d]" />,
    longDescription: "Nous développons des logiciels desktop natifs ou cross-platform qui fonctionnent de manière autonome sur votre poste de travail. Idéal pour les outils métier nécessitant un accès hors ligne, une performance élevée ou une intégration avec du matériel spécifique.",
    features: [
      "Compatible Windows, Linux et macOS",
      "Fonctionnement hors ligne garanti",
      "Interface native fluide et réactive",
      "Base de données locale ou synchronisée",
      "Mises à jour automatiques",
      "Intégration avec vos outils existants"
    ],
    process: [
      "Définition des besoins et contraintes techniques",
      "Choix de l'architecture (Electron, Tauri, natif)",
      "Développement et tests multi-plateformes",
      "Installation et configuration sur vos postes",
      "Formation et documentation utilisateur"
    ]
  },
  {
    id: "mobile",
    title: "Applications mobiles",
    description: "Conception et développement d'apps iOS et Android natives ou cross-platform (React Native / Flutter) centrées sur l'expérience utilisateur.",
    icon: <Smartphone className="w-10 h-10 text-[#fbc63d]" />,
    longDescription: "Nous créons des applications mobiles qui offrent une expérience utilisateur exceptionnelle sur iOS et Android. Notre approche cross-platform permet de réduire les coûts tout en garantissant une qualité native sur chaque plateforme.",
    features: [
      "Applications iOS et Android",
      "Cross-platform (React Native / Flutter)",
      "UX mobile-first optimisée",
      "Notifications push et temps réel",
      "Mode hors ligne et synchronisation",
      "Publication sur App Store et Google Play"
    ],
    process: [
      "Étude de marché et analyse des besoins",
      "Design UX/UI mobile-first",
      "Développement cross-platform",
      "Tests sur appareils réels",
      "Publication et suivi post-lancement"
    ]
  },
  {
    id: "site-vitrine",
    title: "Sites vitrines & landing pages",
    description: "Des sites modernes, rapides et bien référencés pour asseoir votre crédibilité en ligne et convertir vos visiteurs en clients.",
    icon: <Layout className="w-10 h-10 text-[#fbc63d]" />,
    longDescription: "Votre site web est souvent le premier contact avec vos clients potentiels. Nous créons des sites vitrines élégants et des landing pages optimisées pour la conversion, avec un design moderne qui reflète l'identité de votre marque.",
    features: [
      "Design responsive et moderne",
      "Optimisation SEO avancée",
      "Temps de chargement ultra-rapide",
      "Formulaires de contact et intégrations",
      "Interface d'administration simple",
      "Analytics et suivi des performances"
    ],
    process: [
      "Analyse de vos besoins et benchmarking",
      "Conception de maquettes et prototypes",
      "Développement avec les dernières technologies",
      "Optimisation SEO et performance",
      "Mise en ligne et formation"
    ]
  },
  {
    id: "e-commerce",
    title: "E-commerce",
    description: "Des boutiques en ligne performantes avec gestion de produits, paiement sécurisé et suivi des commandes.",
    icon: <ShoppingCart className="w-10 h-10 text-[#fbc63d]" />,
    longDescription: "Nous développons des plateformes e-commerce complètes et sécurisées, conçues pour maximiser vos ventes en ligne. De la gestion du catalogue à l'intégration des paiements, chaque aspect est optimisé pour offrir une expérience d'achat fluide.",
    features: [
      "Catalogue produits dynamique",
      "Paiement sécurisé multi-méthodes",
      "Gestion des stocks et commandes",
      "Système de promotions et codes promo",
      "Compatible mobile money (Madagascar)",
      "Tableau de bord vendeur"
    ],
    process: [
      "Analyse de votre marché et besoins e-commerce",
      "Architecture de la boutique et parcours d'achat",
      "Développement de la plateforme",
      "Intégration des méthodes de paiement",
      "Tests de sécurité et lancement"
    ]
  },
  {
    id: "maintenance",
    title: "Maintenance & support",
    description: "Suivi technique, mises à jour, corrections de bugs et monitoring de vos applications en production.",
    icon: <Wrench className="w-10 h-10 text-[#fbc63d]" />,
    longDescription: "La maintenance régulière est essentielle pour garantir la sécurité, la performance et la pérennité de vos applications. Nous proposons des contrats de maintenance adaptés pour vous accompagner dans la durée.",
    features: [
      "Mises à jour régulières et sécurité",
      "Sauvegardes automatiques",
      "Monitoring et alertes 24/7",
      "Correctifs de bugs prioritaires",
      "Support technique réactif",
      "Rapports de performance mensuels"
    ],
    process: [
      "Audit initial de votre application",
      "Mise en place du monitoring",
      "Planning de maintenance préventive",
      "Interventions techniques selon besoins",
      "Rapports et recommandations"
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
              Des solutions numériques sur mesure pour tous vos besoins :
              applications web, desktop, mobiles, sites vitrines et e-commerce.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services overview grid */}
      <section className="py-16 bg-[#070602]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.a
                key={service.id}
                href={`#${service.id}`}
                className="bg-[#201f1b]/40 p-8 rounded-2xl border border-[#fbc63d]/5 hover:border-[#fbc63d]/20 transition-all duration-300 hover:bg-[#201f1b] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#fbc63d]/5 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="bg-[#fbc63d]/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#fbc63d]/20 group-hover:scale-110 transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#fbc63d] transition-colors">
                  {service.title}
                </h3>
                <p className="text-[#d9d9d9] text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.a>
            ))}
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
                          {service.icon}
                        </div>
                        <h2 className="text-3xl font-bold mb-6 text-white">
                          {service.title}
                        </h2>
                        <p className="text-[#d9d9d9] mb-6">
                          {service.description}
                        </p>
                      </div>
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
                          <div className="bg-[#fbc63d] text-[#070602] w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-medium text-sm">
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
            Contactez-nous dès aujourd&apos;hui pour discuter de votre projet et obtenir un devis personnalisé.
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
