"use client";

import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", labelFr: "Accueil", labelEn: "Home" },
  { id: "stats", labelFr: "En Bref", labelEn: "Overview" },
  { id: "skills", labelFr: "Compétences", labelEn: "Skills" },
  { id: "projects", labelFr: "Projets", labelEn: "Projects" },
  { id: "testimonials", labelFr: "Témoignages", labelEn: "Testimonials" },
  { id: "cta-cv", labelFr: "Curriculum", labelEn: "CV" },
  { id: "available", labelFr: "Disponibilité", labelEn: "Availability" },
  { id: "contact", labelFr: "Contact", labelEn: "Contact" },
];

export function SideNav() {
  const locale = useLocale();
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px", // Trigger when element is near the middle of the screen
      },
    );

    SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-5">
      {SECTIONS.map(({ id, labelFr, labelEn }) => {
        const label = locale === "fr" ? labelFr : labelEn;
        const isActive = activeSection === id;

        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="group relative flex items-center justify-end w-8 h-4 cursor-pointer"
            aria-label={`Aller à ${label}`}
          >
            {/* Tooltip / Label */}
            <span
              className={`absolute right-8 px-2.5 py-1.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold tracking-wide shadow-lg whitespace-nowrap transition-all duration-300 pointer-events-none ${
                isActive
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"
              }`}
            >
              {label}
            </span>

            {/* Dot */}
            <div
              className={`absolute right-0 rounded-full transition-all duration-300 border-2 ${
                isActive
                  ? "w-3.5 h-3.5 bg-[#2563EB] border-[#2563EB]"
                  : "w-3 h-3 bg-transparent border-gray-400 dark:border-gray-600 group-hover:border-[#2563EB]"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
