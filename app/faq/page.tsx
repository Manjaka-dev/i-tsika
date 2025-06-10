"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

// Données des FAQ organisées par catégories
const faqCategories = [
  {
    id: "general",
    name: "Questions générales",
    questions: [
      {
        id: "q1",
        question: "Combien de temps faut-il pour créer un site web ?",
        answer: "Le délai de création d'un site web dépend de sa complexité. Pour un site vitrine standard, comptez environ 3 à 4 semaines du briefing à la mise en ligne. Un site e-commerce ou une application web plus complexe peut nécessiter de 6 à 12 semaines. Nous établissons toujours un calendrier précis au début du projet pour vous donner une visibilité complète sur les étapes et les délais."
      },
      {
        id: "q2",
        question: "Comment se déroule le processus de création ?",
        answer: "Notre processus de création se déroule en plusieurs étapes : 1) Analyse de vos besoins et objectifs, 2) Proposition de maquettes et wireframes, 3) Développement du site, 4) Tests et ajustements, 5) Formation à l'utilisation, et 6) Mise en ligne. Tout au long du processus, nous maintenons une communication régulière pour vous tenir informé de l'avancement et recueillir vos retours."
      },
      {
        id: "q3",
        question: "Pourrai-je modifier moi-même le contenu de mon site ?",
        answer: "Absolument ! Nous développons tous nos sites avec des systèmes de gestion de contenu (CMS) intuitifs qui vous permettent de modifier facilement vos textes, images et autres contenus. Nous vous fournissons également une formation complète pour vous familiariser avec l'administration de votre site."
      },
      {
        id: "q4",
        question: "Est-ce que vous proposez aussi l'hébergement du site ?",
        answer: "Oui, nous proposons des solutions d'hébergement adaptées à tous les types de projets. Nos forfaits d'hébergement incluent la maintenance technique, les sauvegardes régulières, et un monitoring de la disponibilité. Nous pouvons également vous aider à choisir et configurer votre nom de domaine."
      }
    ]
  },
  {
    id: "technical",
    name: "Questions techniques",
    questions: [
      {
        id: "q5",
        question: "Qu'est-ce qu'un site responsive ?",
        answer: "Un site responsive est un site web dont le design s'adapte automatiquement à tous les appareils (ordinateurs, tablettes, smartphones) pour offrir une expérience utilisateur optimale. Tous nos sites sont créés avec une approche 'mobile-first', garantissant un affichage parfait sur tous les écrans."
      },
      {
        id: "q6",
        question: "Quelles technologies utilisez-vous pour développer vos sites ?",
        answer: "Nous utilisons les technologies les plus modernes et performantes comme React, Next.js, et Tailwind CSS pour le front-end, ainsi que des solutions robustes pour le back-end selon les besoins du projet. Notre stack technologique est constamment mise à jour pour garantir des sites rapides, sécurisés et évolutifs."
      },
      {
        id: "q7",
        question: "Comment assurez-vous la sécurité des sites web ?",
        answer: "La sécurité est une priorité pour nous. Nous mettons en œuvre les meilleures pratiques comme l'utilisation de certificats SSL, la protection contre les injections SQL et les attaques XSS, les mises à jour régulières des systèmes et des audits de sécurité périodiques. Nous proposons également des solutions de sauvegarde automatisées."
      },
      {
        id: "q8",
        question: "Comment optimisez-vous la vitesse de chargement des sites ?",
        answer: "Nous optimisons la vitesse de chargement par diverses techniques : compression et optimisation des images, minification des fichiers CSS et JavaScript, mise en cache, utilisation de CDN (Content Delivery Network), et lazy loading pour les contenus lourds. Nous veillons à ce que tous nos sites obtiennent d'excellents scores sur les outils de mesure de performance comme Google PageSpeed Insights."
      }
    ]
  },
  {
    id: "seo",
    name: "Référencement (SEO)",
    questions: [
      {
        id: "q9",
        question: "Comment améliorez-vous le référencement d'un site ?",
        answer: "Nous intégrons les bonnes pratiques SEO dès la conception du site : structure optimisée, balisage sémantique, méta-données précises, contenu de qualité, optimisation des images, et vitesse de chargement rapide. Nous pouvons également mettre en place une stratégie SEO plus complète avec recherche de mots-clés, création de contenu optimisé et suivi des performances."
      },
      {
        id: "q10",
        question: "Combien de temps faut-il pour voir des résultats en SEO ?",
        answer: "Le SEO est un travail de fond qui porte ses fruits sur le moyen et long terme. Les premiers résultats peuvent généralement être observés après 3 à 6 mois de travail régulier, mais une véritable amélioration du positionnement nécessite souvent 6 à 12 mois d'efforts continus. Nous vous fournissons des rapports réguliers pour suivre l'évolution des performances."
      },
      {
        id: "q11",
        question: "Qu'est-ce que le SEO local et en ai-je besoin ?",
        answer: "Le SEO local est l'optimisation de votre visibilité dans les résultats de recherche locaux. C'est essentiel pour les entreprises qui ont une présence physique ou qui servent une zone géographique spécifique. Nous pouvons vous aider à optimiser votre présence locale via Google My Business, les annuaires locaux, et les stratégies de contenu ciblées géographiquement."
      }
    ]
  },
  {
    id: "maintenance",
    name: "Maintenance et support",
    questions: [
      {
        id: "q12",
        question: "Proposez-vous un service de maintenance ?",
        answer: "Oui, nous proposons différentes formules de maintenance pour garder votre site à jour, sécurisé et performant. Ces formules incluent les mises à jour techniques, les sauvegardes régulières, la surveillance de la sécurité et un support en cas de problème. Nous proposons des contrats mensuels ou annuels selon vos besoins."
      },
      {
        id: "q13",
        question: "Que faire en cas de problème technique sur mon site ?",
        answer: "Nos clients sous contrat de maintenance bénéficient d'un support prioritaire avec des temps de réponse garantis. Selon la nature du problème, nous intervenons dans les délais prévus dans votre contrat. Pour les urgences, nous disposons d'un système d'astreinte qui permet une intervention rapide même en dehors des heures de bureau."
      },
      {
        id: "q14",
        question: "Puis-je faire évoluer mon site après sa mise en ligne ?",
        answer: "Absolument ! Nous concevons tous nos sites de façon modulaire pour permettre des évolutions futures. Que vous souhaitiez ajouter de nouvelles fonctionnalités, modifier le design ou intégrer de nouveaux contenus, votre site peut évoluer avec votre entreprise. Nous vous accompagnons dans ces évolutions pour garantir leur cohérence avec l'existant."
      }
    ]
  },
  {
    id: "pricing",
    name: "Tarifs et paiement",
    questions: [
      {
        id: "q15",
        question: "Comment sont calculés vos tarifs ?",
        answer: "Nos tarifs sont basés sur la complexité du projet, le nombre de fonctionnalités requises et le temps de développement estimé. Chaque projet étant unique, nous proposons toujours un devis personnalisé après avoir échangé sur vos besoins spécifiques. Nous travaillons en toute transparence et détaillons les différents postes de coûts."
      },
      {
        id: "q16",
        question: "Quelles sont les modalités de paiement ?",
        answer: "Nous demandons généralement un acompte de 30% à la signature du devis pour démarrer le projet, puis 40% à mi-parcours, et les 30% restants à la livraison. Pour les projets de maintenance, les paiements sont mensuels ou trimestriels selon la formule choisie. Nous acceptons les virements bancaires et les paiements par carte."
      },
      {
        id: "q17",
        question: "Proposez-vous des facilités de paiement ?",
        answer: "Oui, pour les projets importants, nous pouvons proposer des échéanciers de paiement adaptés à votre situation. N'hésitez pas à nous en parler lors de l'établissement du devis, nous trouverons une solution qui convient à votre budget et à vos contraintes financières."
      }
    ]
  }
];

