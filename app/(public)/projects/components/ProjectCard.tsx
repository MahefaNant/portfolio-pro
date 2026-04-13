"use client";

import { useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IconRenderer } from "@/components/ui/icon-renderer";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    technologies: string[];
    githubUrl: string;
    liveUrl: string;
    date: string;
  };
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
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
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
          <div className="absolute inset-0 flex items-center justify-center gap-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/90 dark:bg-[#0B0F1A]/90 rounded-full hover:bg-white dark:hover:bg-[#0B0F1A] hover:scale-110 transition-all"
                aria-label="GitHub"
              >
                <IconRenderer
                  name="Github"
                  className="h-5 w-5 text-gray-800 dark:text-white"
                />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#2563EB] rounded-full hover:bg-[#3B82F6] hover:scale-110 transition-all"
                aria-label="Live demo"
              >
                <IconRenderer
                  name="ExternalLink"
                  className="h-5 w-5 text-white"
                />
              </a>
            )}
          </div>
          <div className="w-full h-full bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] flex items-center justify-center">
            <IconRenderer
              name="FolderCode"
              className="h-16 w-16 text-white/20"
            />
          </div>
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
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-1">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-xs bg-gray-50 dark:bg-[#0B0F1A]"
              >
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>

          {/* Lien voir détails */}
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-[#2563EB] dark:text-[#3B82F6] hover:gap-2 transition-all mt-auto"
          >
            Voir le projet
            <IconRenderer name="ArrowRight" className="h-4 w-4" />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
