"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Users, Target, BarChart3, Lightbulb, Heart } from "lucide-react";

export default function AboutPage() {
  // Données pour les valeurs
  const values = [
    {
      icon: <Lightbulb className="w-6 h-6 text-[#fbc63d]" />,
      title: "Innovation",
      description: "Nous restons à la pointe des technologies pour créer des solutions modernes et innovantes."
    },
    {
      icon: <Users className="w-6 h-6 text-[#fbc63d]" />,
      title: "Collaboration",
      description: "Nous travaillons en étroite collaboration avec nos clients pour comprendre leurs besoins et y répondre efficacement."
    },
    {
      icon: <Target className="w-6 h-6 text-[#fbc63d]" />,
      title: "Qualité",
      description: "Nous nous engageons à fournir un travail de haute qualité, avec une attention particulière aux détails."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-[#fbc63d]" />,
      title: "Performance",
      description: "Nous optimisons chaque projet pour garantir des performances optimales et une expérience utilisateur fluide."
    },
    {
      icon: <Heart className="w-6 h-6 text-[#fbc63d]" />,
      title: "Passion",
      description: "Nous sommes animés par une passion pour le développement web et le design qui se reflète dans chaque projet."
    }
  ];

  // Membres de l'équipe
  const team = [
    {
      name: "ANDRIANTSOA A. Manjaka",
      role: "Growth Marketer",
      image: "/manjaka.webp",
      bio: "Étudiant passionné en informatique, animé par la curiosité et déterminé à concevoir des solutions intelligentes et fiables grâce au travail d'équipe et à l'apprentissage continu."
    },
    {
      name: "ANDRIAMIHARISOA Aina Satamandresy",
      role: "Business Developer",
      image: "/aina_satamandresy.webp",
      bio: "Extraverti, dynamique et souriant, je m'adapte instantanément à tout interlocuteur grâce à une écoute active et une communication claire. Mon aisance en contexte client et mon sens de la négociation me permettent de créer des relations de confiance tout en défendant les intérêts techniques et commerciaux de l'entreprise."
    },
    {
      name: "ANDRIAMITENOVOLA Miaritsoa",
      role: "Lead developper",
      image: "/miaritsoa.webp",
      bio: "Lead developper passionné par l’innovation, j’œuvre à concrétiser les ambitions et à propulser les projets vers de nouveaux horizons. Véritable pont entre la vision des clients et des solutions tangibles et durables, je repense les approches existantes et guide les équipes vers l’excellence. Mon objectif : accompagner chaque projet sur le chemin de l’impact et du succès"
    }
  ];

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
              Notre histoire
            </motion.span>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              À propos de nous
            </motion.h1>
            <motion.p
              className="text-[#d9d9d9] text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Découvrez qui nous sommes, notre histoire et notre vision pour l'avenir.
            </motion.p>
          </div>
        </div>
      </section>

      {/* About section */}
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
                    alt="Notre équipe"
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
              <h2 className="text-3xl font-bold mb-6">Notre histoire</h2>
              <p className="text-[#d9d9d9] mb-6 leading-relaxed">
                I-Tsika est une agence web créative fondée par des passionnés du numérique en 2025. Notre mission est d'aider les entreprises à se démarquer sur internet grâce à des solutions web innovantes, accessibles et performantes.
              </p>
              <p className="text-[#d9d9d9] mb-8 leading-relaxed">
                Nous sommes une équipe d'étudiants en informatique réunis par la passion du développement web et du design. Notre objectif est de fournir des solutions de qualité professionnelle tout en continuant à nous former et à développer nos compétences.
              </p>
              
              <h3 className="text-xl font-semibold mb-4">Notre mission</h3>
              <p className="text-[#d9d9d9] mb-8 leading-relaxed">
                Aider les entreprises et entrepreneurs à développer leur présence en ligne grâce à des solutions web modernes et efficaces, tout en offrant un service personnalisé et à l'écoute des besoins de chacun.
              </p>

              <h3 className="text-xl font-semibold mb-4">Notre vision</h3>
              <p className="text-[#d9d9d9] leading-relaxed">
                Devenir une référence dans le domaine du développement web à Madagascar en alliant expertise technique, créativité et service client de qualité.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span
              className="text-[#fbc63d] uppercase tracking-wider text-sm font-medium mb-3 block"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ce qui nous définit
            </motion.span>
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Nos valeurs
            </motion.h2>
            <motion.p
              className="text-[#d9d9d9] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Ces valeurs fondamentales guident notre travail quotidien et nos interactions avec nos clients.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-[#201f1b]/40 p-8 rounded-2xl transition-all duration-300 hover:bg-[#201f1b] hover:shadow-lg hover:shadow-[#fbc63d]/10 hover:-translate-y-1 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-[#fbc63d]/10 w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#fbc63d]/20 transition-colors duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-[#fbc63d] transition-colors">
                  {value.title}
                </h3>
                <p className="text-[#d9d9d9] text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team section */}
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
              Notre équipe
            </motion.span>
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Les talents derrière I-Tsika
            </motion.h2>
            <motion.p
              className="text-[#d9d9d9] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Une équipe jeune et dynamique, passionnée par le web et le design.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="bg-[#201f1b]/40 p-6 rounded-2xl transition-all duration-300 hover:bg-[#201f1b] hover:shadow-lg hover:shadow-[#fbc63d]/10 hover:-translate-y-1 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-6 relative">
                  <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-2xl">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-[#fbc63d]/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold mb-1 group-hover:text-[#fbc63d] transition-colors">
                  {member.name}
                </h3>
                <p className="text-[#fbc63d] text-sm mb-4">{member.role}</p>
                <p className="text-[#d9d9d9] text-sm leading-relaxed">
                  {member.bio}
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
            Prêt à collaborer avec nous ?
          </motion.h2>
          <motion.p
            className="text-lg mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Contactez-nous dès aujourd'hui pour discuter de votre projet et découvrir comment nous pouvons vous aider à atteindre vos objectifs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/contact">
              <Button className="bg-[#070602] text-white hover:bg-[#201f1b] hover:scale-105 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300">
                Contactez-nous
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
