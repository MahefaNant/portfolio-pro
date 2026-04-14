"use client";

import { useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IconRenderer } from "@/components/ui/icon-renderer";
import { useLocale, useTranslations } from "next-intl";

// Données temporaires (à remplacer par API)
const skillsData = {
  categories: [
    {
      id: "backend",
      nameFr: "Backend",
      nameEn: "Backend",
      icon: "Server",
      skills: [
        { name: "Node.js", level: 80, color: "#339933", years: 3 },
        { name: "Laravel", level: 75, color: "#FF2D20", years: 2 },
        { name: "Python", level: 70, color: "#3776AB", years: 2 },
        { name: "PostgreSQL", level: 80, color: "#4169E1", years: 3 },
      ],
    },
    {
      id: "frontend",
      nameFr: "Frontend",
      nameEn: "Frontend",
      icon: "Code2",
      skills: [
        { name: "Next.js", level: 90, color: "#000000", years: 3 },
        { name: "React", level: 85, color: "#61DAFB", years: 4 },
        { name: "TypeScript", level: 85, color: "#3178C6", years: 3 },
        { name: "Tailwind CSS", level: 90, color: "#06B6D4", years: 3 },
        { name: "Shadcn/ui", level: 85, color: "#FFFFFF", years: 2 },
      ],
    },

    {
      id: "devops",
      nameFr: "DevOps",
      nameEn: "DevOps",
      icon: "Cloud",
      skills: [
        { name: "Docker", level: 75, color: "#2496ED", years: 2 },
        { name: "Git/GitHub", level: 90, color: "#F05032", years: 4 },
        { name: "Vercel", level: 85, color: "#000000", years: 3 },
        { name: "Supabase", level: 80, color: "#3ECF8E", years: 2 },
      ],
    },
  ],
};

// Composant pour une barre de progression animée
function SkillBar({
  name,
  level,
  color,
  years,
  isInView,
}: {
  name: string;
  level: number;
  color: string;
  years: number;
  isInView: boolean;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setWidth(level), 200);
      return () => clearTimeout(timer);
    }
  }, [isInView, level]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            {name}
          </span>
          <Badge
            variant="outline"
            className="text-[10px] sm:text-xs px-1.5 sm:px-2"
          >
            {years} {years > 1 ? "ans" : "an"}
          </Badge>
        </div>
        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-mono">
          {width}%
        </span>
      </div>
      <div className="h-2 bg-gray-100 dark:bg-[#121826] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${width}%`,
            backgroundColor: color,
            boxShadow: isInView ? `0 0 8px ${color}80` : "none",
          }}
        />
      </div>
    </div>
  );
}

