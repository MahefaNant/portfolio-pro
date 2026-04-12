"use client";
import { useTranslations } from "next-intl";
import { Hero } from "./components/Hero";

export default function Home() {
  const t = useTranslations("Hero");
  return (
    <main>
      <Hero />
    </main>
  );
}
