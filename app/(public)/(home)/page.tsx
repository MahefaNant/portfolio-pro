"use client";
import { Contact } from "./components/Contact";
import { CtaCV } from "./components/CtaCV";
import { FeaturedProjects } from "./components/FeaturedProjects";
import { Hero } from "./components/Hero";
import { OpenToWork } from "./components/OpenToWork";
import { Skills } from "./components/Skills";
import { Stats } from "./components/Stats";
import { Testimonials } from "./components/Testimonials";

export default function Home() {
  return (
    <main>
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
