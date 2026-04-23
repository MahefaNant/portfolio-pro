/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Languages, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { LanguageToggle } from "@/app/components/LanguageToggle";
import { ModeToggle } from "@/app/components/ModeToggle";
import { useLogoSwitch } from "@/app/hooks/useLogoSwitch";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("navigation");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { logoDark, logoLight } = useLogoSwitch();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/80 dark:bg-[#0B0F1A]/80 backdrop-blur-xl border-b border-gray-200 dark:border-[#1F2937]"
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-8 h-8 lg:w-10 lg:h-10">
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
              <span className="font-bold text-lg lg:text-xl bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                Mahefa
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 lg:px-4 py-2 text-sm lg:text-base font-medium transition-colors rounded-lg
                    ${
                      isActive(link.href)
                        ? "text-[#2563EB] dark:text-[#3B82F6]"
                        : "text-gray-700 dark:text-[#E5E7EB] hover:text-[#2563EB] dark:hover:text-[#3B82F6]"
                    }
                  `}
                >
                  {t(link.label.toLowerCase())}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#2563EB] dark:bg-[#3B82F6] rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Actions: Theme + Language */}
            <div className="flex items-center gap-2">
              {/* Theme Selector */}
              {mounted && <ModeToggle />}

              {/* Language Selector */}
              <div className="relative">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full w-9 h-9 lg:w-10 lg:h-10 hover:bg-gray-100 dark:hover:bg-[#121826]"
                    >
                      <Languages className="h-4 w-4 lg:h-5 lg:w-5" />
                      <span className="sr-only">Changer la langue</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <LanguageToggle />
                </DropdownMenu>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="md:hidden rounded-full w-9 h-9 hover:bg-gray-100 dark:hover:bg-[#121826]"
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
                <span className="sr-only">Menu</span>
              </Button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed top-16 left-0 right-0 bg-white dark:bg-[#0B0F1A] border-b border-gray-200 dark:border-[#1F2937] transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{ zIndex: 40 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 text-base font-medium rounded-lg transition-colors
                  ${
                    isActive(link.href)
                      ? "bg-[#2563EB]/10 text-[#2563EB] dark:bg-[#3B82F6]/10 dark:text-[#3B82F6]"
                      : "text-gray-700 dark:text-[#E5E7EB] hover:bg-gray-100 dark:hover:bg-[#121826]"
                  }
                `}
              >
                {t(link.label.toLowerCase())}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Spacer to compensate for fixed header */}
      <div className="h-16 lg:h-20" />
    </>
  );
}
