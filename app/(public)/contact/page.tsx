import { MouseGradient } from "@/app/components/MouseGradient";
import { IconRenderer } from "@/components/ui/icon-renderer";
import { useTranslations } from "next-intl";
import { ContactCalendly } from "./components/ContactCalendly";
import { ContactForm } from "./components/ContactForm";
import { ContactInfo } from "./components/ContactInfo";

export default function ContactPage() {
  const t = useTranslations("Contact");
  return (
    <main className="min-h-screen py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <MouseGradient />
      {/* Background décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#2563EB]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#22C55E]/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.02] dark:opacity-[0.03]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 dark:bg-[#2563EB]/15 border border-[#2563EB]/20 mb-4">
            <IconRenderer
              name="Mail"
              className="h-3 w-3 sm:h-4 sm:w-4 text-[#2563EB]"
            />
            <span className="text-[10px] sm:text-xs font-medium text-[#2563EB] dark:text-[#3B82F6] uppercase tracking-wider">
              Contact
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {t("title")}
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{t("description")}</p>
        </div>

        {/* Grille des sections */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Infos */}
          <div className="lg:col-span-1">
            <ContactInfo />
          </div>

          {/* Right Column - Formulaire + Calendly */}
          <div className="lg:col-span-2 space-y-6">
            <ContactForm />
            <ContactCalendly />
          </div>
        </div>
      </div>
    </main>
  );
}
