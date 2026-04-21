/* eslint-disable react/no-unescaped-entities */
"use client";

import { useInView } from "framer-motion";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Quote,
  Sparkles,
  Star,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useLocale, useTranslations } from "next-intl";

// Données temporaires
const testimonialsData = {
  testimonials: [
    {
      id: "1",
      name: "Rakotomanga Titosy",
      roleFr: "Développeur Full-Stack, Projet collaboratif",
      roleEn: "Full-Stack Developer, Collaborative Project",
      avatar: "",
      contentFr:
        "Travailler avec Mahefa a été une excellente expérience. Son expertise technique et sa capacité à résoudre des problèmes complexes m’ont vraiment impressionné. Il propose toujours des solutions pertinentes et contribue activement à la qualité du code et à la réussite du projet.",
      contentEn:
        "Working with Mahefa was an excellent experience. His technical expertise and ability to solve complex problems really impressed me. He always proposes relevant solutions and actively contributes to code quality and project success.",
      rating: 5,
      date: "2026-01-15",
    },
    {
      id: "2",
      name: "Private Client",
      roleFr: "Entrepreneure / Cliente Freelance",
      roleEn: "Entrepreneur / Freelance Client",
      avatar: "",
      contentFr:
        "J’ai fait appel à Mahefa pour mon projet web et je suis très satisfait du résultat. Il a parfaitement compris mes besoins et a livré un travail de grande qualité dans les délais. La communication était fluide tout au long du projet. Je recommande vivement ses services.",
      contentEn:
        "I hired Mahefa for my web project and I am very satisfied with the result. He perfectly understood my needs and delivered high-quality work on time. Communication was smooth throughout the project. I highly recommend his services.",
      rating: 5,
      date: "2025-06-01",
    },
    {
      id: "3",
      name: "Mamy",
      roleFr: "CEO, Digital Solutions",
      roleEn: "CEO, Digital Solutions",
      avatar: "",
      contentFr:
        "Mahefa est un développeur talentueux avec une excellente maîtrise des technologies modernes comme Next.js. Son professionnalisme, sa rigueur et sa capacité à comprendre les enjeux business font de lui un atout précieux pour tout projet digital.",
      contentEn:
        "Mahefa is a talented developer with an excellent command of modern technologies like Next.js. His professionalism, rigor, and ability to understand business challenges make him a valuable asset for any digital project.",
      rating: 5,
      date: "2026-03-15",
    },
    {
      id: "4",
      name: "Tsito",
      roleFr: "Développeur Front-End, Projet collaboratif",
      roleEn: "Front-End Developer, Collaborative Project",
      avatar: "",
      contentFr:
        "J’ai collaboré avec Mahefa sur plusieurs projets où il intervenait sur la partie back-end. Son travail est structuré, fiable et bien pensé, ce qui rend l’intégration front-end fluide et efficace. Les APIs qu’il développe sont claires, performantes et faciles à exploiter côté interface. Travailler avec lui facilite vraiment la collaboration entre front-end et back-end.",
      contentEn:
        "I collaborated with Mahefa on several projects where he worked on the back-end. His work is structured, reliable, and well-thought-out, which makes front-end integration smooth and efficient. The APIs he develops are clear, performant, and easy to use on the interface side. Working with him really facilitates collaboration between front-end and back-end.",
      rating: 5,
      date: "2024-11-05",
    },
  ],
};

