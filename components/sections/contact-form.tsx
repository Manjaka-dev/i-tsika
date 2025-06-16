"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Notification from "@/components/ui/notification";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: ""
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
      name: "",
      email: "",
      message: ""
    };

    // Validation du nom
    if (!formData.name.trim()) {
      errors.name = "Le nom est requis";
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      errors.name = "Le nom doit contenir au moins 2 caractères";
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

    // Validation du message
    if (!formData.message.trim()) {
      errors.message = "Le message est requis";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      errors.message = "Le message doit contenir au moins 10 caractères";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validation en temps réel pour une meilleure expérience utilisateur
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name as keyof typeof formErrors]: "" }));
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
            type: 'contact',
            name: formData.name,
            email: formData.email,
            message: formData.message
          }),
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
          setFormSubmitting(false);
          setFormSubmitted(true);
          // Réinitialiser le formulaire
          setFormData({ name: "", email: "", message: "" });
        } else {
          throw new Error(result.error || "Échec de l'envoi du message");
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi du formulaire:", error);
        setFormSubmitting(false);
        
        // Détecter si l'erreur est liée à un problème de configuration
        const errorMsg = error instanceof Error ? error.message : String(error);
        const isConfigError = errorMsg.toLowerCase().includes('configuration') || 
                            errorMsg.toLowerCase().includes('admin');
                            
        setNotification({
          visible: true,
          type: "error",
          title: isConfigError ? "Service temporairement indisponible" : "Erreur d'envoi",
          message: isConfigError 
            ? "Le service de messagerie est actuellement indisponible. Veuillez nous contacter directement par téléphone ou via notre adresse email."
            : "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer plus tard."
        });
      }
    }
  };

  return (
    <div className="bg-[#201f1b] rounded-3xl p-8 relative">
      <h2 id="contact-form-title" className="text-xl md:text-2xl font-semibold mb-6">Contactez-nous</h2>
      
      <Notification
        isVisible={notification.visible}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onClose={() => setNotification({ ...notification, visible: false })}
      />
      {formSubmitted ? (
        <div className="flex flex-col items-center justify-center py-10 space-y-4 animate-bounce-in">
          <div className="w-16 h-16 bg-[#8bc34a] rounded-full flex items-center justify-center mb-4 animate-pulse-slow">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white animate-slide-in-top" style={{ animationDelay: '200ms' }}>Message envoyé !</h3>
          <p className="text-[#d9d9d9] text-center animate-slide-in-top" style={{ animationDelay: '400ms' }}>
            Merci de nous avoir contacté. Nous vous répondrons dans les plus brefs délais.
          </p>
          <Button 
            className="mt-4 bg-transparent hover:bg-[#fbc63d] text-[#fbc63d] hover:text-[#070602] border border-[#fbc63d] py-2 px-6 rounded-full font-medium transition-all duration-300 animate-slide-in-bottom"
            onClick={() => setFormSubmitted(false)}
            style={{ animationDelay: '600ms' }}
          >
            Envoyer un autre message
          </Button>
        </div>
      ) : (
        <form className="space-y-6 animate-fade-in" onSubmit={handleSubmit} aria-labelledby="contact-form-title" role="form">
          <div>
            <div className="relative">
              <label htmlFor="contact-name" className="sr-only">Nom</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="Votre nom"
                value={formData.name}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!formErrors.name}
                aria-describedby={formErrors.name ? "name-error" : undefined}
                className={`w-full p-4 bg-[#0c0c0a] border ${formErrors.name ? 'border-red-500' : 'border-[#7b7979]'} rounded-2xl text-white placeholder-[#7b7979] focus:border-[#fbc63d] focus:outline-none focus:ring-2 focus:ring-[#fbc63d] focus:ring-opacity-50 transition-all duration-300`}
              />
              {formErrors.name && (
                <p id="name-error" className="text-red-500 text-xs mt-1 ml-1" aria-live="polite">
                  {formErrors.name}
                </p>
              )}
            </div>
          </div>
          <div>
            <div className="relative">
              <label htmlFor="contact-email" className="sr-only">Email</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="Votre email"
                value={formData.email}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!formErrors.email}
                aria-describedby={formErrors.email ? "email-error" : undefined}
                className={`w-full p-4 bg-[#0c0c0a] border ${formErrors.email ? 'border-red-500' : 'border-[#7b7979]'} rounded-2xl text-white placeholder-[#7b7979] focus:border-[#fbc63d] focus:outline-none focus:ring-2 focus:ring-[#fbc63d] focus:ring-opacity-50 transition-all duration-300`}
              />
              {formErrors.email && (
                <p id="email-error" className="text-red-500 text-xs mt-1 ml-1" aria-live="polite">
                  {formErrors.email}
                </p>
              )}
            </div>
          </div>
          <div>
            <div className="relative">
              <label htmlFor="contact-message" className="sr-only">Message</label>
              <textarea
                id="contact-message"
                placeholder="Votre message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!formErrors.message}
                aria-describedby={formErrors.message ? "message-error" : undefined}
                className={`w-full p-4 bg-[#0c0c0a] border ${formErrors.message ? 'border-red-500' : 'border-[#7b7979]'} rounded-2xl text-white placeholder-[#7b7979] focus:border-[#fbc63d] focus:outline-none focus:ring-2 focus:ring-[#fbc63d] focus:ring-opacity-50 resize-none transition-all duration-300`}
              ></textarea>
              {formErrors.message && (
                <p id="message-error" className="text-red-500 text-xs mt-1 ml-1" aria-live="polite">
                  {formErrors.message}
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
            ) : "Envoyer le message"}
          </Button>
        </form>
      )}
    </div>
  );
}
