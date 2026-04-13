"use client";

import { AboutSkills } from "./components/AboutSkills";
import { Bio } from "./components/Bio";
import { Education } from "./components/Education";
import { Languages } from "./components/Languages";
import { Mindset } from "./components/Mindset";
import { ProPhoto } from "./components/ProPhoto";
import { Timeline } from "./components/Timeline";

export default function About() {
  return (
    <main>
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
