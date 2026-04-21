"use client";

import { useInView } from "framer-motion";
import { useRef, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { IconRenderer } from "@/components/ui/icon-renderer";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

// Données de la photo pro
const proPhotoData = {
  name: "Mahefa",
  role: {
    fr: "Développeur Fullstack",
    en: "Fullstack Developer",
  },
  bio: {
    fr: "Passionné par le développement web depuis plus de 4 ans, je crée des applications modernes, performantes et élégantes. Mon objectif est de transformer vos idées en solutions digitales innovantes.",
    en: "Passionate about web development for over 4 years, I create modern, performant and elegant applications. My goal is to transform your ideas into innovative digital solutions.",
  },
  stats: [
    {
      value: "4+",
      labelFr: "Années d'expérience",
      labelEn: "Years of experience",
      iconName: "Briefcase",
    },
    {
      value: "20+",
      labelFr: "Projets réalisés",
      labelEn: "Projects completed",
      iconName: "FolderCode",
    },
    {
      value: "100%",
      labelFr: "Satisfaction client",
      labelEn: "Client satisfaction",
      iconName: "Heart",
    },
  ],
  socialLinks: [
    {
      platform: "GitHub",
      iconName: "Github",
      url: "https://github.com/mahefa",
    },
    {
      platform: "LinkedIn",
      iconName: "Linkedin",
      url: "https://linkedin.com/in/mahefa",
    },
    {
      platform: "Twitter",
      iconName: "Twitter",
      url: "https://twitter.com/mahefa",
    },
  ],
};

export function ProPhoto() {
  const t = useTranslations("About.ProPhoto");
  const locale = useLocale();
  const [imageLoading, setImageLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="pro-photo"
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
    >
      {/* Background décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#2563EB]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-[#22C55E]/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.02] dark:opacity-[0.03]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="max-w-5xl mx-auto transition-all duration-700"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <Card className="bg-white/50 dark:bg-[#121826]/50 backdrop-blur-sm border border-gray-200 dark:border-[#1F2937] shadow-xl overflow-hidden">
            <CardContent className="p-6 sm:p-8 lg:p-10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left Column - Photo */}
                <div className="flex justify-center">
                  <div className="relative group">
                    {/* Anneau décoratif */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

                    {/* Cadre photo */}
                    <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden ring-4 ring-[#2563EB]/20 group-hover:ring-[#2563EB]/40 transition-all duration-300">
                      {/* Skeleton simple */}
                      {imageLoading && (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/10 to-[#1E3A8A]/10 animate-pulse" />
                      )}

                      {/* Anneau de chargement élégant */}
                      {imageLoading && (
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                          <circle
                            cx="50%"
                            cy="50%"
                            r="45%"
                            fill="none"
                            stroke="#2563EB"
                            strokeWidth="2"
                            strokeDasharray="283"
                            strokeDashoffset="283"
                            className="animate-draw"
                          />
                        </svg>
                      )}

                      <Image
                        src="https://res.cloudinary.com/dsggicjk3/image/upload/v1776150947/IMG_20260414_100931_wscp4z.png"
                        alt="Mahefa"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                        onLoad={() => setImageLoading(false)}
                        className={`object-cover transition-all duration-700 ${
                          imageLoading
                            ? "opacity-0 scale-95"
                            : "opacity-100 scale-100"
                        }`}
                      />
                    </div>

                    {/* Badge de statut */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap">
                      {t("available")}
                    </div>
                  </div>
                </div>

                {/* Right Column - Infos */}
                <div className="text-center md:text-left">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 dark:bg-[#2563EB]/15 border border-[#2563EB]/20 mb-4">
                    <IconRenderer
                      name="User"
                      className="h-3 w-3 text-[#2563EB]"
                    />
                    <span className="text-[10px] sm:text-xs font-medium text-[#2563EB] dark:text-[#3B82F6] uppercase tracking-wider">
                      {t("title")}
                    </span>
                  </div>

                  {/* Nom */}
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {proPhotoData.name}
                  </h2>

                  {/* Rôle */}
                  <p className="text-[#2563EB] dark:text-[#3B82F6] font-medium mb-4">
                    {locale === "fr"
                      ? proPhotoData.role.fr
                      : proPhotoData.role.en}
                  </p>

                  {/* Bio */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                    {locale === "fr"
                      ? proPhotoData.bio.fr
                      : proPhotoData.bio.en}
                  </p>

                  {/* Statistiques */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-6">
                    {proPhotoData.stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <IconRenderer
                            name={stat.iconName}
                            className="h-3 w-3"
                          />
                          {locale === "fr" ? stat.labelFr : stat.labelEn}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Réseaux sociaux */}
                  <div className="flex gap-3 justify-center md:justify-start">
                    {proPhotoData.socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-[#0B0F1A] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-[#2563EB] hover:text-white dark:hover:bg-[#2563EB] transition-all duration-300 hover:scale-110"
                        aria-label={social.platform}
                      >
                        <IconRenderer
                          name={social.iconName}
                          className="h-4 w-4"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
