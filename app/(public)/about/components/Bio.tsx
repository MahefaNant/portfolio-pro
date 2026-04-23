"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IconRenderer } from "@/components/ui/icon-renderer";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";

// Données temporaires
const bioData = {
  description: {
    fr: "Développeur full-stack avec plusieurs années d’expérience, je conçois et développe des applications web et mobiles robustes, en mettant l’accent sur la performance, la maintenabilité et l’expérience utilisateur. J’ai travaillé sur des projets variés tels que des plateformes e-commerce, des applications de gestion et des solutions métier, en utilisant des technologies modernes comme Next.js, ASP.NET Core et React Native.",
    en: "As a full-stack developer with several years of experience, I design and develop robust web and mobile applications, with a strong focus on performance, maintainability, and user experience. I have worked on various projects, including e-commerce platforms, management applications, and business solutions, using modern technologies such as Next.js, ASP.NET Core, and React Native.",
  },
  personalInfo: {
    name: "Mahefa",
    birthDate: "2002",
    location: "Antananarivo, Madagascar",
    email: "mahefanant@gmail.com",
    languages: [
      {
        name_fr: "Français",
        name_en: "French",
        level_fr: "Courant",
        level_en: "Fluent",
      },
      {
        name_fr: "Anglais",
        name_en: "English",
        level_fr: "Conversationnel",
        level_en: "Conversational",
      },
      {
        name_fr: "Malgache",
        name_en: "Malagasy",
        level_fr: "Langue maternelle",
        level_en: "Mother tongue",
      },
    ],
  },
};

const journeyData = {
  experiences: [
    {
      titleFr: "Développeur Fullstack",
      titleEn: "Fullstack Developer",
      company: "Nir'Info",
      location: "Antananarivo, Madagascar",
      period: "2025 - Présent",
      descriptionFr:
        "En tant que Développeur Fullstack chez Nir'Info, je suis responsable du développement et de la maintenance d'applications web modernes et performantes. Je travaille sur des projets variés, allant du e-commerce aux dashboards analytics, en passant par des APIs RESTful.",
      descriptionEn:
        "As a Fullstack Developer at Nir'Info, I am responsible for the development and maintenance of modern and performant web applications. I work on various projects, from e-commerce to analytics dashboards, including RESTful APIs.",
      technologies: [
        "Laravel",
        "Node.js",
        "React.js",
        "TypeScript",
        "PlanetHoster",
        "Docker",
        "PostgreSQL",
        "Mysql",
        "CI/CD",
        "Git",
      ],
    },
    {
      titleFr: "Freelance",
      titleEn: "Freelance",
      company: "Indépendant",
      location: "Antananarivo",
      period: "2024 - 2025",
      descriptionFr:
        "En tant que Freelance, j'ai développé quelques applications web et mobiles pour différents clients. J'ai travaillé sur quelques projets, allant du e-commerce aux dashboards analytics, en passant par des APIs RESTful.",
      descriptionEn:
        "As a Freelance, I developed several web and mobile applications for different clients. I worked on some projects, from e-commerce to analytics dashboards, including RESTful APIs.",
      technologies: [
        "NestJs",
        "TypeScript",
        "NextJs",
        "PostgreSQL",
        "React Native",
        "MongoDB",
        "React",
        "PHP",
        "Symfony",
        "Docker",
        "Linux",
        "Git",
      ],
    },
    {
      titleFr: "Stagiaire",
      titleEn: "Internship",
      company: "Misaina Incorporation",
      location: "Antananarivo",
      period: "2023-2024",
      descriptionFr:
        "Au sein de Misaina Incorporation, j'ai participé au développement d'une application e-commerce. J'ai travaillé sur différents aspects du projet, allant de l'interface utilisateur à la gestion de la base de données.",
      descriptionEn:
        "As a member of Misaina Incorporation, I participated in the development of an e-commerce application. I worked on different aspects of the project, from the user interface to the database management.",
      technologies: [
        "Asp.Net",
        "C#",
        "PostgreSQL",
        "React",
        "Git",
        "Tranonkala",
        "Linux",
      ],
    },
  ],
};

