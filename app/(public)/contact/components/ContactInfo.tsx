"use client";

import { Card, CardContent } from "@/components/ui/card";
import { IconRenderer } from "@/components/ui/icon-renderer";
import { useLocale, useTranslations } from "next-intl";

const contactData = {
  email: "mahefanant@gmail.com",
  phone: "+261 34 57 276 90",
  location: "Antananarivo, Madagascar",
  responseTime: "24h",
  availabilityFr: "Lun - Ven, 9h - 18h",
  availabilityEn: "Mon - Fri, 9h - 18h",
  socialLinks: [
    {
      platform: "GitHub",
      iconName: "Github",
      url: "https://github.com/mahefanant",
      username: "@mahefanant",
    },
    {
      platform: "LinkedIn",
      iconName: "Linkedin",
      url: "https://www.linkedin.com/in/mahefa-nantenaina-419a98271",
      username: "mahefa",
    },
    {
      platform: "Whatsapp",
      iconName: "Phone",
      url: "https://wa.me/261345727690",
      username: "+261 34 57 276 90",
    },
  ],
  calendlyUrl: "https://calendly.com/mahefa/30min",
};

export function ContactInfo() {
  const t = useTranslations("Contact.Info");
  const locale = useLocale();
  return (
    <div className="space-y-5">
      {/* Carte disponibilité */}
      <Card className="bg-white/50 dark:bg-[#121826]/50 backdrop-blur-sm border border-gray-200 dark:border-[#1F2937] shadow-xl">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75" />
              <div className="relative w-3 h-3 bg-emerald-500 rounded-full" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("available")}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {t("directContact")}
          </h3>
          <a
            href={`mailto:${contactData.email}`}
            className="inline-flex items-center gap-2 text-[#2563EB] dark:text-[#3B82F6] hover:underline mb-3 break-all"
          >
            <IconRenderer name="Mail" className="h-4 w-4 shrink-0" />
            <span className="text-sm">{contactData.email}</span>
          </a>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
            <IconRenderer name="Phone" className="h-4 w-4" />
            <span>{contactData.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <IconRenderer name="MapPin" className="h-4 w-4" />
            <span>{contactData.location}</span>
          </div>
        </CardContent>
      </Card>

      {/* Carte réseaux sociaux */}
      <Card className="bg-white/50 dark:bg-[#121826]/50 backdrop-blur-sm border border-gray-200 dark:border-[#1F2937] shadow-xl">
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
            {t("findMeOn")}
          </h3>
          <div className="space-y-3">
            {contactData.socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-lg bg-gray-100 dark:bg-[#0B0F1A] hover:bg-[#2563EB] dark:hover:bg-[#2563EB] transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <IconRenderer
                    name={social.iconName}
                    className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors">
                    {social.platform}
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-white/80 transition-colors">
                  {social.username}
                </span>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Carte temps de réponse */}
      <Card className="bg-white/50 dark:bg-[#121826]/50 backdrop-blur-sm border border-gray-200 dark:border-[#1F2937] shadow-xl">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 flex items-center justify-center">
              <IconRenderer name="Clock" className="h-5 w-5 text-[#22C55E]" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {t("responseTime")}
              </p>
              <p className="text-2xl font-bold text-[#22C55E]">
                {contactData.responseTime}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <IconRenderer name="Calendar" className="h-4 w-4" />
            <span>
              {locale === "fr"
                ? contactData.availabilityFr
                : contactData.availabilityEn}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
