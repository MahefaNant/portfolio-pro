"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { IconRenderer } from "@/components/ui/icon-renderer";
import { useLocale, useTranslations } from "next-intl";

// Données des valeurs
const mindsetData = {
  values: [
    {
      iconName: "Code2",
      titleFr: "Code propre & maintenable",
      titleEn: "Clean & maintainable code",
      descriptionFr:
        "J'écris un code lisible, documenté et facile à maintenir. La qualité est une priorité.",
      descriptionEn:
        "I write clean, documented, and easy-to-maintain code. Quality is a priority.",
      color: "#2563EB",
    },
    {
      iconName: "Users",
      titleFr: "Collaboration & partage",
      titleEn: "Collaboration & sharing",
      descriptionFr:
        "Le développement est un travail d'équipe. J'aime partager mes connaissances et apprendre des autres.",
      descriptionEn:
        "Development is a team sport. I enjoy sharing my knowledge and learning from others.",
      color: "#22C55E",
    },
    {
      iconName: "Rocket",
      titleFr: "Veille technologique",
      titleEn: "Technological watch",
      descriptionFr:
        "Je me forme continuellement aux nouvelles technologies pour rester à la pointe.",
      descriptionEn:
        "I continuously train in new technologies to stay up to date.",
      color: "#A855F7",
    },
    {
      iconName: "Target",
      titleFr: "Orientation solution",
      titleEn: "Solution orientation",
      descriptionFr:
        "Je ne m'arrête pas sur les problèmes, je cherche des solutions pragmatiques et efficaces.",
      descriptionEn:
        "I don't get stuck on problems, I look for pragmatic and effective solutions.",
      color: "#F59E0B",
    },
    {
      iconName: "Heart",
      titleFr: "Passion & exigence",
      titleEn: "Passion & exigence",
      descriptionFr:
        "Je prends à cœur chaque projet et vise l'excellence dans mes livrables.",
      descriptionEn:
        "I take every project to heart and strive for excellence in my deliverables.",
      color: "#EF4444",
    },
    {
      iconName: "RefreshCw",
      titleFr: "Agilité & adaptabilité",
      titleEn: "Agility & adaptability",
      descriptionFr:
        "Je m'adapte rapidement aux changements et aux nouvelles exigences.",
      descriptionEn: "I adapt quickly to changes and new requirements.",
      color: "#06B6D4",
    },
  ],
};

// Composant carte valeur
function ValueCard({
  value,
  index,
}: {
  value: (typeof mindsetData.values)[0];
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
        transform: isInView ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.5s ease-out ${index * 0.1}s`,
      }}
    >
      <Card className="bg-white/50 dark:bg-[#121826]/50 backdrop-blur-sm border border-gray-200 dark:border-[#1F2937] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
        <CardContent className="p-5 text-center">
          {/* Icône */}
          <div
            className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-4"
            style={{ backgroundColor: `${value.color}15` }}
          >
            <IconRenderer
              name={value.iconName}
              className="h-6 w-6"
              style={{ color: value.color }}
            />
          </div>

          {/* Titre */}
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            {locale === "fr" ? value.titleFr : value.titleEn}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {locale === "fr" ? value.descriptionFr : value.descriptionEn}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export function Mindset() {
  const t = useTranslations("About.Mindset");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
    >
      {/* Background décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#A855F7]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-[#22C55E]/5 rounded-full blur-3xl" />
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
              name="Heart"
              className="h-3 w-3 sm:h-4 sm:w-4 text-[#2563EB]"
            />
            <span className="text-[10px] sm:text-xs font-medium text-[#2563EB] dark:text-[#3B82F6] uppercase tracking-wider">
              Mindset
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {t("title")}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{t("subtitle")}</p>
        </div>

        {/* Grille des valeurs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {mindsetData.values.map((value, index) => (
            <ValueCard key={index} value={value} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