// Composant étoiles de notation
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 sm:h-4 sm:w-4 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300 dark:text-gray-600"
          }`}
        />
      ))}
    </div>
  );
}

// Composant carte témoignage
function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonialsData.testimonials)[0];
  index: number;
}) {
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Obtenir les initiales pour l'avatar fallback
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Formater la date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat(locale, {
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <div
      ref={ref}
      className="h-full"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.5s ease-out ${index * 0.1}s`,
      }}
    >
      <Card className="h-full bg-white/50 dark:bg-[#121826]/50 backdrop-blur-sm border border-gray-200 dark:border-[#1F2937] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
        <CardContent className="p-5 sm:p-6 flex flex-col h-full">
          {/* Icône citation */}
          <div className="mb-4">
            <Quote className="h-8 w-8 text-[#2563EB]/30 dark:text-[#3B82F6]/30" />
          </div>

          {/* Contenu */}
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-5 leading-relaxed flex-1">
            "{locale === "fr" ? testimonial.contentFr : testimonial.contentEn}"
          </p>

          {/* Auteur */}
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-[#2563EB]/20">
              {testimonial.avatar ? (
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
              ) : (
                <AvatarFallback className="bg-linear-to-br from-[#2563EB] to-[#1E3A8A] text-white text-sm font-medium">
                  {initials}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                {testimonial.name}
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {locale === "fr" ? testimonial.roleFr : testimonial.roleEn}
              </p>
            </div>
          </div>

          {/* Footer avec note et date */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-[#1F2937]">
            <StarRating rating={testimonial.rating} />
            <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(testimonial.date)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function Testimonials() {
  const t = useTranslations("Home.Testimonials");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const testimonials = testimonialsData.testimonials;

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const getVisibleCount = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  const visibleCount = getVisibleCount();
  const totalSlides = Math.ceil(testimonials.length / visibleCount);
  const currentSlide = Math.floor(currentIndex / visibleCount);

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + visibleCount,
  );

  const nextSlide = () => {
    if (currentIndex + visibleCount < testimonials.length) {
      setCurrentIndex(currentIndex + visibleCount);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex - visibleCount >= 0) {
      setCurrentIndex(currentIndex - visibleCount);
    } else {
      setCurrentIndex(testimonials.length - visibleCount);
    }
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex * visibleCount);
  };

  if (
    !testimonialsData.testimonials ||
    testimonialsData.testimonials.length === 0
  )
    return null;
  return (
    <section
      id="testimonials"
      className="py-16 sm:py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Background décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-linear-to-r from-[#2563EB]/5 to-[#22C55E]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#A855F7]/5 rounded-full blur-3xl" />

        {/* Motif de points */}
        <div className="absolute inset-0 bg-[radial-gradient(#2563EB_1px,transparent_1px)] bg-size-[32px_32px] opacity-[0.02] dark:opacity-[0.03]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 dark:bg-[#2563EB]/15 border border-[#2563EB]/20 mb-4">
            <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-[#2563EB]" />
            <span className="text-[10px] sm:text-xs font-medium text-[#2563EB] dark:text-[#3B82F6] uppercase tracking-wider">
              {t("title")}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4">
            <span className="bg-linear-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {t("title")}
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400">
            {t("subtitle")}
          </p>
        </div>

        {/* Grille des témoignages */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {visibleTestimonials.map((testimonial, idx) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={idx}
              />
            ))}
          </div>

          {/* Navigation (si plus de 3 témoignages) */}
          {testimonials.length > visibleCount && (
            <div className="flex items-center justify-between gap-4 mt-8 sm:mt-10 lg:mt-12">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-gray-100 dark:bg-[#121826] hover:bg-gray-200 dark:hover:bg-[#1a2230] transition-colors"
                aria-label="Témoignages précédents"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>

              {/* Indicateurs */}
              <div className="flex gap-2">
                {[...Array(totalSlides)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === idx
                        ? "w-6 bg-[#2563EB]"
                        : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                    }`}
                    aria-label={`Aller au groupe ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-gray-100 dark:bg-[#121826] hover:bg-gray-200 dark:hover:bg-[#1a2230] transition-colors"
                aria-label="Témoignages suivants"
              >
                <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          )}
        </div>

        {/* Badge de confiance */}
        <div className="text-center mt-10 sm:mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-[#121826]">
            <Sparkles className="h-4 w-4 text-[#2563EB]" />
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              +{testimonials.length} {t("recommendations")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
