import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail, sendQuoteEmail } from '@/lib/mail-service';
import { checkEmailConfig } from '@/lib/env-check';

/**
 * API centralisée pour l'envoi d'emails
 * Gère les demandes d'envoi d'emails pour le formulaire de contact et le formulaire de devis multi-étapes
 */
export async function POST(request: NextRequest) {
  // Vérifier d'abord si la configuration email est correcte
  const { isConfigured, missingVars } = checkEmailConfig();
  if (!isConfigured) {
    return NextResponse.json({ 
      success: false, 
      error: 'Le service d\'email n\'est pas correctement configuré. Veuillez contacter l\'administrateur.' 
    }, { status: 500 });
  }
  try {
    const data = await request.json();
    const { type } = data;
    
    let result;
    
    // Traitement selon le type de formulaire
    if (type === 'contact') {
      // Formulaire de contact
      const { name, email, message } = data;
      
      // Vérification des champs requis
      if (!name || !email || !message) {
        return NextResponse.json({ 
          success: false, 
          error: 'Les champs nom, email et message sont obligatoires' 
        }, { status: 400 });
      }
      
      // Envoi de l'email de contact
      result = await sendContactEmail(name, email, message);
    } 
    else if (type === 'quote') {
      // Formulaire de devis multi-étapes
      const { firstName, lastName, email, phone, company, projectType, description, features, budget, deadline, hasSpecification } = data;
      
      // Vérification des champs requis
      if (!firstName || !lastName || !email || !projectType || !description || !budget || !deadline) {
        return NextResponse.json({ 
          success: false, 
          error: 'Veuillez remplir tous les champs obligatoires du formulaire de devis' 
        }, { status: 400 });
      }
      
      // Envoi de l'email de demande de devis
      result = await sendQuoteEmail({
        firstName,
        lastName,
        email,
        phone: phone || '',
        company: company || '',
        projectType,
        description,
        features: features || [],
        budget,
        deadline,
        hasSpecification: hasSpecification || 'Non précisé',
      });
    }
    else {
      // Type de formulaire non supporté
      return NextResponse.json({ 
        success: false, 
        error: 'Type de formulaire non supporté' 
      }, { status: 400 });
    }
    
    // Traitement du résultat de l'envoi
    if (result && result.success) {
      return NextResponse.json({
        success: true,
        messageId: result.messageId
      });
    } else {
      return NextResponse.json({
        success: false,
        error: result?.error || 'Une erreur est survenue lors de l\'envoi de l\'email'
      }, { status: 500 });
    }
    
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Une erreur interne est survenue' 
    }, { status: 500 });
  }
}