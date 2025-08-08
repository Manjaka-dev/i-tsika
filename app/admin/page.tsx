'use client';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function AdminPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect('/login');
  }

  if (session.user.role !== 'admin') {
    redirect('/dashboard');
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Administration</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Gestion des utilisateurs</CardTitle>
            <CardDescription>Administrer les comptes utilisateurs</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Gérez les utilisateurs, leurs rôles et leurs permissions.</p>
            <Button asChild>
              <Link href="/admin/users">Gérer les utilisateurs</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Demandes de devis</CardTitle>
            <CardDescription>Gérer les demandes entrantes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Consultez et traitez les demandes de devis reçues.</p>
            <Button asChild variant="outline">
              <Link href="/admin/quotes">Voir les demandes</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Projets</CardTitle>
            <CardDescription>Suivi des projets en cours</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Gérez l'avancement des projets et leur statut.</p>
            <Button asChild variant="outline">
              <Link href="/admin/projects">Gérer les projets</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [emailConfigStatus, setEmailConfigStatus] = useState<{
    isConfigured?: boolean;
    missingVars?: string[];
    configSummary?: {
      host: string;
      port: string;
      user: string;
      recipientConfigured: boolean;
      senderConfigured: boolean;
    }
  }>({});
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkEmailConfig() {
      try {
        const response = await fetch('/api/email-test/check-config');
        const data = await response.json();
        setEmailConfigStatus(data);
      } catch (error) {
        console.error('Erreur lors de la vérification de la configuration email:', error);
      } finally {
        setLoading(false);
      }
    }
    
    checkEmailConfig();
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">Administration</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section Email */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Configuration Email
          </h2>
          
          {loading ? (
            <p className="text-gray-500">Vérification de la configuration...</p>
          ) : (
            <>
              <div className={`p-3 mb-4 rounded-md ${emailConfigStatus.isConfigured ? 'bg-green-50 text-green-800' : 'bg-amber-50 text-amber-800'}`}>
                <p className="font-medium">
                  {emailConfigStatus.isConfigured 
                    ? '✅ Configuration email complète' 
                    : '⚠️ Configuration email incomplète'}
                </p>
                {!emailConfigStatus.isConfigured && emailConfigStatus.missingVars && (
                  <p className="mt-1 text-sm">
                    Variables manquantes: {emailConfigStatus.missingVars.join(', ')}
                  </p>
                )}
              </div>
              
              {emailConfigStatus.configSummary && (
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Serveur:</span> {emailConfigStatus.configSummary.host}:{emailConfigStatus.configSummary.port}</p>
                  <p><span className="font-medium">Utilisateur:</span> {emailConfigStatus.configSummary.user}</p>
                  <p><span className="font-medium">Adresse destinataire:</span> {emailConfigStatus.configSummary.recipientConfigured ? 'contact@i-tsika.site' : '(non configurée)'}</p>
                  <p><span className="font-medium">Adresse expéditeur:</span> {emailConfigStatus.configSummary.senderConfigured ? 'noreply@i-tsika.site' : '(non configurée)'}</p>
                </div>
              )}
              
              <div className="mt-4">
                <Link 
                  href="/admin/email-test" 
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Tester l'envoi d'email
                </Link>
              </div>
            </>
          )}
        </div>
        
        {/* Documentation */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Documentation
          </h2>
          
          <p className="text-gray-700 mb-4">
            Consultez notre documentation pour configurer et gérer différents aspects du site :
          </p>
          
          <ul className="space-y-2">
            <li>
              <Link 
                href="#" 
                className="text-blue-600 hover:underline flex items-center"
                onClick={(e) => { e.preventDefault(); alert('La documentation n\'est pas encore intégrée à l\'interface administrateur.'); }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                Guide de configuration des emails
              </Link>
            </li>
            <li>
              <Link 
                href="#" 
                className="text-blue-600 hover:underline flex items-center"
                onClick={(e) => { e.preventDefault(); alert('La documentation n\'est pas encore intégrée à l\'interface administrateur.'); }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2" />
                </svg>
                Guide de déploiement
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}