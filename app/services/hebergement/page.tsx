"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

export default function HebergementPage() {
  const service = {
    id: "hebergement",
    title: "Solutions d'Hébergement Web",
    description: "Des solutions d'hébergement fiables, sécurisées et performantes pour votre site web ou application.",
    icon: "/icons/server.svg",
    longDescription: "Nous proposons des services d'hébergement web de haute qualité adaptés à vos besoins spécifiques. Que vous ayez besoin d'un hébergement partagé économique ou d'un serveur dédié haute performance, nous vous offrons des solutions fiables avec une disponibilité maximale, une sécurité renforcée et un support technique réactif disponible 24/7.",
    features: [
      "Hébergement haute disponibilité (99,9% de temps de fonctionnement)",
      "Sauvegardes automatiques quotidiennes",
      "Protection avancée contre les cyberattaques",
      "Certificats SSL gratuits",
      "Support technique 24/7",
      "Migration gratuite de votre site existant"
    ],
    process: [
      "Analyse de vos besoins spécifiques",
      "Proposition de solutions adaptées",
      "Configuration de l'environnement d'hébergement",
      "Migration et déploiement",
      "Maintenance et surveillance continue"
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
              className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {service.longDescription}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main content section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Un hébergement fiable pour une présence en ligne sans faille</h2>
              <p className="text-gray-300 mb-8">
                La qualité de l'hébergement est fondamentale pour assurer une expérience utilisateur optimale. Nos solutions d'hébergement sont conçues pour garantir les meilleures performances, une sécurité maximale et une disponibilité constante de votre site web.
              </p>
              
              <div className="space-y-4 mb-8">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-3 mt-1">
                      <Check className="h-5 w-5 text-[#fbc63d]" />
                    </div>
                    <p className="text-gray-300">{feature}</p>
                  </div>
                ))}
              </div>
              
              <Button asChild className="bg-[#fbc63d] hover:bg-[#f0b722] text-black">
                <Link href="/contact">
                  Demander un devis <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/images/hebergement.webp"
                alt="Solutions d'hébergement web"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process section */}
      <section className="py-20 bg-[#0c0c0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Notre processus</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Nous suivons une méthodologie rigoureuse pour vous fournir une solution d'hébergement parfaitement adaptée à vos besoins spécifiques.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {service.process.map((step, index) => (
              <div key={index} className="bg-[#181812] p-6 rounded-lg">
                <div className="w-12 h-12 bg-[#fbc63d] text-black rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à héberger votre site ou application?</h2>
          <p className="text-gray-300 mb-8">
            Contactez-nous dès aujourd'hui pour discuter de vos besoins en hébergement web et découvrir comment nous pouvons vous aider à créer une présence en ligne fiable et performante.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button asChild className="bg-[#fbc63d] hover:bg-[#f0b722] text-black">
              <Link href="/contact">
                Nous contacter <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              <Link href="/services">
                Voir tous nos services
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
