import type { Metadata, Viewport } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import { Analytics } from "@vercel/analytics/next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SITE_CONFIG } from "@/config/site";
import { cn } from "@/lib/utils";

import "./globals.css";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.NAME,
    template: `%s | ${SITE_CONFIG.NAME}`,
  },
  description: SITE_CONFIG.DESCRIPTION,
  metadataBase: new URL(SITE_CONFIG.URL),
  openGraph: {
    title: SITE_CONFIG.NAME,
    description: SITE_CONFIG.DESCRIPTION,
    url: SITE_CONFIG.URL,
    siteName: SITE_CONFIG.NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.NAME,
    description: SITE_CONFIG.DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html
      className={cn("antialiased", fontSans.variable, fontMono.variable)}
      data-scroll-behavior="smooth"
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          {/* Skip to content link */}
          <a
            className="sr-only rounded-md bg-background px-4 py-2 ring-2 ring-primary focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
            href="#main-content"
          >
            Skip to content
          </a>

          <Header />

          <main id="main-content">{children}</main>

          <Footer />

          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
