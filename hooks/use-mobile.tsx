import * as React from "react"

// Breakpoints pour gérer différentes tailles d'écrans
export const BREAKPOINTS = {
  sm: 640,  // petit mobile
  md: 768,  // mobile standard / tablette en portrait
  lg: 1024, // tablette en paysage / petits laptops
  xl: 1280  // ordinateurs de bureau
}

export function useIsMobile(breakpoint = BREAKPOINTS.md) {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Fonction pour mettre à jour l'état
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }
    
    // Utiliser matchMedia pour une meilleure réactivité
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    
    // Vérifier au montage du composant
    checkIfMobile()
    
    // Ajouter l'écouteur d'événement
    mql.addEventListener("change", checkIfMobile)
    
    // Nettoyage à la suppression du composant
    return () => mql.removeEventListener("change", checkIfMobile)
  }, [breakpoint])

  return !!isMobile
}

// Hook pour obtenir la taille d'écran actuelle
export function useScreenSize() {
  const [screenSize, setScreenSize] = React.useState<string>("unknown")
  
  React.useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth
      if (width < BREAKPOINTS.sm) {
        setScreenSize("xs")
      } else if (width < BREAKPOINTS.md) {
        setScreenSize("sm")
      } else if (width < BREAKPOINTS.lg) {
        setScreenSize("md")
      } else if (width < BREAKPOINTS.xl) {
        setScreenSize("lg")
      } else {
        setScreenSize("xl")
      }
    }
    
    window.addEventListener("resize", updateSize)
    updateSize()
    
    return () => window.removeEventListener("resize", updateSize)
  }, [])
  
  return screenSize
}
