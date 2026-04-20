"use client";

import { useInView } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { useLocale, useTranslations } from "next-intl";

interface IProject {
  id: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  imageUrl?: string | null;
  technologies: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
  category: string;
}

// Données temporaires
const featuredProjectsData: { projects: IProject[] } = {
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
    },
  ],
};

// Composant carte projet
function ProjectCard({ project, index }: { project: IProject; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const locale = useLocale();
  const t = useTranslations("Home.FeaturedProjects");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="group relative bg-white dark:bg-[#121826] rounded-xl overflow-hidden border border-gray-200 dark:border-[#1F2937] shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.5s ease-out ${index * 0.1}s`,
      }}
    >
      {/* Image du projet */}
      <div className="relative h-48 sm:h-56 overflow-hidden bg-linear-to-br from-[#2563EB]/20 to-[#1E3A8A]/20">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={locale === "fr" ? project.titleFr : project.titleEn}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <Image
            src={`https://placehold.co/600x400/2563EB/FFFFFF?text=${project.titleEn}`}
            alt={locale === "fr" ? project.titleFr : project.titleEn}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>

      <CardContent className="p-5 sm:p-6 flex-1 flex flex-col">
        {/* Catégorie */}
        <div className="mb-3">
          <Badge
            variant="secondary"
            className="text-xs bg-[#2563EB]/10 dark:bg-[#2563EB]/15 text-[#2563EB] dark:text-[#3B82F6]"
          >
            {project.category}
          </Badge>
        </div>

        {/* Titre */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#2563EB] dark:group-hover:text-[#3B82F6] transition-colors">
          {locale === "fr" ? project.titleFr : project.titleEn}
        </h3>

        {/* Description */}
        <div className="flex-1 flex flex-col">
          <p
            className={`text-sm text-gray-600 dark:text-gray-400 ${isExpanded ? "" : "line-clamp-3"}`}
          >
            {locale === "fr" ? project.descriptionFr : project.descriptionEn}
          </p>
          {(locale === "fr" ? project.descriptionFr : project.descriptionEn)
            .length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-semibold text-[#2563EB] dark:text-[#3B82F6] hover:underline mt-1 mb-4 text-left"
            >
              {isExpanded ? t("readLess") : t("readMore")}
            </button>
          )}
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 8).map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-xs bg-gray-50 dark:bg-[#0B0F1A]"
            >
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 8 && (
            <Badge variant="outline" className="text-xs">
              +{project.technologies.length - 8}
            </Badge>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800/60">
          <div className="flex flex-wrap items-center gap-2">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800/50 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all text-xs font-medium text-gray-700 dark:text-gray-300"
                aria-label="GitHub"
              >
                <Github className="h-3.5 w-3.5" />
                Github
              </a>
            ) : (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-[#0B0F1A]/50 rounded-lg text-xs font-medium text-gray-400 dark:text-gray-500 cursor-not-allowed">
                <Github className="h-3.5 w-3.5" />
                Private
              </span>
            )}

            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563EB]/10 text-[#2563EB] dark:bg-[#3B82F6]/10 dark:text-[#3B82F6] rounded-lg hover:bg-[#2563EB]/20 dark:hover:bg-[#3B82F6]/20 transition-all text-xs font-medium"
                aria-label="Live demo"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                See
              </a>
            ) : (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-[#0B0F1A]/50 rounded-lg text-xs font-medium text-gray-400 dark:text-gray-500 cursor-not-allowed">
                <ExternalLink className="h-3.5 w-3.5" />
                Private
              </span>
            )}
          </div>

          {/* Lien voir plus */}
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-[#2563EB] dark:text-[#3B82F6] hover:gap-2 transition-all shrink-0"
          >
            {t("seeProjects")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </CardContent>
    </div>
  );
}

export function FeaturedProjects() {
  const t = useTranslations("Home.FeaturedProjects");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const projects = featuredProjectsData.projects;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Version mobile : carrousel
  if (isMobile) {
    const currentProject = projects[currentIndex];
    return (
      <section
        id="projects"
        className="py-16 sm:py-20 lg:py-32 relative overflow-hidden"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#2563EB]/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 dark:bg-[#2563EB]/15 border border-[#2563EB]/20 mb-4">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-[#2563EB]" />
              <span className="text-[10px] sm:text-xs font-medium text-[#2563EB] dark:text-[#3B82F6] uppercase tracking-wider">
                Portfolio
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              <span className="bg-linear-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {t("title")}
              </span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              {t("subtitle")}
            </p>
          </div>

          {/* Carrousel mobile */}
          <div className="max-w-md mx-auto">
            <ProjectCard project={currentProject} index={0} />

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prevProject}
                className="p-2 rounded-full bg-gray-100 dark:bg-[#121826] active:bg-gray-200 dark:active:bg-[#1a2230] transition-colors"
                aria-label="Projet précédent"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div className="flex gap-1.5">
                {projects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentIndex === idx
                        ? "w-6 bg-[#2563EB]"
                        : "w-1.5 bg-gray-300 dark:bg-gray-600"
                    }`}
                    aria-label={`Aller au projet ${idx + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextProject}
                className="p-2 rounded-full bg-gray-100 dark:bg-[#121826] active:bg-gray-200 dark:active:bg-[#1a2230] transition-colors"
                aria-label="Projet suivant"
              >
                <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Voir tous les projets */}
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="group">
              <Link href="/projects">
                {t("seeProjects")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Version desktop : grille
  return (
    <section
      id="projects"
      className="py-16 sm:py-20 lg:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#2563EB]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#22C55E]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 dark:bg-[#2563EB]/15 border border-[#2563EB]/20 mb-4">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-[#2563EB]" />
            <span className="text-[10px] sm:text-xs font-medium text-[#2563EB] dark:text-[#3B82F6] uppercase tracking-wider">
              Portfolio
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4">
            <span className="bg-linear-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {t("title")}
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400">
            {t("subtitle")}
          </p>
        </div>

        {/* Grille projets */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Voir tous les projets */}
        <div className="text-center mt-12 lg:mt-16">
          <Button
            asChild
            size="lg"
            className="group bg-linear-to-r from-[#2563EB] to-[#1E3A8A] hover:from-[#3B82F6] hover:to-[#2563EB]"
          >
            <Link href="/projects">
              {t("seeProjects")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
