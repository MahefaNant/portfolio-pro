import { IProject } from "@/app/(public)/(home)/components/FeaturedProjects";

interface ICategory {
  id: string;
  nameFr: string;
  nameEn: string;
}

// data/projects.ts
export const projectsData: {
  projects: IProject[];
  categories: ICategory[];
} = {
  projects: [
    {
      id: "1",
      titleFr: "Plateforme E-commerce E-vidy",
      titleEn: "E-commerce Platform E-vidy",
      descriptionFr:
        "Plateforme e-commerce complète avec panier, paiement Stripe, dashboard admin, fournisseurs, livreurs et système de notation.",
      descriptionEn:
        "Complete e-commerce platform with cart, Stripe payment, admin dashboard, suppliers, delivery drivers and rating system.",
      imageUrl:
        "https://res.cloudinary.com/dsggicjk3/image/upload/v1776697999/market_ejskdp.jpg",
      technologies: [
        "Laravel",
        "PHP",
        "React.js",
        "React Native",
        "TypeScript",
        "PlanetHoster",
        "Docker",
        "PostgreSQL",
      ],
      githubUrl: null,
      liveUrl: "https://market.tuto-info.com/",
      category: "fullstack",
      featured: true,
      date: "2026",
    },
    {
      id: "2",
      titleFr: "Econolink",
      titleEn: "Econolink",
      descriptionFr:
        "EconoLink est une application moderne de finances personnelles qui fonctionne sur le web et sur mobile, permettant aux utilisateurs de gérer leurs comptes, de suivre leurs transactions et de surveiller leurs budgets avec un support hors ligne et une expérience utilisateur fluide.",
      descriptionEn:
        "EconoLink is a modern personal finance app that works on web and mobile, allowing users to manage accounts, track transactions, and monitor budgets with offline support and a smooth user experience.",
      imageUrl:
        "https://res.cloudinary.com/dsggicjk3/image/upload/v1776705378/Econolink_czedv7.jpg",
      technologies: ["NestJs", "TypeScript", "NextJs", "PostgreSQL"],
      githubUrl: "https://github.com/MahefaNant/EconoLink",
      liveUrl: "https://econolink-desktop.vercel.app/",
      category: "fullstack",
      featured: true,
      date: "2025",
    },
    {
      id: "3",
      titleFr: "Revolve",
      titleEn: "Revolve",
      descriptionFr:
        "Revolve est une plateforme de trading moderne qui propose une interface simple et rapide pour investir sur différents marchés financiers, avec une expérience fluide et accessible en ligne.",
      descriptionEn:
        "Revolve is a modern trading platform that offers a simple and fast interface for investing in different financial markets, with a smooth and accessible online experience.",
      imageUrl:
        "https://res.cloudinary.com/dsggicjk3/image/upload/v1776708780/Revolve_t1posr.jpg",
      technologies: ["Asp.Net", "C#", "SQLServer", "React", "Zustand"],
      githubUrl: null,
      liveUrl: "https://revolve.tuto-info.com/",
      category: "fullstack",
      featured: true,
      date: "2026",
    },
    {
      id: "4",
      titleFr: "Application de diffusion audio",
      titleEn: "Audio streaming application",
      descriptionFr:
        "Une application en ligne permettant d’écouter des radios en direct, ainsi que des podcasts à la demande, le tout accessible depuis n’importe quel appareil connecté.",
      descriptionEn:
        "An online application for listening to live radios and on-demand podcasts, accessible from any connected device.",
      imageUrl:
        "https://res.cloudinary.com/dsggicjk3/image/upload/v1776929462/hopefy-play_rsprbz.png",
      technologies: [
        "React Native",
        "TypeScript",
        "Azuracast",
        "Expo",
        "Playstore",
        "AppStore",
      ],
      githubUrl: null,
      liveUrl:
        "https://play.google.com/store/apps/details?id=com.hopefy.radiomg",
      category: "mobile",
      featured: false,
      date: "2024",
    },
    {
      id: "5",
      titleFr: "Plateforme immobilière",
      titleEn: "Real estate platform",
      descriptionFr:
        "Une plateforme de gestion et d'échange immobilier, permettant aux particuliers et professionnels de louer, acheter ou vendre des biens immobiliers tels que des appartements, villas, maisons ou terrains.",
      descriptionEn:
        "A real estate management and exchange platform, allowing individuals and professionals to rent, buy or sell properties such as apartments, villas, houses or land.",
      imageUrl:
        "https://res.cloudinary.com/dsggicjk3/image/upload/v1776931390/oasis_yqximv.jpg",
      technologies: ["NextJs", "TypeScript", "Docker", "MongoDB", "Github"],
      githubUrl: null,
      liveUrl: null,
      category: "fullstack",
      featured: false,
      date: "2024",
    },
    {
      id: "6",
      titleFr: "Plateforme e-commerce complète",
      titleEn: "Complete e-commerce platform",
      descriptionFr:
        "Plateforme e-commerce avec achat de vêtements, gestion des commandes, livraisons et dashboard admin complet.",
      descriptionEn:
        "E-commerce platform with clothing purchase, order management, deliveries and complete admin dashboard.",
      imageUrl:
        "https://res.cloudinary.com/dsggicjk3/image/upload/v1776932514/original-store_ytiji9.jpg",
      technologies: ["Asp.net", "React", "C#", "Api", "Postgresql"],
      githubUrl: null,
      liveUrl: null,
      category: "fullstack",
      featured: false,
      date: "2023",
    },
    {
      id: "7",
      titleFr: "EconoFlow",
      titleEn: "EconoFlow",
      descriptionFr: "Application de suivi financier de famille offline-first.",
      descriptionEn: "Family finance tracking app offline-first.",
      imageUrl: "",
      technologies: ["React Native", "TypeScript", "SQLite", "Drizzle"],
      githubUrl: null,
      liveUrl: null,
      category: "mobile",
      featured: false,
      date: "2026",
    },
    {
      id: "8",
      titleFr: "IgoGuide",
      titleEn: "IgoGuide",
      descriptionFr:
        "Une plateforme de recherches intuitive, c'est un annuaire en ligne destiné à faciliter la recherche de toutes vos adresses de loisirs en France.",
      descriptionEn:
        "An intuitive search platform, it's an online directory designed to facilitate the search for all your leisure addresses in France.",
      imageUrl:
        "https://res.cloudinary.com/dsggicjk3/image/upload/v1776933623/igoguide_hynqjg.jpg",
      technologies: ["Codeigniter", "Javascript", "Mysql", "Ajax"],
      githubUrl: null,
      liveUrl: "https://igoguide-gironde.com/",
      category: "backend",
      featured: false,
      date: "2025",
    },
    {
      id: "9",
      titleFr: "Tuto Info",
      titleEn: "Tuto Info",
      descriptionFr: "Une plateforme de formation en ligne à Madagascar.",
      descriptionEn: "An online training platform in Madagascar.",
      imageUrl:
        "https://res.cloudinary.com/dsggicjk3/image/upload/v1776934459/tuto-info_jgtgfu.jpg",
      technologies: ["Laravel", "React", "Mysql", "Jquery"],
      githubUrl: null,
      liveUrl: "https://tuto-info.com/",
      category: "frontend",
      featured: false,
      date: "2025",
    },
    {
      id: "10",
      titleFr: "ETP (English Teaching Program)",
      titleEn: "ETP (English Teaching Program)",
      descriptionFr:
        "Une plateforme de gestion hors ligne pour gérer tous les aspects du programme d'enseignement de l'anglais, y compris les inscriptions, les paiements, les chiffres d'affaires, etc. Utilise un serveur windows que les autres pc peuvent s'y connecté via IP",
      descriptionEn:
        "An offline management platform to manage all aspects of the English teaching program, including registrations, payments, revenues, etc. Uses a Windows server that other PCs can connect to via IP.",
      imageUrl: "",
      technologies: ["Codeigniter", "Javascript", "Mysql", "Jquery"],
      githubUrl: null,
      liveUrl: null,
      category: "fullstack",
      featured: false,
      date: "2025",
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
