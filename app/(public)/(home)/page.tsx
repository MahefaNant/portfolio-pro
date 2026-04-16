"use client";
import { MouseGradient } from "@/app/components/MouseGradient";
import { SideNav } from "../../components/SideNav";
import { Contact } from "./components/Contact";
import { CtaCV } from "./components/CtaCV";
import { FeaturedProjects } from "./components/FeaturedProjects";
import { Hero } from "./components/Hero";
import { OpenToWork } from "./components/OpenToWork";
import { Skills } from "./components/Skills";
import { Stats } from "./components/Stats";
import { Testimonials } from "./components/Testimonials";

const SECTIONS = [
  { id: "hero", labelFr: "Accueil", labelEn: "Home" },
  { id: "stats", labelFr: "En Bref", labelEn: "Overview" },
  { id: "skills", labelFr: "Compétences", labelEn: "Skills" },
  { id: "projects", labelFr: "Projets", labelEn: "Projects" },
  { id: "testimonials", labelFr: "Témoignages", labelEn: "Testimonials" },
  { id: "cta-cv", labelFr: "Curriculum", labelEn: "CV" },
  { id: "available", labelFr: "Disponibilité", labelEn: "Availability" },
  { id: "contact", labelFr: "Contact", labelEn: "Contact" },
];

export default function Home() {
  return (
    <main className="relative">
      <MouseGradient />
      <SideNav SECTIONS={SECTIONS} />

      <Hero />
      <Stats />
      <Skills />
      <FeaturedProjects />
      <Testimonials />
      <CtaCV />
      <OpenToWork />
      <Contact />
    </main>
  );
}
