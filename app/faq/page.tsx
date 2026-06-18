"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search, Globe, Monitor, Smartphone, Wrench, CreditCard, MessageCircle, ArrowRight } from "lucide-react";

// Catégories avec icônes
const categories = [
  { id: "all", label: "Tout", icon: null },
  { id: "general", label: "Général", icon: <MessageCircle className="w-4 h-4" /> },
  { id: "services", label: "Services", icon: <Globe className="w-4 h-4" /> },
  { id: "process", label: "Processus", icon: <Wrench className="w-4 h-4" /> },
  { id: "pricing", label: "Tarifs", icon: <CreditCard className="w-4 h-4" /> },
];

const faqItems = [
  // Général
  {
    id: "q1",
    category: "general",
    question: "Quels types de projets développez-vous ?",
    answer: "Nous développons tout type d'application numérique : applications web métier (SaaS, portails, dashboards), logiciels desktop pour Windows, Linux et macOS, applications mobiles iOS et Android, sites vitrines, landing pages et plateformes e-commerce. Chaque projet est abordé sur mesure, en fonction de vos besoins réels."
  },
  {
    id: "q2",
    category: "general",
    question: "Travaillez-vous avec des clients hors de Madagascar ?",
    answer: "Oui, nous travaillons à distance avec des clients à Madagascar et à l'international. Toute la communication peut se faire en ligne (email, visio, messagerie). Nous nous adaptons aux fuseaux horaires et proposons des points réguliers pour garantir un suivi optimal de votre projet."
  },
  {
    id: "q3",
    category: "general",
    question: "Puis-je vous confier un projet déjà commencé par quelqu'un d'autre ?",
    answer: "Oui, nous pouvons reprendre un projet existant. Nous commençons par un audit technique complet pour évaluer l'état du code, identifier les problèmes et proposer un plan d'action : poursuite du développement, refactoring partiel ou refonte complète selon la situation."
  },

  // Services
  {
    id: "q4",
    category: "services",
    question: "Quelle est la différence entre une application web et un logiciel desktop ?",
    answer: "Une application web fonctionne dans un navigateur et est accessible depuis n'importe quel appareil connecté à internet (ex : un CRM, un SaaS). Un logiciel desktop s'installe directement sur votre ordinateur (Windows, Mac, Linux) et peut fonctionner hors ligne — idéal pour les outils métier nécessitant des performances élevées ou l'accès à du matériel spécifique."
  },
  {
    id: "q5",
    category: "services",
    question: "Développez-vous des applications mobiles natives ou cross-platform ?",
    answer: "Nous proposons les deux approches selon vos besoins et votre budget. Le cross-platform (React Native, Flutter) permet de cibler iOS et Android avec un seul code, réduisant les coûts et les délais. Le natif offre des performances maximales et un accès complet aux fonctionnalités de chaque plateforme. Nous vous conseillons la meilleure option selon votre projet."
  },
  {
    id: "q6",
    category: "services",
    question: "Pouvez-vous développer un logiciel métier spécifique à mon activité ?",
    answer: "C'est notre spécialité. Nous concevons des logiciels sur mesure adaptés à vos processus : gestion de stock, facturation, planification, suivi de production, CRM interne… Nous analysons vos besoins en profondeur pour créer un outil qui s'intègre parfaitement à votre façon de travailler."
  },
  {
    id: "q7",
    category: "services",
    question: "Est-ce que je pourrai modifier mon application moi-même ?",
    answer: "Oui, si vous le souhaitez. Pour les applications web, nous intégrons une interface d'administration intuitive. Pour les logiciels desktop, nous prévoyons des options de configuration adaptées. Pour les applications mobiles, les mises à jour de contenu peuvent être gérées depuis un back-office web. Nous formons également votre équipe à l'utilisation de chaque outil."
  },

  // Processus
  {
    id: "q8",
    category: "process",
    question: "Comment se déroule un projet avec I-Tsika ?",
    answer: "Nous suivons un processus en 5 étapes : (1) Analyse approfondie de vos besoins et rédaction du cahier des charges, (2) Conception des maquettes UI/UX et validation, (3) Développement itératif avec démos régulières, (4) Phase de tests et corrections, (5) Livraison, déploiement et formation de votre équipe. Vous êtes impliqué et informé à chaque étape."
  },
  {
    id: "q9",
    category: "process",
    question: "Combien de temps faut-il pour livrer un projet ?",
    answer: "Les délais varient selon la complexité : un site vitrine prend 4 à 8 semaines, une application web métier 2 à 4 mois, un logiciel desktop 3 à 6 mois, et une application mobile 2 à 5 mois. Nous définissons un calendrier précis avec des jalons clairs dès le début du projet."
  },
  {
    id: "q10",
    category: "process",
    question: "Quelles technologies utilisez-vous ?",
    answer: "Nous sélectionnons soigneusement notre stack technique en fonction des besoins spécifiques de chaque projet. Ce choix sur mesure est guidé par vos objectifs d'affaires, les contraintes techniques (performances, sécurité, scalabilité) ainsi que les fonctionnalités requises. Qu'il s'agisse de solutions web, desktop ou mobiles, nous utilisons les technologies les plus pertinentes pour vous garantir une application robuste et pérenne."
  },

  // Tarifs
  {
    id: "q11",
    category: "pricing",
    question: "Quel est votre processus de tarification ?",
    answer: "Chaque projet est unique, donc chaque devis l'est aussi. Après un premier échange pour comprendre vos besoins, nous établissons un devis détaillé et transparent. Remplissez notre formulaire de devis en ligne pour obtenir une estimation personnalisée sous 48h, sans engagement."
  },
  {
    id: "q12",
    category: "pricing",
    question: "Proposez-vous de la maintenance après livraison ?",
    answer: "Oui. Nous proposons des contrats de maintenance mensuels adaptés à chaque type d'application : mises à jour de sécurité, corrections de bugs, sauvegardes, monitoring des performances et support technique. Pour les logiciels desktop, cela inclut aussi la gestion des mises à jour automatiques."
  },
  {
    id: "q13",
    category: "pricing",
    question: "Comment sont structurés les paiements ?",
    answer: "Nous fonctionnons généralement avec un acompte de 30% au démarrage, 40% à mi-parcours après validation des maquettes, et 30% à la livraison. Pour les projets importants, nous pouvons proposer des échéanciers personnalisés. Nous acceptons les virements bancaires et les paiements mobile money."
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const toggleQuestion = (id: string) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  const filteredFaqs = faqItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="bg-[#070602] text-white">
      {/* Hero section */}
      <section className="relative py-24 md:py-32 bg-[#0c0c0a] overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#fbc63d]/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <motion.span
              className="text-[#fbc63d] uppercase tracking-wider text-sm font-medium mb-3 block"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Centre d&apos;aide
            </motion.span>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Comment pouvons-nous <br className="hidden md:block" />
              <span className="text-[#fbc63d]">vous aider</span> ?
            </motion.h1>
            <motion.p
              className="text-[#d9d9d9] text-lg max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Trouvez rapidement les réponses à vos questions sur nos services, notre processus et nos tarifs.
            </motion.p>

            {/* Search bar */}
            <motion.div
              className="max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7b7979]" />
                <input
                  type="text"
                  placeholder="Rechercher une question..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-[#201f1b]/80 border border-[#7b7979]/20 rounded-2xl text-white placeholder-[#7b7979] focus:border-[#fbc63d] focus:outline-none focus:ring-2 focus:ring-[#fbc63d]/20 transition-all backdrop-blur-sm"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category filter + FAQ */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          {/* Category pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-[#fbc63d] text-[#070602] shadow-lg shadow-[#fbc63d]/20"
                    : "bg-[#201f1b]/60 text-[#d9d9d9] hover:bg-[#201f1b] hover:text-white border border-[#7b7979]/10"
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredFaqs.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                >
                  <div
                    className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                      openQuestion === item.id
                        ? "bg-gradient-to-br from-[#201f1b] to-[#1a1915] border border-[#fbc63d]/20 shadow-lg shadow-[#fbc63d]/5"
                        : "bg-[#201f1b]/50 border border-transparent hover:border-[#7b7979]/20 hover:bg-[#201f1b]/80"
                    }`}
                  >
                    <button
                      onClick={() => toggleQuestion(item.id)}
                      className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-[#fbc63d]/30 rounded-2xl group"
                      aria-expanded={openQuestion === item.id}
                      aria-controls={`faq-answer-${item.id}`}
                    >
                      <div className="flex items-center gap-4 pr-4">
                        <div className={`hidden md:flex w-10 h-10 rounded-xl items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                          openQuestion === item.id ? "bg-[#fbc63d]/20" : "bg-[#fbc63d]/5 group-hover:bg-[#fbc63d]/10"
                        }`}>
                          <span className={`text-sm font-bold transition-colors ${
                            openQuestion === item.id ? "text-[#fbc63d]" : "text-[#7b7979] group-hover:text-[#fbc63d]"
                          }`}>
                            {item.id.replace("q", "")}
                          </span>
                        </div>
                        <span className={`text-base md:text-lg font-medium transition-colors ${
                          openQuestion === item.id ? "text-[#fbc63d]" : "text-white"
                        }`}>
                          {item.question}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: openQuestion === item.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className={`w-5 h-5 transition-colors ${
                          openQuestion === item.id ? "text-[#fbc63d]" : "text-[#7b7979]"
                        }`} />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {openQuestion === item.id && (
                        <motion.div
                          id={`faq-answer-${item.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 md:pl-[4.5rem]">
                            <div className="bg-[#1a1915]/80 rounded-2xl p-6 border border-[#fbc63d]/10 relative overflow-hidden transition-colors shadow-inner">
                              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#fbc63d] to-[#fbc63d]/30" />
                              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#fbc63d]/[0.03] to-transparent pointer-events-none" />
                              <p className="text-[#d9d9d9] text-sm md:text-base leading-relaxed relative z-10">
                                {item.answer}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* No results */}
            {filteredFaqs.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Search className="w-12 h-12 text-[#7b7979]/30 mx-auto mb-4" />
                <p className="text-[#7b7979] text-lg mb-2">Aucun résultat trouvé</p>
                <p className="text-[#7b7979]/60 text-sm">Essayez avec d&apos;autres mots-clés ou consultez toutes les questions.</p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                  className="mt-4 text-[#fbc63d] text-sm hover:underline"
                >
                  Réinitialiser la recherche
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* CTA section */}
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
                Vous ne trouvez pas votre réponse ?
              </h2>
              <p className="text-[#d9d9d9] text-lg mb-8 max-w-xl mx-auto">
                Notre équipe est disponible pour répondre à toutes vos questions et discuter de votre projet.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button className="bg-[#fbc63d] text-[#070602] hover:bg-[#ffbb00] hover:scale-105 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300">
                    Nous contacter
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/devis">
                  <Button className="bg-transparent border border-[#fbc63d] text-white hover:bg-[#fbc63d]/10 hover:scale-105 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300">
                    Demander un devis
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
