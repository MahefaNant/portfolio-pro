// data/projects.ts
export const projectsData = {
  projects: [
    {
      id: "1",
      titleFr: "Plateforme E-commerce",
      titleEn: "E-commerce Platform",
      descriptionFr:
        "Plateforme e-commerce complète avec panier, paiement Stripe, dashboard admin et système de notation.",
      descriptionEn:
        "Complete e-commerce platform with cart, Stripe payment, admin dashboard and rating system.",
      imageUrl: "/images/projects/ecommerce.jpg",
      category: "fullstack",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind",
        "Stripe",
        "PostgreSQL",
      ],
      githubUrl: "https://github.com/mahefa/ecommerce",
      liveUrl: "https://ecommerce-demo.vercel.app",
      featured: true,
      date: "2024",
    },
    {
      id: "2",
      titleFr: "Dashboard Analytics",
      titleEn: "Analytics Dashboard",
      descriptionFr:
        "Dashboard analytics temps réel avec graphiques interactifs, export PDF et webhooks.",
      descriptionEn:
        "Real-time analytics dashboard with interactive charts, PDF export and webhooks.",
      imageUrl: "/images/projects/dashboard.jpg",
      category: "frontend",
      technologies: ["React", "Recharts", "Node.js", "WebSocket", "Redis"],
      githubUrl: "https://github.com/mahefa/dashboard",
      liveUrl: "https://dashboard-demo.vercel.app",
      featured: true,
      date: "2024",
    },
    {
      id: "3",
      titleFr: "API REST Laravel",
      titleEn: "Laravel REST API",
      descriptionFr:
        "API REST complète avec authentification JWT, rate limiting, documentation Swagger et tests unitaires.",
      descriptionEn:
        "Complete REST API with JWT authentication, rate limiting, Swagger documentation and unit tests.",
      imageUrl: "/images/projects/api.jpg",
      category: "backend",
      technologies: ["Laravel", "PHP", "MySQL", "Swagger", "JWT"],
      githubUrl: "https://github.com/mahefa/laravel-api",
      liveUrl: "https://api-demo.vercel.app/docs",
      featured: true,
      date: "2023",
    },
    {
      id: "4",
      titleFr: "Application Mobile React Native",
      titleEn: "React Native Mobile Application",
      descriptionFr:
        "Application mobile de livraison avec géolocalisation, notifications push et paiement mobile.",
      descriptionEn:
        "Mobile delivery application with geolocation, push notifications and mobile payment.",
      imageUrl: "/images/projects/mobile.jpg",
      category: "mobile",
      technologies: ["React Native", "Expo", "Node.js", "MongoDB", "Socket.io"],
      githubUrl: "https://github.com/mahefa/mobile-app",
      liveUrl: "https://expo.dev/mahefa/mobile-app",
      featured: false,
      date: "2024",
    },
    {
      id: "5",
      titleFr: "Portfolio 3D",
      titleEn: "3D Portfolio",
      descriptionFr:
        "Portfolio interactif avec animations 3D, Three.js et expérience immersive.",
      descriptionEn:
        "Interactive portfolio with 3D animations, Three.js and immersive experience.",
      imageUrl: "/images/projects/portfolio3d.jpg",
      category: "frontend",
      technologies: ["Three.js", "React", "GSAP", "Tailwind"],
      githubUrl: "https://github.com/mahefa/portfolio-3d",
      liveUrl: "https://portfolio-3d.vercel.app",
      featured: false,
      date: "2024",
    },
    {
      id: "6",
      titleFr: "Outil de Gestion de Projet",
      titleEn: "Project Management Tool",
      descriptionFr:
        "Application de gestion de projet type Trello avec drag & drop, commentaires et notifications.",
      descriptionEn:
        "Project management application type Trello with drag & drop, comments and notifications.",
      imageUrl: "/images/projects/pmtool.jpg",
      category: "fullstack",
      technologies: ["Next.js", "Prisma", "PostgreSQL", "Tailwind", "NextAuth"],
      githubUrl: "https://github.com/mahefa/pm-tool",
      liveUrl: "https://pm-tool.vercel.app",
      featured: false,
      date: "2023",
    },
  ],
  categories: [
    { id: "all", nameFr: "Tous", nameEn: "All" },
    { id: "frontend", nameFr: "Frontend", nameEn: "Frontend" },
    { id: "backend", nameFr: "Backend", nameEn: "Backend" },
    { id: "fullstack", nameFr: "Fullstack", nameEn: "Fullstack" },
    { id: "mobile", nameFr: "Mobile", nameEn: "Mobile" },
  ],
};
