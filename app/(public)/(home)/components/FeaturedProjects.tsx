"use client";

import { useInView } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  Github,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { useLocale, useTranslations } from "next-intl";

// Données temporaires
const featuredProjectsData = {
  projects: [
    {
      id: "1",
      titleFr: "Plateforme E-commerce Next.js",
      titleEn: "E-commerce Platform Next.js",
      descriptionFr:
        "Plateforme e-commerce complète avec panier, paiement Stripe, dashboard admin et système de notation.",
      descriptionEn:
        "Complete e-commerce platform with cart, Stripe payment, admin dashboard and rating system.",
      imageUrl: "https://placehold.co/600x400/1E3A8A/FFFFFF?text=E-commerce",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind",
        "Stripe",
        "PostgreSQL",
      ],
      githubUrl: "https://github.com/mahefa/ecommerce",
      liveUrl: "https://ecommerce-demo.vercel.app",
      category: "fullstack",
    },
    {
      id: "2",
      titleFr: "Dashboard Analytics SaaS",
      titleEn: "Dashboard Analytics SaaS",
      descriptionFr:
        "Dashboard analytics temps réel avec graphiques interactifs, export PDF et webhooks.",
      descriptionEn:
        "Real-time analytics dashboard with interactive charts, PDF export and webhooks.",
      imageUrl: "https://placehold.co/600x400/2563EB/FFFFFF?text=Dashboard",
      technologies: ["React", "Recharts", "Node.js", "WebSocket", "Redis"],
      githubUrl: "https://github.com/mahefa/dashboard",
      liveUrl: "https://dashboard-demo.vercel.app",
      category: "frontend",
    },
    {
      id: "3",
      titleFr: "API REST Laravel + Documentation",
      titleEn: "Laravel API + Documentation",
      descriptionFr:
        "API REST complète avec authentification JWT, rate limiting, documentation Swagger et tests unitaires.",
      descriptionEn:
        "Complete REST API with JWT authentication, rate limiting, Swagger documentation and unit tests.",
      imageUrl: "https://placehold.co/600x400/FF2D20/FFFFFF?text=Laravel+API",
      technologies: ["Laravel", "PHP", "MySQL", "Swagger", "JWT"],
      githubUrl: "https://github.com/mahefa/laravel-api",
      liveUrl: "https://api-demo.vercel.app/docs",
      category: "backend",
    },
  ],
};

// Composant carte projet
function ProjectCard({
  project,
  index,
}: {
  project: (typeof featuredProjectsData.projects)[0];
  index: number;
}) {
  const locale = useLocale();
  const t = useTranslations("Home.FeaturedProjects");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="group relative bg-white dark:bg-[#121826] rounded-xl overflow-hidden border border-gray-200 dark:border-[#1F2937] shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.5s ease-out ${index * 0.1}s`,
      }}
    >
      {/* Image du projet */}
      <div className="relative h-48 sm:h-56 overflow-hidden bg-linear-to-br from-[#2563EB]/20 to-[#1E3A8A]/20">
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        <div className="absolute inset-0 flex items-center justify-center gap-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/90 dark:bg-[#0B0F1A]/90 rounded-full hover:bg-white dark:hover:bg-[#0B0F1A] hover:scale-110 transition-all"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 text-gray-800 dark:text-white" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#2563EB] rounded-full hover:bg-[#3B82F6] hover:scale-110 transition-all"
              aria-label="Live demo"
            >
              <ExternalLink className="h-5 w-5 text-white" />
            </a>
          )}
        </div>
        <div className="w-full h-full bg-linear-to-br from-[#2563EB] to-[#1E3A8A] flex items-center justify-center">
          <Code2 className="h-16 w-16 text-white/20" />
        </div>
      </div>

      <CardContent className="p-5 sm:p-6">
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
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {locale === "fr" ? project.descriptionFr : project.descriptionEn}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-xs bg-gray-50 dark:bg-[#0B0F1A]"
            >
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{project.technologies.length - 4}
            </Badge>
          )}
        </div>

        {/* Lien voir plus */}
        <Link
          href={`/projects/${project.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-[#2563EB] dark:text-[#3B82F6] hover:gap-2 transition-all"
        >
          {t("seeProjects")}
          <ArrowRight className="h-4 w-4" />
        </Link>
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
