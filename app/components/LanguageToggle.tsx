"use client";

import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { setUserLocale } from "@/lib/locale";
import { Check } from "lucide-react";
import { useLocale } from "next-intl";
import { useTransition } from "react";

export function LanguageToggle() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();

  function onChange(value: string) {
    startTransition(async () => {
      await setUserLocale(value);
      window.location.reload();
    });
  }

  return (
    <DropdownMenuContent align="end" className="w-36">
      <DropdownMenuItem
        onClick={() => onChange("en")}
        className="flex items-center justify-between cursor-pointer"
        disabled={isPending}
      >
        <span className="flex items-center gap-2">
          <span className="text-base">🇺🇸</span>
          <span className="text-sm">English</span>
        </span>
        {locale === "en" && <Check className="h-4 w-4 flex-shrink-0" />}
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => onChange("fr")}
        className="flex items-center justify-between cursor-pointer"
        disabled={isPending}
      >
        <span className="flex items-center gap-2">
          <span className="text-base">🇫🇷</span>
          <span className="text-sm">Français</span>
        </span>
        {locale === "fr" && <Check className="h-4 w-4 flex-shrink-0" />}
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