// Composant carte expérience
function ExperienceCard({
  experience,
  index,
}: {
  experience: (typeof journeyData.experiences)[0];
  index: number;
}) {
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div
      ref={ref}
      className="relative pl-6 sm:pl-8 pb-8 last:pb-0"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateX(0)" : "translateX(-20px)",
        transition: `all 0.5s ease-out ${index * 0.1}s`,
      }}
    >
      {/* Ligne de timeline */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#2563EB] via-[#2563EB]/50 to-transparent" />

      {/* Point de timeline */}
      <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-[#2563EB] ring-4 ring-[#2563EB]/20" />

      <Card className="bg-white/50 dark:bg-[#121826]/50 backdrop-blur-sm border border-gray-200 dark:border-[#1F2937] shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                {locale === "fr" ? experience.titleFr : experience.titleEn}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                <IconRenderer name="Building" className="h-3.5 w-3.5" />
                <span>{experience.company}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                <IconRenderer name="MapPin" className="h-3.5 w-3.5" />
                <span>{experience.location}</span>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="shrink-0 bg-gray-100 dark:bg-[#0B0F1A]"
            >
              <IconRenderer name="Calendar" className="h-3 w-3 mr-1" />
              {experience.period}
            </Badge>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {locale === "fr"
              ? experience.descriptionFr
              : experience.descriptionEn}
          </p>

          <div className="flex flex-wrap gap-2">
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

export function Bio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const locale = useLocale();
  const t = useTranslations("About.Bio");

  return (
    <section
      id="bio"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
    >
      {/* Background décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#2563EB]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#22C55E]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 dark:bg-[#2563EB]/15 border border-[#2563EB]/20 mb-4">
            <IconRenderer
              name="User"
              className="h-3 w-3 sm:h-4 sm:w-4 text-[#2563EB]"
            />
            <span className="text-[10px] sm:text-xs font-medium text-[#2563EB] dark:text-[#3B82F6] uppercase tracking-wider">
              {t("title")}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {t("title")}
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{t("subtilte")}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Bio et infos personnelles */}
          <div className="lg:col-span-1 space-y-6">
            {/* Bio */}
            <Card className="bg-white/50 dark:bg-[#121826]/50 backdrop-blur-sm border border-gray-200 dark:border-[#1F2937] shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] flex items-center justify-center">
                    <IconRenderer name="User" className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t("about")}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {locale === "fr"
                    ? bioData.description.fr
                    : bioData.description.en}
                </p>
              </CardContent>
            </Card>

            {/* Infos personnelles */}
            <Card className="bg-white/50 dark:bg-[#121826]/50 backdrop-blur-sm border border-gray-200 dark:border-[#1F2937] shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center">
                    <IconRenderer name="Info" className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Informations
                  </h2>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {t("info.name")}
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {bioData.personalInfo.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {t("info.age")}
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {new Date().getFullYear() -
                        parseInt(bioData.personalInfo.birthDate)}{" "}
                      {t("info.years")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Localisation
                    </p>
                    <div className="flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                      <IconRenderer name="MapPin" className="h-3 w-3" />
                      {bioData.personalInfo.location}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Email
                    </p>
                    <a
                      href={`mailto:${bioData.personalInfo.email}`}
                      className="text-sm text-[#2563EB] dark:text-[#3B82F6] hover:underline"
                    >
                      {bioData.personalInfo.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
                      {t("info.language")}
                    </p>
                    <div className="space-y-1.5">
                      {bioData.personalInfo.languages.map((lang) => (
                        <div
                          key={lang.name_fr}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {locale === "fr" ? lang.name_fr : lang.name_en}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {locale === "fr" ? lang.level_fr : lang.level_en}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Timeline expériences */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <IconRenderer
                  name="Briefcase"
                  className="h-5 w-5 text-[#2563EB]"
                />
                {t("journey.title")}
              </h2>
            </div>

            <div className="space-y-6">
              {journeyData.experiences.map((exp, index) => (
                <ExperienceCard key={index} experience={exp} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
