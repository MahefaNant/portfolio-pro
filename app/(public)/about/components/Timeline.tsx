"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IconRenderer } from "@/components/ui/icon-renderer";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";

// Données des expériences
const experiencesData = {
  experiences: [
    {
      titleFr: "Développeur Fullstack Freelance",
      titleEn: "Fullstack Developer",
      company: "Indépendant",
      location: "Remote",
      period: "2022 - Présent",
      type: "Freelance",
      descriptionFr: [
        "Développement d'applications web complètes pour divers clients",
        "Stack technique : Next.js, React, Node.js, Laravel, PostgreSQL",
        "Gestion de projet et relation client directe",
        "Déploiement et maintenance des applications",
      ],
      descriptionEn: [
        "Development of complete web applications for various clients",
        "Technical stack: Next.js, React, Node.js, Laravel, PostgreSQL",
        "Project management and direct customer relations",
        "Deployment and maintenance of applications",
      ],
      technologies: [
        "Next.js",
        "React",
        "Node.js",
        "Laravel",
        "Tailwind",
        "PostgreSQL",
      ],
    },
    {
      titleFr: "Développeur Frontend",
      titleEn: "Frontend Developer",
      company: "TechCorp Madagascar",
      location: "Antananarivo",
      period: "2021 - 2022",
      type: "CDI",
      descriptionFr: [
        "Création d'interfaces utilisateur modernes et responsives",
        "Collaboration avec l'équipe design et backend",
        "Optimisation des performances et SEO",
        "Mise en place de tests unitaires",
      ],
      descriptionEn: [
        "Creation of modern and responsive user interfaces",
        "Collaboration with the design and backend team",
        "Performance and SEO optimization",
        "Implementation of unit tests",
      ],
      technologies: ["React", "TypeScript", "Tailwind", "Redux", "Jest"],
    },
    {
      titleFr: "Stagiaire Développeur Web",
      titleEn: "Web Developer Intern",
      company: "Digital Solutions",
      location: "Antananarivo",
      period: "2020 - 2021",
      type: "Stage",
      descriptionFr: [
        "Développement de sites vitrines et e-commerce",
        "Maintenance et évolution d'applications existantes",
        "Intégration de maquettes Photoshop/Figma",
        "Formation aux bonnes pratiques de développement",
      ],
      descriptionEn: [
        "Development of showcase sites and e-commerce",
        "Maintenance and evolution of existing applications",
        "Integration of Photoshop/Figma mockups",
        "Training in development best practices",
      ],
      technologies: ["PHP", "JavaScript", "MySQL", "Bootstrap", "jQuery"],
    },
  ],
};

// Composant carte expérience
function ExperienceItem({
  experience,
  index,
}: {
  experience: (typeof experiencesData.experiences)[0];
  index: number;
}) {
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Couleur selon le type
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Freelance":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
      case "CDI":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "Stage":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div
      ref={ref}
      className="relative pl-6 sm:pl-8 pb-8 last:pb-0"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateX(0)" : "translateX(-20px)",
        transition: `all 0.5s ease-out ${index * 0.15}s`,
      }}
    >
      {/* Ligne verticale de timeline */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#2563EB] via-[#2563EB]/50 to-transparent" />

      {/* Point de timeline */}
      <div className="absolute left-[-5px] top-4 w-2.5 h-2.5 rounded-full bg-[#2563EB] ring-4 ring-[#2563EB]/20" />

      <Card className="bg-white/50 dark:bg-[#121826]/50 backdrop-blur-sm border border-gray-200 dark:border-[#1F2937] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <CardContent className="p-5 sm:p-6">
          {/* En-tête */}
          <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {locale === "fr" ? experience.titleFr : experience.titleEn}
                </h3>
                <Badge className={`${getTypeColor(experience.type)} border`}>
                  {experience.type}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <IconRenderer name="Building" className="h-3.5 w-3.5" />
                  <span>{experience.company}</span>
                </div>
                <div className="flex items-center gap-1">
                  <IconRenderer name="MapPin" className="h-3.5 w-3.5" />
                  <span>{experience.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <IconRenderer name="Calendar" className="h-3.5 w-3.5" />
                  <span>{experience.period}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4 mt-3">
            <ul className="space-y-1.5">
              {(locale === "fr"
                ? experience.descriptionFr
                : experience.descriptionEn
              ).map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  <IconRenderer
                    name="ChevronRight"
                    className="h-3.5 w-3.5 mt-0.5 text-[#2563EB]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-[#1F2937]">
            {experience.technologies.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-xs bg-gray-50 dark:bg-[#0B0F1A]"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function Timeline() {
  const t = useTranslations("About.Timeline");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
    >
      {/* Background décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#2563EB]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-[#22C55E]/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.02] dark:opacity-[0.03]" />
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
              name="Briefcase"
              className="h-3 w-3 sm:h-4 sm:w-4 text-[#2563EB]"
            />
            <span className="text-[10px] sm:text-xs font-medium text-[#2563EB] dark:text-[#3B82F6] uppercase tracking-wider">
              Parcours
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {t("title")}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{t("subtitle")}</p>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          {experiencesData.experiences.map((exp, index) => (
            <ExperienceItem key={index} experience={exp} index={index} />
          ))}
        </div>

        {/* Note de bas */}
        <div className="text-center mt-10">
          <div className="inline-flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
            <IconRenderer name="Calendar" className="h-3 w-3" />
            <span>{t("note")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
