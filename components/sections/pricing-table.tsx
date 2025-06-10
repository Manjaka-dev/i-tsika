"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  period?: string;
  features: PricingFeature[];
  isFeatured?: boolean;
  ctaText: string;
  ctaLink: string;
}

interface PricingTableProps {
  title?: string;
  subtitle?: string;
  description?: string;
  plans: PricingPlan[];
  hasAnnualToggle?: boolean;
}

export default function PricingTable({
  title = "Nos tarifs",
  subtitle = "Offres transparentes",
  description = "Choisissez l'offre qui correspond le mieux à vos besoins et à votre budget.",
  plans,
  hasAnnualToggle = false,
}: PricingTableProps) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            className="text-[#fbc63d] uppercase tracking-wider text-sm font-medium mb-3 inline-block"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {subtitle}
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-[#d9d9d9] text-lg"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>

        {/* Pricing toggle (monthly/annual) - Optional */}
        {hasAnnualToggle && (
          <div className="flex justify-center mb-12">
            <div className="bg-[#201f1b] p-1 rounded-full inline-flex items-center">
              <button className="px-6 py-2 rounded-full text-white bg-[#fbc63d] text-sm font-medium">
                Mensuel
              </button>
              <button className="px-6 py-2 rounded-full text-white hover:bg-[#201f1b]/80 text-sm font-medium">
                Annuel <span className="text-xs opacity-70">(-15%)</span>
              </button>
            </div>
          </div>
        )}

        {/* Pricing plans */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`bg-[#201f1b] rounded-3xl p-8 ${
                plan.isFeatured
                  ? "border-2 border-[#fbc63d] relative lg:scale-105"
                  : "border border-[#7b7979]/30"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              {plan.isFeatured && (
                <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-[#fbc63d] text-[#070602] px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Populaire
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-[#d9d9d9] text-sm mb-6">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-[#d9d9d9] ml-2 text-sm">{plan.period}</span>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center ${
                      feature.included ? "text-white" : "text-[#7b7979]"
                    }`}
                  >
                    <Check
                      className={`w-5 h-5 mr-3 flex-shrink-0 ${
                        feature.included ? "text-[#fbc63d]" : "text-[#7b7979]"
                      }`}
                    />
                    <span className="text-sm">{feature.name}</span>
                  </div>
                ))}
              </div>

              <Link href={plan.ctaLink}>
                <Button
                  className={`w-full py-6 rounded-xl text-base transition-all duration-300 ${
                    plan.isFeatured
                      ? "bg-[#fbc63d] text-[#070602] hover:bg-[#ffbb00] hover:scale-105"
                      : "bg-transparent border border-white text-white hover:bg-white hover:text-[#070602]"
                  }`}
                >
                  {plan.ctaText}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Pricing note */}
        <div className="text-center mt-12 text-[#d9d9d9] text-sm">
          <p>
            Besoin d'une offre personnalisée ?{" "}
            <Link href="/contact" className="text-[#fbc63d] hover:underline">
              Contactez-nous
            </Link>{" "}
            pour discuter de votre projet.
          </p>
        </div>
      </div>
    </section>
  );
}
