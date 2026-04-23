/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useInView } from "framer-motion";
import { Award, Star } from "lucide-react";
import { useRef } from "react";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLocale, useTranslations } from "next-intl";

// IconRenderer pour les logos tech
export function TechIconRenderer({
  name,
  className = "h-5 w-5",
  style,
}: {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const allIcons: Record<string, any> = { ...SiIcons, ...FaIcons };

  if (allIcons[name]) {
    const Icon = allIcons[name];
    return <Icon className={className} style={style} />;
  }

  // Fallback avec initiales
  const initials = name
    .replace(/^(Si|Fa)/, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(" ")
    .map((w) => w.charAt(0))
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div
      className={`${className} flex items-center justify-center bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg text-white font-bold`}
      style={{ fontSize: "60%" }}
      title={name}
    >
      {initials}
    </div>
  );
}

// IconRenderer pour Lucide (icônes UI)
export function IconRenderer({
  name,
  className = "h-5 w-5",
  style,
}: {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  // Pour ce composant, on garde la logique Lucide existante
  // ou on utilise un simple fallback
  const iconMap: Record<string, string> = {
    Code2: "FaCode",
    Server: "FaServer",
    Database: "FaDatabase",
    Cloud: "FaCloud",
  };

  const iconName = iconMap[name] || name;
  return (
    <TechIconRenderer name={iconName} className={className} style={style} />
  );
}

// Données des compétences avec logos tech et points forts
const skillsData = {
  categories: [
    {
      name: "Frontend",
      iconName: "FaCode",
      color: "#2563EB",
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
          name: "Tailwind CSS",
          icon: "SiTailwindcss",
          color: "#06B6D4",
          isStrength: false,
        },
        {
          name: "Shopify",
          icon: "SiShopify",
          color: "#96BF48",
          isStrength: false,
        },
        {
          name: "HTML/CSS",
          icon: "SiHtml5",
          color: "#E34F26",
          isStrength: false,
        },
      ],
    },
    {
      name: "Backend",
      iconName: "FaServer",
      color: "#22C55E",
      skills: [
        {
          name: "Node.js",
          icon: "SiNodedotjs",
          color: "#339933",
          isStrength: true,
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
        { name: "PHP", icon: "SiPhp", color: "#777BB4", isStrength: true },
        { name: ".NET", icon: "SiDotnet", color: "#512BD4", isStrength: true },
        {
          name: "Java",
          icon: "SiOpenjdk",
          color: "#ED8B00",
          isStrength: false,
        },
      ],
    },
    {
      name: "Base de données",
      iconName: "FaDatabase",
      color: "#A855F7",
      skills: [
        {
          name: "PostgreSQL",
          icon: "SiPostgresql",
          color: "#4169E1",
          isStrength: true,
        },
        { name: "MySQL", icon: "SiMysql", color: "#4479A1", isStrength: false },
        {
          name: "MongoDB",
          icon: "SiMongodb",
          color: "#47A248",
          isStrength: false,
        },
        {
          name: "SQLite",
          icon: "SiSqlite",
          color: "#003B57",
          isStrength: false,
        },
      ],
    },
    {
      name: "DevOps & Outils",
      iconName: "FaCloud",
      color: "#F59E0B",
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

// Carte skill individuelle
function SkillItem({
  skill,
  isInView,
  index,
}: {
  skill: (typeof skillsData.categories)[0]["skills"][0];
  isInView: boolean;
  index: number;
}) {
  const locale = useLocale();
  return (
    <div
      className={`
        group relative flex items-center gap-3 p-3 rounded-xl transition-all duration-300
        hover:bg-gray-50 dark:hover:bg-[#1a2230] hover:shadow-md
        ${
          skill.isStrength
            ? "bg-amber-50/50 dark:bg-amber-500/5 border border-amber-200/50 dark:border-amber-500/10"
            : "border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
        }
        transform transition-all duration-500
        ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Icône avec badge point fort */}
      <div className="relative flex-shrink-0">
        <div
          className={`
          w-10 h-10 rounded-lg flex items-center justify-center
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
            className="h-5 w-5"
            style={{ color: skill.color }}
          />
        </div>

        {/* Badge étoile point fort */}
        {skill.isStrength && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full flex items-center justify-center shadow-lg shadow-amber-400/30">
            <Star className="h-2.5 w-2.5 text-white fill-white" />
          </div>
        )}
      </div>

      {/* Nom et infos */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-800 dark:text-white truncate mb-0.5">
          {skill.name}
        </h4>

        {/* Indicateur de maîtrise */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-2.5 w-2.5 ${
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
            <span className="text-[10px] font-semibold text-amber-500">
              {locale === "fr" ? "Point fort" : "Strength"}
            </span>
          )}
        </div>
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
  const strengthsCount = category.skills.filter((s) => s.isStrength).length;

  return (
    <div
      ref={ref}
      style={{
        opacity: categoryInView ? 1 : 0,
        transform: categoryInView ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.5s ease-out ${index * 0.1}s`,
      }}
    >
      <Card className="bg-white/60 dark:bg-[#121826]/60 backdrop-blur-sm border border-gray-200 dark:border-[#1F2937] shadow-lg hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
        {/* Header de catégorie */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-gray-50 to-amber-50/50 dark:from-[#0B0F1A] dark:to-amber-500/3 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${category.color}15` }}
              >
                <TechIconRenderer
                  name={category.iconName}
                  className="h-4 w-4"
                  style={{ color: category.color }}
                />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
                  {category.name}
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  {category.skills.length} technologies
                </p>
              </div>
            </div>
            {strengthsCount > 0 && (
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-500/5 border border-amber-200/50 dark:border-amber-500/10">
                <Award className="h-3 w-3 text-amber-500" />
                <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400">
                  {strengthsCount}
                </span>
              </div>
            )}
          </div>
        </div>

        <CardContent className="p-3 sm:p-4">
          {/* Liste des compétences */}
          <div className="grid grid-cols-1 gap-1">
            {category.skills.map((skill, idx) => (
              <SkillItem
                key={skill.name}
                skill={skill}
                isInView={categoryInView && isInView}
                index={idx}
              />
            ))}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 justify-center">
            {category.skills.map((skill) => (
              <Badge
                key={skill.name}
                className={`text-[10px] px-2.5 py-1 transition-all hover:scale-105 cursor-default
                  ${
                    skill.isStrength
                      ? "bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-500/10 dark:to-yellow-500/10 text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-500/20 font-medium"
                      : "bg-gray-50 dark:bg-[#0B0F1A] text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-800"
                  }`}
              >
                <span className="flex items-center gap-1">
                  <TechIconRenderer name={skill.icon} className="h-3 w-3" />
                  <span className="font-medium">{skill.name}</span>
                  {skill.isStrength && (
                    <Star className="h-2 w-2 fill-amber-400 text-amber-400" />
                  )}
                </span>
              </Badge>
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
  const locale = useLocale();

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
            <TechIconRenderer
              name="FaCode"
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

        {/* Légende */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <div className="w-3.5 h-3.5 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full flex items-center justify-center">
              <Star className="h-2 w-2 text-white fill-white" />
            </div>
            <span>{locale === "fr" ? "Point fort" : "Strength"}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <div className="w-3.5 h-3.5 rounded-full bg-gray-200 dark:bg-gray-700" />
            <span>{locale === "fr" ? "En progression" : "In progress"}</span>
          </div>
        </div>

        {/* Note de bas */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {t("note")}
          </p>
        </div>
      </div>
    </section>
  );
}
