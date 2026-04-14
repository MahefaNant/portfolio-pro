/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { IconRenderer } from "@/components/ui/icon-renderer";
import { useLocale, useTranslations } from "next-intl";

const ctaData = {
  cvUrl:
    "https://drive.google.com/file/d/1on59wEHX5xP5WZ3zDOMJ0dptDYhKXI__/view?usp=sharing",
  cvDirectUrl:
    "https://drive.google.com/uc?export=download&id=1on59wEHX5xP5WZ3zDOMJ0dptDYhKXI__",
  benefits: [
    {
      iconName: "CheckCircle",
      textFr: "5+ années d'expérience",
      textEn: "5+ years of experience",
    },
    {
      iconName: "CheckCircle",
      textFr: "20+ projets réalisés",
      textEn: "20+ projects completed",
    },
    { iconName: "CheckCircle", textFr: "Disponible", textEn: "Available" },
  ],
};

export function CtaCV() {
  const t = useTranslations("Home.CTA");
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDownload = () => {
    window.open(ctaData.cvDirectUrl, "_blank");
  };

  const handleViewOnline = () => {
    window.open(ctaData.cvUrl, "_blank");
  };

  if (!mounted) return null;

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center transition-all duration-700">
          {/* Icône principale */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2563EB]/10 to-[#1E3A8A]/10 dark:from-[#2563EB]/20 dark:to-[#1E3A8A]/20 mb-6 ring-1 ring-[#2563EB]/20">
            <IconRenderer
              name="FileText"
              className="h-8 w-8 text-[#2563EB] dark:text-[#3B82F6]"
            />
          </div>

          {/* Titre */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {t("title")}
            </span>
          </h2>

          {/* Sous-titre */}
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>

          {/* Bénéfices */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {ctaData.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-[#121826] text-gray-700 dark:text-gray-300"
              >
                <IconRenderer
                  name={benefit.iconName}
                  className="h-4 w-4 text-emerald-500"
                />
                <span className="text-sm">
                  {locale === "fr" ? benefit.textFr : benefit.textEn}
                </span>
              </div>
            ))}
          </div>

          {/* Boutons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleDownload}
              size="lg"
              className="bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] hover:from-[#3B82F6] hover:to-[#2563EB] text-white shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <IconRenderer
                name="Download"
                className="h-4 w-4 mr-2 transition-transform group-hover:translate-y-1"
              />
              {t("buttonDownload")}
            </Button>

            <Button
              onClick={handleViewOnline}
              variant="outline"
              size="lg"
              className="border-gray-300 dark:border-gray-600 hover:border-[#2563EB] dark:hover:border-[#3B82F6] hover:bg-[#2563EB]/5 transition-all duration-300 group cursor-pointer"
            >
              <IconRenderer name="Eye" className="h-4 w-4 mr-2" />
              {t("buttonView")}
              <IconRenderer
                name="ArrowRight"
                className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1"
              />
            </Button>
          </div>

          {/* Note */}
          {/* <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-500">
            <IconRenderer name="Calendar" className="h-3 w-3" />
            <span>Mis à jour Mars 2025</span>
            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
            <IconRenderer name="FileText" className="h-3 w-3" />
            <span>PDF • 2.5 MB</span>
          </div> */}
        </div>
      </div>
    </section>
  );
}
