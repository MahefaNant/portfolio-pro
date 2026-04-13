/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as LucideIcons from "lucide-react";

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export function IconRenderer({
  name,
  className = "h-5 w-5",
  size,
  strokeWidth = 2,
}: IconRendererProps) {
  // Cherche l'icône dans Lucide
  const IconComponent = (LucideIcons as any)[name];

  if (!IconComponent) {
    // Fallback : afficher un cercle avec la première lettre
    return (
      <div
        className={`${className} flex items-center justify-center bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] rounded-full text-white font-bold text-xs`}
        style={{ width: size, height: size }}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <IconComponent
      className={className}
      size={size}
      strokeWidth={strokeWidth}
    />
  );
}
