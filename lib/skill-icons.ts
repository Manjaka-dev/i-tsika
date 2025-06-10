// Mappings pour les icônes de compétence
export const skillIcons = {
  // Langages de programmation
  "Java": "/icons/java.svg",
  "JavaScript": "/icons/javascript.svg",
  "TypeScript": "/icons/typescript.svg",
  "Python": "/icons/python.svg",
  "PHP": "/icons/php.svg",
  "C": "/icons/c.svg",
  "C++": "/icons/cplusplus.svg",
  "Ruby": "/icons/ruby.svg",
  "Go": "/icons/go.svg",
  "Rust": "/icons/rust.svg",
  // Compétences traduites
  "Résolution de problèmes": "/icons/problem-solving.svg",
  
  // Frameworks Frontend
  "React": "/icons/react.svg",
  "Vue": "/icons/vuejs.svg",
  "Angular": "/icons/angularjs.svg",
  "Svelte": "/icons/svelte.svg",
  "Next.js": "/icons/nextjs.svg",
  
  // Frameworks Backend
  "Spring": "/icons/spring.svg",
  "Spring Boot": "/icons/spring.svg",
  "Laravel": "/icons/laravel.svg",
  "Django": "/icons/django.svg",
  "Express": "/icons/express.svg",
  "Flask": "/icons/flask.svg",
  "FastAPI": "/icons/fastapi.svg",
  "FlightPHP": "/icons/flight.svg",
  
  // Technologies web
  "HTML": "/icons/html5.svg",
  "HTML/CSS": "/icons/html5.svg",
  "CSS": "/icons/css3.svg",
  "Sass": "/icons/sass.svg",
  "Bootstrap": "/icons/bootstrap.svg",
  "Tailwind": "/icons/tailwindcss.svg",
  
  // Base de données
  "SQL": "/icons/mysql.svg", 
  "MySQL": "/icons/mysql.svg",
  "Postgre SQL": "/icons/postgresql.svg",
  "SQLite": "/icons/sqlite.svg",
  "MongoDB": "/icons/mongodb.svg",
  "Redis": "/icons/redis.svg",
  
  // DevOps & Outils
  "Docker": "/icons/docker.svg",
  "Kubernetes": "/icons/kubernetes.svg",
  "Git": "/icons/git.svg",
  "Github": "/icons/github.svg",
  "NGINX": "/icons/nginx.svg",
  "Apache": "/icons/apache.svg",
  "Linux": "/icons/linux.svg",
  "Node.js": "/icons/nodejs.svg", 
  
  // Soft skills
  "Leadership": "/icons/leadership.svg",
  "Résolution de problèmes": "/icons/problem-solving.svg",
  "Problem Solving": "/icons/problem-solving.svg",
};

// Fallback pour les icônes manquantes
export const fallbackIcon = "/placeholder-logo.svg";

/**
 * Récupère l'URL de l'icône par nom de compétence
 * @param skillName Nom de la compétence
 * @returns URL de l'icône
 */
export function getIconByName(skillName: string): string {
  return skillIcons[skillName] || fallbackIcon;
}