// Composant bouton de tab (mobile-friendly)
function TabButton({
  category,
  isActive,
  onClick,
}: {
  category: (typeof skillsData.categories)[0];
  isActive: boolean;
  onClick: () => void;
}) {
  const locale = useLocale();
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl
        transition-all duration-300 cursor-pointer touch-manipulation
        ${
          isActive
            ? "bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/30 scale-[1.02]"
            : "bg-gray-100 dark:bg-[#121826] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#1a2230] hover:scale-[1.01]"
        }
      `}
      aria-pressed={isActive}
      aria-label={`Onglet ${locale === "fr" ? category.nameFr : category.nameEn}`}
    >
      <IconRenderer
        name={category.icon}
        className={`h-4 w-4 sm:h-5 sm:w-5 ${isActive ? "text-white" : ""}`}
      />
      <span className="text-sm sm:text-base font-medium">
        {locale === "fr" ? category.nameFr : category.nameEn}
      </span>
    </button>
  );
}

export function Skills() {
  const locale = useLocale();
  const t = useTranslations("Home.Skills");
  const [activeTab, setActiveTab] = useState("backend");
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);

  // Détecter mobile pour le carrousel
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const categories = skillsData.categories;
  const activeCategory = categories.find((c) => c.id === activeTab)!;
  const skillsList = activeCategory.skills;

  // Navigation carrousel mobile
  const nextTab = () => {
    const newIndex = (currentIndex + 1) % categories.length;
    setCurrentIndex(newIndex);
    setActiveTab(categories[newIndex].id);
  };

  const prevTab = () => {
    const newIndex = (currentIndex - 1 + categories.length) % categories.length;
    setCurrentIndex(newIndex);
    setActiveTab(categories[newIndex].id);
  };

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Background décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#2563EB]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-[#22C55E]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 dark:bg-[#2563EB]/15 border border-[#2563EB]/20 mb-4">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-[#2563EB]" />
            <span className="text-[10px] sm:text-xs font-medium text-[#2563EB] dark:text-[#3B82F6] uppercase tracking-wider">
              Expertise
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {t("title")}
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 px-4">
            {t("subtitle")}
          </p>
        </div>

        {/* Version Desktop : Tabs horizontales */}
        <div className="hidden md:block max-w-3xl mx-auto mb-8">
          <div className="flex justify-center gap-2">
            {categories.map((category) => (
              <TabButton
                key={category.id}
                category={category}
                isActive={activeTab === category.id}
                onClick={() => setActiveTab(category.id)}
              />
            ))}
          </div>
        </div>

        {/* Version Mobile : Carrousel avec navigation */}
        <div className="md:hidden mb-6">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={prevTab}
              className="p-2 rounded-full bg-gray-100 dark:bg-[#121826] active:bg-gray-200 dark:active:bg-[#1a2230] transition-colors cursor-pointer touch-manipulation"
              aria-label="Onglet précédent"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>

            <div className="flex-1">
              <div className="bg-gray-100 dark:bg-[#121826] rounded-xl p-1">
                <div className="flex justify-between items-center px-4 py-2">
                  <div className="flex items-center gap-2">
                    <IconRenderer
                      name={activeCategory.icon}
                      className="h-5 w-5 text-[#2563EB]"
                    />
                    <span className="font-semibold text-base text-gray-800 dark:text-white">
                      {locale === "fr"
                        ? activeCategory.nameFr
                        : activeCategory.nameEn}
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {currentIndex + 1} / {categories.length}
                  </Badge>
                </div>
              </div>
            </div>

            <button
              onClick={nextTab}
              className="p-2 rounded-full bg-gray-100 dark:bg-[#121826] active:bg-gray-200 dark:active:bg-[#1a2230] transition-colors cursor-pointer touch-manipulation"
              aria-label="Next tab"
            >
              <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Indicateurs de page */}
          <div className="flex justify-center gap-1.5 mt-4">
            {categories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setActiveTab(categories[idx].id);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer touch-manipulation ${
                  currentIndex === idx
                    ? "w-6 bg-[#2563EB]"
                    : "w-1.5 bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to tab ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Contenu des skills */}
        <div className="max-w-4xl mx-auto mt-6 sm:mt-8">
          <Card className="bg-white/50 dark:bg-[#121826]/50 backdrop-blur-sm border border-gray-200 dark:border-[#1F2937] shadow-xl">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              {/* Grille responsive : 1 colonne mobile, 2 colonnes desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Première colonne (moitié des skills) */}
                <div className="space-y-5 sm:space-y-6">
                  {skillsList
                    .slice(0, Math.ceil(skillsList.length / 2))
                    .map((skill, idx) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        color={skill.color}
                        years={skill.years}
                        isInView={isInView}
                      />
                    ))}
                </div>
                {/* Deuxième colonne */}
                <div className="space-y-5 sm:space-y-6">
                  {skillsList
                    .slice(Math.ceil(skillsList.length / 2))
                    .map((skill, idx) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        color={skill.color}
                        years={skill.years}
                        isInView={isInView}
                      />
                    ))}
                </div>
              </div>

              {/* Badges : wrap sur mobile */}
              <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200 dark:border-[#1F2937]">
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                  {skillsList.map((skill) => (
                    <Badge
                      key={skill.name}
                      variant="secondary"
                      className="px-2.5 sm:px-3 py-1 text-xs sm:text-sm text-black dark:text-white bg-gray-100 dark:bg-[#0B0F1A] hover:scale-105 transition-transform cursor-pointer touch-manipulation"
                      style={{
                        borderLeft: `3px solid ${skill.color}`,
                      }}
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 sm:mt-10 lg:mt-12">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {t("footer")}
          </p>
        </div>
      </div>
    </section>
  );
}
