"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import SocialButton from "@/components/ui/social-button";
import Notification from "@/components/ui/notification";

export default function DevisPage() {
  const [formData, setFormData] = useState({
    projectName: "",
    domain: "",
    email: "",
    description: "",
    budget: ""
  });
  const [formErrors, setFormErrors] = useState({
    projectName: "",
    domain: "",
    email: "",
    description: "",
    budget: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    visible: false,
    type: "success" as "success" | "error" | "warning" | "info",
    title: "",
    message: ""
  });

  const validateForm = () => {
    let isValid = true;
    const errors = {
      projectName: "",
      domain: "",
      email: "",
      description: "",
      budget: ""
    };

    // Validation du nom du projet
    if (!formData.projectName.trim()) {
      errors.projectName = "Le nom du projet est requis";
      isValid = false;
    } else if (formData.projectName.trim().length < 2) {
      errors.projectName = "Le nom du projet doit contenir au moins 2 caractères";
      isValid = false;
    }

    // Validation du domaine
    if (!formData.domain.trim()) {
      errors.domain = "Le domaine est requis";
      isValid = false;
    }
    
    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "L'email est requis";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Format d'email invalide";
      isValid = false;
    }

    // Validation de la description
    if (!formData.description.trim()) {
      errors.description = "La description est requise";
      isValid = false;
    } else if (formData.description.trim().length < 20) {
      errors.description = "La description doit contenir au moins 20 caractères";
      isValid = false;
    }

    // Validation du budget
    if (!formData.budget.trim()) {
      errors.budget = "Le budget est requis";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validation en temps réel pour une meilleure expérience utilisateur
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setFormSubmitting(true);
      
      try {
        // Envoi du formulaire via notre API centralisée
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'quote',
            projectName: formData.projectName,
            domain: formData.domain,
            email: formData.email,
            description: formData.description,
            budget: formData.budget
          }),
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
          setFormSubmitting(false);
          setFormSubmitted(true);
          // Réinitialiser le formulaire
          setFormData({ projectName: "", domain: "", email: "", description: "", budget: "" });
        } else {
          throw new Error(result.error || "Échec de l'envoi de la demande de devis");
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi de la demande de devis:", error);
        setFormSubmitting(false);
        setNotification({
          visible: true,
          type: "error",
          title: "Erreur d'envoi",
          message: "Une erreur s'est produite lors de l'envoi de votre demande. Veuillez réessayer plus tard."
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#070602] text-[#ffffff]">
      {/* Notification */}
      <Notification
        isVisible={notification.visible}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onClose={() => setNotification({ ...notification, visible: false })}
      />
      
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center space-x-2 text-white hover:text-[#fbc63d] transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Retour à l'accueil</span>
        </Link>
      </nav>

      <div className="px-6 py-16 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-in-left">
          Demander un <span className="text-[#fbc63d]">devis</span>
        </h1>
        <p className="text-[#d9d9d9] mb-12 animate-fade-in">
          Complétez le formulaire ci-dessous pour nous permettre de comprendre votre projet et de vous proposer un devis adapté à vos besoins.
        </p>

        <div className="bg-[#201f1b] rounded-3xl p-8 animate-slide-in-bottom">
          {formSubmitted ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-4 animate-bounce-in">
              <div className="w-16 h-16 bg-[#8bc34a] rounded-full flex items-center justify-center mb-4 animate-pulse-slow">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white animate-slide-in-top" style={{ animationDelay: '200ms' }}>Demande envoyée !</h3>
              <p className="text-[#d9d9d9] text-center animate-slide-in-top" style={{ animationDelay: '400ms' }}>
                Merci pour votre intérêt. Nous étudierons votre projet et vous contacterons rapidement avec une proposition adaptée.
              </p>
              <Button 
                className="mt-4 bg-transparent hover:bg-[#fbc63d] text-[#fbc63d] hover:text-[#070602] border border-[#fbc63d] py-2 px-6 rounded-full font-medium transition-all duration-300 animate-slide-in-bottom"
                onClick={() => setFormSubmitted(false)}
                style={{ animationDelay: '600ms' }}
              >
                Faire une autre demande
              </Button>
            </div>
          ) : (
            <form className="space-y-6 animate-fade-in" onSubmit={handleSubmit}>
              <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                <div className="relative">
                  <input
                    type="text"
                    name="projectName"
                    placeholder="Nom du projet"
                    value={formData.projectName}
                    onChange={handleChange}
                    className={`w-full p-4 bg-[#0c0c0a] border ${formErrors.projectName ? 'border-red-500' : 'border-[#7b7979]'} rounded-2xl text-white placeholder-[#7b7979] focus:border-[#fbc63d] focus:outline-none transition-all duration-300 hover:border-[#a7a6a5] focus:animate-scale-in`}
                  />
                  {formErrors.projectName && (
                    <p className="text-red-500 text-xs mt-1 ml-1 animate-fade-in">
                      {formErrors.projectName}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                <div className="relative">
                  <select
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    className={`w-full p-4 bg-[#0c0c0a] border ${formErrors.domain ? 'border-red-500' : 'border-[#7b7979]'} rounded-2xl text-white placeholder-[#7b7979] focus:border-[#fbc63d] focus:outline-none transition-all duration-300 appearance-none hover:border-[#a7a6a5] focus:animate-scale-in`}
                  >
                    <option value="" className="bg-[#0c0c0a]">Sélectionnez le domaine</option>
                    <option value="Site Web" className="bg-[#0c0c0a]">Site Web</option>
                    <option value="Application Web" className="bg-[#0c0c0a]">Application Web</option>
                    <option value="E-commerce" className="bg-[#0c0c0a]">E-commerce</option>
                    <option value="Design" className="bg-[#0c0c0a]">Design</option>
                    <option value="Autre" className="bg-[#0c0c0a]">Autre</option>
                  </select>
                  {formErrors.domain && (
                    <p className="text-red-500 text-xs mt-1 ml-1">
                      {formErrors.domain}
                    </p>
                  )}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                    <svg className="fill-current h-4 w-4 text-[#7b7979]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Votre email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-4 bg-[#0c0c0a] border ${formErrors.email ? 'border-red-500' : 'border-[#7b7979]'} rounded-2xl text-white placeholder-[#7b7979] focus:border-[#fbc63d] focus:outline-none transition-all duration-300 hover:border-[#a7a6a5] focus:animate-scale-in`}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-xs mt-1 ml-1">
                      {formErrors.email}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
                <div className="relative">
                  <textarea
                    placeholder="Description détaillée du projet"
                    name="description"
                    rows={6}
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full p-4 bg-[#0c0c0a] border ${formErrors.description ? 'border-red-500' : 'border-[#7b7979]'} rounded-2xl text-white placeholder-[#7b7979] focus:border-[#fbc63d] focus:outline-none resize-none transition-all duration-300 hover:border-[#a7a6a5] focus:animate-scale-in`}
                  ></textarea>
                  {formErrors.description && (
                    <p className="text-red-500 text-xs mt-1 ml-1">
                      {formErrors.description}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
                <div className="relative">
                  <input
                    type="text"
                    name="budget"
                    placeholder="Budget estimé (ex: 5000€)"
                    value={formData.budget}
                    onChange={handleChange}
                    className={`w-full p-4 bg-[#0c0c0a] border ${formErrors.budget ? 'border-red-500' : 'border-[#7b7979]'} rounded-2xl text-white placeholder-[#7b7979] focus:border-[#fbc63d] focus:outline-none transition-all duration-300 hover:border-[#a7a6a5] focus:animate-scale-in`}
                  />
                  {formErrors.budget && (
                    <p className="text-red-500 text-xs mt-1 ml-1">
                      {formErrors.budget}
                    </p>
                  )}
                </div>
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-[#fbc63d] text-[#070602] hover:bg-[#ffbb00] py-4 rounded-2xl font-medium relative overflow-hidden transition-all duration-300 transform hover:scale-[1.02] hover:animate-elevate group"
                disabled={formSubmitting}
              >
                <span className="absolute inset-0 w-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" style={{ backgroundSize: '80rem 100%' }}></span>
                {formSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#070602] mr-2"></div>
                    Envoi en cours...
                  </div>
                ) : "Demander un devis"}
              </Button>
              
              <div className="text-center text-[#7b7979] text-sm mt-6">
                <p>En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe.</p>
              </div>
            </form>
          )}
        </div>
        
        <div className="mt-12 flex flex-col items-center justify-center space-y-6 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center space-x-2 text-[#7b7979] text-sm animate-float">
            <Mail className="w-4 h-4" />
            <span>Vous pouvez également nous contacter directement à <a href="mailto:contact@example.com" className="text-[#fbc63d] hover:underline transition-all duration-300 hover:text-[#ffbb00]">contact@example.com</a></span>
          </div>
          
          <div className="flex space-x-3 mt-4">
            <div className="animate-rotate-in" style={{ animationDelay: '700ms' }}>
              <SocialButton name="GitHub" icon="/icons/github.svg" url="https://github.com/your-github" size="sm" />
            </div>
            <div className="animate-rotate-in" style={{ animationDelay: '800ms' }}>
              <SocialButton name="LinkedIn" icon="/icons/linkedin.svg" url="https://linkedin.com/in/your-linkedin" size="sm" />
            </div>
            <div className="animate-rotate-in" style={{ animationDelay: '900ms' }}>
              <SocialButton name="Twitter" icon="/icons/twitter.svg" url="https://twitter.com/your-twitter" size="sm" />
            </div>
            <div className="animate-rotate-in" style={{ animationDelay: '1000ms' }}>
              <SocialButton name="Instagram" icon="/icons/instagram.svg" url="https://instagram.com/your-instagram" size="sm" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-[#201f1b] py-8 px-6 mt-12">
        <div className="max-w-7xl mx-auto text-center text-[#7b7979] text-sm">
          <p>&copy; 2025 Portfolio. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
