import { NextRequest, NextResponse } from 'next/server';
import { sendQuoteEmail } from '@/lib/mail-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation des données
    if (!body.projectName || !body.domain || !body.email || !body.description || !body.budget) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Validation email simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Envoi de l'email
    const result = await sendQuoteEmail(
      body.projectName,
      body.domain,
      body.email,
      body.description,
      body.budget
    );

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      throw new Error(result.error || 'Échec de l\'envoi');
    }
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du traitement de la demande' },
      { status: 500 }
    );
  }
}
