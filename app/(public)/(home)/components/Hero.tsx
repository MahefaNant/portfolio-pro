"use client";

import { ArrowRight, ChevronRight, Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Données temporaires (à remplacer par API plus tard)
const heroData = {
  greeting: { fr: "Bonjour, je suis", en: "Hi, I'm" },
  name: "Mahefa",
  title: { fr: "Développeur Fullstack", en: "Fullstack Developer" },
  description: {
    fr: "Je crée des applications web modernes, performantes et élégantes. Spécialisé dans l'écosystème Next.js et l'expérience utilisateur.",
    en: "I build modern, performant and elegant web applications. Specialized in Next.js ecosystem and user experience.",
  },
  stats: [
    {
      value: "4+",
      labelFr: "Années d'expérience",
      labelEn: "Years experience",
    },
    {
      value: "20+",
      labelFr: "Projets réalisés",
      labelEn: "Projects completed",
    },
    {
      value: "100%",
      labelFr: "Satisfaction client",
      labelEn: "Client satisfaction",
    },
  ],
  techStack: ["Next.js", "Nest.js", "Laravel", ".NET", "Shopify"],
};

export function Hero() {
  const t = useTranslations("home");
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Effet de particules suivant la souris
  const gradientStyle = {
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
      rgba(37, 99, 235, 0.15) 0%, 
      rgba(37, 99, 235, 0.05) 50%,
      transparent 80%)`,
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/mahefanant", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/mahefa-nantenaina-419a98271",
      label: "LinkedIn",
    },
    { icon: Mail, href: "mailto:[EMAIL_ADDRESS]", label: "Email" },
  ];

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      {/* Effet de fond animé */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/5" />
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={mounted ? gradientStyle : {}}
        />
        {/* Grille de points */}
        <div className="absolute inset-0 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] dark:opacity-[0.05]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Texte */}
          <div className="space-y-6 lg:space-y-8">
            {/* Badge disponibilité */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                Disponible
              </span>
            </div>

            {/* Greeting + Name */}
            <div className="space-y-2">
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 font-medium">
                {heroData.greeting.fr}
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                  {heroData.name}
                </span>
              </h1>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2563EB] dark:text-[#3B82F6]">
                {heroData.title.fr}
              </h2>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-lg">
              {heroData.description.fr}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="group">
                <Link href="/projects">
                  Voir mes projets
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">
                  Me contacter
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-4">
              {heroData.stats.map((stat, index) => (
                <div key={index} className="text-center sm:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.labelFr}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-100 dark:bg-[#121826] text-gray-600 dark:text-gray-400 hover:bg-[#2563EB] hover:text-white dark:hover:bg-[#2563EB] transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Image / Avatar avec effet 3D */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Effet de glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />

              {/* Avatar container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white dark:border-[#121826] shadow-2xl">
                <Image
                  src="/static/images/mahefa-logo.png"
                  alt="Mahefa"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Tech stack floating badges */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-wrap gap-2 justify-center bg-white/80 dark:bg-[#0B0F1A]/80 backdrop-blur-md rounded-2xl p-2 px-4 border border-gray-200 dark:border-[#1F2937]">
                {heroData.techStack.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>

              {/* Anneau décoratif animé */}
              <div
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#2563EB]/30 animate-spin-slow pointer-events-none"
                style={{ animationDuration: "20s" }}
              />
              <div className="absolute inset-[-10px] rounded-full border border-[#2563EB]/20 animate-pulse pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block">
        <div className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-[#2563EB] rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
