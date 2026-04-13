"use client";
import { Contact } from "./components/Contact";
import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";

export default function Home() {
  // const t = useTranslations("Hero");
  return (
    <main>
      <Hero />
      <Skills />
      <Contact />
    </main>
  );
}
