"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { setUserLocale } from "@/lib/locale";
import { Check } from "lucide-react";

export function LanguageToggle() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();

  function onChange(value: string) {
    startTransition(async () => {
      await setUserLocale(value);
      // On recharge la page pour que le serveur prenne en compte le nouveau cookie
      window.location.reload();
    });
  }

  return (
    <DropdownMenuContent align="end" className="w-32">
      <DropdownMenuItem
        onClick={() => onChange("en")}
        className="flex items-center justify-between cursor-pointer"
        disabled={isPending}
      >
        <span className="flex items-center gap-2">🇺🇸 English</span>
        {locale === "en" && <Check className="h-4 w-4" />}
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => onChange("fr")}
        className="flex items-center justify-between cursor-pointer"
        disabled={isPending}
      >
        <span className="flex items-center gap-2">🇫🇷 Français</span>
        {locale === "fr" && <Check className="h-4 w-4" />}
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
