"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import ContactForm from "@/components/sections/contact-form";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Coordonnées de contact
  const contactInfo = {
    email: "contact@example.com",
    phone: "+33 6 12 34 56 78",
    address: "123 Avenue des Développeurs, 75000 Paris, France",
    hours: "Lun - Ven: 9h - 18h"
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
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
              Parlons de votre projet
            </motion.span>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Contactez-nous
            </motion.h1>
            <motion.p
              className="text-[#d9d9d9] text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Vous avez des questions ou vous souhaitez discuter de votre projet ? N'hésitez pas à nous contacter.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact info */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-3xl font-bold mb-10"
                variants={itemVariants}
              >
                Comment nous contacter
              </motion.h2>
              
              <div className="space-y-8">
                <motion.div 
                  className="flex items-start group"
                  variants={itemVariants}
                >
                  <div className="w-12 h-12 bg-[#201f1b] rounded-full flex items-center justify-center mr-6 flex-shrink-0 group-hover:bg-[#fbc63d]/20 transition-colors duration-300">
                    <Mail className="w-5 h-5 text-[#fbc63d]" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Email</h3>
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="text-[#d9d9d9] hover:text-[#fbc63d] transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start group"
                  variants={itemVariants}
                >
                  <div className="w-12 h-12 bg-[#201f1b] rounded-full flex items-center justify-center mr-6 flex-shrink-0 group-hover:bg-[#fbc63d]/20 transition-colors duration-300">
                    <Phone className="w-5 h-5 text-[#fbc63d]" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Téléphone</h3>
                    <a 
                      href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                      className="text-[#d9d9d9] hover:text-[#fbc63d] transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start group"
                  variants={itemVariants}
                >
                  <div className="w-12 h-12 bg-[#201f1b] rounded-full flex items-center justify-center mr-6 flex-shrink-0 group-hover:bg-[#fbc63d]/20 transition-colors duration-300">
                    <MapPin className="w-5 h-5 text-[#fbc63d]" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Adresse</h3>
                    <a 
                      href="https://maps.google.com/?q=123+Avenue+des+Développeurs+75000+Paris+France" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#d9d9d9] hover:text-[#fbc63d] transition-colors"
                    >
                      {contactInfo.address}
                    </a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start group"
                  variants={itemVariants}
                >
                  <div className="w-12 h-12 bg-[#201f1b] rounded-full flex items-center justify-center mr-6 flex-shrink-0 group-hover:bg-[#fbc63d]/20 transition-colors duration-300">
                    <Clock className="w-5 h-5 text-[#fbc63d]" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Horaires</h3>
                    <p className="text-[#d9d9d9]">
                      {contactInfo.hours}
                    </p>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="mt-12 p-8 bg-[#201f1b] rounded-2xl"
                variants={itemVariants}
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Send className="w-5 h-5 text-[#fbc63d] mr-2" />
                  Besoin d'un devis ?
                </h3>
                <p className="text-[#d9d9d9] mb-6">
                  Pour toute demande de devis, n'hésitez pas à utiliser notre formulaire dédié. Nous vous répondrons dans les 24 heures ouvrées.
                </p>
                <Link href="/devis">
                  <Button className="bg-[#fbc63d] text-[#070602] hover:bg-[#ffbb00] hover:scale-105 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300">
                    Demander un devis gratuit
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-[#201f1b] p-8 rounded-2xl">
                {!formSubmitted ? (
                  <>
                    <h2 className="text-2xl font-bold mb-6">
                      Envoyez-nous un message
                    </h2>
                    <ContactForm onSubmitSuccess={() => setFormSubmitted(true)} />
                  </>
                ) : (
                  <div className="py-12 text-center">
                    <div className="w-20 h-20 bg-[#fbc63d]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-[#fbc63d]" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Message envoyé !</h2>
                    <p className="text-[#d9d9d9] mb-8">
                      Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
                    </p>
                    <Button 
                      onClick={() => setFormSubmitted(false)}
                      className="bg-[#201f1b] border border-[#fbc63d] text-white hover:bg-[#fbc63d] hover:text-[#070602] transition-colors duration-300"
                    >
                      Envoyer un autre message
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map section */}
      <section className="py-24 bg-[#0c0c0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl font-bold mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Venez nous rencontrer
            </motion.h2>
            <motion.p
              className="text-[#d9d9d9] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Nous serions ravis de vous accueillir dans nos locaux pour discuter de votre projet autour d'un café.
            </motion.p>
          </div>
          
          <motion.div
            className="rounded-2xl overflow-hidden h-[400px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9914410396734!2d2.292292615509614!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sChamp%20de%20Mars%2C%20Paris%2C%20France!5e0!3m2!1sen!2sus!4v1623252076996!5m2!1sen!2sus"
              style={{ border: 0, width: '100%', height: '100%' }}
              allowFullScreen={true}
              loading="lazy"
              title="Notre adresse"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
