"use client";
import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";

export default function Home() {
  // const t = useTranslations("Hero");
  return (
    <main>
      <Hero />
      <Skills />
    </main>
  );
}
