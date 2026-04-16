// components/sections/languages.tsx
"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IconRenderer } from "@/components/ui/icon-renderer";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";

// Données des langues
const languagesData = {
  languages: [
    {
      nameFr: "Français",
      nameEn: "French",
      levelFr: "Courant",
      levelEn: "Fluent",
      flag: "🇫🇷",
      descriptionFr: "Langue de travail quotidienne",
      descriptionEn: "Daily working language",
      certifications: ["DALF C1"],
    },
    {
      nameFr: "Anglais",
      nameEn: "English",
      levelFr: "Professionnel",
      levelEn: "Professional",
      flag: "🇬🇧",
      descriptionFr: "Communication technique et réunions",
      descriptionEn: "Technical communication and meetings",
      certifications: ["TOEIC 850"],
    },
    {
      nameFr: "Malgache",
      nameEn: "Malagasy",
      levelFr: "Natal",
      levelEn: "Native",
      flag: "🇲🇬",
      descriptionFr: "Langue maternelle",
      descriptionEn: "Native language",
      certifications: [],
    },
  ],
};

// Niveaux avec couleurs
const getLevelColor = (level: string) => {
  switch (level) {
    case "Natal":
      return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
    case "Courant":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
    case "Professionnel":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    default:
      return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
  }
};

// Barre de niveau
function LevelBar({ level }: { level: string }) {
  const getWidth = () => {
    switch (level) {
      case "Natal":
        return "100%";
      case "Courant":
        return "90%";
      case "Professionnel":
        return "75%";
      default:
        return "50%";
    }
  };

  const getColor = () => {
    switch (level) {
      case "Natal":
        return "#A855F7";
      case "Courant":
        return "#22C55E";
      case "Professionnel":
        return "#3B82F6";
      default:
        return "#9CA3AF";
    }
  };

  return (
    <div className="w-32 sm:w-40">
      <div className="h-1.5 bg-gray-100 dark:bg-[#121826] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: getWidth(), backgroundColor: getColor() }}
        />
      </div>
    </div>
  );
}

// Composant carte langue
function LanguageCard({
  language,
  index,
}: {
  language: (typeof languagesData.languages)[0];
  index: number;
}) {
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateX(0)" : "translateX(-20px)",
        transition: `all 0.5s ease-out ${index * 0.1}s`,
      }}
    >
      <Card className="bg-white/50 dark:bg-[#121826]/50 backdrop-blur-sm border border-gray-200 dark:border-[#1F2937] shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Langue et drapeau */}
            <div className="flex items-center gap-3">
              <span className="text-3xl">{language.flag}</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {locale === "fr" ? language.nameFr : language.nameEn}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {locale === "fr"
                    ? language.descriptionFr
                    : language.descriptionEn}
                </p>
              </div>
            </div>

            {/* Niveau et barre */}
            <div className="flex items-center gap-3">
              <Badge className={getLevelColor(language.levelFr)}>
                {locale === "fr" ? language.levelFr : language.levelEn}
              </Badge>
              <LevelBar level={language.levelFr} />
            </div>
          </div>

          {/* Certifications */}
          {language.certifications.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-[#1F2937]">
              <div className="flex flex-wrap gap-2">
                {language.certifications.map((cert) => (
                  <Badge
                    key={cert}
                    variant="outline"
                    className="text-xs bg-gray-50 dark:bg-[#0B0F1A]"
                  >
                    <IconRenderer name="Award" className="h-3 w-3 mr-1" />
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function Languages() {
  const t = useTranslations("About.Languages");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="languages"
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
    >
      {/* Background décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[250px] h-[250px] bg-[#F59E0B]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-[#2563EB]/5 rounded-full blur-3xl" />
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
              name="Globe"
              className="h-3 w-3 sm:h-4 sm:w-4 text-[#2563EB]"
            />
            <span className="text-[10px] sm:text-xs font-medium text-[#2563EB] dark:text-[#3B82F6] uppercase tracking-wider">
              {t("language")}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {t("title")}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{t("subtitle")}</p>
        </div>

        {/* Liste des langues */}
        <div className="max-w-3xl mx-auto space-y-4">
          {languagesData.languages.map((language, index) => (
            <LanguageCard key={index} language={language} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
