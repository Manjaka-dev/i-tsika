"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

// Données des offres
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
      { name: "Design personnalisé", included: true },
      { name: "Formation à l'administration", included: true },
      { name: "Support technique (email)", included: true },
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
      { name: "Design personnalisé premium", included: true },
      { name: "Formation à l'administration", included: true },
      { name: "Support technique (email et téléphone)", included: true },
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
      { name: "Design personnalisé premium", included: true },
      { name: "Formation approfondie", included: true },
      { name: "Support technique prioritaire", included: true },
    ],
    isFeatured: false,
    ctaText: "Demander un devis",
    ctaLink: "/devis",
  },
];

// Services additionnels
const additionalServices = [
  {
    name: "Rédaction de contenu",
    description: "Textes optimisés pour le web et le référencement",
    price: "À partir de 60€ / page",
  },
  {
    name: "Photographie professionnelle",
    description: "Séance photo pour illustrer votre site",
    price: "À partir de 350€ / demi-journée",
  },
  {
    name: "Maintenance mensuelle",
    description: "Mises à jour, sauvegardes et support technique",
    price: "À partir de 90€ / mois",
  },
  {
    name: "Campagne SEO",
    description: "Optimisation mensuelle de votre référencement",
    price: "À partir de 300€ / mois",
  },
  {
    name: "Formation personnalisée",
    description: "Formation à l'administration de votre site",
    price: "150€ / heure",
  },
  {
    name: "Création de logo",
    description: "Design professionnel pour votre identité visuelle",
    price: "À partir de 400€",
  },
];

export default function PricingPage() {
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
              Tarification transparente
            </motion.span>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Nos offres
            </motion.h1>
            <motion.p
              className="text-[#d9d9d9] text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Des solutions adaptées à tous les budgets et à tous les besoins. 
              Chaque projet étant unique, ces tarifs sont indicatifs et peuvent être ajustés selon vos besoins spécifiques.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Pricing plans */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                className={`rounded-2xl overflow-hidden ${
                  plan.isFeatured
                    ? "border-2 border-[#fbc63d] relative z-10 transform md:-translate-y-4 bg-[#201f1b]"
                    : "border border-[#201f1b]/50 bg-[#201f1b]/40"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {plan.isFeatured && (
                  <div className="bg-[#fbc63d] text-[#070602] text-xs font-semibold uppercase tracking-wider py-2 text-center">
                    Recommandé
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-[#d9d9d9] text-sm mb-6">{plan.description}</p>
                  <div className="mb-8">
                    <span className="text-3xl font-bold text-[#fbc63d]">{plan.price}</span>
                    {plan.period && <span className="text-[#d9d9d9]">/{plan.period}</span>}
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start">
                        <div className="mt-0.5">
                          {feature.included ? (
                            <Check className="text-[#fbc63d] mr-3 flex-shrink-0" size={18} />
                          ) : (
                            <div className="w-[18px] h-[18px] rounded-full border border-[#7b7979] mr-3 flex-shrink-0"></div>
                          )}
                        </div>
                        <span className={feature.included ? "text-[#d9d9d9]" : "text-[#7b7979]"}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.ctaLink}>
                    <Button
                      className={`w-full ${
                        plan.isFeatured
                          ? "bg-[#fbc63d] text-[#070602] hover:bg-[#ffbb00]"
                          : "bg-[#201f1b] text-white hover:bg-[#fbc63d] hover:text-[#070602]"
                      } transition-colors duration-300`}
                    >
                      {plan.ctaText}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional services */}
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
              Compléments
            </motion.span>
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Services additionnels
            </motion.h2>
            <motion.p
              className="text-[#d9d9d9] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Personnalisez votre projet avec ces services complémentaires pour répondre parfaitement à vos besoins.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                className="bg-[#201f1b]/40 p-6 rounded-xl hover:bg-[#201f1b] transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-[#d9d9d9] text-sm mb-4">{service.description}</p>
                <p className="text-[#fbc63d] font-medium">{service.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span
              className="text-[#fbc63d] uppercase tracking-wider text-sm font-medium mb-3 block"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Questions fréquentes
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Tarifs et modalités
            </motion.h2>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "Comment sont calculés vos tarifs ?",
                answer: "Nos tarifs sont basés sur la complexité du projet, le nombre de fonctionnalités requises et le temps de développement estimé. Chaque projet étant unique, nous proposons toujours un devis personnalisé après avoir échangé sur vos besoins spécifiques."
              },
              {
                question: "Quelles sont les modalités de paiement ?",
                answer: "Nous demandons généralement un acompte de 30% à la signature du devis pour démarrer le projet, puis 40% à mi-parcours, et les 30% restants à la livraison. Pour les projets de maintenance, les paiements sont mensuels ou trimestriels selon la formule choisie."
              },
              {
                question: "Est-ce que les prix incluent l'hébergement ?",
                answer: "Oui, nos forfaits incluent l'hébergement pour la première année. Au-delà, nous proposons des formules d'hébergement adaptées à vos besoins à partir de 15€/mois, incluant la maintenance de base et les sauvegardes."
              },
              {
                question: "Proposez-vous des tarifs spéciaux pour les associations ?",
                answer: "Oui, nous proposons des conditions avantageuses pour les associations et les organismes à but non lucratif. N'hésitez pas à nous contacter pour discuter de votre projet associatif."
              }
            ].map((faq, index) => (
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
            Besoin d'une solution sur mesure ?
          </motion.h2>
          <motion.p
            className="text-lg mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Nos offres standards ne correspondent pas exactement à vos besoins ? Pas de problème ! 
            Contactez-nous pour discuter de votre projet spécifique et obtenir un devis personnalisé.
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
