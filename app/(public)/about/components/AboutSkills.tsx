"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IconRenderer } from "@/components/ui/icon-renderer";
import { useTranslations } from "next-intl";

// Données des compétences
const skillsData = {
  categories: [
    {
      name: "Frontend",
      iconName: "Code2",
      color: "#2563EB",
      skills: [
        { name: "Next.js", level: 90, years: 3 },
        { name: "React", level: 85, years: 4 },
        { name: "TypeScript", level: 85, years: 3 },
        { name: "Tailwind CSS", level: 90, years: 3 },
        { name: "HTML/CSS", level: 95, years: 5 },
      ],
    },
    {
      name: "Backend",
      iconName: "Server",
      color: "#22C55E",
      skills: [
        { name: "Node.js", level: 80, years: 3 },
        { name: "Laravel", level: 75, years: 2 },
        { name: "Python", level: 70, years: 2 },
        { name: "PHP", level: 75, years: 3 },
      ],
    },
    {
      name: "Base de données",
      iconName: "Database",
      color: "#A855F7",
      skills: [
        { name: "PostgreSQL", level: 80, years: 3 },
        { name: "MySQL", level: 75, years: 3 },
        { name: "MongoDB", level: 65, years: 1 },
        { name: "Supabase", level: 80, years: 2 },
      ],
    },
    {
      name: "DevOps & Outils",
      iconName: "Cloud",
      color: "#F59E0B",
      skills: [
        { name: "Git/GitHub", level: 90, years: 4 },
        { name: "Docker", level: 70, years: 2 },
        { name: "Vercel", level: 85, years: 3 },
        { name: "CI/CD", level: 70, years: 2 },
      ],
    },
  ],
};

// Composant barre de compétence
function SkillBar({
  name,
  level,
  years,
  color,
  index,
  isInView,
}: {
  name: string;
  level: number;
  years: number;
  color: string;
  index: number;
  isInView: boolean;
}) {
  const t = useTranslations("About.AboutSkills");
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setWidth(level), 100 + index * 50);
      return () => clearTimeout(timer);
    }
  }, [isInView, level, index]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {name}
          </span>
          <Badge variant="outline" className="text-[10px] px-1.5">
            {years} {t("years")}
          </Badge>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
          {width}%
        </span>
      </div>
      <div className="h-2 bg-gray-100 dark:bg-[#121826] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${width}%`,
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}80`,
          }}
        />
      </div>
    </div>
  );
}

// Composant carte catégorie
function SkillCategory({
  category,
  index,
  isInView,
}: {
  category: (typeof skillsData.categories)[0];
  index: number;
  isInView: boolean;
}) {
  const ref = useRef(null);
  const categoryInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div
      ref={ref}
      style={{
        opacity: categoryInView ? 1 : 0,
        transform: categoryInView ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.5s ease-out ${index * 0.1}s`,
      }}
    >
      <Card className="bg-white/50 dark:bg-[#121826]/50 backdrop-blur-sm border border-gray-200 dark:border-[#1F2937] shadow-lg hover:shadow-xl transition-all duration-300 h-full">
        <CardContent className="p-5 sm:p-6">
          {/* En-tête de catégorie */}
          <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-200 dark:border-[#1F2937]">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${category.color}15` }}
            >
              <IconRenderer
                name={category.iconName}
                className="h-5 w-5"
                style={{ color: category.color }}
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {category.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {category.skills.length} technologies
              </p>
            </div>
          </div>

          {/* Liste des compétences */}
          <div className="space-y-4">
            {category.skills.map((skill, idx) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                years={skill.years}
                color={category.color}
                index={idx}
                isInView={categoryInView && isInView}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function AboutSkills() {
  const t = useTranslations("About.AboutSkills");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="skills"
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
    >
      {/* Background décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#2563EB]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#22C55E]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className="text-center max-w-2xl mx-auto mb-12 transition-all duration-700"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 dark:bg-[#2563EB]/15 border border-[#2563EB]/20 mb-4">
            <IconRenderer
              name="Code2"
              className="h-3 w-3 sm:h-4 sm:w-4 text-[#2563EB]"
            />
            <span className="text-[10px] sm:text-xs font-medium text-[#2563EB] dark:text-[#3B82F6] uppercase tracking-wider">
              Expertise
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {t("title")}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{t("subtitle")}</p>
        </div>

        {/* Grille des compétences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {skillsData.categories.map((category, index) => (
            <SkillCategory
              key={category.name}
              category={category}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Note de bas */}
        <div className="text-center mt-10">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {t("note")}
          </p>
        </div>
      </div>
    </section>
  );
}
