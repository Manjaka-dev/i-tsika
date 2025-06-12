'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ConfigStatus {
  host?: string;
  port?: string;
  user?: string;
  recipientConfigured?: boolean;
  senderConfigured?: boolean;
}

export default function EmailTestPage() {
  const [testResult, setTestResult] = useState<{ success?: boolean; error?: string }>({});
  const [loading, setLoading] = useState(false);
  const [configStatus, setConfigStatus] = useState<ConfigStatus | null>(null);

  async function checkConfiguration() {
    try {
      const response = await fetch('/api/email-test/check-config');
      const data = await response.json();
      setConfigStatus(data.configSummary);
    } catch (error) {
      console.error('Erreur lors de la vérification de la configuration:', error);
    }
  }

  async function sendTestEmail() {
    setLoading(true);
    setTestResult({});

    try {
      const response = await fetch('/api/email-test/send', {
        method: 'POST',
      });
      
      const data = await response.json();
      
      setTestResult(data);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email de test:', error);
      setTestResult({ success: false, error: 'Erreur de réseau' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/admin" className="text-blue-600 hover:underline flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Retour à l'administration
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-6">Test du service d&apos;email</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Configuration actuelle</h2>
        
        <button 
          onClick={checkConfiguration}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-4"
        >
          Vérifier la configuration
        </button>

        {configStatus && (
          <div className="mt-4 p-4 bg-gray-50 rounded border">
            <h3 className="font-semibold mb-2">État de la configuration :</h3>
            <ul className="space-y-1">
              <li><strong>Serveur :</strong> {configStatus.host}:{configStatus.port}</li>
              <li><strong>Utilisateur :</strong> {configStatus.user || '(non configuré)'}</li>
              <li>
                <strong>Adresse destinataire :</strong> {' '}
                {configStatus.recipientConfigured ? 'contact@i-tsika.site' : 'utilisant la valeur par défaut'}
              </li>
              <li>
                <strong>Adresse expéditeur :</strong> {' '}
                {configStatus.senderConfigured ? 'noreply@i-tsika.site' : 'utilisant la valeur par défaut'}
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Envoyer un email de test</h2>
        <p className="mb-4 text-gray-700">
          Cliquez sur le bouton ci-dessous pour envoyer un email de test. 
          L&apos;email sera envoyé à l&apos;adresse configurée dans RECIPIENT_EMAIL.
        </p>
        
        <button 
          onClick={sendTestEmail}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? 'Envoi en cours...' : 'Envoyer un email de test'}
        </button>

        {testResult.success !== undefined && (
          <div className={`mt-4 p-4 rounded border ${testResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            {testResult.success ? (
              <p className="text-green-800">✅ Email de test envoyé avec succès !</p>
            ) : (
              <p className="text-red-800">❌ Échec de l&apos;envoi : {testResult.error}</p>
            )}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Documentation</h2>
        <p className="text-gray-700">
          Pour configurer correctement le service d&apos;email, consultez les guides suivants :
        </p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li><a href="#" className="text-blue-600 hover:underline" onClick={(e) => { e.preventDefault(); alert('La documentation n\'est pas encore intégrée à l\'interface administrateur.'); }}>Guide de configuration d&apos;email</a></li>
          <li><a href="#" className="text-blue-600 hover:underline" onClick={(e) => { e.preventDefault(); alert('La documentation n\'est pas encore intégrée à l\'interface administrateur.'); }}>Guide Nodemailer</a></li>
          <li><a href="#" className="text-blue-600 hover:underline" onClick={(e) => { e.preventDefault(); alert('La documentation n\'est pas encore intégrée à l\'interface administrateur.'); }}>Guide de test d&apos;email</a></li>
        </ul>
      </div>
    </div>
  );
}