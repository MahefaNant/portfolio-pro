"use client";

import { ArrowRight, ChevronRight, Sparkles, Terminal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconRenderer } from "@/components/ui/icon-renderer";
import { useLocale, useTranslations } from "next-intl";

// Données temporaires (à remplacer par API plus tard)
const heroData = {
  name: "Mahefa",
  title: { fr: "Développeur Fullstack", en: "Fullstack Developer" },
  description: {
    fr: "Je crée des applications web modernes, performantes et élégantes. Spécialisé dans l'écosystème Next.js et l'expérience utilisateur.",
    en: "I build modern, performant and elegant web applications. Specialized in Next.js ecosystem and user experience.",
  },
  stats: [
    {
      value: "4+",
      labelFr: "Années d'expérience",
      labelEn: "Years experience",
    },
    {
      value: "20+",
      labelFr: "Projets réalisés",
      labelEn: "Projects completed",
    },
    {
      value: "100%",
      labelFr: "Satisfaction client",
      labelEn: "Client satisfaction",
    },
  ],
  techStack: ["Next.js", "Nest.js", "Laravel", ".NET", "Shopify"],
};

export function Hero() {
  const t = useTranslations("Home.Hero");
  const locale = useLocale();
  const [imageLoading, setImageLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const gradientStyle = {
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
      rgba(37, 99, 235, 0.15) 20%, 
      rgba(37, 99, 235, 0.05) 20%,
      transparent 10%)`,
  };

  const socialLinks = [
    { icon: "Github", href: "https://github.com/mahefanant", label: "GitHub" },
    {
      icon: "Linkedin",
      href: "https://www.linkedin.com/in/mahefa-nantenaina-419a98271",
      label: "LinkedIn",
    },
    { icon: "Mail", href: "mailto:[EMAIL_ADDRESS]", label: "Email" },
  ];

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      {/* Effet de fond animé (INCHANGÉ) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2563EB]/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2563EB]/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={gradientStyle}
        />
        <div className="absolute inset-0 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] dark:opacity-[0.05]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN - INCHANGÉE DANS LE CONTENU TEXTUEL MAIS ALLÉGÉE DES STATS */}
          <div className="space-y-6 lg:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                {t("common.available")}
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 font-medium">
                {t("greeting")}
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                  {heroData.name}
                </span>
              </h1>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2563EB] dark:text-[#3B82F6]">
                {locale === "fr" ? heroData.title.fr : heroData.title.en}
              </h2>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-lg">
              {locale === "fr"
                ? heroData.description.fr
                : heroData.description.en}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="group">
                <Link href="/projects">
                  {t("common.seeProjects")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">
                  {t("common.contactMe")}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Social Links - Déplacé ici pour remplir l'espace laissé par les stats */}
            <div className="flex gap-3 pt-8">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-100 dark:bg-[#1d1d1d] text-gray-600 dark:text-gray-400 hover:bg-[#2563EB] hover:text-white dark:hover:bg-[#2563EB] transition-all duration-300"
                  aria-label={social.label}
                >
                  <IconRenderer name={social.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN - REDESIGNÉE POUR PLUS DE DENSITÉ */}
          <div className="relative flex flex-col items-center lg:items-end gap-8">
            {/* Bloc Visuel Principal (Image) */}
            <div className="relative group w-full flex justify-center lg:justify-end">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
                {/* Gradient de fond (Lueur) */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />

                {/* Conteneur Image */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-[#121826] shadow-2xl z-10">
                  {imageLoading && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/20 to-[#1E3A8A]/20 animate-pulse" />
                      <div className="absolute inset-0 rounded-full border-2 border-[#2563EB]/30 animate-ping" />
                      <div
                        className="absolute inset-0 rounded-full border-2 border-t-[#2563EB] border-r-transparent border-b-transparent border-l-transparent animate-spin"
                        style={{ animationDuration: "1.5s" }}
                      />
                      <div
                        className="absolute inset-2 rounded-full border-2 border-t-transparent border-r-[#3B82F6] border-b-transparent border-l-transparent animate-spin"
                        style={{
                          animationDuration: "2s",
                          animationDirection: "reverse",
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
                        </div>
                      </div>
                    </>
                  )}

                  <Image
                    src="https://res.cloudinary.com/dsggicjk3/image/upload/f_auto,q_auto,w_800/IMG_20260414_100931_wscp4z.png"
                    alt="Mahefa"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    onLoadingComplete={() => setImageLoading(false)}
                    className={`object-cover transition-all duration-700 ${
                      imageLoading
                        ? "opacity-0 scale-105"
                        : "opacity-100 scale-100"
                    }`}
                  />
                </div>

                {/* Anneau décoratif - Maintenant centré et proportionnel */}
                <div
                  className="absolute -inset-4 rounded-full border-2 border-dashed border-[#2563EB]/30 animate-spin pointer-events-none"
                  style={{ animationDuration: "20s" }}
                />
              </div>
            </div>

            {/* DASHBOARD DE STATS ET TECH - AJOUTÉ POUR COMBLER LE VIDE */}
            <div className="w-full max-w-md space-y-6 lg:pr-4">
              {/* Carte "En bref" avec icône */}
              <div className="bg-white/40 dark:bg-[#0B0F1A]/40 backdrop-blur-md rounded-3xl p-6 border border-gray-200/50 dark:border-[#1F2937]/50 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-[#2563EB]" />
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider text-xs">
                    {locale === "fr" ? "En bref" : "At a glance"}
                  </h3>
                </div>

                {/* Stats dans une grille horizontale */}
                <div className="grid grid-cols-3 gap-2">
                  {heroData.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                        {locale === "fr" ? stat.labelFr : stat.labelEn}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carte Tech Stack */}
              <div className="bg-white/40 dark:bg-[#0B0F1A]/40 backdrop-blur-md rounded-3xl p-6 border border-gray-200/50 dark:border-[#1F2937]/50 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Terminal className="h-5 w-5 text-[#2563EB]" />
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider text-xs">
                    {locale === "fr" ? "Stack Technique" : "Tech Stack"}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {heroData.techStack.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-sm py-1.5 px-4 bg-gray-100/80 dark:bg-[#1F2937]/80 border-0 font-medium"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator (INCHANGÉ) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block">
        <div className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-[#2563EB] rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
