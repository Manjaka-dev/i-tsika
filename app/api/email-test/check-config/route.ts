import { NextRequest, NextResponse } from 'next/server';
import { checkEmailConfig } from '@/lib/env-check';

export async function GET(request: NextRequest) {
  try {
    const configStatus = checkEmailConfig();
    
    return NextResponse.json({ 
      success: true,
      configSummary: configStatus.configSummary,
      isConfigured: configStatus.isConfigured,
      missingVars: configStatus.missingVars
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false,
      error: 'Erreur lors de la vérification de la configuration email'
    }, { status: 500 });
  }
}
