"use client";

import { MouseGradient } from "@/app/components/MouseGradient";
import { SideNav } from "@/app/components/SideNav";
import { AboutSkills } from "./components/AboutSkills";
import { Bio } from "./components/Bio";
import { Education } from "./components/Education";
import { Languages } from "./components/Languages";
import { Mindset } from "./components/Mindset";
import { ProPhoto } from "./components/ProPhoto";
import { Timeline } from "./components/Timeline";

const SECTIONS = [
  { id: "pro-photo", labelFr: "Photo Pro", labelEn: "Pro Photo" },
  { id: "bio", labelFr: "Bio", labelEn: "Bio" },
  { id: "mindset", labelFr: "Mindset", labelEn: "Mindset" },
  { id: "skills", labelFr: "Compétences", labelEn: "Skills" },
  { id: "timeline", labelFr: "Timeline", labelEn: "Timeline" },
  { id: "education", labelFr: "Education", labelEn: "Education" },
  { id: "languages", labelFr: "Languages", labelEn: "Languages" },
];

export default function About() {
  return (
    <main className="relative">
      <MouseGradient />
      <SideNav SECTIONS={SECTIONS} />

      <ProPhoto />
      <Bio />
      <Mindset />
      <AboutSkills />
      <Timeline />
      <Education />
      <Languages />
    </main>
  );
}
