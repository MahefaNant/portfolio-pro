"use client";

import { IconRenderer } from "@/components/ui/icon-renderer";
import { useLocale } from "next-intl";

interface ProjectFiltersProps {
  categories: { id: string; nameFr: string; nameEn: string }[];
  technologies: string[];
  selectedCategory: string;
  selectedTech: string;
  onCategoryChange: (category: string) => void;
  onTechChange: (tech: string) => void;
  onReset: () => void;
}

export function ProjectFilters({
  categories,
  technologies,
  selectedCategory,
  selectedTech,
  onCategoryChange,
  onTechChange,
  onReset,
}: ProjectFiltersProps) {
  const locale = useLocale();
  const hasFilters = selectedCategory !== "all" || selectedTech !== "all";

  return (
    <div className="space-y-5">
      {/* Filtre par catégorie */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
          <IconRenderer name="FolderCode" className="h-4 w-4" />
          {locale === "fr" ? "Catégories" : "Categories"}
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/30"
                  : "bg-gray-100 dark:bg-[#121826] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#1a2230]"
              }`}
            >
              {locale === "fr" ? cat.nameFr : cat.nameEn}
            </button>
          ))}
        </div>
      </div>

      {/* Filtre par technologie */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
          <IconRenderer name="Code2" className="h-4 w-4" />
          Technologies
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onTechChange("all")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
              selectedTech === "all"
                ? "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/30"
                : "bg-gray-100 dark:bg-[#121826] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#1a2230]"
            }`}
          >
            {locale === "fr" ? "Toutes" : "All"}
          </button>
          {technologies.map((tech) => (
            <button
              key={tech}
              onClick={() => onTechChange(tech)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                selectedTech === tech
                  ? "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/30"
                  : "bg-gray-100 dark:bg-[#121826] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#1a2230]"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Bouton reset */}
      {hasFilters && (
        <button
          onClick={onReset}
          className="text-sm text-[#2563EB] dark:text-[#3B82F6] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <IconRenderer name="X" className="h-3.5 w-3.5" />
          {locale === "fr" ? "Réinitialiser les filtres" : "Reset filters"}
        </button>
      )}
    </div>
  );
}
