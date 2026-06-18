import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import AppInitializer from '@/components/app-initializer'
import SkipLink from '@/components/layout/skip-link'
import ResourcePreloader from '@/components/resource-preloader'

// Import de l'initialisation serveur (s'exécute au démarrage)
import '@/lib/server-init'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'I-Tsika — Agence de développement d\'applications sur mesure',
  description: 'I-Tsika développe des applications web, desktop et mobiles sur mesure à Antananarivo, Madagascar. Solutions numériques performantes pour entreprises : SaaS, logiciels métier, sites vitrines, e-commerce.',
  keywords: 'développement application, application web, application desktop, application mobile, logiciel métier, SaaS, site vitrine, e-commerce, Madagascar, Antananarivo, I-Tsika',
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
    <html lang="fr" className={inter.variable}>
      <body className={`${inter.className} bg-[#070602] text-[#ffffff] min-h-screen flex flex-col`}>
        <ResourcePreloader />
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
