"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Send, AlertCircle } from "lucide-react";
import Notification from "@/components/ui/notification";

// Types
interface FormData {
  // Step 1
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  // Step 2
  projectType: string;
  projectTypeOther: string;
  description: string;
  features: string[];
  featuresOther: string;
  // Step 3
  budget: string;
  deadline: string;
  hasSpecification: string;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  projectType: "",
  projectTypeOther: "",
  description: "",
  features: [],
  featuresOther: "",
  budget: "",
  deadline: "",
  hasSpecification: "",
};

const projectTypes = [
  "Application web (SaaS, portail, dashboard)",
  "Site vitrine / landing page",
  "E-commerce",
  "Application desktop (Windows/Linux/Mac)",
  "Application mobile (iOS/Android)",
  "Logiciel métier sur mesure",
  "Autre",
];

const featureOptions = [
  "Authentification utilisateur",
  "Base de données / back-end",
  "Tableau de bord / analytics",
  "Paiement en ligne",
  "API / intégrations tierces",
  "Interface admin",
  "Autre",
];

const budgetOptions = [
  "Moins de 500 000 Ar",
  "500 000 – 2 000 000 Ar",
  "2 000 000 – 5 000 000 Ar",
  "Plus de 5 000 000 Ar",
  "À définir ensemble",
];

const deadlineOptions = [
  "Moins d'1 mois",
  "1 à 3 mois",
  "3 à 6 mois",
  "Plus de 6 mois",
  "Flexible / à discuter",
];

