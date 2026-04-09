"use client";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Hero");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{t("welcome")}</h1>
      <h1 className="text-4xl font-bold">Welcome to Mahefa`s portfolio!</h1>
    </main>
  );
}
