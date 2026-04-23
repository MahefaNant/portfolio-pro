"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { useLocale, useTranslations } from "next-intl";

export function ContactForm() {
  const t = useTranslations("Contact.Form");
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const contactSchema = z.object({
    name: z.string().min(2, t("zod.name")),
    email: z.string().email(t("zod.email")),
    message: z.string().min(10, t("zod.message")),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

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
      const token = await recaptchaRef.current?.executeAsync();

      if (!token) {
        throw new Error(t("recaptcha-not-verified"));
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
        throw new Error(result.error || "Error sending message");
      }

      setEmailSent(true);
      form.reset();

      setTimeout(() => setEmailSent(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error sending message");
    } finally {
      setIsSubmitting(false);
      recaptchaRef.current?.reset();
    }
  };

  return (
    <Card className="bg-white/50 dark:bg-[#121826]/50 backdrop-blur-sm border border-gray-200 dark:border-[#1F2937] shadow-xl">
      <CardContent className="p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {t("title")}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {t("description")}
        </p>

        {emailSent ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
              <IconRenderer
                name="CheckCircle"
                className="h-8 w-8 text-emerald-500"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t("success")}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {t("success-description")}
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      {t("name")}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <IconRenderer
                          name="User"
                          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                        />
                        <Input
                          placeholder={
                            locale === "fr" ? "Votre Nom" : "Your Name"
                          }
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
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <IconRenderer
                          name="Mail"
                          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                        />
                        <Input
                          placeholder={
                            locale === "fr" ? "Votre Email" : "Your Email"
                          }
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
                      Message
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <IconRenderer
                          name="MessageSquare"
                          className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                        />
                        <Textarea
                          placeholder={
                            locale === "fr"
                              ? "Décrivez votre projet ou votre demande..."
                              : "Describe your project or request..."
                          }
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
                  <IconRenderer name="AlertCircle" className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}

              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                size="invisible"
              />

              <Button
                type="submit"
                size="lg"
                className="w-full bg-linear-to-r from-[#2563EB] to-[#1E3A8A] hover:from-[#3B82F6] hover:to-[#2563EB] text-white transition-all duration-300 group cursor-pointer"
                disabled={isSubmitting || !isValid || !isDirty}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    {t("sending")}
                  </>
                ) : (
                  <>
                    <IconRenderer
                      name="Send"
                      className="h-4 w-4 mr-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                    {t("button")}
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-4">
                {t("note")}
              </p>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
