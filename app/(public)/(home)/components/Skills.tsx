"use client";

import { useInView } from "framer-motion";
import { Award, ChevronLeft, ChevronRight, Sparkles, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { TechIconRenderer } from "@/components/TechIconRenderer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLocale, useTranslations } from "next-intl";

// Données
const skillsData = {
  categories: [
    {
      id: "backend",
      nameFr: "Backend",
      nameEn: "Backend",
      icon: "FaServer",
      skills: [
        {
          name: "Nest.js",
          icon: "SiNestjs",
          color: "#E0234E",
          isStrength: true,
        },
        {
          name: "Express.js",
          icon: "SiExpress",
          color: "#000000",
          isStrength: false,
        },
        {
          name: "Laravel",
          icon: "SiLaravel",
          color: "#FF2D20",
          isStrength: true,
        },
        {
          name: "Python",
          icon: "SiPython",
          color: "#3776AB",
          isStrength: false,
        },
        {
          name: "PostgreSQL",
          icon: "SiPostgresql",
          color: "#4169E1",
          isStrength: true,
        },
        { name: "MySQL", icon: "SiMysql", color: "#4479A1", isStrength: false },
      ],
    },
    {
      id: "frontend",
      nameFr: "Frontend",
      nameEn: "Frontend",
      icon: "FaCode",
      skills: [
        {
          name: "Next.js",
          icon: "SiNextdotjs",
          color: "#000000",
          isStrength: true,
        },
        { name: "React", icon: "SiReact", color: "#61DAFB", isStrength: true },
        {
          name: "TypeScript",
          icon: "SiTypescript",
          color: "#3178C6",
          isStrength: true,
        },
        {
          name: "Shopify",
          icon: "SiShopify",
          color: "#96BF48",
          isStrength: false,
        },
        {
          name: "Tailwind CSS",
          icon: "SiTailwindcss",
          color: "#06B6D4",
          isStrength: false,
        },
      ],
    },
    {
      id: "devops",
      nameFr: "DevOps",
      nameEn: "DevOps",
      icon: "FaCloud",
      skills: [
        {
          name: "Git/GitHub",
          icon: "SiGithub",
          color: "#F05032",
          isStrength: true,
        },
        {
          name: "Gitlab",
          icon: "SiGitlab",
          color: "#FC6D26",
          isStrength: false,
        },
        {
          name: "Docker",
          icon: "SiDocker",
          color: "#2496ED",
          isStrength: false,
        },
      ],
    },
  ],
};

// Carte skill - Design équilibré
function SkillItem({
  skill,
  isInView,
  index,
}: {
  skill: (typeof skillsData.categories)[0]["skills"][0];
  isInView: boolean;
  index: number;
}) {
  return (
    <div
      className={`
        group relative flex items-center gap-3 p-3.5 rounded-xl transition-all duration-300
        hover:bg-gray-50 dark:hover:bg-[#1a2230] hover:shadow-md
        ${
          skill.isStrength
            ? "bg-amber-50/50 dark:bg-amber-500/5 border border-amber-200/50 dark:border-amber-500/10"
            : "border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
        }
        transform transition-all duration-500
        ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Icône avec badge point fort */}
      <div className="relative flex-shrink-0">
        <div
          className={`
          w-11 h-11 rounded-xl flex items-center justify-center
          transition-all duration-300 group-hover:scale-110
          ${
            skill.isStrength
              ? "bg-white dark:bg-amber-500/10 shadow-md"
              : "bg-white dark:bg-[#121826] shadow-sm"
          }
        `}
        >
          <TechIconRenderer
            name={skill.icon}
            className="h-6 w-6"
            style={{ color: skill.color }}
          />
        </div>

        {/* Badge étoile point fort */}
        {skill.isStrength && (
          <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full flex items-center justify-center shadow-lg shadow-amber-400/30">
            <Star className="h-3 w-3 text-white fill-white" />
          </div>
        )}
      </div>

      {/* Nom et infos */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white truncate mb-0.5">
          {skill.name}
        </h4>

        {/* Indicateur de maîtrise */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  skill.isStrength
                    ? "text-amber-400 fill-amber-400"
                    : i < 3
                      ? "text-gray-300 dark:text-gray-600 fill-gray-300 dark:fill-gray-600"
                      : "text-gray-200 dark:text-gray-700 fill-gray-200 dark:fill-gray-700"
                }`}
              />
            ))}
          </div>
          {skill.isStrength && (
            <span className="text-[11px] font-semibold text-amber-500">
              Point fort
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function Skills() {
  const locale = useLocale();
  const t = useTranslations("Home.Skills");
  const [activeTab, setActiveTab] = useState("backend");
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const categories = skillsData.categories;
  const activeCategory = categories.find((c) => c.id === activeTab)!;
  const strengthsCount = activeCategory.skills.filter(
    (s) => s.isStrength,
  ).length;

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
      id="skills"
      ref={ref}
      className="py-16 sm:py-20 lg:py-28 relative overflow-hidden"
    >
      {/* Background décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#2563EB]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-amber-400/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 dark:bg-[#2563EB]/15 border border-[#2563EB]/20 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-[#2563EB]" />
            <span className="text-xs font-medium text-[#2563EB] dark:text-[#3B82F6] uppercase tracking-wider">
              {t("title")}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {t("subtitle")}
            </span>
          </h2>
        </div>

        {/* Tabs Desktop */}
        <div className="hidden md:flex justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                setCurrentIndex(categories.indexOf(cat));
              }}
              className={`
                flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300
                ${
                  activeTab === cat.id
                    ? "bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/20 scale-[1.02]"
                    : "bg-gray-100 dark:bg-[#121826] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#1a2230] hover:scale-[1.01]"
                }
              `}
            >
              <TechIconRenderer
                name={cat.icon}
                className={`h-4 w-4 ${activeTab === cat.id ? "text-white" : ""}`}
              />
              <span>{locale === "fr" ? cat.nameFr : cat.nameEn}</span>
            </button>
          ))}
        </div>

        {/* Tabs Mobile */}
        {isMobile && (
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={prevTab}
              className="p-2.5 rounded-full bg-gray-100 dark:bg-[#121826] active:bg-gray-200 dark:active:bg-[#1a2230] transition-colors touch-manipulation"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>

            <div className="flex-1 bg-gray-100 dark:bg-[#121826] rounded-xl px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <TechIconRenderer
                  name={activeCategory.icon}
                  className="h-5 w-5 text-[#2563EB]"
                />
                <span className="font-semibold text-sm">
                  {locale === "fr"
                    ? activeCategory.nameFr
                    : activeCategory.nameEn}
                </span>
              </div>
              <Badge variant="secondary" className="text-[10px]">
                {currentIndex + 1}/{categories.length}
              </Badge>
            </div>

            <button
              onClick={nextTab}
              className="p-2.5 rounded-full bg-gray-100 dark:bg-[#121826] active:bg-gray-200 dark:active:bg-[#1a2230] transition-colors touch-manipulation"
            >
              <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        )}

        {/* Indicateurs mobile */}
        {isMobile && (
          <div className="flex justify-center gap-1.5 mb-4">
            {categories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setActiveTab(categories[idx].id);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? "w-6 bg-[#2563EB]"
                    : "w-1.5 bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        )}

        {/* Skills Grid */}
        <div className="max-w-3xl mx-auto">
          <Card className="bg-white/60 dark:bg-[#121826]/60 backdrop-blur-sm border border-gray-200 dark:border-[#1F2937] shadow-xl overflow-hidden">
            {/* Header card */}
            <div className="px-5 sm:px-6 py-3.5 bg-gradient-to-r from-gray-50 to-amber-50/50 dark:from-[#0B0F1A] dark:to-amber-500/3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <TechIconRenderer
                    name={activeCategory.icon}
                    className="h-4.5 w-4.5 text-[#2563EB]"
                  />
                  <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                    {activeCategory.skills.length} technologies
                  </span>
                </div>
                {strengthsCount > 0 && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-500/5 border border-amber-200/50 dark:border-amber-500/10">
                    <Award className="h-3.5 w-3.5 text-amber-500" />
                    <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                      {strengthsCount} point{strengthsCount > 1 ? "s" : ""} fort
                      {strengthsCount > 1 ? "s" : ""}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <CardContent className="p-4 sm:p-5">
              {/* Liste complète des skills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {activeCategory.skills.map((skill, index) => (
                  <SkillItem
                    key={skill.name}
                    skill={skill}
                    isInView={isInView}
                    index={index}
                  />
                ))}
              </div>

              {/* Badges rapides */}
              <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 justify-center">
                {activeCategory.skills.map((skill) => (
                  <Badge
                    key={skill.name}
                    className={`text-[11px] px-3 py-1.5 transition-all hover:scale-105 cursor-default
                      ${
                        skill.isStrength
                          ? "bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-500/10 dark:to-yellow-500/10 text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-500/20 font-medium"
                          : "bg-gray-50 dark:bg-[#0B0F1A] text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-800"
                      }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <TechIconRenderer name={skill.icon} className="h-3 w-3" />
                      <span className="font-medium">{skill.name}</span>
                      {skill.isStrength && (
                        <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                      )}
                    </span>
                  </Badge>
                ))}
              </div>

              {/* Légende */}
              <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <div className="w-4 h-4 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full flex items-center justify-center">
                    <Star className="h-2.5 w-2.5 text-white fill-white" />
                  </div>
                  <span>Point fort</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <span>En progression</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
