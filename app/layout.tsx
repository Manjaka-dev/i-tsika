import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import AppInitializer from '@/components/app-initializer'

// Import de l'initialisation serveur (s'exécute au démarrage)
import '@/lib/server-init'

export const metadata: Metadata = {
  title: 'I-Tsika - Création de sites web sur mesure',
  description: 'Agence de création de sites web modernes, performants et sur mesure pour répondre aux besoins uniques de votre entreprise.',
  keywords: 'création site web, développement web, site vitrine, site e-commerce, refonte site web, Madagascar',
  authors: [{ name: 'I-Tsika Team' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className="bg-[#070602] text-[#ffffff] min-h-screen flex flex-col">
        <AppInitializer />
        <Header />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
