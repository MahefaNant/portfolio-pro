// components/sections/education.tsx
"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IconRenderer } from "@/components/ui/icon-renderer";
import { useLocale, useTranslations } from "next-intl";

// Données des formations
const educationData = {
  degrees: [
    {
      title_fr: "Master I en Informatique, Option Développement",
      title_en: "Master I in Computer Science, Option Development",
      school: "IT Université d'Antananarivo",
      location: "Antananarivo, Madagascar",
      period_fr: "2018 - 2020",
      period_en: "2018 - 2020",
      type: "Master",
      description_fr:
        "Spécialisation en développement web et applications mobiles, architecture des applications et bases de données.",
      description_en:
        "Specialization in web and mobile application development, application architecture and databases.",
      technologies: [
        "Node.js",
        "React",
        "MongoDB",
        "Architecture MVC",
        "Big Data (Initiation)",
      ],
    },
    {
      title_fr: "Licence en Informatique",
      title_en: "Bachelor in Computer Science",
      school: "Université d'Antananarivo",
      location: "Antananarivo, Madagascar",
      period_fr: "2020 - 2023",
      period_en: "2020 - 2023",
      type: "Bachelor",
      description_fr:
        "Fondamentaux de l'informatique, algorithmique, programmation orientée objet et bases de données.",
      description_en:
        "Fundamentals of computer science, algorithms, object-oriented programming and databases.",
      technologies: [
        ".Net",
        "Java",
        "PHP",
        "MySQL",
        "Algorithmique",
        "HTML",
        "CSS",
        "Javascript",
        "Linux",
        "React",
        "Bootstrap",
        "PostgreSQL",
        "Codeigniter",
        "Laravel",
        "Node.js",
        "Python",
      ],
    },
    {
      title_fr: "Baccalauréat Série Scientifique",
      title_en: "Scientific Baccalaureate",
      school: "For Twelve School",
      location: "Antananarivo, Madagascar",
      period_fr: "2019",
      period_en: "2019",
      type: "Baccalaureate",
      description_fr:
        "Baccalauréat série scientifique, spécialité Mathématiques et Sciences physiques.",
      description_en:
        "Baccalaureate in Physical Sciences, specialization in Mathematics and Physical Sciences.",
      technologies: [],
    },
  ],
  certifications: [
    {
      name: "C# with Microsoft",
      issuer: "Microsoft",
      year: "2024",
      credentialUrl:
        "https://www.freecodecamp.org/certification/mahefanant/foundational-c-sharp-with-microsoft",
      iconName: "Microsoft",
    },
    {
      name: "Master Guide certificate",
      issuer: "Seventh day adventist Church",
      year: "2024",
      credentialUrl: "#",
      iconName: "Book",
    },
    {
      name: "English courses",
      issuer: "ITTI (International Tesol Training Institute) Madagascar",
      year: "2024",
      credentialUrl: "#",
      iconName: "Languages",
    },
  ],
};

// Composant carte diplôme
function DegreeCard({
  degree,
  index,
}: {
  degree: (typeof educationData.degrees)[0];
  index: number;
}) {
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Couleur selon le type de diplôme
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Master":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
      case "Licence":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "Baccalauréat":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateX(0)" : "translateX(-20px)",
        transition: `all 0.5s ease-out ${index * 0.1}s`,
      }}
    >
      <Card className="bg-white/50 dark:bg-[#121826]/50 backdrop-blur-sm border border-gray-200 dark:border-[#1F2937] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <CardContent className="p-5 sm:p-6">
          {/* En-tête */}
          <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {locale === "fr" ? degree.title_fr : degree.title_en}
                </h3>
                <Badge className={`${getTypeColor(degree.type)} border`}>
                  {degree.type}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <IconRenderer name="GraduationCap" className="h-3.5 w-3.5" />
                  <span>{degree.school}</span>
                </div>
                <div className="flex items-center gap-1">
                  <IconRenderer name="MapPin" className="h-3.5 w-3.5" />
                  <span>{degree.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <IconRenderer name="Calendar" className="h-3.5 w-3.5" />
                  <span>
                    {locale === "fr" ? degree.period_fr : degree.period_en}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 mt-2">
            {locale === "fr" ? degree.description_fr : degree.description_en}
          </p>

          {/* Technologies apprises */}
          {degree.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-[#1F2937]">
              {degree.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="text-xs bg-gray-50 dark:bg-[#0B0F1A]"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Composant carte certification
function CertificationCard({
  cert,
  index,
}: {
  cert: (typeof educationData.certifications)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.5s ease-out ${index * 0.1}s`,
      }}
    >
      <Card className="bg-white/50 dark:bg-[#121826]/50 backdrop-blur-sm border border-gray-200 dark:border-[#1F2937] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-center gap-4">
            {/* Icône */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] flex items-center justify-center shrink-0">
              <IconRenderer name="Award" className="h-5 w-5 text-white" />
            </div>

            {/* Infos */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate">
                {cert.name}
              </h4>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                <span>{cert.issuer}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                <span>{cert.year}</span>
              </div>
            </div>

            {/* Lien */}
            {cert.credentialUrl !== "#" && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#0B0F1A] transition-colors"
                aria-label="See certificate"
              >
                <IconRenderer
                  name="ExternalLink"
                  className="h-4 w-4 text-gray-400 hover:text-[#2563EB]"
                />
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function Education() {
  const t = useTranslations("About.Education");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="education"
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
    >
      {/* Background décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#A855F7]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-[#2563EB]/5 rounded-full blur-3xl" />
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
              name="GraduationCap"
              className="h-3 w-3 sm:h-4 sm:w-4 text-[#2563EB]"
            />
            <span className="text-[10px] sm:text-xs font-medium text-[#2563EB] dark:text-[#3B82F6] uppercase tracking-wider">
              {t("study")}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {t("title")}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{t("subtitle")}</p>
        </div>

        {/* Diplômes - Timeline */}
        <div className="max-w-3xl mx-auto mb-12">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
            <IconRenderer name="Award" className="h-5 w-5 text-[#2563EB]" />
            {t("degree")}
          </h3>
          <div className="space-y-5">
            {educationData.degrees.map((degree, index) => (
              <DegreeCard key={index} degree={degree} index={index} />
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
            <IconRenderer
              name="Certificate"
              className="h-5 w-5 text-[#22C55E]"
            />
            Certifications
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {educationData.certifications.map((cert, index) => (
              <CertificationCard key={index} cert={cert} index={index} />
            ))}
          </div>
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
