"use client";

import { useEffect, useState } from "react";

interface MouseGradientProps {
  /** Couleur principale du halo (par défaut: bleu primaire) */
  color?: string;
  /** Couleur secondaire pour la transition */
  secondaryColor?: string;
  /** Taille du halo en pixels (par défaut: 600) */
  size?: number;
  /** Opacité maximale au centre (par défaut: 0.08) */
  maxOpacity?: number;
  /** Opacité intermédiaire (par défaut: 0.03) */
  midOpacity?: number;
  /** Pourcentage où le halo devient transparent (par défaut: 85) */
  fadeEnd?: number;
  /** Afficher la texture de grain */
  showGrain?: boolean;
  /** Classe CSS supplémentaire */
  className?: string;
}

export function MouseGradient({
  color = "59, 130, 246", // bleu primaire
  secondaryColor = "37, 99, 235", // bleu secondaire
  size = 600,
  maxOpacity = 0.08,
  midOpacity = 0.03,
  fadeEnd = 85,
  showGrain = true,
  className = "",
}: MouseGradientProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const gradientStyle = {
    background: `radial-gradient(
      ${size}px circle at ${mousePosition.x}px ${mousePosition.y}px, 
      rgba(${color}, ${maxOpacity}) 0%,
      rgba(${secondaryColor}, ${midOpacity}) 45%,
      transparent ${fadeEnd}%
    )`,
  };

  return (
    <>
      {/* Halo lumineux qui suit la souris */}
      <div
        className={`fixed inset-0 pointer-events-none z-30 transition-opacity duration-300 opacity-0 sm:opacity-100 ${className}`}
        style={gradientStyle}
      />

      {/* Texture de grain optionnelle */}
      {showGrain && (
        <div className="fixed inset-0 pointer-events-none z-30 opacity-[0.015] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      )}
    </>
  );
}
