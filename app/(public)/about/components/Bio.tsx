"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IconRenderer } from "@/components/ui/icon-renderer";

// Données temporaires
const bioData = {
  title: { fr: "Mon Parcours", en: "My Journey" },
  subtitle: {
    fr: "Découvrez mon histoire et mon évolution professionnelle",
    en: "Discover my story and professional evolution",
  },
  description: {
    fr: "Développeur Fullstack passionné depuis plus de 4 ans, je crée des applications web modernes et performantes. Mon parcours m'a permis de travailler sur des projets variés, allant du e-commerce aux dashboards analytics, en passant par des APIs RESTful.",
    en: "Passionate Fullstack developer for over 4 years, I create modern and performant web applications. My journey has allowed me to work on various projects, from e-commerce to analytics dashboards, including RESTful APIs.",
  },
  personalInfo: {
    name: "Mahefa",
    birthDate: "1998",
    location: "Antananarivo, Madagascar",
    email: "mahefanant@gmail.com",
    languages: [
      { name: "Français", level: "Courant" },
      { name: "Anglais", level: "Professionnel" },
      { name: "Malgache", level: "Natal" },
    ],
  },
};

const journeyData = {
  title: { fr: "Parcours professionnel", en: "Professional journey" },
  experiences: [
    {
      title: "Développeur Fullstack Freelance",
      company: "Indépendant",
      location: "Remote",
      period: "2022 - Présent",
      description:
        "Développement d'applications web pour divers clients. Stack : Next.js, React, Node.js, Laravel, PostgreSQL.",
      technologies: ["Next.js", "React", "Node.js", "Laravel", "Tailwind"],
    },
    {
      title: "Développeur Frontend",
      company: "TechCorp Madagascar",
      location: "Antananarivo",
      period: "2021 - 2022",
      description:
        "Création d'interfaces utilisateur modernes et responsives. Collaboration avec l'équipe design et backend.",
      technologies: ["React", "TypeScript", "Tailwind", "Redux"],
    },
    {
      title: "Stagiaire Développeur Web",
      company: "Digital Solutions",
      location: "Antananarivo",
      period: "2020 - 2021",
      description:
        "Développement de sites vitrines et maintenance d'applications existantes.",
      technologies: ["PHP", "JavaScript", "MySQL", "Bootstrap"],
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
                {experience.title}
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
            {experience.description}
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

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
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
              {bioData.title.fr}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {bioData.title.fr}
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {bioData.subtitle.fr}
          </p>
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
                    À propos
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {bioData.description.fr}
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
                      Nom
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {bioData.personalInfo.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Âge
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {new Date().getFullYear() -
                        parseInt(bioData.personalInfo.birthDate)}{" "}
                      ans
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
                      Langues
                    </p>
                    <div className="space-y-1.5">
                      {bioData.personalInfo.languages.map((lang) => (
                        <div
                          key={lang.name}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {lang.name}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {lang.level}
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
                {journeyData.title.fr}
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