export default function DevisPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [notification, setNotification] = useState({
    visible: false,
    type: "success" as "success" | "error" | "warning" | "info",
    title: "",
    message: "",
  });

  const totalSteps = 4;

  // Validation par étape
  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "Le prénom est requis";
      if (!formData.lastName.trim()) newErrors.lastName = "Le nom est requis";
      if (!formData.email.trim()) {
        newErrors.email = "L'email est requis";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Format d'email invalide";
      }
    }

    if (step === 2) {
      if (!formData.projectType) newErrors.projectType = "Sélectionnez un type de projet";
      if (formData.projectType === "Autre" && !formData.projectTypeOther.trim()) {
        newErrors.projectTypeOther = "Précisez le type de projet";
      }
      if (!formData.description.trim()) {
        newErrors.description = "La description est requise";
      } else if (formData.description.trim().length < 10) {
        newErrors.description = `Minimum 100 caractères (${formData.description.trim().length}/100)`;
      }
    }

    if (step === 3) {
      if (!formData.budget) newErrors.budget = "Sélectionnez un budget";
      if (!formData.deadline) newErrors.deadline = "Sélectionnez un délai";
      if (!formData.hasSpecification) newErrors.hasSpecification = "Cette question est requise";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) {
      setCurrentStep(3);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "quote",
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          projectType: formData.projectType === "Autre" ? formData.projectTypeOther : formData.projectType,
          description: formData.description,
          features: formData.features.map(f => f === "Autre" ? formData.featuresOther : f).filter(Boolean),
          budget: formData.budget,
          deadline: formData.deadline,
          hasSpecification: formData.hasSpecification,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
      } else {
        throw new Error(result.error || "Erreur lors de l'envoi");
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      const isConfigError = errorMsg.toLowerCase().includes("configuration") || errorMsg.toLowerCase().includes("admin");

      setNotification({
        visible: true,
        type: "error",
        title: isConfigError ? "Service temporairement indisponible" : "Erreur d'envoi",
        message: isConfigError
          ? "Le service de messagerie est actuellement indisponible. Veuillez nous contacter directement via contact@i-tsika.site."
          : "Une erreur s'est produite lors de l'envoi. Veuillez réessayer plus tard.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rendu des étapes
  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-2">Informations générales</h3>
      <p className="text-[#7b7979] text-sm mb-6">Dites-nous qui vous êtes pour que nous puissions vous contacter.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium mb-2 text-[#d9d9d9]">
            Nom <span className="text-[#fbc63d]">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            placeholder="Votre nom"
            className={`w-full p-4 bg-[#0c0c0a] border ${errors.lastName ? "border-red-500" : "border-[#7b7979]/30"} rounded-xl text-white placeholder-[#7b7979] focus:border-[#fbc63d] focus:outline-none focus:ring-2 focus:ring-[#fbc63d]/20 transition-all`}
          />
          {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
        </div>
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium mb-2 text-[#d9d9d9]">
            Prénom <span className="text-[#fbc63d]">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            placeholder="Votre prénom"
            className={`w-full p-4 bg-[#0c0c0a] border ${errors.firstName ? "border-red-500" : "border-[#7b7979]/30"} rounded-xl text-white placeholder-[#7b7979] focus:border-[#fbc63d] focus:outline-none focus:ring-2 focus:ring-[#fbc63d]/20 transition-all`}
          />
          {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2 text-[#d9d9d9]">
          Email <span className="text-[#fbc63d]">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="votre@email.com"
          className={`w-full p-4 bg-[#0c0c0a] border ${errors.email ? "border-red-500" : "border-[#7b7979]/30"} rounded-xl text-white placeholder-[#7b7979] focus:border-[#fbc63d] focus:outline-none focus:ring-2 focus:ring-[#fbc63d]/20 transition-all`}
        />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2 text-[#d9d9d9]">
            Téléphone <span className="text-[#7b7979] text-xs">(optionnel)</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+261 XX XX XXX XX"
            className="w-full p-4 bg-[#0c0c0a] border border-[#7b7979]/30 rounded-xl text-white placeholder-[#7b7979] focus:border-[#fbc63d] focus:outline-none focus:ring-2 focus:ring-[#fbc63d]/20 transition-all"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-2 text-[#d9d9d9]">
            Entreprise <span className="text-[#7b7979] text-xs">(optionnel)</span>
          </label>
          <input
            id="company"
            type="text"
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
            placeholder="Nom de votre entreprise"
            className="w-full p-4 bg-[#0c0c0a] border border-[#7b7979]/30 rounded-xl text-white placeholder-[#7b7979] focus:border-[#fbc63d] focus:outline-none focus:ring-2 focus:ring-[#fbc63d]/20 transition-all"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-2">Votre projet</h3>
      <p className="text-[#7b7979] text-sm mb-6">Décrivez-nous votre projet pour que nous puissions vous proposer la meilleure solution.</p>

      <div>
        <label className="block text-sm font-medium mb-3 text-[#d9d9d9]">
          Type de projet <span className="text-[#fbc63d]">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {projectTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleChange("projectType", type)}
              className={`text-left p-4 rounded-xl border transition-all text-sm ${
                formData.projectType === type
                  ? "border-[#fbc63d] bg-[#fbc63d]/10 text-[#fbc63d]"
                  : "border-[#7b7979]/30 bg-[#0c0c0a] text-[#d9d9d9] hover:border-[#fbc63d]/50"
              }`}
            >
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full border-2 mr-3 flex-shrink-0 ${
                  formData.projectType === type ? "border-[#fbc63d] bg-[#fbc63d]" : "border-[#7b7979]"
                }`}>
                  {formData.projectType === type && (
                    <div className="w-full h-full rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-[#070602] rounded-full" />
                    </div>
                  )}
                </div>
                {type}
              </div>
            </button>
          ))}
        </div>
        {errors.projectType && <p className="text-red-400 text-xs mt-2">{errors.projectType}</p>}
      </div>

      {formData.projectType === "Autre" && (
        <div>
          <label htmlFor="projectTypeOther" className="block text-sm font-medium mb-2 text-[#d9d9d9]">
            Précisez le type de projet <span className="text-[#fbc63d]">*</span>
          </label>
          <input
            id="projectTypeOther"
            type="text"
            value={formData.projectTypeOther}
            onChange={(e) => handleChange("projectTypeOther", e.target.value)}
            placeholder="Décrivez le type de projet"
            className={`w-full p-4 bg-[#0c0c0a] border ${errors.projectTypeOther ? "border-red-500" : "border-[#7b7979]/30"} rounded-xl text-white placeholder-[#7b7979] focus:border-[#fbc63d] focus:outline-none focus:ring-2 focus:ring-[#fbc63d]/20 transition-all`}
          />
          {errors.projectTypeOther && <p className="text-red-400 text-xs mt-1">{errors.projectTypeOther}</p>}
        </div>
      )}

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2 text-[#d9d9d9]">
          Description du projet <span className="text-[#fbc63d]">*</span>
          <span className="text-[#7b7979] text-xs ml-2">(min. 100 caractères)</span>
        </label>
        <textarea
          id="description"
          rows={5}
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Décrivez votre projet en détail : objectifs, public cible, fonctionnalités principales..."
          className={`w-full p-4 bg-[#0c0c0a] border ${errors.description ? "border-red-500" : "border-[#7b7979]/30"} rounded-xl text-white placeholder-[#7b7979] focus:border-[#fbc63d] focus:outline-none focus:ring-2 focus:ring-[#fbc63d]/20 resize-none transition-all`}
        />
        <div className="flex justify-between items-center mt-1">
          {errors.description ? (
            <p className="text-red-400 text-xs">{errors.description}</p>
          ) : (
            <span />
          )}
          <span className={`text-xs ${formData.description.trim().length >= 100 ? "text-[#fbc63d]" : "text-[#7b7979]"}`}>
            {formData.description.trim().length}/100
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-3 text-[#d9d9d9]">
          Fonctionnalités souhaitées <span className="text-[#7b7979] text-xs">(optionnel)</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {featureOptions.map((feature) => (
            <button
              key={feature}
              type="button"
              onClick={() => handleFeatureToggle(feature)}
              className={`text-left p-3 rounded-xl border transition-all text-sm ${
                formData.features.includes(feature)
                  ? "border-[#fbc63d] bg-[#fbc63d]/10 text-[#fbc63d]"
                  : "border-[#7b7979]/30 bg-[#0c0c0a] text-[#d9d9d9] hover:border-[#fbc63d]/50"
              }`}
            >
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded border-2 mr-3 flex-shrink-0 flex items-center justify-center ${
                  formData.features.includes(feature) ? "border-[#fbc63d] bg-[#fbc63d]" : "border-[#7b7979]"
                }`}>
                  {formData.features.includes(feature) && <Check className="w-3 h-3 text-[#070602]" />}
                </div>
                {feature}
              </div>
            </button>
          ))}
        </div>
      </div>

      {formData.features.includes("Autre") && (
        <div>
          <label htmlFor="featuresOther" className="block text-sm font-medium mb-2 text-[#d9d9d9]">
            Autres fonctionnalités
          </label>
          <input
            id="featuresOther"
            type="text"
            value={formData.featuresOther}
            onChange={(e) => handleChange("featuresOther", e.target.value)}
            placeholder="Décrivez les autres fonctionnalités"
            className="w-full p-4 bg-[#0c0c0a] border border-[#7b7979]/30 rounded-xl text-white placeholder-[#7b7979] focus:border-[#fbc63d] focus:outline-none focus:ring-2 focus:ring-[#fbc63d]/20 transition-all"
          />
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-2">Budget & délai</h3>
      <p className="text-[#7b7979] text-sm mb-6">Ces informations nous aident à calibrer notre proposition.</p>

      <div>
        <label className="block text-sm font-medium mb-3 text-[#d9d9d9]">
          Budget estimé <span className="text-[#fbc63d]">*</span>
        </label>
        <div className="space-y-3">
          {budgetOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleChange("budget", option)}
              className={`w-full text-left p-4 rounded-xl border transition-all text-sm ${
                formData.budget === option
                  ? "border-[#fbc63d] bg-[#fbc63d]/10 text-[#fbc63d]"
                  : "border-[#7b7979]/30 bg-[#0c0c0a] text-[#d9d9d9] hover:border-[#fbc63d]/50"
              }`}
            >
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full border-2 mr-3 flex-shrink-0 ${
                  formData.budget === option ? "border-[#fbc63d] bg-[#fbc63d]" : "border-[#7b7979]"
                }`}>
                  {formData.budget === option && (
                    <div className="w-full h-full rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-[#070602] rounded-full" />
                    </div>
                  )}
                </div>
                {option}
              </div>
            </button>
          ))}
        </div>
        {errors.budget && <p className="text-red-400 text-xs mt-2">{errors.budget}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-3 text-[#d9d9d9]">
          Délai souhaité <span className="text-[#fbc63d]">*</span>
        </label>
        <div className="space-y-3">
          {deadlineOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleChange("deadline", option)}
              className={`w-full text-left p-4 rounded-xl border transition-all text-sm ${
                formData.deadline === option
                  ? "border-[#fbc63d] bg-[#fbc63d]/10 text-[#fbc63d]"
                  : "border-[#7b7979]/30 bg-[#0c0c0a] text-[#d9d9d9] hover:border-[#fbc63d]/50"
              }`}
            >
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full border-2 mr-3 flex-shrink-0 ${
                  formData.deadline === option ? "border-[#fbc63d] bg-[#fbc63d]" : "border-[#7b7979]"
                }`}>
                  {formData.deadline === option && (
                    <div className="w-full h-full rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-[#070602] rounded-full" />
                    </div>
                  )}
                </div>
                {option}
              </div>
            </button>
          ))}
        </div>
        {errors.deadline && <p className="text-red-400 text-xs mt-2">{errors.deadline}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-3 text-[#d9d9d9]">
          Avez-vous un cahier des charges ? <span className="text-[#fbc63d]">*</span>
        </label>
        <div className="flex gap-4">
          {["Oui", "Non"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleChange("hasSpecification", option)}
              className={`flex-1 p-4 rounded-xl border transition-all text-sm text-center ${
                formData.hasSpecification === option
                  ? "border-[#fbc63d] bg-[#fbc63d]/10 text-[#fbc63d]"
                  : "border-[#7b7979]/30 bg-[#0c0c0a] text-[#d9d9d9] hover:border-[#fbc63d]/50"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        {errors.hasSpecification && <p className="text-red-400 text-xs mt-2">{errors.hasSpecification}</p>}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-2">Récapitulatif</h3>
      <p className="text-[#7b7979] text-sm mb-6">Vérifiez vos informations avant d&apos;envoyer votre demande.</p>

      <div className="space-y-4">
        {/* Contact */}
        <div className="bg-[#0c0c0a] rounded-xl p-5 border border-[#7b7979]/20">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-[#fbc63d] text-sm uppercase tracking-wider">Contact</h4>
            <button onClick={() => setCurrentStep(1)} className="text-[#fbc63d] text-xs hover:underline">Modifier</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <p><span className="text-[#7b7979]">Nom :</span> <span className="text-white">{formData.lastName} {formData.firstName}</span></p>
            <p><span className="text-[#7b7979]">Email :</span> <span className="text-white">{formData.email}</span></p>
            {formData.phone && <p><span className="text-[#7b7979]">Téléphone :</span> <span className="text-white">{formData.phone}</span></p>}
            {formData.company && <p><span className="text-[#7b7979]">Entreprise :</span> <span className="text-white">{formData.company}</span></p>}
          </div>
        </div>

        {/* Projet */}
        <div className="bg-[#0c0c0a] rounded-xl p-5 border border-[#7b7979]/20">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-[#fbc63d] text-sm uppercase tracking-wider">Projet</h4>
            <button onClick={() => setCurrentStep(2)} className="text-[#fbc63d] text-xs hover:underline">Modifier</button>
          </div>
          <div className="space-y-2 text-sm">
            <p><span className="text-[#7b7979]">Type :</span> <span className="text-white">{formData.projectType === "Autre" ? formData.projectTypeOther : formData.projectType}</span></p>
            <div>
              <span className="text-[#7b7979]">Description :</span>
              <p className="text-white mt-1 text-sm leading-relaxed">{formData.description}</p>
            </div>
            {formData.features.length > 0 && (
              <div>
                <span className="text-[#7b7979]">Fonctionnalités :</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {formData.features.map((f) => (
                    <span key={f} className="text-xs px-2.5 py-1 rounded-full bg-[#fbc63d]/10 text-[#fbc63d] border border-[#fbc63d]/20">
                      {f === "Autre" ? formData.featuresOther : f}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Budget & délai */}
        <div className="bg-[#0c0c0a] rounded-xl p-5 border border-[#7b7979]/20">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-[#fbc63d] text-sm uppercase tracking-wider">Budget & Délai</h4>
            <button onClick={() => setCurrentStep(3)} className="text-[#fbc63d] text-xs hover:underline">Modifier</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <p><span className="text-[#7b7979]">Budget :</span> <span className="text-white">{formData.budget}</span></p>
            <p><span className="text-[#7b7979]">Délai :</span> <span className="text-white">{formData.deadline}</span></p>
            <p><span className="text-[#7b7979]">Cahier des charges :</span> <span className="text-white">{formData.hasSpecification}</span></p>
          </div>
        </div>
      </div>
    </div>
  );

  // Rendu de la confirmation
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#070602] text-white flex items-center justify-center px-6">
        <motion.div
          className="max-w-lg text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-[#fbc63d]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-[#fbc63d]" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Demande envoyée avec succès !</h1>
          <p className="text-[#d9d9d9] mb-2">Merci pour votre demande de devis.</p>
          <p className="text-[#d9d9d9] mb-8">
            <span className="text-[#fbc63d] font-medium">Nous vous répondons sous 48h</span> avec une proposition personnalisée.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/">
              <Button className="bg-[#fbc63d] text-[#070602] hover:bg-[#ffbb00] px-8 py-3 rounded-full font-medium transition-all duration-300">
                Retour à l&apos;accueil
              </Button>
            </Link>
            <Button
              onClick={() => {
                setFormData(initialFormData);
                setCurrentStep(1);
                setIsSubmitted(false);
              }}
              className="bg-transparent border border-[#fbc63d] text-white hover:bg-[#fbc63d]/10 px-8 py-3 rounded-full font-medium transition-all duration-300"
            >
              Nouvelle demande
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070602] text-white">
      <Notification
        isVisible={notification.visible}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onClose={() => setNotification({ ...notification, visible: false })}
      />

      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="inline-flex items-center text-[#7b7979] hover:text-[#fbc63d] transition-colors text-sm mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l&apos;accueil
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Demander un <span className="text-[#fbc63d]">devis</span>
          </h1>
          <p className="text-[#d9d9d9]">
            Remplissez ce formulaire en quelques étapes pour recevoir une estimation personnalisée.
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    step < currentStep
                      ? "bg-[#fbc63d] text-[#070602]"
                      : step === currentStep
                      ? "bg-[#fbc63d]/20 text-[#fbc63d] border-2 border-[#fbc63d]"
                      : "bg-[#201f1b] text-[#7b7979]"
                  }`}
                >
                  {step < currentStep ? <Check className="w-5 h-5" /> : step}
                </div>
                {step < 4 && (
                  <div className={`hidden md:block w-16 lg:w-24 h-0.5 mx-2 transition-all duration-300 ${
                    step < currentStep ? "bg-[#fbc63d]" : "bg-[#201f1b]"
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-[#7b7979]">
            <span className={currentStep >= 1 ? "text-[#fbc63d]" : ""}>Contact</span>
            <span className={currentStep >= 2 ? "text-[#fbc63d]" : ""}>Projet</span>
            <span className={currentStep >= 3 ? "text-[#fbc63d]" : ""}>Budget</span>
            <span className={currentStep >= 4 ? "text-[#fbc63d]" : ""}>Envoi</span>
          </div>
        </div>

        {/* Form content */}
        <div className="bg-[#201f1b] rounded-2xl p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-10 pt-6 border-t border-[#7b7979]/20">
            {currentStep > 1 ? (
              <Button
                onClick={prevStep}
                className="bg-transparent border border-[#7b7979]/30 text-white hover:border-[#fbc63d] hover:text-[#fbc63d] px-6 py-3 rounded-full text-sm transition-all"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Précédent
              </Button>
            ) : (
              <div />
            )}

            {currentStep < totalSteps ? (
              <Button
                onClick={nextStep}
                className="bg-[#fbc63d] text-[#070602] hover:bg-[#ffbb00] px-6 py-3 rounded-full text-sm font-medium transition-all hover:scale-105"
              >
                Suivant
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-[#fbc63d] text-[#070602] hover:bg-[#ffbb00] px-8 py-3 rounded-full text-sm font-medium transition-all hover:scale-105 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-[#070602] mr-2" />
                    Envoi en cours...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="w-4 h-4 mr-2" />
                    Soumettre la demande
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Contact alternatif */}
        <div className="mt-8 text-center text-[#7b7979] text-sm">
          <p>
            Vous pouvez également nous contacter directement à{" "}
            <a href="mailto:contact@i-tsika.site" className="text-[#fbc63d] hover:underline">
              contact@i-tsika.site
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
