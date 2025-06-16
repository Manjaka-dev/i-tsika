import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import AppInitializer from '@/components/app-initializer'
import SkipLink from '@/components/layout/skip-link'

// Import de l'initialisation serveur (s'exécute au démarrage)
import '@/lib/server-init'

export const metadata: Metadata = {
  title: 'I-Tsika - Création de sites web sur mesure',
  description: 'Agence de création de sites web modernes, performants et sur mesure pour répondre aux besoins uniques de votre entreprise.',
  keywords: 'création site web, développement web, site vitrine, site e-commerce, refonte site web, Madagascar',
  authors: [{ name: 'I-Tsika Team' }],
  icons: {
    icon: '/img_logo.png',
    apple: '/img_logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className="bg-[#070602] text-[#ffffff] min-h-screen flex flex-col">
        <SkipLink />
        <AppInitializer />
        <Header />
        <main id="main-content" className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
