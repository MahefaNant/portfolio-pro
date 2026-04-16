// app/[locale]/projects/page.tsx
"use client";

import { useMemo, useState } from "react";

import { MouseGradient } from "@/app/components/MouseGradient";
import { projectsData } from "@/app/configs/private/data/projects";
import { IconRenderer } from "@/components/ui/icon-renderer";
import { ProjectCard } from "./components/ProjectCard";
import { ProjectFilters } from "./components/ProjectFilters";

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTech, setSelectedTech] = useState("all");

  // Extraire toutes les technologies uniques
  const allTechnologies = useMemo(() => {
    const techs = new Set<string>();
    projectsData.projects.forEach((project) => {
      project.technologies.forEach((tech) => techs.add(tech));
    });
    return Array.from(techs).sort();
  }, []);

  // Filtrer les projets
  const filteredProjects = useMemo(() => {
    return projectsData.projects.filter((project) => {
      // Filtre par catégorie
      if (selectedCategory !== "all" && project.category !== selectedCategory) {
        return false;
      }
      // Filtre par technologie
      if (
        selectedTech !== "all" &&
        !project.technologies.includes(selectedTech)
      ) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, selectedTech]);

  const handleReset = () => {
    setSelectedCategory("all");
    setSelectedTech("all");
  };

  const hasFilters = selectedCategory !== "all" || selectedTech !== "all";

  return (
    <main className="min-h-screen py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <MouseGradient />
      {/* Background décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#2563EB]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#22C55E]/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#2563EB_1px,transparent_1px)] bg-size-[32px_32px] opacity-[0.02] dark:opacity-[0.03]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 dark:bg-[#2563EB]/15 border border-[#2563EB]/20 mb-4">
            <IconRenderer
              name="FolderCode"
              className="h-3 w-3 sm:h-4 sm:w-4 text-[#2563EB]"
            />
            <span className="text-[10px] sm:text-xs font-medium text-[#2563EB] dark:text-[#3B82F6] uppercase tracking-wider">
              Portfolio
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-linear-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Mes Projets
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Découvrez une sélection de mes réalisations
          </p>
        </div>

        {/* Filtres + Grille */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar filtres */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ProjectFilters
                categories={projectsData.categories}
                technologies={allTechnologies}
                selectedCategory={selectedCategory}
                selectedTech={selectedTech}
                onCategoryChange={setSelectedCategory}
                onTechChange={setSelectedTech}
                onReset={handleReset}
              />
            </div>
          </div>

          {/* Grille projets */}
          <div className="lg:col-span-3">
            {/* Résultat des filtres */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {filteredProjects.length} projet
                {filteredProjects.length > 1 ? "s" : ""} trouvé
                {filteredProjects.length > 1 ? "s" : ""}
              </p>
              {hasFilters && (
                <button
                  onClick={handleReset}
                  className="text-sm text-[#2563EB] dark:text-[#3B82F6] hover:underline flex items-center gap-1 lg:hidden cursor-pointer"
                >
                  <IconRenderer name="X" className="h-3.5 w-3.5" />
                  Réinitialiser
                </button>
              )}
            </div>

            {/* Grille */}
            {filteredProjects.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white/50 dark:bg-[#121826]/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-[#1F2937]">
                <IconRenderer
                  name="FolderSearch"
                  className="h-16 w-16 mx-auto text-gray-400 mb-4"
                />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Aucun projet trouvé
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Essayez de modifier vos filtres
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 text-[#2563EB] dark:text-[#3B82F6] hover:underline cursor-pointer"
                >
                  Voir tous les projets
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
