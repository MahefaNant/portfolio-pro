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
        "TypeScript",
        "PlanetHoster",
        "Docker",
        "PostgreSQL",
      ],
      githubUrl: null,
      liveUrl: null,
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
      liveUrl: null,
      category: "fullstack",
      featured: true,
      date: "2026",
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
