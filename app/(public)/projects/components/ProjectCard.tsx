"use client";

import { useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IconRenderer } from "@/components/ui/icon-renderer";
import { useLocale, useTranslations } from "next-intl";
import { IProject } from "../../(home)/components/FeaturedProjects";

interface ProjectCardProps {
  project: IProject;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const t = useTranslations("Project.Card");
  const locale = useLocale();
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.5s ease-out ${index * 0.1}s`,
      }}
    >
      <Card className="group bg-white/50 dark:bg-[#121826]/50 backdrop-blur-sm border border-gray-200 dark:border-[#1F2937] shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-[#2563EB]/20 to-[#1E3A8A]/20">
          {imageLoading && (
            <div className="absolute inset-0 z-10 bg-gray-100 dark:bg-[#0B0F1A] flex items-center justify-center">
              <IconRenderer
                name="Loader2"
                className="h-6 w-6 text-[#2563EB] animate-spin"
              />
            </div>
          )}
          <Image
            src={
              project.imageUrl ||
              `https://placehold.co/600x400/2563EB/FFFFFF?text=${project.titleEn}`
            }
            alt={locale === "fr" ? project.titleFr : project.titleEn}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
            onLoad={() => setImageLoading(false)}
            className={`object-cover group-hover:scale-105 transition-all duration-700 ${
              imageLoading ? "scale-110 blur-xl" : "scale-100 blur-0"
            }`}
          />
        </div>

        <CardContent className="p-5 flex-1 flex flex-col">
          {/* Catégorie + date */}
          <div className="flex justify-between items-center mb-3">
            <Badge
              variant="secondary"
              className="text-xs bg-[#2563EB]/10 dark:bg-[#2563EB]/15 text-[#2563EB] dark:text-[#3B82F6]"
            >
              {project.category}
            </Badge>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {project.date}
            </span>
          </div>

          {/* Titre */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#2563EB] dark:group-hover:text-[#3B82F6] transition-colors">
            {locale === "fr" ? project.titleFr : project.titleEn}
          </h3>

          {/* Description */}
          <div className="flex-1 flex flex-col">
            <p
              className={`text-sm text-gray-600 dark:text-gray-400 ${isExpanded ? "" : "line-clamp-3"}`}
            >
              {locale === "fr" ? project.descriptionFr : project.descriptionEn}
            </p>
            {(locale === "fr" ? project.descriptionFr : project.descriptionEn)
              .length > 100 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs font-semibold text-[#2563EB] dark:text-[#3B82F6] hover:underline mt-1 mb-4 text-left"
              >
                {isExpanded ? t("readLess") : t("readMore")}
              </button>
            )}
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 8).map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-xs bg-gray-50 dark:bg-[#0B0F1A]"
              >
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 8 && (
              <Badge variant="outline" className="text-xs">
                +{project.technologies.length - 8}
              </Badge>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800/60">
            <div className="flex flex-wrap items-center gap-2">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800/50 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all text-xs font-medium text-gray-700 dark:text-gray-300"
                  aria-label="GitHub"
                >
                  <IconRenderer name="Github" className="h-3.5 w-3.5" />
                  Github
                </a>
              ) : (
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-[#0B0F1A]/50 rounded-lg text-xs font-medium text-gray-400 dark:text-gray-500 cursor-not-allowed">
                  <IconRenderer name="Github" className="h-3.5 w-3.5" />
                  Private
                </span>
              )}

              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563EB]/10 text-[#2563EB] dark:bg-[#3B82F6]/10 dark:text-[#3B82F6] rounded-lg hover:bg-[#2563EB]/20 dark:hover:bg-[#3B82F6]/20 transition-all text-xs font-medium"
                  aria-label="Live demo"
                >
                  <IconRenderer name="ExternalLink" className="h-3.5 w-3.5" />
                  See
                </a>
              ) : (
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-[#0B0F1A]/50 rounded-lg text-xs font-medium text-gray-400 dark:text-gray-500 cursor-not-allowed">
                  <IconRenderer name="ExternalLink" className="h-3.5 w-3.5" />
                  Private
                </span>
              )}
            </div>

            <Link
              href={`/projects/${project.id}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-[#2563EB] dark:text-[#3B82F6] hover:gap-2 transition-all shrink-0"
            >
              {t("see_project")}
              <IconRenderer name="ArrowRight" className="h-4 w-4" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
