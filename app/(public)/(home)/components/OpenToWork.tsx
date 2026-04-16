// components/sections/open-to-work.tsx
"use client";

import { useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconRenderer } from "@/components/ui/icon-renderer";
import { useLocale, useTranslations } from "next-intl";

const openToWorkData = {
  status: "available",
  title: {
    fr: "Ouvert à de nouvelles opportunités",
    en: "Open to new opportunities",
  },
  subtitle: {
    fr: "Je suis actuellement disponible pour des missions en freelance, CDI ou collaboration sur des projets innovants.",
    en: "I am currently available for freelance missions, permanent positions or collaboration on innovative projects.",
  },
  availability: {
    fr: "Disponible immédiatement",
    en: "Available immediately",
  },
  workTypes: [
    { iconName: "Briefcase", textFr: "Freelance", textEn: "Freelance" },
    { iconName: "Building", textFr: "CDI / CDD", textEn: "Full-time" },
    { iconName: "Users", textFr: "Collaboration", textEn: "Collaboration" },
  ],
  locations: [
    {
      iconName: "MapPin",
      textFr: "Remote (Worldwide)",
      textEn: "Remote (Worldwide)",
    },
    {
      iconName: "Globe",
      textFr: "Madagascar / France",
      textEn: "Madagascar / France",
    },
  ],
  contactEmail: "mahefanant@gmail.com",
};

export function OpenToWork() {
  const t = useTranslations("Home.OpenToWork");
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="available"
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
    >
      {/* Background décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-br from-[#22C55E]/5 via-transparent to-[#2563EB]/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#22C55E]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#2563EB]/5 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="max-w-4xl mx-auto transition-all duration-700"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(30px)",
          }}
        >
          {/* Statut avec animation */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75" />
              <div className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  {locale === "fr"
                    ? openToWorkData.availability.fr
                    : openToWorkData.availability.en}
                </span>
              </div>
            </div>
          </div>

          {/* Titre */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4">
            <span className="bg-linear-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {locale === "fr"
                ? openToWorkData.title.fr
                : openToWorkData.title.en}
            </span>
          </h2>

          {/* Sous-titre */}
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {locale === "fr"
              ? openToWorkData.subtitle.fr
              : openToWorkData.subtitle.en}
          </p>

          {/* Types de mission */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {openToWorkData.workTypes.map((type, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-4 py-2 text-sm bg-gray-100 dark:bg-[#121826] hover:bg-gray-200 dark:hover:bg-[#1a2230] transition-colors"
              >
                <IconRenderer
                  name={type.iconName}
                  className="h-3.5 w-3.5 mr-1.5 text-[#2563EB]"
                />
                {locale === "fr" ? type.textFr : type.textEn}
              </Badge>
            ))}
          </div>

          {/* Localisation */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {openToWorkData.locations.map((location, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
              >
                <IconRenderer
                  name={location.iconName}
                  className="h-3.5 w-3.5"
                />
                <span>
                  {locale === "fr" ? location.textFr : location.textEn}
                </span>
              </div>
            ))}
          </div>

          {/* Boutons CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-linear-to-r from-[#22C55E] to-[#16A34A] hover:from-[#16A34A] hover:to-[#15803D] text-white shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <Link href="/contact">
                <IconRenderer name="Mail" className="h-4 w-4 mr-2" />
                {t("contactMe")}
                <IconRenderer
                  name="ArrowRight"
                  className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-gray-300 dark:border-gray-600 hover:border-[#22C55E] dark:hover:border-[#22C55E] hover:bg-[#22C55E]/5 transition-all duration-300 group cursor-pointer"
            >
              <Link href="/projects">
                <IconRenderer name="FolderCode" className="h-4 w-4 mr-2" />
                {t("seeProjects")}
              </Link>
            </Button>
          </div>

          {/* Email direct */}
          <div className="text-center mt-8">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
              {t("directContact")}
            </p>
            <a
              href={`mailto:${openToWorkData.contactEmail}`}
              className="inline-flex items-center gap-2 text-sm text-[#2563EB] dark:text-[#3B82F6] hover:underline"
            >
              <IconRenderer name="Mail" className="h-3.5 w-3.5" />
              {openToWorkData.contactEmail}
            </a>
          </div>

          {/* Ligne décorative */}
          <div className="flex justify-center mt-10">
            <div className="w-16 h-1 bg-linear-to-r from-transparent via-[#22C55E] to-transparent rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
