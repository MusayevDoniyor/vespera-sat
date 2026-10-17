import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import "./globals.css";
import "katex/dist/katex.min.css";
import AppShell from "@/components/AppShell";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#090d16" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://vespera.academy"),
  title: {
    default: "Vespera SAT | Autonomous Digital SAT Mastery & Desmos Speed Lab",
    template: "%s | Vespera SAT",
  },
  description:
    "Vespera is an elite, autonomous Digital SAT preparation platform designed for 1550+ mastery. Features 16 interactive visual diagrams, 10-second Desmos hacks, authentic Bluebook exam drills, and adaptive spaced repetition.",
  keywords: [
    "Digital SAT",
    "SAT Math 800",
    "SAT Desmos calculator",
    "Desmos hacks",
    "SAT Reading and Writing",
    "Bluebook SAT practice",
    "College Board SAT prep",
    "SM-2 spaced repetition",
    "Digital SAT practice tests",
    "Vespera SAT",
  ],
  authors: [{ name: "Vespera Academy", url: "https://vespera.academy" }],
  creator: "Vespera Academy",
  publisher: "Vespera Academy",
  applicationName: "Vespera SAT",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vespera.academy",
    siteName: "Vespera SAT",
    title: "Vespera SAT — Autonomous Digital SAT Mastery & Desmos Speed Lab",
    description:
      "Master Digital SAT with 16 publication-grade visual models, official Desmos speed hacks, and adaptive Bluebook drills.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vespera SAT — Autonomous Digital SAT Mastery Suite",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vespera SAT — Autonomous Digital SAT Mastery",
    description:
      "1550+ score focus with interactive Desmos shortcuts and visual math & verbal guides.",
    images: ["/og-image.png"],
    creator: "@vespera_sat",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full antialiased ${plusJakartaSans.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"
        />
      </head>
      <body
        className="min-h-full bg-[var(--bg-main)] text-[var(--text-main)]"
        suppressHydrationWarning
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
