"use client";

import { Card, CardContent } from "@/components/ui/card";
import { IconRenderer } from "@/components/ui/icon-renderer";

const calendlyUrl = "https://calendly.com/mahefa/30min";

export function ContactCalendly() {
  return (
    <Card className="bg-white/50 dark:bg-[#121826]/50 backdrop-blur-sm border border-gray-200 dark:border-[#1F2937] shadow-xl overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#A855F7]/10 flex items-center justify-center">
              <IconRenderer
                name="Calendar"
                className="h-6 w-6 text-[#A855F7]"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Planifions un rendez-vous
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Disponible pour un appel de 30 minutes
              </p>
            </div>
          </div>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#A855F7] hover:bg-[#9333EA] text-white transition-all duration-300 cursor-pointer"
          >
            <IconRenderer name="Calendar" className="h-4 w-4" />
            Réserver un créneau
            <IconRenderer name="ArrowRight" className="h-4 w-4" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
