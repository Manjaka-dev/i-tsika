"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

export default function SeoPage() {
  const service = {
    id: "seo",
    title: "Optimisation SEO / performance",
    description: "Améliorez votre visibilité sur les moteurs de recherche et optimisez les performances de votre site.",
    icon: "/icons/search.svg",
    longDescription: "Nous proposons des services complets d'optimisation pour les moteurs de recherche (SEO) et d'amélioration des performances techniques de votre site. Notre objectif est d'augmenter votre visibilité en ligne, d'attirer un trafic qualifié et d'offrir une expérience utilisateur optimale qui favorise les conversions.",
    features: [
      "Audit SEO complet",
      "Optimisation du contenu",
      "Optimisation technique",
      "Amélioration de la vitesse de chargement",
      "Stratégie de mots-clés",
      "Rapports d'analyse réguliers"
    ],
    process: [
      "Audit et analyse initiale",
      "Stratégie SEO personnalisée",
      "Optimisations techniques",
      "Création et optimisation de contenu",
      "Suivi et amélioration continue"
    ]
  };

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
              Nos services
            </motion.span>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {service.title}
            </motion.h1>
            <motion.p
              className="text-[#d9d9d9] text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {service.description}
            </motion.p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-64 -right-64 w-96 h-96 bg-[#fbc63d]/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-64 -left-64 w-96 h-96 bg-[#fbc63d]/5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Main content section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="rounded-3xl overflow-hidden">
                  <Image
                    src="/placeholder.jpg"
                    alt={service.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-[#fbc63d]/10 rounded-full blur-xl z-0"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#fbc63d]/5 rounded-full blur-lg z-0"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6">Présentation du service</h2>
              <p className="text-[#d9d9d9] mb-6 leading-relaxed">
                {service.longDescription}
              </p>

              <h3 className="text-xl font-semibold mb-4">Ce que nous offrons</h3>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="text-[#fbc63d] mr-3 mt-1 flex-shrink-0" size={18} />
                    <span className="text-[#d9d9d9]">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/devis">
                <Button className="bg-[#fbc63d] text-[#070602] hover:bg-[#ffbb00] hover:scale-105 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 mt-4">
                  Demander un devis
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process section */}
      <section className="py-24 bg-[#0c0c0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span
              className="text-[#fbc63d] uppercase tracking-wider text-sm font-medium mb-3 block"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Notre processus
            </motion.span>
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Comment nous travaillons
            </motion.h2>
            <motion.p
              className="text-[#d9d9d9] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Une méthodologie éprouvée pour améliorer votre référencement et vos performances
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {service.process.map((step, index) => (
              <motion.div
                key={index}
                className="bg-[#201f1b]/40 p-8 rounded-2xl transition-all duration-300 hover:bg-[#201f1b] hover:shadow-lg hover:shadow-[#fbc63d]/10 hover:-translate-y-1 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-[#fbc63d] text-[#070602] w-12 h-12 rounded-full flex items-center justify-center mb-6 font-bold text-xl">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-[#fbc63d] transition-colors">
                  {step}
                </h3>
                <p className="text-[#d9d9d9] text-sm leading-relaxed">
                  {getStepDescription(index)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-[#fbc63d] text-[#070602]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Prêt à améliorer votre visibilité en ligne ?
          </motion.h2>
          <motion.p
            className="text-lg mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Contactez-nous dès aujourd'hui pour discuter de votre stratégie SEO et obtenir un devis personnalisé.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link href="/devis">
              <Button className="bg-[#070602] text-white hover:bg-[#201f1b] hover:scale-105 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300">
                Demander un devis
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="bg-transparent border border-[#070602] text-[#070602] hover:bg-[#070602]/10 hover:scale-105 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300">
                Nous contacter
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function getStepDescription(index: number) {
  const descriptions = [
    "Nous analysons en profondeur votre site, sa structure, son contenu et sa position actuelle sur les moteurs de recherche.",
    "Nous élaborons une stratégie SEO personnalisée basée sur vos objectifs commerciaux et une recherche approfondie de mots-clés.",
    "Nous optimisons les aspects techniques de votre site : vitesse, structure, balisage, compatibilité mobile, etc.",
    "Nous créons et optimisons du contenu de qualité qui répond aux attentes des utilisateurs et des moteurs de recherche.",
    "Nous suivons les performances de votre site et ajustons continuellement notre stratégie pour améliorer constamment les résultats."
  ];
  
  return descriptions[index];
}
