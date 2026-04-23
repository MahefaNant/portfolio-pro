import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://mahefa.vercel.app/",
  ),
  title: {
    default: "Mahefa-Portfolio – Fullstack Developer",
    template: "%s | Mahefa-Portfolio",
  },
  description:
    "Portfolio of Mahefa, a passionate fullstack developer specializing in modern web and mobile technologies.",
  keywords: [
    "Mahefa",
    "Fullstack Developer",
    "Portfolio",
    "Next.js",
    "React",
    "TypeScript",
    "Mobile",
  ],
  authors: [{ name: "Mahefa" }],
  creator: "Mahefa",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mahefa.vercel.app/",
    siteName: "Mahefa-Portfolio",
    title: "Mahefa-Portfolio – Fullstack Developer",
    description:
      "Portfolio of Mahefa, a passionate fullstack developer specializing in modern web technologies.",
    images: [
      {
        url: "/static/images/portfolio-screen.png",
        width: 1200,
        height: 630,
        alt: "Mahefa Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahefa-Portfolio – Fullstack Developer",
    description:
      "Portfolio of Mahefa, a passionate fullstack developer specializing in modern web technologies.",
    images: ["/static/images/portfolio-screen.png"],
    creator: "@mahefa", // Adjust if you have a twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "googled80e1742b77bf486", // The ID from your html file
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scrollbar-thin scrollbar-thumb-primary/30 hover:scrollbar-thumb-primary/50 scrollbar-track-transparent scrollbar-thumb-rounded-full`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <meta
          name="apple-mobile-web-app-title"
          content="Mahefa-Portfolio-Developer"
        />
      </head>

      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
