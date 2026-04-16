"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Mail,
  MessageSquare,
  Send,
  Shield,
  Sparkles,
  User,
} from "lucide-react";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IconRenderer } from "@/components/ui/icon-renderer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";

// Schéma de validation
const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = {
  email: "mahefanant@gmail.com",
  responseTime: "24h",
  socialLinks: [
    {
      platform: "GitHub",
      icon: "Github",
      url: "https://github.com/mahefanant",
    },
    {
      platform: "LinkedIn",
      icon: "Linkedin",
      url: "https://www.linkedin.com/in/mahefa-nantenaina-419a98271",
    },
  ],
};

export function Contact() {
  const t = useTranslations("Home.Contact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { isValid, isDirty } = form.formState;

  const onSubmit = async (data: ContactFormData) => {
    setError(null);
    setIsSubmitting(true);

    try {
      // Exécuter ReCAPTCHA
      const token = await recaptchaRef.current?.executeAsync();

      if (!token) {
        throw new Error("ReCAPTCHA non vérifié");
      }

      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          recaptchaToken: token,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'envoi");
      }

      setEmailSent(true);
      form.reset();

      // Réinitialiser le message de succès après 5 secondes
      setTimeout(() => setEmailSent(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
      recaptchaRef.current?.reset();
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-32 relative overflow-hidden">
      {/* Background décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-linear-to-br from-[#2563EB]/10 to-[#22C55E]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#2563EB]/5 rounded-full blur-3xl" />

        {/* Grille technique */}
        <div className="absolute inset-0 bg-[radial-gradient(#2563EB_1px,transparent_1px)] bg-size-[32px_32px] opacity-[0.02] dark:opacity-[0.03]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 dark:bg-[#2563EB]/15 border border-[#2563EB]/20 mb-4">
            <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-[#2563EB]" />
            <span className="text-[10px] sm:text-xs font-medium text-[#2563EB] dark:text-[#3B82F6] uppercase tracking-wider">
              Contact
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4">
            <span className="bg-linear-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {t("title")}
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400">
            {t("description")} {contactInfo.responseTime}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Left Column - Infos contact */}
          <div className="lg:col-span-1 space-y-6">
            {/* Carte de disponibilité */}
            <Card className="bg-white/50 dark:bg-[#121826]/50 backdrop-blur-sm border border-gray-200 dark:border-[#1F2937] shadow-xl overflow-hidden">
              <CardContent className="p-6">
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
                  href={`mailto:${contactInfo.email}`}
                  className="inline-flex items-center gap-2 text-[#2563EB] dark:text-[#3B82F6] hover:underline mb-4 break-all"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="text-sm">{contactInfo.email}</span>
                </a>

                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>
                    {t("responseTime")} : {contactInfo.responseTime}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Carte des réseaux sociaux */}
            <Card className="bg-white/50 dark:bg-[#121826]/50 backdrop-blur-sm border border-gray-200 dark:border-[#1F2937] shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                  {t("socialLinks")}
                </h3>
                <div className="flex gap-3">
                  {contactInfo.socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-gray-100 dark:bg-[#0B0F1A] text-gray-600 dark:text-gray-400 hover:bg-[#2563EB] hover:text-white dark:hover:bg-[#2563EB] transition-all duration-300 hover:scale-110"
                      aria-label={social.platform}
                    >
                      <IconRenderer name={social.icon} className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Badge tech */}
            <div className="hidden lg:block">
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge
                  variant="outline"
                  className="bg-white/50 dark:bg-[#121826]/50"
                >
                  <Shield className="h-3 w-3 mr-1" />
                  {t("secure")}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-white/50 dark:bg-[#121826]/50"
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  {t("responseTime")}
                </Badge>
              </div>
            </div>
          </div>

          {/* Right Column - Formulaire */}
          <div className="lg:col-span-2">
            <Card className="bg-white/50 dark:bg-[#121826]/50 backdrop-blur-sm border border-gray-200 dark:border-[#1F2937] shadow-xl overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl sm:text-2xl text-gray-900 dark:text-white">
                  {t("sendMeMessage")}
                </CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  {t("fillForm")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {emailSent ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="h-8 w-8 text-emerald-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {t("messageSent")}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {t("messageSentDescription")}
                    </p>
                  </div>
                ) : (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-5"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 dark:text-gray-300">
                              {t("form.name")}
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                  placeholder={t("form.placeholder.name")}
                                  className="pl-9 bg-white dark:bg-[#0B0F1A] border-gray-200 dark:border-[#1F2937] focus:border-[#2563EB] dark:focus:border-[#3B82F6]"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 dark:text-gray-300">
                              {t("form.email")}
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                  placeholder="name@exemple.com"
                                  type="email"
                                  className="pl-9 bg-white dark:bg-[#0B0F1A] border-gray-200 dark:border-[#1F2937] focus:border-[#2563EB] dark:focus:border-[#3B82F6]"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 dark:text-gray-300">
                              {t("form.message")}
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Textarea
                                  placeholder={t("form.placeholder.message")}
                                  rows={5}
                                  className="pl-9 bg-white dark:bg-[#0B0F1A] border-gray-200 dark:border-[#1F2937] focus:border-[#2563EB] dark:focus:border-[#3B82F6] resize-none"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {error && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          <span>{error}</span>
                        </div>
                      )}

                      {/* ReCAPTCHA invisible */}
                      {/* <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                        size="invisible"
                        badge="inline"
                      /> */}

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-linear-to-r from-[#2563EB] to-[#1E3A8A] hover:from-[#3B82F6] hover:to-[#2563EB] text-white transition-all duration-300 group"
                        disabled={isSubmitting || !isValid || !isDirty}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                            {t("form.sending")}
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            {t("form.sendTheMessage")}
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-4">
                        {t("protectedByRecaptcha")}
                      </p>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
