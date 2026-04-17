/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { ArrowUp, Clock, Heart, Mail, MapPin } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useLogoSwitch } from "@/app/hooks/useLogoSwitch";
import { Button } from "@/components/ui/button";
import { IconRenderer } from "@/components/ui/icon-renderer";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const footerData = {
  name: "Mahefa",
  role_fr: "Développeur Fullstack",
  role_en: "Fullstack Developer",
  email: "mahefanant@gmail.com",
  location: "Antananarivo, Madagascar",
  responseTime: "24h",
  socialLinks: [
    {
      platform: "GitHub",
      icon: "Github",
      url: "https://github.com/mahefa",
      username: "@mahefa",
    },
    {
      platform: "LinkedIn",
      icon: "Linkedin",
      url: "https://linkedin.com/in/mahefa",
      username: "mahefa",
    },
    {
      platform: "Twitter",
      icon: "Twitter",
      url: "https://twitter.com/mahefa",
      username: "@mahefa_dev",
    },
  ],
  navLinks: [
    { href: "/", labelFr: "Accueil", labelEn: "Home" },
    { href: "/about", labelFr: "À propos", labelEn: "About" },
    { href: "/projects", labelFr: "Projets", labelEn: "Projects" },
    { href: "/contact", labelFr: "Contact", labelEn: "Contact" },
  ],
  techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/ui"],
  currentYear: new Date().getFullYear(),
};

export function Footer() {
  const pathname = usePathname();
  const t = useTranslations("navigation.Footer");
  const locale = useLocale();

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { logoDark, logoLight } = useLogoSwitch();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="relative mt-auto bg-gradient-to-b from-gray-50 to-white dark:from-[#0B0F1A] dark:to-[#0B0F1A] border-t border-gray-200 dark:border-[#1F2937]">
      {/* Background décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#2563EB]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Column 1 - Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br transparent">
                  <Image
                    src={
                      mounted && resolvedTheme === "dark" ? logoDark : logoLight
                    }
                    alt="Mahefa Logo"
                    fill
                    className="object-contain transition-transform group-hover:scale-105"
                    priority
                    sizes="(max-width: 1024px) 32px, 40px"
                  />
                </div>
                <span className="font-bold text-lg bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {footerData.name}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {locale === "fr" ? footerData.role_fr : footerData.role_en}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>{footerData.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="h-4 w-4" />
                <span>
                  {t("responseTime")} {footerData.responseTime}
                </span>
              </div>
              <a
                href={`mailto:${footerData.email}`}
                className="inline-flex items-center gap-2 text-sm text-[#2563EB] dark:text-[#3B82F6] hover:underline"
              >
                <Mail className="h-4 w-4" />
                {footerData.email}
              </a>
            </div>

            {/* Column 2 - Navigation */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Navigation
              </h3>
              <ul className="space-y-2">
                {footerData.navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-sm text-gray-600 dark:text-gray-400 hover:text-[#2563EB] dark:hover:text-[#3B82F6] transition-colors ${
                        pathname === link.href
                          ? "text-[#2563EB] dark:text-[#3B82F6]"
                          : ""
                      }`}
                    >
                      {locale === "fr" ? link.labelFr : link.labelEn}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Tech Stack */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {footerData.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-[#121826] text-gray-600 dark:text-gray-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Column 4 - Social & CTA */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                {t("stayConnected")}
              </h3>
              <div className="flex gap-3 mb-6">
                {footerData.socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-[#121826] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-[#2563EB] hover:text-white dark:hover:bg-[#2563EB] transition-all duration-300 hover:scale-110"
                    aria-label={social.platform}
                  >
                    <IconRenderer name={social.icon} className="h-5 w-5" />
                  </a>
                ))}
              </div>
              <Button
                onClick={scrollToTop}
                variant="outline"
                size="sm"
                className="group cursor-pointer"
              >
                <ArrowUp className="h-4 w-4 mr-2 transition-transform group-hover:-translate-y-1" />
                {t("toTop")}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-200 dark:border-[#1F2937]">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © {footerData.currentYear} {footerData.name}. {t("copyright")}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              {t("madeWith")}
              <Heart className="h-3 w-3 text-red-500 animate-pulse" />
              {t("to")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