export default function FAQPage() {
  // État pour gérer les questions ouvertes
  const [openQuestions, setOpenQuestions] = useState<{[key: string]: boolean}>({});
  
  // Toggle pour ouvrir/fermer une question
  const toggleQuestion = (questionId: string) => {
    setOpenQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
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
              Réponses à vos questions
            </motion.span>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Foire aux questions
            </motion.h1>
            <motion.p
              className="text-[#d9d9d9] text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Retrouvez les réponses aux questions les plus fréquemment posées sur nos services et notre façon de travailler.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Table of contents */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="bg-[#201f1b]/60 rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6">Sommaire</h2>
            <ul className="grid md:grid-cols-2 gap-4">
              {faqCategories.map((category) => (
                <li key={category.id}>
                  <a 
                    href={`#${category.id}`}
                    className="flex items-center text-[#fbc63d] hover:text-[#ffbb00] transition-colors"
                  >
                    <span className="mr-2">→</span>
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="space-y-16">
            {faqCategories.map((category, categoryIndex) => (
              <div key={category.id} id={category.id} className="scroll-mt-24">
                <motion.h2
                  className="text-3xl font-bold mb-8 flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="w-8 h-8 bg-[#fbc63d] text-[#070602] rounded-full flex items-center justify-center mr-4 text-sm font-bold">
                    {categoryIndex + 1}
                  </span>
                  {category.name}
                </motion.h2>
                
                <div className="space-y-4">
                  {category.questions.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="bg-[#201f1b] rounded-xl overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <button
                        className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
                        onClick={() => toggleQuestion(item.id)}
                      >
                        <h3 className="text-lg font-medium">{item.question}</h3>
                        <span className="flex-shrink-0 ml-4">
                          {openQuestions[item.id] ? (
                            <ChevronUp className="w-5 h-5 text-[#fbc63d]" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-[#fbc63d]" />
                          )}
                        </span>
                      </button>
                      <div 
                        className={`px-6 pb-6 transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${
                          openQuestions[item.id] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-[#d9d9d9]">{item.answer}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional question section */}
      <section className="py-24 bg-[#0c0c0a]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Vous ne trouvez pas la réponse à votre question ?
          </motion.h2>
          <motion.p
            className="text-[#d9d9d9] text-lg mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            N'hésitez pas à nous contacter directement, nous serons ravis de vous aider et de répondre à toutes vos questions.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/contact">
              <Button className="bg-[#fbc63d] text-[#070602] hover:bg-[#ffbb00] hover:scale-105 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300">
                Nous contacter
              </Button>
            </Link>
            <Link href="/devis">
              <Button className="bg-transparent border border-[#fbc63d] text-white hover:bg-[#fbc63d]/10 hover:scale-105 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300">
                Demander un devis
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
