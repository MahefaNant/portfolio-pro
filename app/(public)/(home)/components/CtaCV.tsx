"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { IconRenderer } from "@/components/ui/icon-renderer";
import { useLocale, useTranslations } from "next-intl";

const ctaData = {
  cvUrl:
    "https://drive.google.com/file/d/1on59wEHX5xP5WZ3zDOMJ0dptDYhKXI__/view?usp=sharing",
  cvDirectUrl:
    "https://drive.google.com/uc?export=download&id=1on59wEHX5xP5WZ3zDOMJ0dptDYhKXI__",
  cvVersion: "2024.04",
  benefits: [
    {
      iconName: "Briefcase",
      textFr: "5+ années d'expérience",
      textEn: "5+ years of experience",
    },
    {
      iconName: "Projector",
      textFr: "20+ projets réalisés",
      textEn: "20+ projects completed",
    },
    {
      iconName: "Zap",
      textFr: "Disponibilité immédiate",
      textEn: "Immediate Availability",
    },
  ],
  techTags: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind",
    "Node.js",
    "PostgreSQL",
    "Laravel",
    "Stripe",
  ],
};

export function CtaCV() {
  const t = useTranslations("Home.CTA");
  const locale = useLocale();
  const ref = useRef(null);

  const handleDownload = () => {
    window.open(ctaData.cvDirectUrl, "_blank");
  };

  const handleViewOnline = () => {
    window.open(ctaData.cvUrl, "_blank");
  };

  return (
    <section
      id="cta-cv"
      className="py-24 lg:py-40 min-h-screen flex items-center relative overflow-hidden bg-white dark:bg-[#0B0F1A]"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 overflow-hidden select-none pointer-events-none">
        {/* Large Backdrop Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-gray-100/50 dark:text-gray-900/20 whitespace-nowrap uppercase tracking-tighter">
          Curriculum
        </div>

        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-[#2563EB]/5 dark:bg-[#2563EB]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-linear-to-b from-[#2563EB] to-transparent bg-size-[24px_24px] opacity-[0.03] dark:opacity-[0.05]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Floating tech tags (Desktop only) */}
        <div className="hidden lg:block absolute inset-0 -z-10">
          {ctaData.techTags.map((tag, i) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 0.4,
                y: [0, -20, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
              className="absolute p-3 rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 text-xs font-semibold text-gray-400 dark:text-gray-600"
              style={{
                top: `${15 + ((i * 12) % 70)}%`,
                left:
                  i % 2 === 0
                    ? `${5 + ((i * 3) % 15)}%`
                    : `${80 + ((i * 3) % 15)}%`,
              }}
            >
              {tag}
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Centered Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center"
          >
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 dark:bg-[#2563EB]/20 border border-[#2563EB]/20 mb-8">
              <IconRenderer
                name="Sparkles"
                className="h-3.5 w-3.5 text-[#2563EB]"
              />
              <span className="text-xs font-semibold text-[#2563EB] dark:text-[#3B82F6] uppercase tracking-wider">
                {t("title")}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight">
              <span className="bg-linear-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {t("title")}
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl leading-relaxed">
              {t("subtitle")}
            </p>

            {/* Benefits Bento-like list */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 w-full max-w-3xl">
              {ctaData.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-100 dark:border-gray-800 shadow-sm"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#2563EB]/10 dark:bg-[#2563EB]/20">
                    <IconRenderer
                      name={benefit.iconName}
                      className="h-6 w-6 text-[#2563EB] dark:text-[#3B82F6]"
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                    {locale === "fr" ? benefit.textFr : benefit.textEn}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <Button
                onClick={handleDownload}
                size="lg"
                className="h-16 px-10 bg-linear-to-r from-[#2563EB] to-[#1E3A8A] hover:bg-linear-to-l text-white shadow-[0_20px_40px_-15px_rgba(37,99,235,0.4)] hover:shadow-[0_25px_50px_-15px_rgba(37,99,235,0.5)] transition-all duration-300 group rounded-2xl"
              >
                <IconRenderer
                  name="Download"
                  className="h-5 w-5 mr-3 transition-transform group-hover:translate-y-1"
                />
                <span className="text-lg font-bold">{t("buttonDownload")}</span>
              </Button>

              <Button
                onClick={handleViewOnline}
                variant="outline"
                size="lg"
                className="h-16 px-10 border-gray-200 dark:border-gray-800 hover:border-[#2563EB] dark:hover:border-[#3B82F6] hover:bg-[#2563EB]/5 bg-white/50 dark:bg-transparent backdrop-blur-sm transition-all duration-300 group rounded-2xl"
              >
                <IconRenderer name="Eye" className="h-5 w-5 mr-3" />
                <span className="text-lg font-bold">{t("buttonView")}</span>
                <IconRenderer
                  name="ArrowRight"
                  className="h-4 w-4 ml-3 transition-transform group-hover:translate-x-1"
                />
              </Button>
            </div>

            {/* Metadata Note */}
            <div className="mt-12 flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500 font-medium">
              <div className="flex -space-x-1">
                <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-[8px] text-white border-2 border-white dark:border-gray-900">
                  PDF
                </div>
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[8px] text-white border-2 border-white dark:border-gray-900">
                  DOC
                </div>
              </div>
              <span>{t("availableFormats")}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
              <span>Version: {ctaData.cvVersion}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
