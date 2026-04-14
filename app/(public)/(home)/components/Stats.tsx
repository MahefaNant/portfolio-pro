"use client";

import { useInView } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { IconRenderer } from "@/components/ui/icon-renderer";
import { useLocale, useTranslations } from "next-intl";

// Données temporaires
const statsData = {
  items: [
    {
      value: 20,
      suffix: "+", //static
      labelFr: "Projets réalisés", //static
      labelEn: "Projects completed", //static
      icon: "FolderCode", //static
      color: "#2563EB", //static
    },
    {
      value: 4,
      suffix: "+", //static
      labelFr: "Années d'expérience", //static
      labelEn: "Years experience", //static
      icon: "Briefcase", //static
      color: "#22C55E", //static
    },
    {
      value: 15,
      suffix: "+", //static
      labelFr: "Clients satisfaits", //static
      labelEn: "Happy clients", //static
      icon: "Users", //static
      color: "#A855F7", //static
    },
    {
      value: 100,
      suffix: "%", //static
      labelFr: "Engagement", //static
      labelEn: "Commitment", //static
      icon: "Heart", //static
      color: "#F59E0B", //static
    },
  ],
};

// Composant compteur animé
function Counter({
  targetValue,
  suffix,
  duration = 2000,
}: {
  targetValue: number;
  suffix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);

        // Easing function pour une animation smooth
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(easeOutQuart * targetValue);

        setCount(currentValue);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(targetValue);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, targetValue, duration]);

  return (
    <span
      ref={ref}
      className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
    >
      {count}
      {suffix}
    </span>
  );
}

// Composant carte statistique
function StatCard({
  stat,
  index,
}: {
  stat: (typeof statsData.items)[0];
  index: number;
}) {
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="group relative"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.5s ease-out ${index * 0.1}s`,
      }}
    >
      <Card className="bg-white/50 dark:bg-[#121826]/50 backdrop-blur-sm border border-gray-200 dark:border-[#1F2937] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
        <CardContent className="p-6 sm:p-8 text-center relative">
          {/* Effet de glow au hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl"
            style={{
              background: `radial-gradient(circle at center, ${stat.color} 0%, transparent 70%)`,
              filter: "blur(20px)",
            }}
          />

          {/* Icône avec cercle coloré */}
          <div className="flex justify-center mb-4">
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{ backgroundColor: `${stat.color}15` }}
            >
              <IconRenderer
                name={stat.icon}
                className="h-7 w-7 sm:h-8 sm:w-8"
                style={{ color: stat.color }}
                size={24}
              />
            </div>
          </div>

          {/* Valeur compteur */}
          <div className="mb-2">
            <Counter targetValue={stat.value} suffix={stat.suffix} />
          </div>

          {/* Label */}
          <p className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-400">
            {locale === "fr" ? stat.labelFr : stat.labelEn}
          </p>

          {/* Ligne décorative au hover */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 group-hover:w-12 transition-all duration-300 rounded-full"
            style={{ backgroundColor: stat.color }}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export function Stats() {
  const t = useTranslations("Home.Stats");
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
    >
      {/* Background décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2563EB]/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2563EB]/5 rounded-full blur-3xl" />

        {/* Motif de points */}
        <div className="absolute inset-0 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.02] dark:opacity-[0.03]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - version simplifiée sans titre pour intégration fluide */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 dark:bg-[#2563EB]/15 border border-[#2563EB]/20 mb-4">
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-[#2563EB]" />
            <span className="text-[10px] sm:text-xs font-medium text-[#2563EB] dark:text-[#3B82F6] uppercase tracking-wider">
              {t("title")}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {t("title")}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {t("subtitle")}
          </p>
        </div>

        {/* Grille des statistiques */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {statsData.items.map((stat, index) => (
            <StatCard key={stat.labelFr} stat={stat} index={index} />
          ))}
        </div>

        {/* Ligne de séparation décorative */}
        <div className="flex justify-center mt-12 sm:mt-16">
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#2563EB] to-transparent rounded-full" />
        </div>
      </div>
    </section>
  );
}
