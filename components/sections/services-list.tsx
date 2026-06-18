"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
}

interface ServicesListProps {
  services: Service[];
}

export default function ServicesList({ services }: ServicesListProps) {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-12 md:mb-16">
        <motion.span
          className="text-[#fbc63d] uppercase tracking-wider text-sm font-medium mb-3 block"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Ce que nous faisons
        </motion.span>
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Nos services
        </motion.h2>
        <motion.p
          className="text-[#d9d9d9] text-base md:text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Des solutions numériques complètes pour accompagner votre croissance.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <Link href={service.link} className="block h-full">
              <div className="h-full bg-[#201f1b]/40 rounded-2xl p-8 border border-[#fbc63d]/5 hover:border-[#fbc63d]/20 transition-all duration-500 hover:bg-[#201f1b] hover:-translate-y-1 hover:shadow-xl hover:shadow-[#fbc63d]/5 group">
                <div className="bg-[#fbc63d]/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#fbc63d]/20 group-hover:scale-110 transition-all duration-300">
                  <Image
                    src={service.icon}
                    alt=""
                    width={28}
                    height={28}
                    className="group-hover:scale-110 transition-transform duration-300"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#fbc63d] transition-colors">
                  {service.title}
                </h3>
                <p className="text-[#d9d9d9] text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <span className="inline-flex items-center text-[#fbc63d] text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  En savoir plus
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
